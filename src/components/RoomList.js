import React, { Component } from 'react';

export class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        rooms: []
      };
      this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMound() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }


  render () {
    return (
        <div>
        {this.state.rooms.map ((room, i) => (  //to loop over the room array to render its contents Q: why state and not props?
        <li key={room.key}>{room.name}</li>
            // {this.state.rooms.map ((room) => (  //to loop over the room array to render its contents
              // <h1>{room.key}</h1>
        ))}
        </div>
    );
  }
}
