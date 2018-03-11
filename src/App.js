import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <section className="App-rooms">
          <RoomList firebase={firebase}/>
        </section>
      </div>
    );
  }
}

export default App;
