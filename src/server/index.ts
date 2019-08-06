const currentFileExtension = __filename.split(".").pop();
const filter = new RegExp(`(.*)\\.${currentFileExtension}$`);

require("require-all")({ dirname: __dirname.concat("/commands"), filter });
require("require-all")({
  dirname: __dirname.concat("/clientToServerEventHandlers"),
  filter
});
