const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/users", usersRouter);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
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

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`WebSocket server is running on ws://localhost:${port}`);
});
