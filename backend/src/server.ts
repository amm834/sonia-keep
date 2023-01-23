import express, { Express } from "express";

const server: Express = express();

server.get("/", (req, res) => {
  res.send("Hello World");
});

export default server;
