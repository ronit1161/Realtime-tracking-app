const express = require ('express');
const app = express();
const path = require('path')

const http = require('http');

const socketio = require ('socket.io');
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log("connected")
});

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log("App is running")
});