import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });


wss.on('connection is there', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received message: %s', data);

    // Broadcast the received message to all clients except the sender
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocketServer.OPEN) {
        client.send(data);
      }
    });
  });

  // Send initial message to the client upon connection
  ws.send('Connected to the server!');
});
