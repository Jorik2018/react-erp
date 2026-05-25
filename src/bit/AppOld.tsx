import { Provider } from './context/context';
import './App.css';
import Contacts from "./components/contacts/Contacts";
import { Route, Routes } from 'react-router-dom';


const App = () => {
    return (
        <Provider>
            <Routes>
                <div className={'App'}>
                    <Header brandingTitle={'Contact Manager'} />
                    <div className={'container'}>
                        <Route path={'/'} element={<Contacts/>} />
                        <Route path={'/contact/add'} />
                    </div>
                </div>
            </Routes>
        </Provider>
    );
}

export default App;
