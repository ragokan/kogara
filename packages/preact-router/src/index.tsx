import {
  AnyComponent,
  Component,
  VNode,
  cloneElement,
  createContext,
  h,
  toChildArray,
} from "preact";
import { useContext, useEffect, useState } from "preact/hooks";

const ROUTERS: any[] = [];
const SUBS: any[] = [];

const GLOBAL_ROUTE_CONTEXT: Record<string, any> = {
  url: getCurrentUrl(),
};

const RouterContext = createContext(GLOBAL_ROUTE_CONTEXT);

function getCurrentUrl() {
  const url = location ?? {};
  return `${url.pathname || ""}${url.search || ""}`;
}

function canRoute(url: string) {
  for (let i = ROUTERS.length; i--; ) {
    if (ROUTERS[i].canRoute(url)) {
      return true;
    }
  }
  return false;
}

function routeTo(url: string) {
  let didRoute = false;
  for (let i = 0; i < ROUTERS.length; i++) {
    if (ROUTERS[i].routeTo(url)) {
      didRoute = true;
    }
  }
  return didRoute;
}

function routeFromLink(elem: Element) {
  if (!elem || !elem.getAttribute) {
    return;
  }

  const href = elem.getAttribute("href");
  const target = elem.getAttribute("target");

  if (!href || !href.match(/^\//g) || (target && !target.match(/^_?self$/i))) {
    return;
  }

  return push(href);
}

function prevent(e: Event) {
  if (e.stopImmediatePropagation) {
    e.stopImmediatePropagation();
  }
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  e.preventDefault();
  return false;
}

function delegateLinkHandler(e: MouseEvent) {
  if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button) {
    return;
  }

  let t = e.target as Element;
  do {
    if (t.localName === "a" && t.getAttribute("href")) {
      if (t.hasAttribute("data-native") || t.hasAttribute("native")) {
        return;
      }
      if (routeFromLink(t)) {
        return prevent(e);
      }
    }
  } while ((t = t.parentNode as any));
}

let eventListenersInitialized = false;

function initEventListeners() {
  if (eventListenersInitialized) {
    return;
  }
  eventListenersInitialized = true;

  addEventListener("popstate", () => {
    routeTo(getCurrentUrl());
  });
  addEventListener("click", delegateLinkHandler);
}

export default class Router extends Component<Record<string, any>> {
  _updating = false;
  _contextValue: typeof GLOBAL_ROUTE_CONTEXT | undefined;

  constructor() {
    super();
    this.state = {
      url: getCurrentUrl(),
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  canRoute(url: string) {
    const children = toChildArray(this.props.children) as Array<
      VNode<{ path: string }>
    >;
    return this._getMatchingChild(children, url) !== undefined;
  }

  routeTo(url: string) {
    this.setState({ url });

    const didRoute = this.canRoute(url);

    if (!this._updating) {
      this.forceUpdate();
    }

    return didRoute;
  }

  componentWillMount() {
    this._updating = true;
  }

  componentDidMount() {
    initEventListeners();
    ROUTERS.push(this);
    this._updating = false;
  }

  componentWillUnmount() {
    ROUTERS.splice(ROUTERS.indexOf(this), 1);
  }

  componentWillUpdate() {
    this._updating = true;
  }

  componentDidUpdate() {
    this._updating = false;
  }

  _getMatchingChild(children: Array<VNode<{ path: string }>>, url: string) {
    for (let i = 0; i < children.length; i++) {
      const vnode = children[i]!;
      const matches = exec(url, vnode.props.path, vnode.props);
      if (matches) {
        return [vnode, matches];
      }
    }
  }

  render(
    { children }: { children: Array<VNode<{ path: string }>> },
    { url }: { url: string }
  ) {
    let ctx: typeof GLOBAL_ROUTE_CONTEXT =
      this._contextValue ?? GLOBAL_ROUTE_CONTEXT;

    const active: any = this._getMatchingChild(
      toChildArray(children) as Array<VNode<{ path: string }>>,
      url
    );
    let matches: any, current: any;
    if (active) {
      matches = active[1];
      current = cloneElement(
        active[0],
        assign(assign({ url, matches }, matches), {
          key: undefined,
          ref: undefined,
        })
      );
    }

    if (url !== (ctx && ctx.url)) {
      const newCtx = {
        url,
        previous: ctx && ctx.url,
        current,
        path: current ? current.props.path : null,
        matches,
      };

      // only copy simple properties to the global context:
      assign(GLOBAL_ROUTE_CONTEXT, (ctx = this._contextValue = newCtx));

      // these are only available within the subtree of a Router:
      ctx.router = this;
      ctx.active = current ? [current] : [];

      // notify useRouter subscribers outside this subtree:
      for (let i = SUBS.length; i--; ) {
        SUBS[i]({});
      }
    }

    return (
      <RouterContext.Provider value={ctx} children={children}>
        {current}
      </RouterContext.Provider>
    );
  }
}

export function Link(props: preact.JSX.HTMLAttributes<HTMLAnchorElement>) {
  return h("a", assign({ onClick: delegateLinkHandler }, props));
}

export interface RoutableProps {
  path: string;
}

interface RouteProps<Props> extends RoutableProps {
  component: AnyComponent<Props>;
}

export function Route<Props>(props: RouteProps<Props> & Partial<Props>) {
  return h(props.component as any, props);
}

const SECOND_EMPTY: Record<any, any> = {};

function assign(obj: Record<any, any>, props: Record<any, any>) {
  for (const i in props) {
    obj[i] = props[i];
  }
  return obj;
}

function exec(url: string, route: string, opts: Record<any, any>) {
  const reg = /(?:\?([^#]*))?(#.*)?$/;
  const c = url.match(reg);
  const matches: Record<any, any> = {};
  let ret: boolean | undefined;
  if (c && c[1]) {
    const p = c[1].split("&");
    for (let i = 0; i < p.length; i++) {
      const r = p[i]!.split("=");
      matches[decodeURIComponent(r[0]!)] = decodeURIComponent(
        r.slice(1).join("=")
      );
    }
  }
  const parsedUrl = segmentize(url.replace(reg, ""));
  const parsedRoute = segmentize(route || "");
  const max = Math.max(parsedUrl.length, route.length);
  for (let i = 0; i < max; i++) {
    if (parsedRoute[i] && parsedRoute[i]!.charAt(0) === ":") {
      const param = parsedRoute[i]!.replace(/(^:|[+*?]+$)/g, "");
      const flags = (parsedRoute[i]!.match(/[+*?]+$/) || SECOND_EMPTY)[0] || "";
      const plus = ~flags.indexOf("+");
      const star = ~flags.indexOf("*");
      const val = parsedUrl[i] || "";
      if (!val && !star && (!flags.includes("?") || plus)) {
        ret = false;
        break;
      }
      matches[param] = decodeURIComponent(val);
      if (plus || star) {
        matches[param] = parsedUrl.slice(i).map(decodeURIComponent).join("/");
        break;
      }
    } else if (parsedRoute[i] !== parsedUrl[i]) {
      ret = false;
      break;
    }
  }
  if (opts.default !== true && ret === false) {
    return false;
  }
  return matches;
}

function segmentize(url: string) {
  return url.replace(/(^\/+|\/+$)/g, "").split("/");
}

interface UseRouterReturns {
  url: string;
  previous?: string;
  active: preact.VNode[];
  current: preact.VNode;
  path: string | null;
  matches: Record<string, string | undefined> | null;
}

export function useRouter() {
  const ctx = useContext(RouterContext);

  const update = useState()[1];
  useEffect(() => {
    SUBS.push(update);
    return () => SUBS.splice(SUBS.indexOf(update), 1);
  }, []);

  return ctx as UseRouterReturns;
}

export function push(
  url: string,
  type: "replace" | "push" = "push",
  state: Record<any, any> | null = null
) {
  if (canRoute(url)) {
    if (typeof history !== "undefined" && history[`${type}State`]) {
      history[`${type}State`](state, "", url);
    }
  }

  return routeTo(url);
}
