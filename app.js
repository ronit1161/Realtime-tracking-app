const express = require('express');
const app = express();
const path = require('path');
const http = require('http');  // Import HTTP module

// Create the HTTP server
const httpServer = http.createServer(app);

// Socket.io setup, passing httpServer after it's created
const io = require('socket.io')(httpServer);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

io.on('connection', (socket) => {
    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data });
    });
    console.log('A user connected');
    
    // Handle disconnection event
    socket.on('disconnect', () => {
        io.emit("user-disconnected", socket.id);
        console.log('User disconnected');
    });
});

// Start the HTTP server
httpServer.listen(3000, () => {
    console.log("App is running on HTTP");
});
