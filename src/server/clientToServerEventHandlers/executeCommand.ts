import { ClientToServerEventHandlers } from "../../shared/classes/ClientToServerEventHandlers";
import { ClientToServerEvent } from "../../shared/enum/ClientToServerEvent";
import { Socket } from "socket.io";
import { Commands } from "../../shared/classes/commands/Commands";
import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";

ClientToServerEventHandlers.register(
  ClientToServerEvent.executeCommand,
  (socket: Socket, data: string): void => {
    const commandsArray = Commands.toArray();

    for (let i = 0, l = commandsArray.length; i < l; i++) {
      const command = commandsArray[i];
      const commandMatchers = command.matchers;

      for (let j = 0, m = commandMatchers.length; j < m; j++) {
        const match = data.trim().match(commandMatchers[j]);
        if (match) return command.action(socket, match.groups || {});
      }
    }

    socket.emit(
      ServerToClientEvent.print,
      `Command not found. Type 'help' to see the list of commands available.`
    );
  }
);
