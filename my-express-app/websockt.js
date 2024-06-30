const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");

const server = new WebSocket.Server({ port: 8765 });

server.on("connection", (ws) => {
  ws.on("message", (message) => {
    if (typeof message === "string") {
      console.log(message);
    } else {
      const outputPath = path.join(__dirname, "output", "output.raw");
      fs.appendFile(outputPath, message, (err) => {
        if (err) throw err;
        console.log("wrote message");
      });
    }
  });
});

console.log("WebSocket server is running on ws://0.0.0.0:8765");
