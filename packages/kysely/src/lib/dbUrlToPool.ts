export function dbUrlToPool(dbUrl: string) {
  const parts = dbUrl.split("://")[1]!.split("/")!;
  const pieces = parts[0]!.split(":");

  return {
    database: parts[1],
    user: pieces[0],
    password: pieces[1]!.split("@")[0],
    host: pieces[1]!.split("@")[1],
    port: +pieces[2]!,
    max: 10,
  };
}
