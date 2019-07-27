const filter = new RegExp(`(.*)\\.${__filename.split(".").pop()}$`);

require("require-all")({ dirname: __dirname.concat("/commands"), filter });
require("require-all")({
  dirname: __dirname.concat("/clientToServerEventHandlers"),
  filter
});
