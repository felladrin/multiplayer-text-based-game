import * as express from 'express';
import {ServerToClientEvent} from "../common/enum/ServerToClientEvent";
import {ClientToServerEvent} from "../common/enum/ClientToServerEvent";
import {Socket} from "socket.io";
import {ClientCommand} from "../common/enum/ClientCommand";
import {io} from "./instances/io";
import {http} from "./instances/http";
import {join} from "path";
import {app} from "./instances/app";

const commandToFunctionMap:Record<ClientCommand, (socket:Socket, commandArguments:string) => void> = {
    Say: (socket:Socket, commandArguments:string) => {
        io.emit(ServerToClientEvent.AppendToEventsPanel, `${socket.id} says: ${commandArguments}`);
    },
    Smile: (socket:Socket, commandArguments:string) => {
        const match = commandArguments.match(/(?<to>[A-Za-z]+)/);
        let divToAppend = '';

        if (match) {
            divToAppend = `${socket.id} smiles to ${match.groups.to}.`;
        } else {
            divToAppend = `${socket.id} smiles.`;
        }

        io.emit(ServerToClientEvent.AppendToEventsPanel, divToAppend);
    },
    Get: (socket:Socket, commandArguments:string) => {
        const match1 = commandArguments.match(/(?<what>[A-Za-z]+) (?<where>[A-Za-z]+)/);
        const match2 = commandArguments.match(/(?<what>[A-Za-z]+)/);
        let divToAppend = '';

        if (match1) {
            divToAppend = `${socket.id} gets ${match1.groups.what} from ${match1.groups.where}.`;
        } else if (match2) {
            divToAppend = `${socket.id} gets ${match2.groups.what}.`;
        } else {
            divToAppend = 'Get what!?';
        }

        io.emit(ServerToClientEvent.AppendToEventsPanel, divToAppend);
    },
    Sleep: () => {
        io.emit(ServerToClientEvent.AppendToEventsPanel, 'You start sleeping.');
    }
};

const eventToActionMap:Record<ClientToServerEvent, Function> = {
    ExecuteCommand: (socket:Socket, data:string) => {
        const commandAsArray = data.trim().split(/ +/);
        const [command, ...commandArguments] = commandAsArray;
        const commandFound = Object.keys(commandToFunctionMap).find(currentCommand => currentCommand.toLowerCase() === command.toLowerCase());
        if (!commandFound) {
            socket.emit(ServerToClientEvent.AppendToEventsPanel, `${command}: command not found.`);
            return;
        }
        commandToFunctionMap[commandFound](socket, commandArguments.join(' '));
    }
};

io.on('connection', socket => {
    io.emit(ServerToClientEvent.AppendToEventsPanel, `${socket.id} has joined!`);
    Object.keys(eventToActionMap).forEach(clientToServerEvent => {
        socket.on(clientToServerEvent, data => {
            eventToActionMap[clientToServerEvent](socket, data);
        });
    });
});

app.use(express.static(join(__dirname, '..', '..', 'dist')));

const port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log('listening on *:' + port);
});