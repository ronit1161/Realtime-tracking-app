const express = require ('express');
const app = express();
const path = require('path')

const http = require('http');

const server = http.createServer(app);
const io = require('socket.io')(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));



app.get("/", (req, res) => {
    res.render("index");
});

io.on('connection', (socket) => {

    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data });
    })
    console.log('A user connected');
    
    // Handle disconnection event
    socket.on('disconnect', () => {
        io.emit("user-disconnected", socket.id)
      console.log('User disconnected');
    });
  });

server.listen(3000, () => {
    console.log("App is running")
});