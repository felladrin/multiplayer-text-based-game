import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { io } from "../instances/io";
import { registerCommand } from "../instances/commandsRegistry";
import { findOnlinePlayerBySocket } from "../instances/playersOnlineList";

registerCommand({
  name: "Smile To Someone",
  description: "Smile to someone in the room.",
  matchers: [/^smile to (?<who>[A-Za-z]+)$/i, /^smile (?<who>[A-Za-z]+)$/i],
  action: (socket, params) => {
    const onlinePlayer = findOnlinePlayerBySocket(socket);
    if (onlinePlayer == null) return;
    io.emit(
      ServerToClientEvent.AppendToEventsPanel,
      `${onlinePlayer.nickname} smiles to ${params.who}.`
    );
  }
});
