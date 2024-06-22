import { Component } from "react";
import Question from "./Question";
import { Socket } from "socket.io-client";
import { QuizAppStates } from "../models/types";
import Leaderboard from "./Leaderboard";
import Timer from "./Timer";
import Answers from "./Answers";

type GameProps = {
  question: string,
  isQM: boolean,
  socket: Socket,
  roomcode: string,
  timerEndTime: Date,
  timerTotalTime: number,
  options: { [key: string]: string },
  username: string,
  cb: (states: QuizAppStates) => void
}

export type GameStates = {
  status: number,
  questionText: string,
  options: { [key: string]: string },
  response: number,
  timerIsOn: boolean,
  questionIndex: number,
  timerEndTime: Date,
  timerTotalTime: number,
  isLast: boolean,
  results: {
    username: string;
    total: number;
  }[],
}

class Game extends Component<GameProps, GameStates> {

  constructor(props: GameProps) {
    super(props);
    this.state = {
      status: 0,
      options: this.props.options,
      questionText: this.props.question,
      response: -1, //temp
      timerIsOn: true,
      timerEndTime: this.props.timerEndTime,
      timerTotalTime: this.props.timerTotalTime,
      questionIndex: 1,
      isLast: false,
      results: [],
    };
  }

  componentWillReceiveProps(nextProps: GameProps) {
    this.setState({
      options: nextProps.options,
      questionText: nextProps.question,
      timerEndTime: nextProps.timerEndTime,
      timerTotalTime: nextProps.timerTotalTime,
    });
  }
  componentDidMount() {
    // console.log("mounting");
    this.props.socket.on('leaderboard', (payload: {
      isnotlive: boolean, leaderboard: {
        username: string;
        total: number;
      }[]
    }) => {
      console.log(payload);
      if (payload.isnotlive) {
        this.props.cb({ result: payload.leaderboard } as QuizAppStates);
      }
      else {
        this.setState({
          results: payload.leaderboard,
        });
      }
      // console.log("hi",payload,this.state)
    })
    this.props.socket.on('question', (payload) => {
      this.setState({
        questionText: payload.question,
        options: payload.options,
        timerEndTime: payload.endtime,
        timerTotalTime: payload.totaltime,
        isLast: payload.islast,
        timerIsOn: true,
        questionIndex: this.state.questionIndex + 1,//make it question ka index + 1 aoid double click problems
      })
      // console.log("Question reply:")
      // console.log(payload)
    });
    // console.log("mounted");
  }
  componentWillUnmount() {
    this.props.socket.off('question');
    this.props.socket.off('leaderboard');
  }
  handleTimeout() {
    this.setState({
      timerIsOn: false,
    });
  }
  broadcastNext() {
    // console.log("broadcast"+this.state.questionIndex);
    this.props.socket.emit('next', {
      serial: this.state.questionIndex,
      roomid: this.props.roomcode,
    });
    // console.log(this.state.questionIndex);
  }
  handleClick(i: number) {
    if (!this.props.isQM) {
      if (this.state.timerIsOn) {
        this.setState({
          status: 1,
          response: i,
          timerIsOn: false,
        });
        this.props.socket.emit('attempt', { //potentially problematic, unreliable
          attempt: i,
          roomid: this.props.roomcode,
          username: this.props.username,
          serial: this.state.questionIndex - 1,
        });
        // console.log(this.props.roomcode);
        // console.log(this.state);
        // console.log(this.props);
      }
    }
  }
  render() {
    let nextButton;
    let buttonText = "Next Question";
    let board;
    let gameBoxClass = "col-sm-8 offset-sm-2";
    if (this.state.isLast) {
      buttonText = "View Leaderboard"
    }
    if (this.props.isQM) {
      if (this.state.timerIsOn) {
        nextButton = <button className="btn y-button y-button-outline disabled">{buttonText}</button>;
      }
      else {
        nextButton = <button className="btn y-button y-button-outline" onClick={() => this.broadcastNext()}>{buttonText}</button>;
      }
      if (this.state.results) {
        board = (
          <div className="leader-box my-auto col-sm-6">
            <Leaderboard
              result={this.state.results}
              username={this.props.username}
              back={() => { }}
            />
          </div>
        );
        gameBoxClass = "col-sm-6";
      }
    }
    if (this.state.questionText) {
      return (
        <div className="row h-100">
          <div className={"game-box my-auto " + gameBoxClass}>
            <div className="response">{"Question " + this.state.questionIndex}</div>
            <Question questionText={this.state.questionText} />
            <Answers
              options={this.state.options}
              onClick={i => this.handleClick(i)}
              isOn={this.state.timerIsOn}
            />
            {/* <TestButton /> */}
            <Timer
              endTime={this.state.timerEndTime}
              isOn={this.state.timerIsOn}
              totalTime={this.state.timerTotalTime}
              onTimeout={() => this.handleTimeout()}
            />
            {nextButton}
          </div>
          {board}
        </div>
      );
    }
    else {
      return (
        <div className="row h-100">
          <div className="game-box my-auto col-sm-6 offset-sm-2">
            Please Wait For The Next Question
          </div>
        </div>
      );
    }
  }
}

export default Game
