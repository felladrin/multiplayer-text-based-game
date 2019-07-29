import { Socket } from "socket.io";

export class Command {
  public name: string;
  public description: string;
  public matchers: RegExp[];
  public action: (socket: Socket, params: Record<string, string>) => void;

  public constructor(
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
