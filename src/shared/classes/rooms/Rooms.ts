import { Room } from "./Room";
import { Direction } from "../../enum/Direction";

export abstract class Rooms {
  private static list: Room[] = [];

  static register(room: Room) {
    Rooms.list.push(room);
    Rooms.relinkUndefinedRoomExits(room);
  }

  static forEach = (
    callback: (value: Room, index: number, array: Room[]) => void
  ) => Rooms.list.forEach(callback);

  static relinkUndefinedRoomExits(room: Room) {
    for (const exitDirection in room.exits) {
      const exitRoom = room.exits[exitDirection as Direction];

      if (!exitRoom) continue;

      const oppositeDirection = Rooms.findOppositeDirection(
        exitDirection as Direction
      );

      if (typeof exitRoom.exits[oppositeDirection] === "undefined") {
        exitRoom.exits[oppositeDirection] = room;
      }
    }
  }

  private static findOppositeDirection(exitDirection: Direction): Direction {
    switch (exitDirection) {
      case Direction.North:
        return Direction.South;
      case Direction.Northeast:
        return Direction.Southwest;
      case Direction.East:
        return Direction.West;
      case Direction.Southeast:
        return Direction.Northwest;
      case Direction.South:
        return Direction.North;
      case Direction.Southwest:
        return Direction.Northeast;
      case Direction.West:
        return Direction.East;
      case Direction.Northwest:
        return Direction.Southeast;
    }
  }
}
