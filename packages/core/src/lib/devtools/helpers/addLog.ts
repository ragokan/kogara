import { KogaraInstance } from "../../instance";
import { _getType } from "../../utilities/getType";
import { kogaraDevtoolsID } from "../constants";

export function _addLog({
  id,
  key,
  data,
  args,
  message,
  logType = "default",
  error,
}: {
  id: string;
  key: string;
  data: any;
  args: any[];
  message: string;
  logType?: "default" | "error";
  error?: string;
}) {
  // Convert data to raw, so that they won't be reactive
  const actionData = Object.keys(data)
    .filter((item) => _getType(data[item]) !== "other")
    .map((key) => ({
      key,
      value: data[key]?.value ?? Object.assign({}, data[key]),
    }));

  // If function is called with args, we add them to the timeline
  if (args.length) {
    actionData.push({ key: "args", value: args });
  }

  // If error is thrown, we add it to the timeline
  if (error) {
    actionData.push({ key: "error", value: error });
  }

  // Finally we add the log to the timeline
  KogaraInstance.plugins.__devtoolsApi?.addTimelineEvent({
    layerId: kogaraDevtoolsID,
    event: {
      groupId: id,
      logType,
      time: KogaraInstance.plugins.__devtoolsApi.now(),
      title: `Function ${key} ${message}`,
      subtitle: id,
      data: actionData,
    },
  });
}
