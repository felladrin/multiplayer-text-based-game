import { Socket } from "socket.io";

export class Command {
  name: string;
  description: string;
  matchers: RegExp[];
  action: (socket: Socket, params: Record<string, string>) => void;

  constructor(
    name: string,
    description: string,
    matchers: RegExp[],
    action: (socket: Socket, params: Record<string, string>) => void
  ) {
    this.name = name;
    this.description = description;
    this.matchers = matchers;
    this.action = action;
  }
}
