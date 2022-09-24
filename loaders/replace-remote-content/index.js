module.exports = function (code) {
  const callback = this.async();
  const options = this.getOptions();
  // Note that `import()` caches, so this should be fast enough.
  import("./main.mjs").then((module) =>
    module.loader.call(this, code, callback, options)
  );
};
