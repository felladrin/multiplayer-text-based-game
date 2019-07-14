import { ServerToClientEvent } from "../../common/enum/ServerToClientEvent";
import { io } from "../instances/io";
import { registerCommand } from "../instances/commandsRegistry";

registerCommand({
  name: "Say",
  description: "Say something to everyone in the room.",
  matchers: [/^say (?<what>.*)$/i],
  action: (socket, params) => {
    io.emit(
      ServerToClientEvent.AppendToEventsPanel,
      `${socket.id} says: ${params.what}`
    );
  }
});
