import { Socket } from "socket.io";
import { PlayableCharacter } from "./characters/PlayableCharacter";

export abstract class ConnectedPlayers {
  private static list: PlayableCharacter[] = [];

  static register(player: PlayableCharacter) {
    ConnectedPlayers.list.push(player);
  }

  static removeByName(name: String) {
    const playerIndexToRemove = ConnectedPlayers.list.findIndex(
      player => player.name == name
    );
    ConnectedPlayers.list.splice(playerIndexToRemove, 1);
  }

  static removeBySocket(socket: Socket) {
    const playerIndexToRemove = ConnectedPlayers.list.findIndex(
      player => player.socket == socket
    );
    ConnectedPlayers.list.splice(playerIndexToRemove, 1);
  }

  static findBySocket(socket: Socket) {
    return ConnectedPlayers.list.find(player => player.socket == socket);
  }

  static forEach(
    callback: (
      value: PlayableCharacter,
      index: number,
      array: PlayableCharacter[]
    ) => void
  ) {
    ConnectedPlayers.list.forEach(callback);
  }
}
