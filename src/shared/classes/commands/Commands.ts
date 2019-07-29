import { KeyOfFilteredByType } from "../../types/KeyOfFilteredByType";
import { Command } from "./Command";

export abstract class Commands {
  private static list: Command[] = [];

  public static register = (command: Command): void => {
    Commands.list.push(command);
    Commands.sortByStringProperty(Commands.list, "name");
  };

  public static forEach = (
    callback: (value: Command, index: number, array: Command[]) => void
  ): void => Commands.list.forEach(callback);

  private static sortByStringProperty = (
    commands: Command[],
    property: KeyOfFilteredByType<Command, string>
  ): void => {
    commands.sort((a, b): number => {
      let propertyFromA = a[property].toUpperCase();
      let propertyFromB = b[property].toUpperCase();
      if (propertyFromA < propertyFromB) return -1;
      if (propertyFromA > propertyFromB) return 1;
      return 0;
    });
  };
}
