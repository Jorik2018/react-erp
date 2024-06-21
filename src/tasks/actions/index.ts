import {
  FETCH_TODOS,
  DELETE_TODO,
  TODO_ERROR,
  FETCH_TODO,
  CREATE_TODO,
  UPDATE_TODO
} from './types';
import { Task } from '../models/Task';
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

type Dispatch = ThunkDispatch<RootState, unknown, UnknownAction>;

const API_URL = 'http://localhost:3001/api';

export function fetchTodos() {
  return (dispatch: Dispatch) => {
    axios.get(`${API_URL}/tasks`)
      .then(response => {
        (dispatch)({
          type: FETCH_TODOS,
          payload: response.data.data
        });
      })
      .catch(error => {
        if (error.response) dispatch(todoError(error.response.data.error));
      });
  };
}
export function todoError(error: string) {
  return ((dispatch: Dispatch) => {
    dispatch({
      type: TODO_ERROR,
      payload: error
    });
  });
}

export function find(id: string) {
  return (dispatch: Dispatch) => {
    axios.get(`${API_URL}/tasks/${id}`)
      .then(response => {
        dispatch({
          type: FETCH_TODO,
          payload: response.data
        })
      })
      .catch(error => {
        dispatch(todoError(error.response.data.error));
      });
  };
}

export function deleteTodo({ _id }: Task) {
  return (dispatch: Dispatch) => {
    axios.delete(`${API_URL}/todos/${_id}`)
      .then(response => {
        dispatch({
          type: DELETE_TODO,
          payload: response.data.todo._id
        });
      })
      .catch(error => {
        dispatch(todoError(error.response.data.error));
      });
  };
}

export function createTodo(todo: Task, navigate: (path: string) => void) {
  return (dispatch: Dispatch) => {
    console.log(dispatch);
    axios.post(`${API_URL}/tasks/`, todo)
      .then(response => {
        dispatch({
          type: CREATE_TODO,
          payload: response.data.todo
        });
        navigate('/tasks');
      })
      .catch(error => {
        dispatch(todoError(error.response.data?.error));
      });
  };
}

export function updateTodo(id: string, task: Task) {
  return (dispatch: Dispatch) => {
    axios.patch(`${API_URL}/tasks/${id}`, task)
      .then(response => {
        dispatch({
          type: UPDATE_TODO,
          payload: response.data.todo
        });
        //browserHistory.push('/');
      })
      .catch(error => {
        dispatch(todoError(error.response.data.error));
      });
  };
}

