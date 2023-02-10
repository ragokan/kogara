export function _updateDevtoolsTags(tags: Array<string>) {
  const index = tags.findIndex((tag) => tag.startsWith("updated"));

  if (index === -1) {
    return tags.push("updated");
  }

  if (tags[index] === "updated") {
    return (tags[index] = "updated x2");
  }

  tags[index] = tags[index]!.replace(/x(\d+)$/, (_, x) => `x${+x + 1}`);
}
