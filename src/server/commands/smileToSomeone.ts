import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { socketIo } from "../instances/socketIo";
import { Commands } from "../../shared/classes/commands/Commands";
import { ConnectedPlayers } from "../../shared/classes/ConnectedPlayers";
import { Command } from "../../shared/classes/commands/Command";

Commands.register(
  new Command(
    "Smile To Someone",
    "Smile to someone in the room.",
    [/^smile to (?<who>[A-Za-z]+)$/i, /^smile (?<who>[A-Za-z]+)$/i],
    (socket, params): void => {
      const player = ConnectedPlayers.findBySocket(socket);
      if (player == null) return;
      socketIo.emit(
        ServerToClientEvent.print,
        `${player.name} smiles to ${params.who}.`
      );
    }
  )
);
