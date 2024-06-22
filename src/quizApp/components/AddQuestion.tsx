import { Component, FormEvent } from "react";
import Loading from "./Loading";
import Editor from 'react-simple-wysiwyg';
import Question from "./Question";
import Answers from "./Answers";
import { Socket } from "socket.io-client";
import { QEvent, QuestionType, QuizAppStates } from "../models/types";

type AddQuestionProps = {
  roomcode: string,
  socket: Socket,
  back: () => void,
  cb: (payload: QuizAppStates) => void
}

type AddQuestionStates = {
  question: string,
  message?: string,
  options: {
    option1: string,
    option2: string,
    option3: string,
    option4: string
  },
  answer: number,
  error: string,
  isWaiting: boolean,
}

class AddQuestion extends Component<AddQuestionProps, AddQuestionStates> {
  /* props:
  roomcode: 
  socket
  cb */
  constructor(props: AddQuestionProps) {
    super(props);
    this.state = {
      question: "",
      options: {
        option1: "",
        option2: "",
        option3: "",
        option4: "",
      },
      answer: -1,
      error: "",
      isWaiting: false,
    }
  }

  takeTextInput(event: QEvent, stateField: string) {
    const stateUpdate = { [stateField]: event.target.value } as unknown as AddQuestionStates;
    this.setState(stateUpdate);
  }

  updateOptions(e: QEvent, optionString: string) {
    const stateUpdate = { ...this.state.options, [optionString]: e.target.value };
    this.setState(stateUpdate as unknown as AddQuestionStates);
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();
    this.props.socket.emit('createquestion', {
      question: this.state.question,
      options: this.state.options,
      roomid: this.props.roomcode,
      answer: this.state.answer,
    });
    this.setState({
      isWaiting: true,
    });
  }
  handleCreateQuestionResponse(payload: { message: string, questions: QuestionType[] }) {
    if (payload.message === "Success") {
      this.props.cb({ questionList: payload.questions } as QuizAppStates);
    }
    else {
      this.setState({
        isWaiting: false,
        error: payload.message,
      })
    }
  }
  render() {
    if (this.state.isWaiting) {
      return (
        <Loading
          text={"Creating Question..."}
          socket={this.props.socket}
          time={5000}
          listenFor={'createquestion'}
          onSuccess={(payload) => this.handleCreateQuestionResponse(payload)}
          onFailure={() => { this.setState({ isWaiting: false, message: "Time Out" }) }}
          onCancel={() => { this.setState({ isWaiting: false, message: "" }) }}
        />
      )
    }
    return (
      <div>
        <div className="row h-100">
          <div className="game-box my-auto col-sm-8 offset-sm-2">
            <div className="alert alert-warning alert-dismissible"> New Question:
              <button type="button" className="close" onClick={() => this.props.back()}>Back</button></div>
            {this.state.error}
            <form onSubmit={(event: FormEvent<HTMLFormElement>) => this.handleSubmit(event)}>
              <div className="form-group">
                <label>
                  Question:
                </label>
                <Editor value={this.state.question} onChange={(e) => {
                  this.setState({
                    question: e.target.value
                  });
                }} />
              </div>
              <div className="form-group">
                <label>
                  Option 1:
                </label>
                <input type="text" value={this.state.options.option1} className="form-control" onChange={(event) => this.updateOptions(event, "option1")} />
              </div>
              <div className="form-group">
                <label>
                  Option 2:
                </label>
                <input type="text" value={this.state.options.option2} className="form-control" onChange={(event) => this.updateOptions(event, "option2")} />
              </div>
              <div className="form-group">
                <label>
                  Option 3:
                </label>
                <input type="text" value={this.state.options.option3} className="form-control" onChange={(event) => this.updateOptions(event, "option3")} />
              </div>
              <div className="form-group">
                <label>
                  Option 4:
                </label>
                <input type="text" value={this.state.options.option4} className="form-control" onChange={(event) => this.updateOptions(event, "option4")} />
              </div>
              <div className="form-group">
                <label>
                  Answer:
                </label>
                <input type="number" min="1" max="4" value={this.state.answer} className="form-control" onChange={(event) => this.takeTextInput(event, "answer")} />
              </div>
              <input type="submit" className="form-control" value="Submit" />
            </form>
          </div>
        </div>

        <div className="row h-100">
          <div className="game-box my-auto col-sm-8 offset-sm-2">
            <Question questionText={this.state.question} />
            <Answers
              options={this.state.options}
              onClick={i => { console.log(i); }}
              isOn={true}
            />
          </div>
        </div>
      </div>

    )
  }
}
export default AddQuestion