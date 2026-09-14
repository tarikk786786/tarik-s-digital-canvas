import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".output", ".vinxi", "node_modules"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "server-only",
              message:
                "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
            },
          ],
        },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      // Shadcn UI kits commonly co-export variants with components
      "react-refresh/only-export-components": "off",
      // ScrambleText intentionally omits stable callback from deps
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    ...eslintPluginPrettier,
    rules: {
      ...eslintPluginPrettier.rules,
      // Formatting is owned by `npm run format`. Do not fail lint on Windows CRLF /
      // historical printWidth drift — those are not functional breakages.
      "prettier/prettier": "off",
    },
  },
);
