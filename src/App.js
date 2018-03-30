import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList.js';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDFG2E_tZnPO9TOCDgXiyK9NbLclnstLYo",
  authDomain: "bloc-chat-react-635a8.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-635a8.firebaseio.com",
  projectId: "bloc-chat-react-635a8",
  storageBucket: "bloc-chat-react-635a8.appspot.com",
  messagingSenderId: "880238133267"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        currentRoomId: 1,
        user: 0
      };

    this.openRoom = this.openRoom.bind(this);
  }

  openRoom(room) {
    this.setState({currentRoomId: room});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <section className="App-rooms">
          <RoomList firebase= {firebase} currentRoom={this.state.currentRoomId} openRoom={this.openRoom} user={this.state.user} />
          <MessageList firebase= {firebase} currentRoom={this.state.currentRoomId} user={this.state.user} />
        </section>
      </div>
    );
  }
}

export default App;
