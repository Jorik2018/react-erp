import axios from 'axios'
import camelCase from 'camelcase-keys-deep'

import { deauthenticate } from '../redux/actions/account'
import store from '../redux/store'

/** GENERAL BACKEND (mainly for GET) */

const backendResponseInterceptor = (error: {
	response: {
		status: number, statusText: string,
		config: { method: string, url: string },
		data: { message: string, msg: string }
	}
}) => {
	if (!error.response) {
		throw Error(
			'A so called "CORS" error likely occurred. The request bounced.'
		)
	}
	const {
		status,
		statusText,
		config: { method, url },
		data: { message, msg }
	} = error.response

	if (status === 401) {
		store.dispatch(deauthenticate())

		// [WithAuthentication] continue error chain to deauthenticate
		if (!localStorage.getItem('meta')) throw error

		return error
	}

	if (message !== 'Card already unlocked')
		alert(`${method.toUpperCase()} ${url}
      ${status} (${statusText})
      ${message ?? msg ?? ''}`)
	return error
}


export const baseUrl = 'http://127.0.0.1:8000/api/study'

export const backend = axios.create({
	baseURL: baseUrl,
	withCredentials: true
})
backend.interceptors.response.use(
	response => camelCase(response.data, { deep: true }),
	error => backendResponseInterceptor(error)
)

/** BACKEND_SAVES (with CSRF, mainly for PUT, POST, DELETE) */

// window.onbeforeunload = e => {
// 	e.preventDefault()
// 	e.returnValue('Changes may not be saved. Continue?')
// 	return 'Changes may not be saved. Continue?'
// }
export const backendSaves = axios.create({
	baseURL: baseUrl,
	withCredentials: true
})
backendSaves.interceptors.response.use(
	response => camelCase(response.data, { deep: true }),
	error => backendResponseInterceptor(error)
)

const graderBaseURL = 'http://127.0.0.1:8000/api/study'
export const grader = axios.create({
	baseURL: graderBaseURL
	// withCredentials: true
})
grader.interceptors.response.use(response =>
	camelCase(response.data, { deep: true })
)

const cdnBaseUrl = 'http://127.0.0.1:8000/api/study'
export const cdn = axios.create({
	baseURL: cdnBaseUrl
})
cdn.interceptors.response.use(response =>
	camelCase(response.data, { deep: true })
)
