import { Component } from "react";
import { Socket } from "socket.io-client";

type LoadingProps = {
  socket: Socket, time: number, text: string,
  onFailure: () => void,
  onSuccess: (payload: string) => void,
  onCancel: () => void,
  listenFor: string
}

class Loading extends Component<LoadingProps> {

  timerID: number;

  constructor(props: LoadingProps) {
    super(props);
    this.timerID = setInterval(() => this.tick(), this.props.time);
    this.props.socket.on(this.props.listenFor, (payload) => this.props.onSuccess(payload));
  }
  tick() {
    this.props.socket.off(this.props.listenFor);
    this.props.onFailure();
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div className="row h-100">
        <div className="game-box my-auto col-sm-8 offset-sm-2">
          {/* <div className="spinner-border"></div> */}

          <div className="alert alert-warning alert-dismissible">{this.props.text}
            <button type="button" className="close" onClick={() => this.props.onCancel()}>&#10005;</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Loading