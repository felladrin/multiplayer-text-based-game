import { KeyOfFilteredByType } from "../../types/KeyOfFilteredByType";
import { Command } from "./Command";

export abstract class Commands {
  private static list: Command[] = [];

  static register = (command: Command) => {
    Commands.list.push(command);
    Commands.sortByStringProperty(Commands.list, "name");
  };

  static forEach = (
    callback: (value: Command, index: number, array: Command[]) => void
  ) => Commands.list.forEach(callback);

  private static sortByStringProperty = (
    commands: Command[],
    property: KeyOfFilteredByType<Command, string>
  ) => {
    commands.sort((a, b) => {
      let propertyFromA = a[property].toUpperCase();
      let propertyFromB = b[property].toUpperCase();
      if (propertyFromA < propertyFromB) return -1;
      if (propertyFromA > propertyFromB) return 1;
      return 0;
    });
  };
}
