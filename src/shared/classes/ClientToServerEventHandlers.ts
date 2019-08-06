import { ClientToServerEvent } from "../enum/ClientToServerEvent";
import { Socket } from "socket.io";

export abstract class ClientToServerEventHandlers {
  private static map: ClientToServerEventHandlersMap = new Map<
    ClientToServerEvent,
    ClientToServerEventHandler
  >();

  public static register(
    event: ClientToServerEvent,
    handler: ClientToServerEventHandler
  ): void {
    ClientToServerEventHandlers.map.set(event, handler);
  }

  public static forEach(
    callback: (
      value: ClientToServerEventHandler,
      key: ClientToServerEvent,
      map: ClientToServerEventHandlersMap
    ) => void
  ): void {
    ClientToServerEventHandlers.map.forEach(callback);
  }
}

type ClientToServerEventHandler = (socket: Socket, data: string) => void;

type ClientToServerEventHandlersMap = Map<
  ClientToServerEvent,
  ClientToServerEventHandler
>;
