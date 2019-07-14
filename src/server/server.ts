import * as express from "express";
import { ServerToClientEvent } from "../common/enum/ServerToClientEvent";
import { io } from "./instances/io";
import { http } from "./instances/http";
import { join } from "path";
import { app } from "./instances/app";
import { eventToActionMap } from "./instances/eventToActionMap";

require("require-all")({
  dirname: __dirname.concat("/commands"),
  filter: new RegExp(`(.*)\\.${__filename.split(".").pop()}$`)
});

io.on("connection", socket => {
  io.emit(ServerToClientEvent.AppendToEventsPanel, `${socket.id} has joined!`);

  Object.keys(eventToActionMap).forEach(clientToServerEvent => {
    socket.on(clientToServerEvent, data => {
      eventToActionMap[clientToServerEvent](socket, data);
    });
  });
});

app.use(express.static(join(__dirname, "..", "..", "dist")));

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
