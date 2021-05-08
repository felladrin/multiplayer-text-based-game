import { Socket } from "socket.io";
import { webServer } from "./webServer";
import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { ClientToServerEventHandlers } from "../../shared/classes/ClientToServerEventHandlers";

export const socketIo = require("socket.io")(webServer);

socketIo.on("connection", (socket: Socket): void => {
  socket.emit(
    ServerToClientEvent.print,
    `Welcome adventurer! To join the game, please type
    <strong><em>Join as [YourNickname]</em></strong>.
    For example: <strong><em>Join as John</em></strong>.`
  );

  ClientToServerEventHandlers.forEach((handler, clientToServerEvent): void => {
    socket.on(clientToServerEvent, (data: string): void =>
      handler(socket, data)
    );
  });
});
