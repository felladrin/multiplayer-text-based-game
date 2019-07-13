import * as SocketIo from 'socket.io';
import {http} from "./http";

export const io = SocketIo(http);