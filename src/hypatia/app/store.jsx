import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { createStore, compose } from 'redux';
import { reduxReactFirebase } from 'redux-react-firebase';
import rootReducer from './core/reducers/index';
import { firebaseConfig } from '../../config'

const createStoreWithFirebase = compose(reduxReactFirebase(firebaseConfig), window.devToolsExtension
  ? window.devToolsExtension()
  : f => f)(createStore);

const store = createStoreWithFirebase(rootReducer, {});

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
