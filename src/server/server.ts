import express = require('express');
import {createServer} from "http";
import * as SocketIo from 'socket.io';
import {join} from "path";

import {ServerToClientEvent} from "../common/enum/ServerToClientEvent";
import {ClientToServerEvent} from "../common/enum/ClientToServerEvent";
import {Socket} from "socket.io";
import {ClientCommands} from "../common/enum/ClientCommands";

const app = express();
const http = createServer(app);
const io = SocketIo(http);
const port = process.env.PORT || 3000;

const commandToFunctionMap:Record<ClientCommands, (socket:Socket, commandArguments:string[]) => void> = {
    Say: (socket:Socket, commandArguments:string[]) => {
        io.emit(ServerToClientEvent.AppendToEventsPanel, `<div>${socket.id} says: ${commandArguments.join(' ')}</div>`);
    },
    Smile: (socket:Socket) => {
        io.emit(ServerToClientEvent.AppendToEventsPanel, `<div>${socket.id} smiles.</div>`);
    },
    SmileTo: (socket:Socket, commandArguments:string[]) => {
        const [to] = commandArguments;

        if (to) {
            io.emit(ServerToClientEvent.AppendToEventsPanel, `<div>${socket.id} smiles to ${to}.</div>`);
        } else {
            io.emit(ServerToClientEvent.AppendToEventsPanel, `<div>Smile to who?</div>`);
        }
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
        commandToFunctionMap[commandFound](socket, commandArguments);
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