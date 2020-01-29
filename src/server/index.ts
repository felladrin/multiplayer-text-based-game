import requireAll from "require-all";

const currentFileExtension = __filename.split(".").pop();
const filter = new RegExp(`(.*)\\.${currentFileExtension}$`);

requireAll({ dirname: __dirname.concat("/commands"), filter });
requireAll({
  dirname: __dirname.concat("/clientToServerEventHandlers"),
  filter
});
