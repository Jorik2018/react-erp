import { FETCH_TODOS, DELETE_TODO, TODO_ERROR, FETCH_TODO } from '../actions/types';
import { Task } from '../models/Task';

const INITIAL_STATE = { all: [], todo: {} };

export default function (state = INITIAL_STATE, action: { type: string, payload: Task|Task[]|string }) {
  switch (action.type) {
    case FETCH_TODOS:
      return { ...state, error: '', all: action.payload, todo: {} };
    case FETCH_TODO:
      return { ...state, error: '', todo: action.payload };
    case DELETE_TODO:
      return { ...state, all: state.all.filter((todo: Task) => todo._id !== action.payload) };
    case TODO_ERROR:
      return { ...state, error: action.payload };
  }
  return state;
}