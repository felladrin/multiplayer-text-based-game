import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { io } from "../instances/io";
import { registerCommand } from "../instances/commandsRegistry";
import { findOnlinePlayerBySocket } from "../instances/playersOnlineList";

registerCommand({
  name: "Sleep",
  description: "Sleeps to rest.",
  matchers: [/^sleep$/i],
  action: socket => {
    const onlinePlayer = findOnlinePlayerBySocket(socket);
    if (onlinePlayer == null) return;
    io.emit(
      ServerToClientEvent.AppendToEventsPanel,
      `${onlinePlayer.nickname} starts sleeping.`
    );
  }
});
