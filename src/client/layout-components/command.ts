import { ClientToServerEvent } from "../../common/enum/ClientToServerEvent";
import { jQuery } from "../instances/jquery";
import { layout } from "../instances/layout";
import { socket } from "../instances/socket";
import { ComponentConfig } from "golden-layout";

const componentConfig: ComponentConfig = {
  type: "component",
  componentName: "Command"
};

layout.registerComponent(componentConfig.componentName, container => {
  const form = jQuery<HTMLFormElement>('<form class="form"/>');
  const messageBox = jQuery<HTMLInputElement>(
    '<input class="messageBox" autocapitalize="off"/>'
  );
  const sendButton = jQuery<HTMLButtonElement>(
    '<button class="sendButton">Send</button>'
  );

  form.append(messageBox);
  form.append(sendButton);
  form.on("submit", event => {
    event.preventDefault();
    const command = messageBox
      .val()
      .toString()
      .trim();
    if (command) {
      layout.emit(ClientToServerEvent.ExecuteCommand, command);
      socket.emit(ClientToServerEvent.ExecuteCommand, command);
    }
    messageBox.val("");
  });

  jQuery(container.getElement()).append(form);
});

layout.on("initialised", () => {
  layout.root.contentItems[0].addChild(componentConfig);
});
