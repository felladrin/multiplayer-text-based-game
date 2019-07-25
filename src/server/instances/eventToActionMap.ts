import { ClientToServerEvent } from "../../shared/enum/ClientToServerEvent";
import { Socket } from "socket.io";
import { Command, CommandParams } from "../../shared/types/Command";
import { doForEachAvailableCommand } from "./commandsRegistry";
import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { findOnlinePlayerBySocket } from "./playersOnlineList";
import { io } from "./io";

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
  },
  disconnect: (socket: Socket) => {
    const onlinePlayer = findOnlinePlayerBySocket(socket);
    if (onlinePlayer) {
      io.emit(
        ServerToClientEvent.AppendToEventsPanel,
        `${onlinePlayer.nickname} has left the game.`
      );
    }
  }
};
