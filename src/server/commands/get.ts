import { ServerToClientEvent } from "../../common/enum/ServerToClientEvent";
import { io } from "../instances/io";
import { registerCommand } from "../instances/commandsRegistry";

registerCommand({
  name: "Get",
  description: "Get something from the room.",
  matchers: [/^get (?<what>[A-Za-z]+)$/i],
  action: (socket, params) => {
    io.emit(
      ServerToClientEvent.AppendToEventsPanel,
      `${socket.id} gets ${params.what}.`
    );
  }
});
