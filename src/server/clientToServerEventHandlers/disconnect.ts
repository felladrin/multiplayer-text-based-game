import { ClientToServerEventHandlers } from "../../shared/classes/ClientToServerEventHandlers";
import { ClientToServerEvent } from "../../shared/enum/ClientToServerEvent";
import { Socket } from "socket.io";
import { ConnectedPlayers } from "../../shared/classes/ConnectedPlayers";
import { socketIo } from "../instances/socketIo";
import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";

ClientToServerEventHandlers.register(
  ClientToServerEvent.disconnect,
  (socket: Socket): void => {
    const onlinePlayer = ConnectedPlayers.findBySocket(socket);
    if (onlinePlayer) {
      socketIo.emit(
        ServerToClientEvent.print,
        `${onlinePlayer.name} has left the game.`
      );
    }
  }
);
