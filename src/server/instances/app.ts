import express = require("express");

export const app = express();

app.use(express.static(__dirname.concat("/../../../build/client")));
