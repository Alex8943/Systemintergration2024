import * as WebSocket from 'ws';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Create a WebSocket server instance
const wss = new WebSocket.Server({ port: 8080 });

// Event listener for when a client connects
wss.on('connection', function connection(ws) {
  console.log('Client connected');

  // Event listener for when the server receives a message from the client
  ws.on('message', function incoming(message) {
    console.log('Received: %s', message);

    // Echo the received message back to the client
    ws.send(`You sent: ${message}`);
  });

  // Event listener for when the client closes the connection
  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})




/*import {WebSocket} from "ws";
import http from "http";
import express from "express";
const app = express();
const server = http.createServer(app);
//const wss = new WebSocket({server:server});
//const wss = new WebSocket(server);
const wss = new WebSocket({"ws://localhost:8080": server});




wss.on('connection', function connection(ws) {
  
    console.log('A new client Connected!');
    ws.send('Welcome New Client!');
  
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
  
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
      
    });
    
  });
 
server.listen(8080, () => {
    console.log("Server is running on port 8080");
});

*/









