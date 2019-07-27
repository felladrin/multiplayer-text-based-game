import { Room } from "../rooms/Room";

export class Character {
  public name: string;
  public description: string;
  public room: Room;

  constructor(name: string, room: Room) {
    this.name = name;
    this.description = "";
    this.room = room;
  }
}
