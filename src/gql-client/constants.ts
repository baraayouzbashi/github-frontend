export const SchemaURL = "https://api.github.com/graphql";
export const headers: Record<string, string> = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  "User-Agent": process.env.GITHUB_USERNAME ?? "",
};
