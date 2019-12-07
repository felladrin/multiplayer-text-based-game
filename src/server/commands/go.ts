import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { Commands } from "../../shared/classes/commands/Commands";
import { ConnectedPlayers } from "../../shared/classes/ConnectedPlayers";
import { Command } from "../../shared/classes/commands/Command";
import { Direction } from "../../shared/enum/Direction";
import { Room } from "../../shared/classes/rooms/Room";
import { capitalCase } from "change-case";

Commands.register(
  new Command(
    "Go",
    "Go to some direction.",
    [/^go to (?<direction>[A-Za-z]+)$/i, /^go (?<direction>[A-Za-z]+)$/i],
    (socket, params): void => {
      const player = ConnectedPlayers.findBySocket(socket);

      if (player == null) return;

      const goTo = capitalCase(params.direction) as Direction;

      if (!player.room.exits[goTo]) {
        socket.emit(ServerToClientEvent.print, `You can't go to ${goTo}.`);
        return;
      }

      player.room = player.room.exits[goTo] as Room;

      socket.emit(ServerToClientEvent.print, `You go to ${goTo}.`);

      const exits = [];

      for (const direction of Object.keys(Direction)) {
        const directionExit = player.room.exits[direction as Direction];
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
