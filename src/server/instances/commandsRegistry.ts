import { Command } from "../../common/types/Command";

const commandsRegistry: Command[] = [];

export const registerCommand = (command: Command) => {
  commandsRegistry.push(command);
  commandsRegistry.sort((a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
};

export const doForEachAvailableCommand = (
  callbackfn: (value: Command, index: number, array: Command[]) => void
) => commandsRegistry.forEach(callbackfn);
