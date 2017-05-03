import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    var output;
    output = this.props.messages.map(message => <Message key={message.id}{...message}/>);
    return(
      <main className="messages" >
        {output}
      </main>
    )
  }
}
export default MessageList;