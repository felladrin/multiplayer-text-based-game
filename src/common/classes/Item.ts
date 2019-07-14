export abstract class Item {
  public name: string;
  public description: string;
  public weight: number;

  constructor(name: string) {
    this.name = name;
  }
}
