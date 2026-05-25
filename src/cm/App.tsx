import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import './App.css';
import Header from "./components/Header/Header";
import AddContact from "./components/Contact/AddContact";
import EditContact from "./components/Contact/EditContact";

import Contacts from "./containers/Contacts";

import About from './pages/About';
import NotFound from './pages/NotFound';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes>
          <div className="app">
            <Header brandName={'Contact Manager'} />
            <Route path={'/'} Component={Contacts} />
            <Route path={'contact/add'} Component={AddContact} />
            <Route path={'/contact/add/:id'} Component={EditContact} />
            <Route path={'/about'} Component={About} />
            <Route Component={NotFound} />
          </div>
        </Routes>
      </Provider>
    );
  }
}

export default App;
