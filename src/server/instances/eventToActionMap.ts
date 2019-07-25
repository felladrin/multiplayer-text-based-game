import { ClientToServerEvent } from "../../shared/enum/ClientToServerEvent";
import { Socket } from "socket.io";
import { Command, CommandParams } from "../../shared/types/Command";
import { doForEachAvailableCommand } from "./commandsRegistry";
import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";

export const eventToActionMap: Record<ClientToServerEvent, Function> = {
  ExecuteCommand: (socket: Socket, data: string) => {
    let commandFound: Command | undefined;
    let commandParams: CommandParams = {};

    doForEachAvailableCommand(command => {
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
        ServerToClientEvent.AppendToEventsPanel,
        `Command not found. Type 'help' to see the list of commands available.`
      );
    }
  }
};
