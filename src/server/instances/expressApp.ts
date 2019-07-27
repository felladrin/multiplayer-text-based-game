import express from "express";

export const expressApp = express();

expressApp.use(express.static(__dirname.concat("/../../../build/client")));
