import { ClientToServerEvent } from "../enum/ClientToServerEvent";
import { Socket } from "socket.io";

export abstract class ClientToServerEventHandlers {
  private static map: Map<
    ClientToServerEvent,
    (socket: Socket, data: string) => void
  > = new Map<ClientToServerEvent, (socket: Socket, data: string) => void>();

  public static register(
    event: ClientToServerEvent,
    handler: (socket: Socket, data: string) => void
  ): void {
    ClientToServerEventHandlers.map.set(event, handler);
  }

  public static forEach = (
    callback: (
      value: (socket: Socket, data: string) => void,
      key: ClientToServerEvent,
      map: Map<ClientToServerEvent, (socket: Socket, data: string) => void>
    ) => void
  ): void => ClientToServerEventHandlers.map.forEach(callback);
}
