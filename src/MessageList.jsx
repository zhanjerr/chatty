import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    let output;
    output = this.props.messages.map((message) =>{
      switch(message.type) {
        case 'incomingMessage':
          return <Message key={message.id}{...message}/>
          break;
        case 'incomingNotification':
          return <Notification key={message.id}{...message}/>
          break;
        default:
          throw new Error('Unknown message type');
      }
    });
    return(
      <main className="messages" >
        {output}
      </main>
    )
  }
}
export default MessageList;