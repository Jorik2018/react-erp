import { Component, ReactNode } from "react";
import { Socket } from "socket.io-client";
import { QuizAppStates } from "../models/types";

type CommonsProps = { userList: string[], status: string };

type LobbyProps = CommonsProps & {
  isQM: boolean,
  roomcode: string, roomstatus: string, socket: Socket,
  cb: (data: QuizAppStates) => void, back: () => void
};

type QuestionPayload = {
  question: string,
  options: { [key: string]: string },
  endtime: Date,
  totaltime: number,
  timeLeft: number
}

class Lobby extends Component<
  LobbyProps,
  CommonsProps & { startTime: Date, timeLeft?: string | number, beginIsOn: boolean }> {

  private timerID?: number;

  constructor(props: LobbyProps) {
    super(props);
    const { userList, status } = props;
    this.state = {
      userList,
      status, /* "inactive", "waiting", "collecting", "finish","countdown" */
      startTime: new Date(),
      timeLeft: '',
      beginIsOn: true,
    };
  }

  componentWillMount() {
    this.props.socket.on('start', (payload) => {
      this.setState({
        startTime: new Date(payload.time),
        timeLeft: (payload.time - Date.now()) / 1000 | 0,
        status: "countdown",
      });
      // console.log(payload);
      // console.log(this.state);
    });
    this.props.socket.on('question', ({ question, options, endtime, totaltime }: QuestionPayload) => {
      this.props.cb({
        question,
        options,
        timerEndTime: endtime,
        timerTotalTime: totaltime
      } as QuizAppStates)
    });
    this.props.socket.on('update', (payload) => {
      this.setState({
        userList: payload.users,
      })
      // console.log("Update:");
      // console.log(payload);
    })
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillReceiveProps(nextProps: LobbyProps) {
    this.setState({
      userList: nextProps.userList,
      status: nextProps.roomstatus,
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    this.props.socket.off('start');
    this.props.socket.off('question');
    this.props.socket.off('update');
  }
  tick() {
    if (this.state.status === "countdown") {
      this.setState({
        timeLeft: (this.state.startTime.getTime() - Date.now()) / 1000 | 0,
      });
    }
  }
  begin() {
    this.props.socket.emit("start", {
      roomid: this.props.roomcode,
    });
    this.setState({
      beginIsOn: false,
    })
  }

  render() {
    const userDisplayList: ReactNode[] = [];
    let countdown;
    let beginButton;
    if (this.props.isQM) {
      if (this.state.beginIsOn) {
        beginButton = (
          <button className="btn y-button y-button-outline" onClick={() => this.begin()}> Begin Countdown </button>
        );
      }
      else {
        beginButton = (
          ""
        );
      }
    }
    if (this.state.userList) {
      this.state.userList.forEach(element => {
        userDisplayList.push(
          <li className="list-group-item">{element}</li>
        )
      });
    }
    if (this.state.status === "countdown") {
      if ((this.state.timeLeft as number) >= 0) {
        countdown = (
          <div className="countdown btn y-button y-button-outline">Seconds Left: {this.state.timeLeft}</div>
        )
      }
      else {
        countdown = (
          <div className="countdown btn y-button y-button-outline">Seconds Left: 0</div>
        )
      }
    }
    else {
      countdown = (
        <div className="countdown"></div>
      )
    }
    //Should add unique key to each list element
    return (
      <div className="row h-100">
        <div className="game-box my-auto col-sm-8 offset-sm-2 lobby">
          <div className="alert alert-warning alert-dismissible"> loby-RoomCode: {this.props.roomcode}
            <button type="button" className="close" onClick={() => this.props.back()}>Back</button>
          </div>
          {beginButton}{countdown}
          <ul className="list-group top-margin">
            {userDisplayList}
          </ul>

          {/* {this.state.status}
        {this.props.status} */}
        </div>
      </div>
    );
  }
}

export default Lobby