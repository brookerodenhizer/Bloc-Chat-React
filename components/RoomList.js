import React, { Component } from 'react';

export class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {rooms: []};
      this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMound() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

}

render() {
  .map(this.state.rooms);
}
