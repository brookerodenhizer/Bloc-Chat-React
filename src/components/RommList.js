import React, {Component} from 'react';

export class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {rooms: []};
      this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this. roomsRef.on('child_added', snapshot => {
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }
}
