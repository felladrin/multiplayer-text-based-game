require("require-all")({
  dirname: __dirname.concat("/commands"),
  filter: new RegExp(`(.*)\\.${__filename.split(".").pop()}$`)
});
