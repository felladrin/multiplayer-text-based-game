import "golden-layout/src/less/goldenlayout-base.less";
import "golden-layout/src/less/goldenlayout-dark-theme.less";
import { jQuery } from "./jquery";
import GoldenLayout = require("golden-layout");

export const layout = new GoldenLayout(
  { content: [{ type: "column" }] },
  jQuery("body")
);

layout.init();
