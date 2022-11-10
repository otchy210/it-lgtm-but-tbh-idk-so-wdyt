module.exports = {
    "env": {
        "es2022": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json"
    },
    "plugins": [
        "@typescript-eslint", "import", "unused-imports"
    ],
    "ignorePatterns": ["**/*.json", "**/*.html", "**/*.txt"],
    "rules": {
        "no-case-declarations": "off",
        "prettier/prettier": ["error", {
            "tabWidth": 4,
            "singleQuote": true,
            "printWidth": 160,
        }],
        "import/order": [
            "error",
            {
                "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
                "newlines-between": "never",
                "alphabetize": { "order": "asc", "caseInsensitive": true },
            }
        ],
        "unused-imports/no-unused-imports": "error"
    }
};