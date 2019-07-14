import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { io } from "../instances/io";
import { registerCommand } from "../instances/commandsRegistry";

registerCommand({
  name: "Get",
  description: "Get something from the room.",
  matchers: [/^get (?<what>[A-Za-z]+) (?<where>[A-Za-z]+)$/i],
  action: (socket, params) => {
    io.emit(
      ServerToClientEvent.AppendToEventsPanel,
      `${socket.id} gets ${params.what} from ${params.where}.`
    );
  }
});
