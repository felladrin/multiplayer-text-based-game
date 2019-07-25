import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { io } from "../instances/io";
import { registerCommand } from "../instances/commandsRegistry";
import { addOnlinePlayer } from "../instances/playersOnlineList";

registerCommand({
  name: "Join As",
  description: "Join the game with an specific nickname.",
  matchers: [/^join as (?<nickname>.*)$/i],
  action: (socket, params) => {
    addOnlinePlayer({ nickname: params.nickname, socket });
    io.emit(
      ServerToClientEvent.AppendToEventsPanel,
      `${params.nickname} has joined the game!`
    );
  }
});
