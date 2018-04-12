import React, { Component } from 'react';

class User extends Component {
  constructor (props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged((user) => {
      console.log("I'm in the on auth state changed")
      console.log(user)
      this.props.setUser(user);
    });
  }

  signIn() {
    console.log("I'm in sign in!")
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider).then((result) => {
      console.log("i'm in sign in then!")
      console.log(result.user);
      const user = result.user;
    });
  }

  signOut() {
    console.log("I'm in sign out!")
    this.props.firebase.auth().signOut().then(result =>
    console.log(result));
    this.props.setUser(null, false);
  }

  render() {
    return (
      <div className="login">
        <h2>{this.props.currentUser} Is signed in.</h2>
        <p>{this.props.currentUser === 'Guest' ? "Please sign in" : "You're signed in"}</p>
        <button className="userButton" onClick={this.signIn}>Sign In</button>
        <button className="userButton" onClick={this.signOut}>Sign Out</button>
      </div>
    )
  }
}
export default User;
