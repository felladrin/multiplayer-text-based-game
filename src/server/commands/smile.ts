import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { io } from "../instances/io";
import { registerCommand } from "../instances/commandsRegistry";
import { findOnlinePlayerBySocket } from "../instances/playersOnlineList";

registerCommand({
  name: "Smile",
  description: "Say something to everyone in the room.",
  matchers: [/^smile$/i],
  action: socket => {
    const onlinePlayer = findOnlinePlayerBySocket(socket);
    if (onlinePlayer == null) return;
    io.emit(
      ServerToClientEvent.AppendToEventsPanel,
      `${onlinePlayer.nickname} smiles.`
    );
  }
});
