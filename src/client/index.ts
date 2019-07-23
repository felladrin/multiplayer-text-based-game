import "normalize.css";
import "./index.scss";
import AutoGrow from "textarea-autogrow";
import { Key } from "ts-key-enum";
import { ClientToServerEvent } from "../shared/enum/ClientToServerEvent";
import { ServerToClientEvent } from "../shared/enum/ServerToClientEvent";
import { connect } from "socket.io-client";

const socket = connect();
const commandTextarea = document.getElementById(
  "command"
) as HTMLTextAreaElement;
const outputDiv = document.getElementById("output") as HTMLDivElement;

new AutoGrow(commandTextarea, 5);

commandTextarea.addEventListener("keypress", (event: KeyboardEvent) => {
  if (event.key !== Key.Enter) return;
  event.preventDefault();
  const command = commandTextarea.value.trim();
  if (command.length) socket.emit(ClientToServerEvent.ExecuteCommand, command);
  commandTextarea.value = "";
});

socket.on(ServerToClientEvent.AppendToEventsPanel, (event: string) => {
  const divToAppend = document.createElement("div") as HTMLDivElement;
  divToAppend.title = new Date().toString();
  divToAppend.innerHTML = event;
  outputDiv.append(divToAppend);
  if (outputDiv.children.length > 100) outputDiv.firstChild.remove();
});
