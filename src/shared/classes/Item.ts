import { Room } from "./rooms/Room";
import { Character } from "./characters/Character";

export abstract class Item {
  public name: string;
  public description: string;
  public weight: number;
  public parent: Room | Character;

  protected constructor(name: string, parent: Room | Character) {
    this.name = name;
    this.description = "";
    this.weight = 1;
    this.parent = parent;
  }
}
