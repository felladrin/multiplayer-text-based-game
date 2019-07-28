import { ClientToServerEventHandlers } from "../../shared/classes/ClientToServerEventHandlers";
import { ClientToServerEvent } from "../../shared/enum/ClientToServerEvent";
import { Socket } from "socket.io";
import { Commands } from "../../shared/classes/commands/Commands";
import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { Command } from "../../shared/classes/commands/Command";

ClientToServerEventHandlers.register(
  ClientToServerEvent.executeCommand,
  (socket: Socket, data: string) => {
    let commandFound: Command | undefined;
    let commandParams: Record<string, string> = {};

    Commands.forEach(command => {
      if (commandFound) return;

      command.matchers.forEach(matcher => {
        const match = data.trim().match(matcher);
        if (match) {
          commandFound = command;
          commandParams = match.groups || {};
        }
      });
    });

    if (commandFound) {
      commandFound.action(socket, commandParams);
    } else {
      socket.emit(
        ServerToClientEvent.print,
        `Command not found. Type 'help' to see the list of commands available.`
      );
    }
  }
);
