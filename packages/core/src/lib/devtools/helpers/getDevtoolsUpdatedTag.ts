export function getDevtoolsUpdatedTag(currentTag?: string) {
  if (!currentTag) {
    return "updated";
  }

  if (currentTag === "updated") {
    return "updated x2";
  }

  return currentTag.replace(/x(\d+)$/, (_, x) => `x${+x + 1}`);
}
