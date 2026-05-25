import { combineReducers } from 'redux';
//import { firebaseStateReducer } from 'redux-react-firebase';
import mainReducer from './mainReducer';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

const browserHistory = createBrowserHistory();

const { routerReducer } = createReduxHistoryContext({ 
  history: browserHistory 
});

const rootReducer = combineReducers({
  mainReducer,
  //firebase: firebaseStateReducer,
  routing: routerReducer
});

export default rootReducer;
