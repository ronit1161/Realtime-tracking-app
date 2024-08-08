const express = require ('express');
const app = express();
const fs = require('fs')
const path = require('path')

const https = require('https');

// Path to your SSL certificate and key
const privatekey = fs.readFileSync('/home/ubuntu/Realtime-tracking-app/ssl/selfsigned.key', 'utf8');
const certificate = fs.readFileSync('/home/ubuntu/Realtime-tracking-app/ssl/selfsigned.crt', 'utf8');
const credentials = { key: privatekey, cert: certificate };


const httpsServer = https.createServer(credentials, app);

// Socket.io setup
const io = require('socket.io')(httpsServer);

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

httpsServer.listen(3000, () => {
    console.log("App is running")
});
