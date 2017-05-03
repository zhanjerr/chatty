import React, {Component} from 'react';

class ChatBar extends Component {

  render(){
    return(
      <footer className="chatbar">
        <input className="chatbar-username" value={this.props.user.name} onChange={this.props.changeName} />
        <input onKeyPress={this.props.onHandleKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }

}
export default ChatBar