import {
  SET_BREADCRUMBS, SET_DESKTOP, SET_LOADING, SET_NOTIFICATION,
  SET_PANEL, SET_USER, SET_USER_DATA
} from "../constants/constants";

export type StateType = {
  isLoading: boolean,
  user?: { [key: string]: string | number } | null,
  panel: string,
  isDesktop: boolean,
  breadcrumbs: string[],
  notification: {
    message: string,
    type: string
  },
  userData: { [key: string]: string | number }
}

export type ActionType = {
  type: string,
  payload: { [key: string]: string | number }
}

export default function main(state: StateType = {
  isLoading: true,
  user: null,
  panel: '',
  isDesktop: true,
  breadcrumbs: [],
  notification: {
    message: '',
    type: ''
  },
  userData: {}
}, action: ActionType) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_PANEL:
      return { ...state, panel: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_BREADCRUMBS:
      return { ...state, breadcrumbs: action.payload };
    case SET_DESKTOP:
      return { ...state, isDesktop: action.payload };
    case SET_NOTIFICATION:
      return { ...state, notification: action.payload };
    case SET_USER_DATA:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
}
