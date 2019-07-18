import "golden-layout/src/less/goldenlayout-base.less";
import "golden-layout/src/less/goldenlayout-dark-theme.less";
import { jQuery } from "./jquery";
import GoldenLayout = require("golden-layout");

const localStorageKeyForLayoutState = "layoutState";

const savedLayoutState = localStorage.getItem(localStorageKeyForLayoutState);

let layoutConfig: GoldenLayout.Config;

if (savedLayoutState) {
  layoutConfig = JSON.parse(savedLayoutState);
} else {
  layoutConfig = { content: [{ type: "column" }] };
}

export let layout = new GoldenLayout(layoutConfig, jQuery("body"));

layout.init();

layout.on("stateChanged", () => {
  const state = JSON.stringify(layout.toConfig());
  localStorage.setItem(localStorageKeyForLayoutState, state);
});

export const addToLayout = (componentConfig: GoldenLayout.ComponentConfig) => {
  layout.on("initialised", () => {
    const hasNotYetBeenAdded =
      layout.root.contentItems[0].getComponentsByName(
        componentConfig.componentName
      ).length === 0;

    if (hasNotYetBeenAdded) {
      layout.root.contentItems[0].addChild(componentConfig);
    }
  });
};
