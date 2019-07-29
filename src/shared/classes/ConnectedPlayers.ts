import { Socket } from "socket.io";
import { PlayableCharacter } from "./characters/PlayableCharacter";

export abstract class ConnectedPlayers {
  private static list: PlayableCharacter[] = [];

  public static register(player: PlayableCharacter): void {
    ConnectedPlayers.list.push(player);
  }

  public static removeByName(name: string): void {
    const playerIndexToRemove = ConnectedPlayers.list.findIndex(
      (player): unknown => player.name == name
    );
    ConnectedPlayers.list.splice(playerIndexToRemove, 1);
  }

  public static removeBySocket(socket: Socket): void {
    const playerIndexToRemove = ConnectedPlayers.list.findIndex(
      (player): unknown => player.socket == socket
    );
    ConnectedPlayers.list.splice(playerIndexToRemove, 1);
  }

  public static findBySocket(socket: Socket): PlayableCharacter | undefined {
    return ConnectedPlayers.list.find(
      (player): unknown => player.socket == socket
    );
  }

  public static forEach(
    callback: (
      value: PlayableCharacter,
      index: number,
      array: PlayableCharacter[]
    ) => void
  ): void {
    ConnectedPlayers.list.forEach(callback);
  }
}
