import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { io } from "../instances/io";
import { registerCommand } from "../instances/commandsRegistry";

registerCommand({
  name: "Smile To Someone",
  description: "Smile to someone in the room.",
  matchers: [/^smile to (?<who>[A-Za-z]+)$/i, /^smile (?<who>[A-Za-z]+)$/i],
  action: (socket, params) => {
    io.emit(
      ServerToClientEvent.AppendToEventsPanel,
      `${socket.id} smiles to ${params.who}.`
    );
  }
});
