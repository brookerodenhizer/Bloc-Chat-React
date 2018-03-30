import React, { Component } from 'react';

export class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {newRoomName: "", rooms: []};
      this.roomsRef = this.props.firebase.database().ref('rooms');
      this.handleChange = this.handleChange.bind(this);
      this.createRoom = this.createRoom.bind(this);
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({ newRoomName: this.state.newRoomName });
    this.setState({ newRoomName: ""});
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }


  render() {
    const newRoom = (
      <form onSubmit={this.createRoom}>
        <input type="text" value={this.state.newRoomName} placeholder="Create New Room" onChange={this.handleChange}/>
        <input type="submit" value="Create" />
      </form>
    );
    const roomList = this.state.rooms.map((room) =>
      <li key={room.key} onClick={(e, room) => this.props.openRoom(room)}>{room.newRoomName}</li>
    );

    return (
      <div>
      <div>{newRoom}</div>
        <ul>{roomList}</ul>
      </div>
    );
  }
}

export default RoomList;
