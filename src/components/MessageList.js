import React, { Component } from 'react';
import './MessageList.css';

export class MessageList extends Component {
constructor (props) {
    super(props);

    this.state = {
      messages: [],
      currentMessages: [],
      user: this.props.currentUser,
      content: "",
      sentAt: "",
      newMessage: "",
   };
this.messagesRef = this.props.firebase.database().ref('messages');
this.createMessage = this.createMessage.bind(this);
}
componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat( message ) })
    });
}
handleChange(event) {
    this.setState({newMessage: event.target.value });
}
componentWillReceiveProps(nextProps) {
    const currentRoom = nextProps.currentRoom;
    this.setState({ currentMessages: this.state.messages.filter( message => message.roomId === currentRoom.key)});
}
createMessage(newMessage, currentRoom) {
    this.messagesRef.push({
    content: newMessage,
    roomId: this.props.currentRoom.key,
    user: this.props.user ? this.props.user.displayName : 'Guest',
    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
  },
    () => this.setState({ newMessage: "", currentMessages: this.state.messages.filter( message => message.roomId === currentRoom) }));
}

convertTimestamp(timestamp) {
  var d = new Date(timestamp),	// Convert the passed timestamp to milliseconds
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
		ampm = 'AM',
		time;

	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh == 0) {
		h = 12;
	}

	// ie: 2013-02-18, 8:35 AM
	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

	return time;
}

render() {
  return (
  <div>
    <div className="message-list">
      <div>
        <h2>Room {this.props.currentRoom.newRoomName}</h2>
        <form id="create-message" onSubmit={ (e) => { e.preventDefault(); this.createMessage(this.state.newMessage, this.props.currentRoom) } }>
              <input type="text" value={ this.state.newMessage } onChange={ (e) => { this.handleChange(e) } }  name="newMessage" />
              <input type="submit" value="Send"/>
            </form>
      </div>
      {this.state.currentMessages.map( (message) =>
          <div className="new-message" key={message.key}>
            <p className="user">{message.user}:</p>
            <p className="content">{message.content}</p>
            <p className="time-sent">{this.convertTimestamp(message.sentAt)}</p>
          </div>
         )
       }
    </div>

  </div>
  );
 }
}

export default MessageList;
