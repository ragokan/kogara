const EMPTY = {};

export function assign(obj, props) {
  for (const i in props) {
    obj[i] = props[i];
  }
  return obj;
}

export function exec(url, route, opts) {
  const reg = /(?:\?([^#]*))?(#.*)?$/;
  const c = url.match(reg);
  const matches = {};
  let ret;
  if (c && c[1]) {
    const p = c[1].split("&");
    for (let i = 0; i < p.length; i++) {
      const r = p[i].split("=");
      matches[decodeURIComponent(r[0])] = decodeURIComponent(
        r.slice(1).join("="),
      );
    }
  }
  url = segmentize(url.replace(reg, ""));
  route = segmentize(route || "");
  const max = Math.max(url.length, route.length);
  for (let i = 0; i < max; i++) {
    if (route[i] && route[i].charAt(0) === ":") {
      const param = route[i].replace(/(^:|[+*?]+$)/g, "");
      const flags = (route[i].match(/[+*?]+$/) || EMPTY)[0] || "";
      const plus = ~flags.indexOf("+");
      const star = ~flags.indexOf("*");
      const val = url[i] || "";
      if (!val && !star && (!flags.includes("?") || plus)) {
        ret = false;
        break;
      }
      matches[param] = decodeURIComponent(val);
      if (plus || star) {
        matches[param] = url.slice(i).map(decodeURIComponent).join("/");
        break;
      }
    } else if (route[i] !== url[i]) {
      ret = false;
      break;
    }
  }
  if (opts.default !== true && ret === false) {
    return false;
  }
  return matches;
}

export function pathRankSort(a, b) {
  return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
export function prepareVNodeForRanking(vnode, index) {
  vnode.index = index;
  vnode.rank = rankChild(vnode);
  return vnode.props;
}

export function segmentize(url) {
  return url.replace(/(^\/+|\/+$)/g, "").split("/");
}

export function rankSegment(segment) {
  return segment.charAt(0) === ":"
    ? 1 + "*+?".indexOf(segment.charAt(segment.length - 1)) || 4
    : 5;
}

export function rank(path) {
  return segmentize(path).map(rankSegment).join("");
}

function rankChild(vnode) {
  return vnode.props.default ? 0 : rank(vnode.props.path);
}
