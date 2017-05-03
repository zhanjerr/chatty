import React, {Component} from 'react';

class ChatBar extends Component {

  render(){
    return(
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.user.name} />
        <input onKeyPress={this.props.onHandleKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }

}
export default ChatBar