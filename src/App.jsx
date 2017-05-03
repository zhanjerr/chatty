import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'
import Nav from './Nav.jsx'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      // debugger;
      const inputUser = event.target.previousSibling.value;
      const inputContent = event.target.value;

      const newMessage = {
        id : this.state.messages.length + 1,
        username : inputUser,
        content: inputContent
      };

      const messages = this.state.messages.concat(newMessage)

      switch (inputUser) {
        case "" :
          const anonMessage = {
            id : this.state.messages.length + 1,
            username : "Anonymous",
            content: inputContent
          };

          const anonmessages = this.state.messages.concat(anonMessage);

          this.setState({currentUser: {name: "Anonymous"}});
          this.setState({messages: anonmessages});
          break;
        case this.state.currentUser.name :
          this.setState({messages: messages});
          break;
        default :
          this.setState({currentUser: {name:inputUser}});
          this.setState({messages: messages});
      }
    }
  }


  componentDidMount() {
  setTimeout(() => {
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}
  render() {
    return (
      <div>
        <Nav/>
        <MessageList messages={this.state.messages}/>
        <ChatBar onHandleKeyPress={this.handleKeyPress} user={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
