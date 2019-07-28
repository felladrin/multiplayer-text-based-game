import { Key } from "ts-key-enum";
import { ClientToServerEvent } from "../../shared/enum/ClientToServerEvent";
import { socket } from "./socket";
import AutoGrow from "textarea-autogrow";

export const commandTextarea = document.getElementById(
  "command"
) as HTMLTextAreaElement;

new AutoGrow(commandTextarea, 5);

commandTextarea.addEventListener("keypress", (event: KeyboardEvent) => {
  if (event.key !== Key.Enter) return;
  event.preventDefault();
  const command = commandTextarea.value.trim();
  if (command.length) socket.emit(ClientToServerEvent.executeCommand, command);
  commandTextarea.value = "";
});
