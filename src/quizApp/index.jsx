import React from 'react';
import ReactDOM from 'react-dom';
import openSocket from 'socket.io-client';

import Game from "./modules/Game";
import Lobby from "./modules/Lobby";
import Login from "./modules/Login";
import RoomSelect from "./modules/RoomSelect";
import RoomListScreen from './RoomListScreen';
import RoomMenu from './modules/RoomMenu';
import AddQuestion from './modules/AddQuestion';
import Leaderboard from './modules/Leaderboard';

const SERVER_URL = import.meta.env.REACT_APP_VIRTUAL_HOST || "localhost:3001";
const socket = openSocket(SERVER_URL);

class QuizApp extends React.Component{

  // Split into QM path and User path separately?

  constructor(props){
    super(props);
    this.state={
      status: "LoggingIn" /* "LoggingIn","InLobby","Playing","Leaderboard","SelectingRoom","RoomListScreen","ViewingRoom", "AddingQuestion" */,
      username: "",
      isQM: false,
      roomstatus:"",
      question:"",
      options:"",
      timerEndTime: new Date(),
      timerTotalTime: 30,
      userlist:["iw"],
      roomcodeList: ["aw"],
      questionList:[""],
      roomcode:"",
      result:[],
    }
  }
  setStatus(s){
    this.setState({
      status: s,
    });
  }
  setStateAndStatus(stateUpdate,status){
    this.setStatus(status);
    this.setState(stateUpdate);
  }
  renderLogin(){
    return(
      <Login
        cb={(stateUpdate,nextStatus)=>this.setStateAndStatus(stateUpdate, nextStatus)}
        socket={socket}
      />
    )
  }
  renderGame(){
    return(
      <Game
        socket={socket}
        options={this.state.options}
        question={this.state.question}
        timerEndTime={this.state.timerEndTime}
        timerTotalTime={this.state.timerTotalTime}
        roomcode={this.state.roomcode}
        username={this.state.username}
        isQM={this.state.isQM}
        cb={(stateUpdate)=>{this.setStateAndStatus(stateUpdate,"Leaderboard")}}
      />
    );
  }
  renderLobby(){
    return (
      // <div>
        // <div className="game-box">{this.state.username}</div>
        <Lobby
          roomstatus={this.state.roomstatus}
          roomcode={this.state.roomcode}
          socket={socket}
          cb={(stateUpdate)=>this.setStateAndStatus(stateUpdate,"Playing")}
          status={this.state.roomstatus}
          userList={this.state.userlist}
          isQM={this.state.isQM}
          back={()=>{
            if(!this.state.isQM){
              this.setStatus("SelectingRoom")
            }
            else{
              this.setStatus("ViewingRoom")
            }
          }}
        />
      // </div>
    );
  }
  renderRoomSelect(){
    return(
      <RoomSelect
        cb={(stateUpdate, nextParentState)=>this.setStateAndStatus(stateUpdate, nextParentState)}
        socket={socket}
        username={this.state.username}
        back={()=>this.setStatus("LoggingIn")}
      />
    )
  }
  renderLeaderBoard(){
    return(
      <div className="row h-100">
      <div className="game-box my-auto col-sm-8 offset-sm-2">
      <Leaderboard
        result={this.state.result}
        username={this.state.username}
        back={()=>{
          if(this.state.isQM){
            this.setStatus("ViewingRoom")
          }
          else{
            this.setStatus("SelectingRoom")
          }
        }}
      />
      </div>
      </div>
    )
  }
  renderRoomListScreen(){
    return(
      <RoomListScreen
        socket={socket}
        roomcodeList={this.state.roomcodeList}
        cb={(stateUpdate,nextStatus)=>this.setStateAndStatus(stateUpdate,nextStatus)}
        back={()=>{this.setStatus("LoggingIn")}}
        username={this.state.username}
      />
    )
  }
  renderRoomMenu(){
    return(
      <RoomMenu
        questionList={this.state.questionList}
        roomcode={this.state.roomcode}
        addQuestionCB={()=>this.setStatus("AddingQuestion")}
        viewLeaderBoardCB={()=>this.setStatus("Leaderboard")}
        activateRoomCB={()=>this.setStatus("InLobby")}
        cb={(stateUpdate)=>this.setState(stateUpdate)}
        socket={socket}
        back={()=>{this.setStatus("RoomListScreen")}}
      />
    );
  }
  renderAddQuestion(){
    return (
      <AddQuestion
        roomcode={this.state.roomcode}
        socket={socket}
        cb={(stateUpdate)=>this.setStateAndStatus(stateUpdate,"ViewingRoom")}
        back={()=>this.setStatus("ViewingRoom")}
      />
    )
  }
  render(){
    // console.log(this.state.userlist)
    // console.log("hi")
    if(this.state.status==="LoggingIn"){
      return this.renderLogin();
    }
    else if(this.state.status==="InLobby"){
      return this.renderLobby();
    }
    else if(this.state.status==="Playing"){
      return this.renderGame();
    }
    else if(this.state.status==="SelectingRoom"){
      return this.renderRoomSelect();
    }
    else if(this.state.status==="RoomListScreen"){
      return this.renderRoomListScreen();
    }
    else if(this.state.status==="ViewingRoom"){
      return this.renderRoomMenu();
    }
    else if(this.state.status==="AddingQuestion"){
      return this.renderAddQuestion();
    }
    else if(this.state.status==="Leaderboard"){
      return this.renderLeaderBoard();
    }
  }
}

export default QuizApp;
