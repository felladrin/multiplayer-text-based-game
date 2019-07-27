import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { socketIo } from "../instances/socketIo";
import { Commands } from "../../shared/classes/commands/Commands";
import { ConnectedPlayers } from "../../shared/classes/ConnectedPlayers";
import { PlayableCharacter } from "../../shared/classes/characters/PlayableCharacter";
import { cityCenter } from "../rooms/cityCenter";
import { Command } from "../../shared/classes/commands/Command";

Commands.register(
  new Command(
    "Join As",
    "Join the game with an specific name.",
    [/^join as (?<name>.*)$/i],
    (socket, params) => {
      ConnectedPlayers.register(
        new PlayableCharacter(params.name, cityCenter, socket)
      );
      socketIo.emit(
        ServerToClientEvent.print,
        `${params.name} has joined the game!`
      );
    }
  )
);
