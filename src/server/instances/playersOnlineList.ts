import { Socket } from "socket.io";
import { OnlinePlayer } from "../../shared/types/OnlinePlayer";

const playersOnlineList: OnlinePlayer[] = [];

export const addOnlinePlayer = (player: OnlinePlayer) => {
  playersOnlineList.push(player);
};

export const removeOnlinePlayerByName = (name: String) => {
  const playerIndexToRemove = playersOnlineList.findIndex(
    player => player.nickname == name
  );
  playersOnlineList.splice(playerIndexToRemove, 1);
};

export const removeOnlinePlayerBySocket = (socket: Socket) => {
  const playerIndexToRemove = playersOnlineList.findIndex(
    player => player.socket == socket
  );
  playersOnlineList.splice(playerIndexToRemove, 1);
};

export const findOnlinePlayerBySocket = (socket: Socket) => {
  return playersOnlineList.find(player => player.socket == socket);
};

export const doForEachOnlinePlayer = (
  callback: (value: OnlinePlayer, index: number, array: OnlinePlayer[]) => void
) => playersOnlineList.forEach(callback);
