import { Room } from "./Room";

export abstract class Rooms {
  private static list: Room[] = [];

  static register(room: Room) {
    Rooms.list.push(room);
  }

  static forEach = (
    callback: (value: Room, index: number, array: Room[]) => void
  ) => Rooms.list.forEach(callback);
}
