import SocketIo from "socket.io";
import { http } from "./http";
import { eventToActionMap } from "./eventToActionMap";
import { ClientToServerEvent } from "../../shared/enum/ClientToServerEvent";
import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";

export const io = SocketIo(http);

io.on("connection", socket => {
  socket.emit(
    ServerToClientEvent.AppendToEventsPanel,
    "Welcome adventurer! To join the game, please type <strong><em>Join as [YourNickname]</em></strong>. For example: <strong><em>Join as John</em></strong>."
  );

  Object.keys(eventToActionMap).forEach(clientToServerEvent => {
    socket.on(clientToServerEvent, data => {
      eventToActionMap[clientToServerEvent as ClientToServerEvent](
        socket,
        data
      );
    });
  });
});
