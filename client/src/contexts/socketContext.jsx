import React, { Component } from 'react';
import io from 'socket.io-client';

import apiClient from '../utils/api.js';

const { Provider, Consumer } = React.createContext();

class SocketProvider extends Component {

  constructor(props) {
    super(props);

    this.state = {
      socket: io('/', {query: {token: apiClient.fetchToken()}}),
      revisions: null
    }
    console.log("ok?")
    this.state.socket.on('pUpdate', data => {
      console.log("lolwutnw", data)
      this.setState({
        revisions: data
      })
    })

    this.leaveProjRoom = this.leaveProjRoom.bind(this);
    this.joinProjRoom = this.joinProjRoom.bind(this);
  }

  joinProjRoom(pid) {
    console.log("joined room")
    if (this.state.revisions)
      this.setState({
        revisions: null
      });
    this.state.socket.emit('join-project', pid);
  }

  leaveProjRoom(pid) {
    console.log("left room")
    this.state.socket.emit('leave-project', pid);
    this.setState({
      revisions: null
    });
  }
  // componentWillMount() {

  // }

  render() {
    return (
      <Provider
        value={{
          socket: this.state.socket,
          joinProjRoom: this.joinProjRoom,
          revs: this.state.revisions,
          leaveProjRoom: this.leaveProjRoom
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}


export { SocketProvider, Consumer }
