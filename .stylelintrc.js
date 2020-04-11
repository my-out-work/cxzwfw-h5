module.exports = {
  "ignoreFiles": ["**/*.js", "**/fonts/**"],
  "extends": ["stylelint-config-standard", "stylelint-config-recess-order"],
  "plugins": ["stylelint-order"],
  "rules": {
    "selector-pseudo-class-no-unknown": null,
    "unit-case":null,
    "no-descending-specificity":null
  }
}
