import { CodegenConfig } from "@graphql-codegen/cli";
import { SchemaURL, headers } from "./constants";

const config: CodegenConfig = {
  schema: SchemaURL,
  documents: ["src/gql-client/queries/*.ts"],
  generates: {
    "./src/gql-client/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  config: {
    headers: headers,
  },
};

export default config;
