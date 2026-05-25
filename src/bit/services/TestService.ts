import { AxiosResponse } from 'axios';
import { backend } from './AxiosInstances'

export const ping = async () => {
	// await backend.get('/auth').catch(() => {})

	const startTime = new Date()
	backend.get('ping').then(({ data: { message } }: AxiosResponse<{ message: string }>) => {
		const ping = message;
		const endTime = new Date()
		console.log(ping + ':', (endTime.getTime() - startTime.getTime()) + 'ms')
	});

}
