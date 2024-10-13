export const SchemaURL = "https://api.github.com/graphql";
export const headers: Record<string, string> = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  "User-Agent": process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "",
};
