import { Room } from "./Room";

export abstract class Rooms {
  private static list: Room[] = [];

  public static register(room: Room): void {
    Rooms.list.push(room);
  }

  public static forEach = (
    callback: (value: Room, index: number, array: Room[]) => void
  ): void => Rooms.list.forEach(callback);
}
