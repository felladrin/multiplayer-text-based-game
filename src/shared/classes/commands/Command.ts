import { Socket } from "socket.io";
import { CommandParams } from "../../types/CommandParams";

export class Command {
  name: string;
  description: string;
  matchers: RegExp[];
  action: (socket: Socket, params: CommandParams) => void;

  constructor(
    name: string,
    description: string,
    matchers: RegExp[],
    action: (socket: Socket, params: CommandParams) => void
  ) {
    this.name = name;
    this.description = description;
    this.matchers = matchers;
    this.action = action;
  }
}
