import {
    GET_CONTACTS,
    ADD_CONTACT,
    GET_CONTACT,
    UPDATE_CONTACT
} from '../actions/types';
import { Contact } from '../models';

const initialState: {
    contacts: Contact[],
    contact: Contact
} = {
    contacts: [],
    contact: {}
};

export default (state = initialState, action: { type: string, payload: Contact }) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            };
        case GET_CONTACT:
            return {
                ...state,
                contact: action.payload
            };
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(
                    contact => contact.id === action.payload.id ? (contact = action.payload) : contact
                )
            };
        default:
            return state;

    }
}