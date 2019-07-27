import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { socketIo } from "../instances/socketIo";
import { Commands } from "../../shared/classes/commands/Commands";
import { ConnectedPlayers } from "../../shared/classes/ConnectedPlayers";
import { Command } from "../../shared/classes/commands/Command";

Commands.register(
  new Command(
    "Get",
    "Get something from the room.",
    [/^get (?<what>[A-Za-z]+)$/i],
    (socket, params) => {
      const player = ConnectedPlayers.findBySocket(socket);
      if (player == null) return;
      socketIo.emit(
        ServerToClientEvent.print,
        `${player.name} gets ${params.what}.`
      );
    }
  )
);
