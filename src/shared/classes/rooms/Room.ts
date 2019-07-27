import { Direction } from "../../enum/Direction";
import { Item } from "../Item";
import { Character } from "../characters/Character";

export class Room {
  public name: string;
  public description: string;
  public exits: Record<Direction, Room | null>;
  public readonly creatures: Character[];
  public readonly items: Item[];

  constructor(
    name: string,
    description: string,
    exits: Record<Direction, Room | null>
  ) {
    this.name = name;
    this.description = description;
    this.exits = exits;
    this.creatures = [];
    this.items = [];
  }
}
