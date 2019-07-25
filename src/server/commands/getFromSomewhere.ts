import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { io } from "../instances/io";
import { registerCommand } from "../instances/commandsRegistry";
import { findOnlinePlayerBySocket } from "../instances/playersOnlineList";

registerCommand({
  name: "Get",
  description: "Get something from the room.",
  matchers: [/^get (?<what>[A-Za-z]+) (?<where>[A-Za-z]+)$/i],
  action: (socket, params) => {
    const onlinePlayer = findOnlinePlayerBySocket(socket);
    if (onlinePlayer == null) return;
    io.emit(
      ServerToClientEvent.AppendToEventsPanel,
      `${onlinePlayer.nickname} gets ${params.what} from ${params.where}.`
    );
  }
});
