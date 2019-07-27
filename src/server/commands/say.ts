import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { socketIo } from "../instances/socketIo";
import { Commands } from "../../shared/classes/commands/Commands";
import { ConnectedPlayers } from "../../shared/classes/ConnectedPlayers";
import { Command } from "../../shared/classes/commands/Command";

Commands.register(
  new Command(
    "Say",
    "Say something to everyone in the room.",
    [/^say (?<what>.*)$/i],
    (socket, params) => {
      const player = ConnectedPlayers.findBySocket(socket);
      if (player == null) return;
      socketIo.emit(
        ServerToClientEvent.print,
        `${player.name} says: ${params.what}`
      );
    }
  )
);
