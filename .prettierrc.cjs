module.exports = {
  "parser": "typescript",
  "singleQuote": false,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 100,
  "bracketSpacing": true,
  "trailingComma": "all",
  "arrowParens": "always",
  "endOfLine": "auto",
  "jsxSingleQuote": false,
  "quoteProps": "as-needed",
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "html"
      }
    },
    {
      "files": "*.css",
      "options": {
        "parser": "css"
      }
    }
  ]
}
