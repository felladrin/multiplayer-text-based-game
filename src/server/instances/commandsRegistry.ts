import { Command } from "../../common/types/Command";
import { KeyOfFilteredByType } from "../../common/types/KeyOfFilteredByType";

const commandsRegistry: Command[] = [];

const sortCommandsByStringProperty = (
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

export const registerCommand = (command: Command) => {
  commandsRegistry.push(command);
  sortCommandsByStringProperty(commandsRegistry, "name");
};

export const doForEachAvailableCommand = (
  callback: (value: Command, index: number, array: Command[]) => void
) => commandsRegistry.forEach(callback);
