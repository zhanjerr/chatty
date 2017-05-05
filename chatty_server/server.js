// web socket server.js
const SocketServer = require('ws').Server;
// Set the port to 3001
const PORT = 3001;
// Create the WebSockets server
const wss = new SocketServer({ port: PORT });
//requring function to create random UUID
const uuidv4 = require('uuid/v4');
//count of currently connected users
let connectedUsers = 0;
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');

  connectedUsers += 1;
  console.log(connectedUsers);
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({
      type: 'userCount',
      userCount: connectedUsers
    }));
  })
  // ws.send('connected to web socket');

  ws.on('message', (data) => {
    const incoming = JSON.parse(data);
    const uuid = uuidv4();
    let messageOut = {};

    switch (incoming.type){
      case 'postMessage':
      console.log(`User ${JSON.parse(data).username} said ${JSON.parse(data).content}`);
        messageOut = {
          type: 'incomingMessage',
          id: uuid,
          username: incoming.username,
          content: incoming.content
        }
        wss.clients.forEach((client) => {
            client.send(JSON.stringify(messageOut));
        })
        break;
      case "postNotification":
        console.log(`User ${JSON.parse(data).oldName} changed name to  ${JSON.parse(data).newName}`);
        messageOut = {
          type: 'incomingNotification',
          id: uuid,
          oldName: incoming.oldName,
          newName: incoming.newName
        }
        wss.clients.forEach((client) => {
            client.send(JSON.stringify(messageOut));
        })
        break;
      default :
        ws.send("Error Could not proccess comand!")
    }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    connectedUsers -= 1;
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({
      type: 'userCount',
      userCount: connectedUsers
      }));
    })
    console.log('Client disconnected');
  });
});

console.log('socket server running on PORT :', PORT);