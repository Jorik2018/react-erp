import { Component, createContext } from 'react';
import { DELETE_CONTACT, ADD_CONTACT, UPDATE_CONTACT, FILTER_CONTACT } from './actions';
import { contactFilter } from '../util/contact-filter'

type StateType = {
    contacts: Contact[]
}
const reducer = (state: StateType, action: { type: string, payload: string }) => {
    switch (action.type) {
        case DELETE_CONTACT:
            state.contacts = state.contacts.filter((contact: Contact) => contact.id !== action.payload);
            state.filterContacts = state.contacts;
            return {
                ...state
            };
        case ADD_CONTACT:
            state.contacts = [...state.contacts, action.payload];
            state.filterContacts = state.contacts;
            return {
                ...state,
            };
        case UPDATE_CONTACT:
            state.contacts = state.contacts.map((contact: Contact) => {
                return contact.id === action.payload.id ? (contact === action.payload) : contact
            });
            state.filterContacts = state.contacts
            return {
                ...state,

            };
        case FILTER_CONTACT:
            return {
                ...state,
                filterContacts: contactFilter(state.contacts, action.payload)
            };
        default:
            return state;
    }
};

const Context = createContext({});

export class Provider extends Component {
    state = {
        contacts: [],
        filterContacts: [],
        dispatch: action => this.setState(state => reducer(state, action))
    };

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ contacts: res, filterContacts: res })
            })
    }
    render() {
        return (
            <Context.Provider value= { this.state } >
            { this.props.children }
            < /Context.Provider>
        );
    }

}


export const Consumer = Context.Consumer;