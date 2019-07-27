import { Socket } from "socket.io";
import { Character } from "./Character";
import { Room } from "../rooms/Room";

export class PlayableCharacter extends Character {
  public socket: Socket;

  constructor(name: string, room: Room, socket: Socket) {
    super(name, room);
    this.socket = socket;
  }
}
