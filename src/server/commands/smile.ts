import {ServerToClientEvent} from "../../common/enum/ServerToClientEvent";
import {io} from "../instances/io";
import {registerCommand} from "../instances/commandsRegistry";

registerCommand({
    name: "Smile",
    description: "Say something to everyone in the room.",
    matchers: [/^smile$/i],
    action: (socket) => {
        io.emit(ServerToClientEvent.AppendToEventsPanel, `${socket.id} smiles.`);
    }
});