import { ServerToClientEvent } from "../../common/enum/ServerToClientEvent";
import { io } from "../instances/io";
import { registerCommand } from "../instances/commandsRegistry";

registerCommand({
  name: "Sleep",
  description: "Sleeps to rest.",
  matchers: [/^sleep$/i],
  action: () => {
    io.emit(ServerToClientEvent.AppendToEventsPanel, "You start sleeping.");
  }
});
