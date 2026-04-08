import react from "eslint-plugin-react";
import tsparser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import sortImports from "eslint-plugin-import-x";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/",
      "dist/",
    ]
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        RequestInit: "readonly",
        __VIEWER3D_VERSION__: "readonly",
        __VIEWER3D_LINKED__: "readonly"
      },
      ecmaVersion: "latest"
    },
    plugins: {
      react,
      "@typescript-eslint": tseslint,
      "unused-imports": unusedImports,
      import: sortImports
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      "comma-dangle": 2,
      "no-cond-assign": 2,
      "no-constant-condition": 2,
      "no-control-regex": 2,
      "no-debugger": 2,
      "no-dupe-args": 2,
      "no-dupe-keys": 2,
      "no-duplicate-case": 2,
      "no-empty": 2,
      "no-empty-character-class": 2,
      "no-ex-assign": 2,
      "no-extra-boolean-cast": 2,
      "no-extra-parens": 0,
      "no-extra-semi": 2,
      "no-func-assign": 2,
      "no-inner-declarations": 2,
      "no-invalid-regexp": 2,
      "no-irregular-whitespace": 2,
      "no-negated-in-lhs": 2,
      "no-obj-calls": 2,
      "no-regex-spaces": 2,
      "no-sparse-arrays": 2,
      "no-unreachable": 2,
      "use-isnan": 2,
      "valid-typeof": 2,
      "prefer-arrow-callback": 2,
      complexity: 0,
      "consistent-return": 2,
      curly: 2,
      "default-case": 2,
      "dot-notation": 2,
      "guard-for-in": 2,
      "no-alert": 2,
      "no-caller": 2,
      "no-div-regex": 2,
      "no-else-return": 2,
      "no-eq-null": 2,
      "no-eval": 1,
      "no-extend-native": 2,
      "no-extra-bind": 2,
      "no-fallthrough": 2,
      "no-floating-decimal": 2,
      "no-implied-eval": 2,
      "no-iterator": 2,
      "no-labels": 2,
      "no-lone-blocks": 2,
      "no-loop-func": 2,
      "no-multi-spaces": 2,
      "no-multi-str": 2,
      "no-native-reassign": 2,
      "no-new": 0,
      "no-new-func": 2,
      "no-new-wrappers": 2,
      "no-octal": 2,
      "no-octal-escape": 2,
      "no-param-reassign": 2,
      "no-process-env": 0,
      "no-proto": 2,
      "no-redeclare": 2,
      "no-return-assign": 0,
      "no-script-url": 2,
      "no-self-compare": 2,
      "no-sequences": 2,
      "no-throw-literal": 2,
      "no-unused-expressions": 0,
      "no-void": 2,
      "no-warning-comments": [0, { terms: ["todo", "fixme"], location: "start" }],
      "no-with": 2,
      radix: 0,
      "vars-on-top": 2,
      "wrap-iife": 2,
      yoda: 2,
      strict: 0,
      "no-catch-shadow": 2,
      "no-delete-var": 2,
      "no-label-var": 2,
      "no-shadow": 2,
      "no-shadow-restricted-names": 2,
      "no-undef": 2,
      "no-undef-init": 2,
      "no-undefined": 0,
      "no-unused-vars": 0,
      "no-use-before-define": 0,
      "init-declarations": 2,
      indent: [2, 4, { SwitchCase: 1 }],
      "brace-style": 0,
      camelcase: 0,
      "comma-spacing": [1, { before: false, after: true }],
      "comma-style": [1, "last"],
      "consistent-this": [1, "_this"],
      "eol-last": 0,
      "func-names": 0,
      "func-style": 0,
      "key-spacing": [1, { beforeColon: false, afterColon: true }],
      "max-nested-callbacks": [1, 5],
      "new-cap": [1, { newIsCap: true, capIsNew: false }],
      "new-parens": 1,
      "newline-after-var": 0,
      "no-array-constructor": 1,
      "no-inline-comments": 0,
      "no-lonely-if": 1,
      "no-mixed-spaces-and-tabs": 1,
      "no-multiple-empty-lines": [1, { max: 2 }],
      "no-nested-ternary": 0,
      "no-new-object": 1,
      "no-spaced-func": 1,
      "no-unneeded-ternary": 2,
      "no-trailing-spaces": 2,
      "no-underscore-dangle": 0,
      "one-var": [0, "never"],
      "operator-assignment": [1, "never"],
      "padded-blocks": [2, "never"],
      "quote-props": [1, "as-needed"],
      quotes: [2, "double"],
      semi: [2, "always"],
      "semi-spacing": [1, { before: false, after: true }],
      "keyword-spacing": [1],
      "space-before-blocks": [1, "always"],
      "space-before-function-paren": [0],
      "object-curly-spacing": [2, "always"],
      "template-curly-spacing": ["error", "always"],
      "array-bracket-spacing": [0],
      "space-in-parens": [1, "never"],
      "space-infix-ops": 0,
      "space-unary-ops": [1, { words: true, nonwords: false }],
      "spaced-comment": [1, "always"],
      "wrap-regex": 0,
      "no-var": 2,
      "generator-star-spacing": [2, "before"],
      "max-depth": [2, 3],
      "max-len": [0, 180, 2],
      "max-params": [0],
      "max-statements": 0,
      "no-bitwise": 0,
      "no-plusplus": 0,
      "react/display-name": 0,
      "jsx-quotes": [2, "prefer-double"],
      "react/jsx-curly-spacing": [2, { when: "always", allowMultiline: false, children: true }],
      "react/jsx-no-undef": 2,
      "react/jsx-sort-props": 0,
      "react/sort-comp": [2, { order: ["constructor", "lifecycle", "everything-else", "render"] }],
      "react/jsx-uses-react": 2,
      "react/jsx-uses-vars": 2,
      "react/no-did-mount-set-state": 0,
      "react/no-did-update-set-state": 1,
      "react/no-multi-comp": 0,
      "react/no-unknown-property": 2,
      "react/prop-types": 2,
      "react/self-closing-comp": 2,
      "react/jsx-wrap-multilines": 2,
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_"
        }
      ],
      "import/order": [
        "warn",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            "parent",
            ["sibling", "index"],
            "type"
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before"
            },
            {
              pattern: "@sglk/**",
              group: "internal",
              position: "after"
            }
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          },
          "newlines-between": "always",
          warnOnUnassignedImports: true
        }
      ]
    }
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser
    },
    rules: {
      "no-unused-expressions": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-var-requires": "off",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/prop-types": "off"
    }
  }
];
