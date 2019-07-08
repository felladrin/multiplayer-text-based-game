import express = require('express');
import {createServer} from "http";
import * as SocketIo from 'socket.io';
import {join} from "path";

import {ServerToClientEvent} from "../common/enum/ServerToClientEvent";
import {ClientToServerEvent} from "../common/enum/ClientToServerEvent";
import {Socket} from "socket.io";
import {ClientCommand} from "../common/enum/ClientCommand";

const app = express();
const http = createServer(app);
const io = SocketIo(http);
const port = process.env.PORT || 3000;

const commandToFunctionMap:Record<ClientCommand, (socket:Socket, commandArguments:string) => void> = {
    Say: (socket:Socket, commandArguments:string) => {
        io.emit(ServerToClientEvent.AppendToEventsPanel, `<div>${socket.id} says: ${commandArguments}</div>`);
    },
    Smile: (socket:Socket, commandArguments:string) => {
        const match = commandArguments.match(/(?<to>[A-Za-z]+)/);
        let divToAppend = '';

        if (match) {
            divToAppend = `<div>${socket.id} smiles to ${match.groups.to}.</div>`;
        } else {
            divToAppend = `<div>${socket.id} smiles.</div>`;
        }

        io.emit(ServerToClientEvent.AppendToEventsPanel, divToAppend);
    },
    Get: (socket:Socket, commandArguments:string) => {
        const match1 = commandArguments.match(/(?<what>[A-Za-z]+) (?<where>[A-Za-z]+)/);
        const match2 = commandArguments.match(/(?<what>[A-Za-z]+)/);
        let divToAppend = '';

        if (match1) {
            divToAppend = `<div>${socket.id} gets ${match1.groups.what} from ${match1.groups.where}.</div>`;
        } else if (match2) {
            divToAppend = `<div>${socket.id} gets ${match2.groups.what}.</div>`;
        } else {
            divToAppend = `<div>Get what?</div>`;
        }

        io.emit(ServerToClientEvent.AppendToEventsPanel, divToAppend);
    },
    Sleep: () => {
        io.emit(ServerToClientEvent.AppendToEventsPanel, '<div>You start sleeping.</div>');
    }
};

const eventToActionMap:Record<ClientToServerEvent, Function> = {
    ExecuteCommand: (socket:Socket, data:string) => {
        const commandAsArray = data.trim().split(/ +/);
        const [command, ...commandArguments] = commandAsArray;
        const commandFound = Object.keys(commandToFunctionMap).find(currentCommand => currentCommand.toLowerCase() === command.toLowerCase());
        if (!commandFound) {
            socket.emit(ServerToClientEvent.AppendToEventsPanel, `<div>${command}: command not found.</div>`);
            return;
        }
        commandToFunctionMap[commandFound](socket, commandArguments.join(' '));
    }
};

app.use(express.static(join(__dirname, '..', '..', 'dist')));

io.on('connection', socket => {
    Object.keys(eventToActionMap).forEach(clientToServerEvent => {
        socket.on(clientToServerEvent, data => {
            eventToActionMap[clientToServerEvent](socket, data);
        });
    });
});

http.listen(port, () => {
    console.log('listening on *:' + port);
});