import { Commands } from "../../shared/classes/commands/Commands";
import { Command } from "../../shared/classes/commands/Command";
import { socketIo } from "../instances/socketIo";
import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";

Commands.register(
  new Command("Help", "List the commands available.", [/^help$/i], (): void => {
    const commandsWithDescription: string[] = [];
    const commandsArray = Commands.toArray();

    for (let i = 0, l = commandsArray.length; i < l; i++) {
      const command = commandsArray[i];
      commandsWithDescription.push(`${command.name}: ${command.description}`);
    }

    socketIo.emit(
      ServerToClientEvent.print,
      "Commands Available:<br/>".concat(commandsWithDescription.join("<br/>"))
    );
  })
);
