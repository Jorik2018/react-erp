import { SAVE_TO_CACHE } from '../actionTypes'

export const saveToCache = (cacheType:string, newLoads:string, options:{merge:boolean}) => {
	const initialOptions = {
		merge: false // if false, newLoads will not overwrite prexisting ones
	}

	return {
		type: SAVE_TO_CACHE,
		cacheType,
		newLoads,
		options: options ?? initialOptions
	}
}
