import { AxiosResponse } from 'axios'
import { fetchUserData } from '../../services/AccountService'
import { AUTHENTICATE, DEAUTHENTICATE, SET_USER_DATA } from '../actionTypes'
import { UserData } from '../../models'

export const initUserData = (userId: string) => (dispatch: (args: {
	type: string, userData: UserData
}) => void) => {
	fetchUserData(userId).then(({ data: userData }: AxiosResponse<UserData>) => {
		const validatedName =
			userData.name === 'None' ? userData.githubUsername : userData.name
		dispatch({
			type: SET_USER_DATA,
			userData: { ...userData, name: validatedName }
		})
	})
}

export const authenticate = (meta: { [key: string]: string }) => {
	localStorage.setItem('meta', JSON.stringify(meta))
	return {
		type: AUTHENTICATE,
		meta
	}
}

export const deauthenticate = () => {
	localStorage.removeItem('meta')

	if (window.location.pathname !== '/') {
		console.log('ok')
		window.location.replace('/')
	}

	return {
		type: DEAUTHENTICATE
	}
}
