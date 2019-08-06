import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { Commands } from "../../shared/classes/commands/Commands";
import { ConnectedPlayers } from "../../shared/classes/ConnectedPlayers";
import { Command } from "../../shared/classes/commands/Command";
import { Direction } from "../../shared/enum/Direction";
import { Room } from "../../shared/classes/rooms/Room";
import { upperCaseFirst } from "change-case";

Commands.register(
  new Command(
    "Go",
    "Go to some direction.",
    [/^go to (?<direction>[A-Za-z]+)$/i, /^go (?<direction>[A-Za-z]+)$/i],
    (socket, params): void => {
      const player = ConnectedPlayers.findBySocket(socket);

      if (player == null) return;

      const goTo = <Direction>upperCaseFirst(params.direction);

      if (!player.room.exits[goTo]) {
        socket.emit(ServerToClientEvent.print, `You can't go to ${goTo}.`);
        return;
      }

      player.room = <Room>player.room.exits[goTo];

      socket.emit(ServerToClientEvent.print, `You go to ${goTo}.`);

      const exits = [];

      for (const direction in Direction) {
        const directionExit = player.room.exits[<Direction>direction];
        if (directionExit === null) continue;
        exits.push(`${directionExit.name} at ${direction}`);
      }

      socket.emit(
        ServerToClientEvent.print,
        `<strong>${player.room.name}</strong><br/>
        ${player.room.description}<br/>
        Exits: ${exits.join(", ")}.`
      );
    }
  )
);
