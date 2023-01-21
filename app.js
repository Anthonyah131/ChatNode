const { Socket } = require('dgram');
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const {Server} = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });

    socket.on('chat', (msg) => {
        socket.broadcast.emit('chat', msg);
    });
});

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/cliente/index.html`);
});

server.listen(8080, () => {
    console.log('Servidor corriendo en http://localhost:8080');
});