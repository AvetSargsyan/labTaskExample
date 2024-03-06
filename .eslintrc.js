module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: ["data/*.data.ts"],
      rules: {
        "max-len": "off",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    indent: ["error", "tab"],
    "linebreak-style": ["error", "windows"],
    quotes: ["warn", "double"],
    semi: ["error", "always"],
    "space-in-parens": ["error", "never"],
    "max-len": ["error", { code: 100, tabWidth: 1 }],
    "@typescript-eslint/no-explicit-any": ["off", "always"],
  },
};
