import { backendSaves, grader } from './AxiosInstances'

/* ===== RUNTIME */

export const deleteActivityProgress = (activityId: string) => {
	const endpoint = `/activities/${activityId}/progress`
	return backendSaves.delete(endpoint)
}

export const unlockCard = (activityId: string, cardId: string) => {
	const endpoint = `/activities/${activityId}/cards/${cardId}`
	return backendSaves.put(endpoint)
}

export const unlockHint = (activityId: string, hintId: string) => {
	const endpoint = `/activities/${activityId}/hints/${hintId}`
	return backendSaves.put(endpoint)
}

export const submitCheckpointProgress = (
	activityId,
	checkpointId,
	type,
	content
) => {
	const backendEndpoint = `checkpoints/${checkpointId}/progress`

	const formData = new FormData()
	formData.append('content', content)

	if (type !== 'Multiple Choice') {
		formData.append('comment', 'null')
	}

	if (type === 'Autograder') {
		formData.append('activity_id', activityId)
		formData.append('checkpoint_id', checkpointId)
		formData.append('username', 'Student@example.com')
		return grader.post('/uploader', formData)
	}
	return backendSaves.put(backendEndpoint, formData)
}
