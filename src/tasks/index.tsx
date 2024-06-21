import { Route } from 'react-router';
import TodoListContainer from './components/TodoListContainer';
import { Provider } from 'react-redux';
import { Routes } from 'react-router-dom';
import TodoContainer from './components/TodoContainer';
import store from './store';

//Moment.locale(window.navigator.userLanguage || window.navigator.language); 

const TaskApp = () => (
  <Provider store={store}>
    <Routes>
      <Route path="/" Component={TodoListContainer} />
      <Route path="/new" Component={TodoContainer} />
      <Route path="/:id" Component={TodoContainer} />
    </Routes>
  </Provider>
)

export default TaskApp;