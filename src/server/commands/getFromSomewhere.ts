import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { socketIo } from "../instances/socketIo";
import { Commands } from "../../shared/classes/commands/Commands";
import { ConnectedPlayers } from "../../shared/classes/ConnectedPlayers";
import { Command } from "../../shared/classes/commands/Command";

Commands.register(
  new Command(
    "Get Something From Somewhere",
    "Get something from the somewhere.",
    [/^get (?<what>[A-Za-z]+) (?<where>[A-Za-z]+)$/i],
    (socket, params): void => {
      const player = ConnectedPlayers.findBySocket(socket);
      if (player == null) return;
      socketIo.emit(
        ServerToClientEvent.print,
        `${player.name} gets ${params.what} from ${params.where}.`
      );
    }
  )
);
