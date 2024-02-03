module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential",
    ],
    "overrides": [
        {
            "env": {
                "node": true,
            },
            "files": [
                ".eslintrc.{js,cjs}",
            ],
            "parserOptions": {
                "sourceType": "script",
            },
        },
    ],
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "parser": {
            "ts": "@typescript-eslint/parser",
            "<template>": "espree",
        },
    },
    "plugins": [
        "@typescript-eslint",
        "vue",
    ],
    "rules": {
        "vue/multi-word-component-names": 0,
        "@typescript-eslint/no-explicit-any": ["error"],
    },
    "globals": {
        "Product": true,
        "MenuType": true,
        "MenuParamsSearch": true,
        "OptionParent": true,
        "KeyTypeData": true,
        "Res": true,
        "KeyDataType": true,
        "Computer": true,
        "Account": true,
    },
}
