import { Direction } from "../../enum/Direction";
import { Item } from "../Item";
import { Character } from "../characters/Character";

export class Room {
  public name: string;
  public description: string;
  public exits: Record<Direction, Room | null>;
  public readonly creatures: Character[];
  public readonly items: Item[];

  public constructor(
    name: string,
    description: string,
    exits: Record<Direction, Room | null>
  ) {
    this.name = name;
    this.description = description;
    this.exits = exits;
    this.creatures = [];
    this.items = [];

    this.relinkUndefinedExitsFromOppositeRooms();
  }

  private relinkUndefinedExitsFromOppositeRooms(): void {
    for (const exitDirection in this.exits) {
      const oppositeRoom = this.exits[exitDirection as Direction];

      if (!oppositeRoom) continue;

      const oppositeDirection = Room.findOppositeDirection(
        exitDirection as Direction
      );

      if (typeof oppositeRoom.exits[oppositeDirection] === "undefined") {
        oppositeRoom.exits[oppositeDirection] = this;
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
