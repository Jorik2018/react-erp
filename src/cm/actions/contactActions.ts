import {
    GET_CONTACTS,
    DELETE_CONTACT,
    ADD_CONTACT,
    GET_CONTACT,
    UPDATE_CONTACT
} from './types';
import axios from 'axios';
import { Contact, Dispatch } from '../models';

const { get, post, put, delete: destroy } = axios;

export const getContacts = () => (dispatch: Dispatch) =>
    get('https://jsonplaceholder.typicode.com/users')
        .then(res => dispatch({
            type: GET_CONTACTS,
            payload: res.data
        }));

export const getContact = (id: string) => (dispatch: Dispatch) =>
    get(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => dispatch({
        type: GET_CONTACT,
        payload: res.data
    }));

export const deleteContact = (id: string) => (dispatch: Dispatch) =>
    destroy(`https://jsonplaceholder.typicode.com/users/${id}`)
        .catch(() => { })
        .finally(() => dispatch({
            type: DELETE_CONTACT,
            payload: id
        }));

export const addContact = (contact: Contact) => (dispatch: Dispatch) =>
    post('https://jsonplaceholder.typicode.com/users', contact)
        .then(res => dispatch({
            type: ADD_CONTACT,
            payload: res.data
        }));

export const updateContact = (contact: Contact) => (dispatch: Dispatch) =>
    put(`https://jsonplaceholder.typicode.com/users/${contact.id}`, contact).then(res => dispatch({
        type: UPDATE_CONTACT,
        payload: res.data
    }));