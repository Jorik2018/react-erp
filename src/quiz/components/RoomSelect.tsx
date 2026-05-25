import { Component, FormEvent } from "react";
import Loading from "./Loading";
import { Socket } from "socket.io-client";
import { QEvent, QuizAppStates } from "../models/types";

type RoomSelectProps = {
  username: string,
  socket: Socket,
  cb: (states:QuizAppStates, stateField: string) => void,
  back: () => void
}

type RoomSelectStates = {
  roomcode: string,
  isWaiting: boolean,
  message: string,
  value?: string
}

class RoomSelect extends Component<RoomSelectProps, RoomSelectStates> {

  constructor(props: RoomSelectProps) {
    super(props);
    this.state = {
      roomcode: "",
      isWaiting: false,
      message: "",
    }
  }

  takeTextInput(event: QEvent, stateField: string) {
    const stateUpdate = { [stateField]: event.target.value } as unknown as RoomSelectStates;
    this.setState(stateUpdate);
  }
  //

  handleSubmit(event: FormEvent) {
    event.preventDefault();
    this.props.socket.emit('joinroom', {
      roomid: this.state.roomcode,
      username: this.props.username,
    });
    // console.log({
    //   roomid: this.state.roomcode,
    //   username: this.state.username,
    // })
    this.setState({
      isWaiting: true,
    });
  }

  handleRoomResponse(payload: { message: string, state: string, users: string[],
    leaderboard:{ username: string, total: number }[]
   }) {
    if (payload.message === "Success") {
      const stateUpdate = {
        roomcode: this.state.roomcode,
        roomstatus: payload.state,
        userlist: payload.users,
      } as QuizAppStates;
      // console.log(payload);
      if (payload.state === "countdown" || payload.state === "waiting" || payload.state === "collecting") {
        this.props.cb(stateUpdate, "Playing");
      }
      else if (payload.state === "finish") {
        stateUpdate.result = payload.leaderboard;
        this.props.cb(stateUpdate, "Leaderboard");
      }
      else {
        this.props.cb(stateUpdate, "InLobby");
      }
    }
    else {
      this.setState({
        isWaiting: false,
        message: payload.message,
      })
    }
  }
  render() {
    let error;
    if (this.state.message) {
      error = (
        <div className="alert alert-warning alert-dismissible"> {this.state.message}
          <button type="button" className="close" data-dismiss="alert">&times;</button>
        </div>
      );
    }
    if (this.state.isWaiting) {
      return (
        <Loading
          text={"Looking for room..."}
          socket={this.props.socket}
          time={5000}
          listenFor={'joinroom'}
          onSuccess={(payload) => this.handleRoomResponse(payload)}
          onFailure={() => { this.setState({ isWaiting: false, message: "Time Out" }) }}
          onCancel={() => { this.setState({ isWaiting: false, message: "" }) }}
        />
      );
    }
    return (
      <div className="row h-100">
        <div className="game-box my-auto col-sm-8 offset-sm-2">
          {error}
          <div className="alert alert-warning alert-dismissible"> roomselect-RoomCode:
            <button type="button" className="close" onClick={() => this.props.back()}>Back</button>
          </div>
          <form onSubmit={(event: FormEvent<HTMLFormElement>) => this.handleSubmit(event)}>
            <div className="form-group">
              <input className="form-control" type="text" value={this.state.value} onChange={(event) => this.takeTextInput(event, "roomcode")} />
            </div>
            <input className="form-control" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default RoomSelect;