import { ServerToClientEvent } from "../../shared/enum/ServerToClientEvent";
import { socketIo } from "../instances/socketIo";
import { Commands } from "../../shared/classes/commands/Commands";
import { ConnectedPlayers } from "../../shared/classes/ConnectedPlayers";
import { PlayableCharacter } from "../../shared/classes/characters/PlayableCharacter";
import { cityCenter } from "../rooms/cityCenter";
import { Command } from "../../shared/classes/commands/Command";
import { capitalCase } from "change-case";

Commands.register(
  new Command(
    "Join As",
    "Join the game with an specific name.",
    [/^join as (?<name>.*)$/i],
    (socket, params): void => {
      const upperCasedName = capitalCase(params.name);
      ConnectedPlayers.register(
        new PlayableCharacter(upperCasedName, cityCenter, socket)
      );
      socketIo.emit(
        ServerToClientEvent.print,
        `${upperCasedName} has joined the game!`
      );
    }
  )
);
