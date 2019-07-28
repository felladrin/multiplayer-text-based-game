import { connect } from "socket.io-client";
import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { outputDiv } from "./outputDiv";

export const socket = connect();

socket.on(ServerToClientEvent.print, (event: string) => {
  const isScrollAtBottom =
    Math.floor(outputDiv.scrollHeight - outputDiv.scrollTop) ===
    outputDiv.clientHeight;
  const divToAppend = document.createElement("div") as HTMLDivElement;
  divToAppend.title = new Date().toString();
  divToAppend.innerHTML = event;
  outputDiv.append(divToAppend);
  if (outputDiv.children.length > 100) outputDiv.firstChild.remove();
  if (isScrollAtBottom) outputDiv.scrollTo(0, outputDiv.scrollHeight);
});
