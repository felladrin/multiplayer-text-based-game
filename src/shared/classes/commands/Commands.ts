import { KeyOfFilteredByType } from "../../types/KeyOfFilteredByType";
import { Command } from "./Command";

export abstract class Commands {
  private static array: Command[] = [];

  public static register(command: Command): void {
    Commands.array.push(command);
    Commands.sortByStringProperty(Commands.array, "name");
  }

  public static toArray(): readonly Command[] {
    return Commands.array;
  }

  private static sortByStringProperty(
    commands: Command[],
    property: KeyOfFilteredByType<Command, string>
  ): void {
    commands.sort((a, b): number => {
      const propertyFromA = a[property].toUpperCase();
      const propertyFromB = b[property].toUpperCase();
      if (propertyFromA < propertyFromB) return -1;
      if (propertyFromA > propertyFromB) return 1;
      return 0;
    });
  }
}
