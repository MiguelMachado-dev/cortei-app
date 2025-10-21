import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./server/internal/graph/schema.graphqls",
  documents: "src/graphql/**/*.ts",
  generates: {
    "src/graphql/__generated__/types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
        useTypeImports: true,
        apolloReactHooksImportFrom: "@apollo/client/react",
        apolloReactCommonImportFrom: "@apollo/client/react",
      },
    },
  },
  hooks: {
    afterAllFileWrite: "prettier --write",
  },
};

export default config;
