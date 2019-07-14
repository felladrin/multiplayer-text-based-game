import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { jQuery } from "../instances/jquery";
import { layout } from "../instances/layout";
import { socket } from "../instances/socket";
import { ComponentConfig } from "golden-layout";
import { ClientToServerEvent } from "../../shared/enum/ClientToServerEvent";

const componentConfig: ComponentConfig = {
  type: "component",
  componentName: "Events"
};

layout.registerComponent(componentConfig.componentName, container => {
  const terminalContainer = jQuery<HTMLDivElement>('<div class="eventsDiv"/>');
  jQuery(container.getElement()).append(terminalContainer);
  terminalContainer.parent().addClass("importantOverflowY");

  const removeOldEvents = () => {
    const eventsInHistory = terminalContainer.children();
    if (eventsInHistory.length > 100) eventsInHistory.first().remove();
  };

  layout.on(ClientToServerEvent.ExecuteCommand, event => {
    terminalContainer.append(
      jQuery.parseHTML(
        `<div title="${new Date()}" class="command">> ${event}</div>`
      )
    );
    removeOldEvents();
  });

  socket.on(ServerToClientEvent.AppendToEventsPanel, event => {
    terminalContainer.append(
      jQuery.parseHTML(`<div title="${new Date()}">${event}</div>`)
    );
    removeOldEvents();
  });
});

layout.on("initialised", () => {
  layout.root.contentItems[0].addChild(componentConfig);
});
