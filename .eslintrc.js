module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
    },
    "parserOptions": {
        "ecmaVersion": 6
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            4
        ],
        "no-multi-spaces": [
            "error"
        ],
        "no-unused-vars": [
            "error"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single",
            { "avoidEscape": true }
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};