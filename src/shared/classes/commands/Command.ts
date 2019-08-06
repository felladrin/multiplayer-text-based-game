import { Socket } from "socket.io";

export class Command {
  public name: string;
  public description: string;
  public matchers: RegExp[];
  public action: CommandAction;

  public constructor(
    name: string,
    description: string,
    matchers: RegExp[],
    action: CommandAction
  ) {
    this.name = name;
    this.description = description;
    this.matchers = matchers;
    this.action = action;
  }
}

type CommandAction = (socket: Socket, params: Record<string, string>) => void;
