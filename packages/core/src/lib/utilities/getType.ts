import { isReactive, isRef } from "vue";
import { _isComputed } from "./isComputed";

export function _getType(value: unknown) {
  if (_isComputed(value)) {
    return "computed";
  }
  if (isRef(value)) {
    return "ref";
  }
  if (isReactive(value)) {
    return "reactive";
  }
  return "other";
}
