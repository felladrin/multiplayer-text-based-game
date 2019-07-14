import SocketIo = require("socket.io");
import { http } from "./http";
import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { eventToActionMap } from "./eventToActionMap";

export const io = SocketIo(http);

io.on("connection", socket => {
  io.emit(ServerToClientEvent.AppendToEventsPanel, `${socket.id} has joined!`);

  Object.keys(eventToActionMap).forEach(clientToServerEvent => {
    socket.on(clientToServerEvent, data => {
      eventToActionMap[clientToServerEvent](socket, data);
    });
  });
});
