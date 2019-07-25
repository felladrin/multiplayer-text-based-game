import { Socket } from "socket.io";

export type OnlinePlayer = {
  nickname: string;
  socket: Socket;
};
