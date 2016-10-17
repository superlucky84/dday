module.exports = {
    "env": {
      "browser": true,
      "commonjs": true,
      "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
      "ecmaFeatures": {
        "experimentalObjectRestSpread": true,
        "jsx": true,
        "modules": true
      },
      "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "globals": {
      "__dirname": false,
      "process": true
    },
    "rules": {
      "react/jsx-uses-vars": 1,
      "react/jsx-uses-react": "error",
      "indent": [
        "error",
        2
      ],
      /*
      "linebreak-style": [
        "error",
        "unix"
      ],
      */
      "quotes": [
        "error",
        "single"
      ],
      "semi": [
        "error",
        "always"
      ]
    }
};
