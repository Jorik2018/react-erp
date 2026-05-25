import { Component, FormEvent, ReactNode } from "react";
import Option from "./components/Option";
import { Socket } from "socket.io-client";
import { QEvent, QuestionType, QuizAppStates, Room } from "./models/types";
import Loading from "./components/Loading";

type RoomListScreenProps = {
  socket: Socket,
  roomcodeList: Room[],
  username: string,
  back: () => void,
  cb: (status: QuizAppStates, stateField: string) => void
}

type RoomListScreenStates = {
  isWaiting: boolean,
  roomcode: string,
  loadInstr: string,
  message: string,
  newroomcode: string
}

class RoomListScreen extends Component<RoomListScreenProps, RoomListScreenStates> {

  constructor(props: RoomListScreenProps) {
    super(props);
    this.state = {
      isWaiting: false,
      roomcode: "",
      message: "",
      loadInstr: "Open", /* "Add" */
      newroomcode: "",
    }
  }

  handleRoomResponse(payload: { questions: QuestionType[] }, roomcode: string) {
    // console.log(roomcode)
    this.props.cb({
      questionList: payload.questions,
      roomcode: roomcode,
    } as QuizAppStates, "ViewingRoom");
    // console.log(payload)
  }

  handleAddResponse(payload: { rooms: Room[] }) {
    alert(JSON.stringify(payload))
    this.setState({
      isWaiting: false,
    })
    this.props.cb({
      roomcodeList: payload.rooms,
    } as QuizAppStates, "RoomListScreen")
  }

  fetchRoom(roomcode: string) {
    this.setState({
      isWaiting: true,
      loadInstr: "Open",
      roomcode: roomcode,
    });
    this.props.socket.emit('fetchroom', {
      roomid: roomcode,
    });
  }

  renderLoading(roomcode: string) {
    // console.log(this.state.isWaiting);
    
    if (this.state.loadInstr === "Open") {
      return (
        <Loading
          text={"Loading Room..."}
          socket={this.props.socket}
          time={5000}
          listenFor={'fetchroom'}
          onSuccess={(payload) => this.handleRoomResponse(payload, roomcode)}
          onFailure={() => { this.setState({ isWaiting: false, message: "Time Out" }) }}
          onCancel={() => { this.setState({ isWaiting: false, message: "" }) }}
        />
      );
    }
    else {
      return (
        <Loading
          text={"Adding Room..."}
          socket={this.props.socket}
          time={5000}
          listenFor={'createroom'}
          onSuccess={(payload) => this.handleAddResponse(payload)}
          onFailure={() => { this.setState({ isWaiting: false, message: "Time Out" }) }}
          onCancel={() => { this.setState({ isWaiting: false, message: "" }) }}
        />
      );
    }
  }

  renderRoomButton({id, name}: Room) {
    return (
      <Option
      key={id}
        value={"RoomCode: " + name}
        onClick={() => this.fetchRoom(id)}
        isOn={true}
      />
    );
  }

  addRoom(event: FormEvent) {
    event.preventDefault();
    if (this.state.newroomcode) {
      this.props.socket.emit('createroom', {
        userId: this.props.username || '1',
        name: this.state.newroomcode,
      });
      this.setState({
        isWaiting: true,
        loadInstr: "Add",
      });
    }
  }

  takeTextInput(event: QEvent, stateField: string) {
    const stateUpdate = { [stateField]: event.target.value } as unknown as RoomListScreenStates;
    this.setState(stateUpdate);
  }

  render() {
    if (this.state.isWaiting) {
      return this.renderLoading(this.state.roomcode);
    }
    const roomDisplayList: ReactNode[] = [];
    this.props.roomcodeList.forEach((room: Room) => {
      roomDisplayList.push(
        this.renderRoomButton(room),
      )
    });
    return (
      <div className="row h-100">
        <div className="game-box my-auto col-sm-8 offset-sm-2">
          <div className="alert alert-warning alert-dismissible"> Rooms:
            <button type="button" className="close" onClick={() => this.props.back()}>Back</button>
          </div>
          {roomDisplayList}
          <form onSubmit={(event: FormEvent<HTMLFormElement>) => this.addRoom(event)}>
            <div className="form-group">
              <label>
                New Room Code:
              </label>
              <input type="text" className="form-control" onChange={(event) => this.takeTextInput(event, "newroomcode")} />
            </div>
            <input type="submit" className="form-control" value="Create New Room" />
          </form>
        </div>
      </div>
    );
  }
}

export default RoomListScreen;