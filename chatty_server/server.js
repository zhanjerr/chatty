// web socket server.js
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create the WebSockets server
const wss = new SocketServer({ port: PORT });

//requring function to create random UUID
const uuidv4 = require('uuid/v4');


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');

  // ws.send('connected to web socket');

  ws.on('message', (data) => {
    console.log(`User ${JSON.parse(data).username} said ${JSON.parse(data).content}`);
    const uuid = uuidv4();
    const messageOut = {
      id : uuid,
      username : JSON.parse(data).username,
      content : JSON.parse(data).content
    }
    wss.clients.forEach((client) => {
      if (client !== ws) {
        client.send(JSON.stringify(messageOut));
      }
    })
    console.log(messageOut);
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

console.log('socket server running on PORT :', PORT);