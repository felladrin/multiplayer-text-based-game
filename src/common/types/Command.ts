import { Socket } from "socket.io";

export type CommandParams = { [key: string]: string };

export type Command = {
  name: string;
  description: string;
  matchers: RegExp[];
  action: (socket: Socket, params?: CommandParams) => void;
};
