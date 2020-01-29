import { connect } from "socket.io-client";
import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { outputDiv } from "./outputDiv";

export const socket = connect();

socket.on(ServerToClientEvent.print, (html: string): void => {
  const isScrollAtBottom =
    Math.floor(outputDiv.scrollHeight - outputDiv.scrollTop) ===
    outputDiv.clientHeight;

  const divToAppend = document.createElement("div");
  divToAppend.title = new Date().toString();
  divToAppend.innerHTML = html;

  outputDiv.append(divToAppend);

  if (outputDiv.children.length > 100 && outputDiv.firstChild != null) {
    outputDiv.firstChild.remove();
  }

  if (isScrollAtBottom) outputDiv.scrollTo(0, outputDiv.scrollHeight);
});
