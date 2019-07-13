import {createServer} from "http";
import {app} from "./app";

export const http = createServer(app);