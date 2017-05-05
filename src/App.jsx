import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'
import Nav from './Nav.jsx'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      connectedUsers: 0
    };

    this.handleNewName = this.handleNewName.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
  }

  handleNewName(name) {
    const newMessage = {
      type: "postNotification",
      oldName: this.state.currentUser.name,
      newName: name
    };
    if(name !== this.state.currentUser.name){
      this.ws.send(JSON.stringify(newMessage));
      this.setState({currentUser: {name: name}});
    }
  }

  handleNewMessage(message) {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: message
    };
    this.ws.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    //connecting to websocket
    this.ws = new WebSocket("ws://localhost:3001");
    //handling incoming message, chaning it to JSON then updating the sate
    this.ws.onmessage = (rawMessage) => {
      console.log(JSON.parse(rawMessage.data));
      const message = JSON.parse(rawMessage.data);
      switch(message.type){
        case 'incomingNotification' || 'incomingMessage':
          const concatMessage = this.state.messages.concat(message);
          this.setState({messages: concatMessage});
          break;
        case 'userCount':
          console.log('should update userCount');
          this.setState({connectedUsers: message.userCount});
          break;
        default:
          throw new Error('Unknown message type');
      }
    }
  }

  render() {
    return (
      <div>
        <Nav userCount={this.state.connectedUsers}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar submitName={this.handleNewName} submitMessage={this.handleNewMessage} user={this.state.currentUser.name}/>
      </div>
    );
  }
}
export default App;
