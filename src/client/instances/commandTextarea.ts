import { Key } from "ts-key-enum";
import { ClientToServerEvent } from "../../shared/enum/ClientToServerEvent";
import { socket } from "./socket";
import AutoGrow from "textarea-autogrow";

export const commandTextarea = document.getElementById(
  "command"
) as HTMLTextAreaElement;

new AutoGrow(commandTextarea, 5);

const commandsHistory: string[] = [];
let currentIndexOnCommandsHistory = commandsHistory.length;
const clampNumber = (number, min, max): number => {
  return Math.max(min, Math.min(number, max));
};

commandTextarea.addEventListener("keypress", (event: KeyboardEvent): void => {
  if (event.key !== Key.Enter) return;
  event.preventDefault();
  const command = commandTextarea.value.trim();
  if (command.length) {
    socket.emit(ClientToServerEvent.executeCommand, command);
    const indexOfCommandInHistory = commandsHistory.indexOf(command);
    if (indexOfCommandInHistory >= 0) {
      commandsHistory.splice(indexOfCommandInHistory, 1);
    }
    commandsHistory.push(command);
    currentIndexOnCommandsHistory = commandsHistory.length;
    if (commandsHistory.length > 50) commandsHistory.shift();
  }
  commandTextarea.value = "";
});

commandTextarea.addEventListener("keyup", (event: KeyboardEvent): void => {
  if (event.key !== Key.ArrowUp && event.key !== Key.ArrowDown) return;
  event.preventDefault();
  if (event.key === Key.ArrowUp) {
    currentIndexOnCommandsHistory--;
  } else if (event.key === Key.ArrowDown) {
    currentIndexOnCommandsHistory++;
  }
  currentIndexOnCommandsHistory = clampNumber(
    currentIndexOnCommandsHistory,
    0,
    commandsHistory.length
  );
  commandTextarea.value = commandsHistory[currentIndexOnCommandsHistory] || "";
});
