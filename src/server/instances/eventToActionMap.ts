import { ClientToServerEvent } from "../../common/enum/ClientToServerEvent";
import { Socket } from "socket.io";
import { Command, CommandParams } from "../../common/types/Command";
import { doForEachAvailableCommand } from "./commandsRegistry";
import { ServerToClientEvent } from "../../common/enum/ServerToClientEvent";

export const eventToActionMap: Record<ClientToServerEvent, Function> = {
  ExecuteCommand: (socket: Socket, data: string) => {
    let commandFound: Command = null;
    let commandParams: CommandParams = null;

    doForEachAvailableCommand(command => {
      if (commandFound) return;

      command.matchers.forEach(matcher => {
        const match = data.trim().match(matcher);
        if (match) {
          commandFound = command;
          commandParams = match.groups;
        }
      });
    });

    if (!commandFound) {
      socket.emit(
        ServerToClientEvent.AppendToEventsPanel,
        `Command not found.`
      );
      return;
    }

    commandFound.action(socket, commandParams);
  }
};
