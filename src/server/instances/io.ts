import SocketIo from "socket.io";
import { http } from "./http";
import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { eventToActionMap } from "./eventToActionMap";
import { ClientToServerEvent } from "../../shared/enum/ClientToServerEvent";

export const io = SocketIo(http);

io.on("connection", socket => {
  io.emit(ServerToClientEvent.AppendToEventsPanel, `${socket.id} has joined!`);

  Object.keys(eventToActionMap).forEach(clientToServerEvent => {
    socket.on(clientToServerEvent, data => {
      eventToActionMap[clientToServerEvent as ClientToServerEvent](
        socket,
        data
      );
    });
  });
});
