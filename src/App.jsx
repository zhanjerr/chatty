import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'
import Nav from './Nav.jsx'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: []
    };

    this.handleNewName = this.handleNewName.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
  }

  handleNewName(name) {
    this.setState({currentUser: {name: name}});
  }

  handleNewMessage(message) {
    const newMessage = {
      username: this.state.currentUser.name,
      content: message
    }
    this.ws.send(JSON.stringify(newMessage));
  }

  // handleNewMessage(event) {
  //   if(event.key == 'Enter'){
  //     // debugger;
  //     const inputUser = event.target.previousSibling.value;
  //     const inputContent = event.target.value;
  //     const newMessage = {
  //       id : this.state.messages.length + 1,
  //       username : inputUser,
  //       content: inputContent
  //     };
  //     const messages = this.state.messages.concat(newMessage);
  //     let wsMessage;

  //     switch (inputUser) {
  //       case "" :
  //         const anonMessage = {
  //           id : this.state.messages.length + 1,
  //           username : "Anonymous",
  //           content: inputContent
  //         };
  //         const anonmessages = this.state.messages.concat(anonMessage);

  //         this.setState({currentUser: {name: "Anonymous"}});
  //         this.setState({messages: anonmessages});

  //         wsMessage = {
  //           username: "Anonymous",
  //           content: inputContent
  //         }
  //         this.ws.send(JSON.stringify(wsMessage));
  //         break;
  //       case this.state.currentUser.name :
  //         this.setState({messages: messages});
  //         wsMessage = {
  //           username: inputUser,
  //           content: inputContent
  //         }
  //         this.ws.send(JSON.stringify(wsMessage));
  //         break;
  //       default :
  //         this.setState({currentUser: {name:inputUser}});
  //         wsMessage = {
  //           username: inputUser,
  //           content: inputContent
  //         }
  //         this.ws.send(JSON.stringify(wsMessage));
  //         this.setState({messages: messages});
  //     }
  //   }
  // }


  componentDidMount() {
    this.ws = new WebSocket("ws://localhost:3001");
    this.ws.onmessage = (rawMessage) => {
      const concatMessage = this.state.messages.concat(JSON.parse(rawMessage.data));
      this.setState({messages: concatMessage});
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Nav/>
        <MessageList messages={this.state.messages}/>
        <ChatBar submitName={this.handleNewName} submitMessage={this.handleNewMessage} user={this.state.currentUser.name}/>
      </div>
    );
  }
}
export default App;
