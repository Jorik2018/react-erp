
import { SET_BREADCRUMBS, SET_DESKTOP, SET_LOADING, SET_NOTIFICATION, 
  SET_PANEL, SET_USER, SET_USER_DATA } from '../constants/constants';
import { StateType } from '../reducers/mainReducer';

export function setUser(state:StateType) {
  return { type: SET_USER, payload: state };
}

export function setPanel(state:StateType) {
  return { type: SET_PANEL, payload: state };
}

export function setLoading(state:boolean) {
  return { type: SET_LOADING, payload: state };
}

export function setBreadcrumbs(state:StateType) {
  return { type: SET_BREADCRUMBS, payload: state };
}

export function changeViewport(state:StateType) {
  return { type: SET_DESKTOP, payload: state };
}

export function setNotification(state:StateType) {
  return { type: SET_NOTIFICATION, payload: state };
}

export function setUserData(state:StateType) {
  return { type: SET_USER_DATA, payload: state };
}
