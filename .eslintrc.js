module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
    },
    "parserOptions": {
        "ecmaVersion": 6
    },
    "rules": {
        "indent": [
            "error",
            4
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