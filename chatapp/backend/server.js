const express = require("express");
const dotenv = require("dotenv");
const connectionDB = require("./config/db");
const userRoutes = require("./routes/user.routes")
const chatRoutes = require("./routes/chat.routes")
const messageRoutes = require("./routes/message.routes")
const Chat = require("./models/chat.model");
const WebSocket = require("ws");

const cors = require('cors');

const app = express();
dotenv.config();
connectionDB();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    console.log("welcome to chat app");
})

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const port = process.env.PORT || 8001
const server = app.listen(port, console.log("server is running at post = ", port));

const wss = new WebSocket.Server({ server });
// const wss = new WebSocket.Server({ port: 5000 });

/**
 * Store clients:
 * {
 *   userId: ws
 * }
 */
var clients = {};

wss.on("connection", (ws) => {
  console.log("🔗 New client connected");

  // Handle messages from clients
  ws.on("message", async (data) => {
    try {
      const parsed = JSON.parse(data);

      if (parsed.type === "setup") {
        // Register user
        clients[parsed.userId] = ws;
        ws.userId = parsed.userId;
        ws.send(JSON.stringify({ type: "connected" }));
        console.log(`👤 User ${parsed.userId} setup done`);
      }

      if (parsed.type === "new_message") {
        const newMessage = parsed.message;
        const chat = await Chat.findById(newMessage.chatId).populate("users", "_id");

        if (!chat.users) return console.log("chat user not defined");

        chat.users.forEach((userId) => {
          let userIdStr = userId._id.toString();
          if (userIdStr !== newMessage.sender && clients[userIdStr]) {
            clients[userIdStr].send(
              JSON.stringify({
                type: "message_received",
                data: newMessage,
              })
            );
          }
        });
      }
    } catch (err) {
      console.error("❌ Error parsing message:", err);
    }
  });

  ws.on("close", () => {
    if (ws.userId) {
      delete clients[ws.userId];
      console.log(`❌ User ${ws.userId} disconnected`);
    }
  });
});
console.log("✅ WebSocket server running at ws://localhost:8080");

/*const io = require("socket.io")(server, {
    cors: {
        origin: [
          "http://localhost:3000", // React frontend
          // "http://127.0.0.1:8080"
        ] 
    },
    methods: ["GET", "POST"]
});

io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected")
    })

    socket.on("join chat", (room) => {
        socket.join(room)

    })

    socket.on("new message", (newMessageRec) => {
        var chat = newMessageRec.chat;
        if (!chat.users) return console.log("chat user not defined");

        chat.users.forEach(user => {
            if (user != newMessageRec.sender._id) {
                socket.in(user).emit("message received", newMessageRec);
            }
        });
    });
});*/