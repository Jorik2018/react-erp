import { backend, backendSaves } from './AxiosInstances'

/**
 * GET request for getting Student data
 */
export const fetchStudentData = (studentId: string) => {
	const endpoint = `/students/${studentId}`
	return backend.get(endpoint)
}

/** ===== RUNTIME */

export const joinClassroom = classCode => {
	const endpoint = '/students/classrooms'
	return backendSaves.put(endpoint, { class_code: classCode })
}

export const setSuggestedActivity = (studentId: string, id: string, moduleId: string) =>
	updateStudentData(studentId, {
		suggested_activity: {
			id,
			module_id: moduleId
		}
	})

export const setChosenProjects = (moduleId: string, chosenProjects) =>
	updateModuleProgress(moduleId, {
		chosen_project_ids: chosenProjects.map(p => p.id)
	})

const updateStudentData = (studentId: string, updates) => {
	const endpoint = `/students/${studentId}`
	return backendSaves.put(endpoint, updates)
}

const updateModuleProgress = (id: string, updates) => {
	const endpoint = `/modules/${id}/progress`
	return backendSaves.put(endpoint, updates)
}

//

//@unused
/**
 * GET request for getting track data
 * @param {String} trackID
 */
export const fetchTrack = (trackID: string) => {
	const endpoint = `tracks/${trackID}`
	return backend.get(endpoint)
}

export const fetchTrackProgress = (trackID: string) => {
	const endpoint = `tracks/${trackID}/progress`
	return backend.get(endpoint)
}

/**
 * GET request for getting topic data
 * @param {String} topicID
 */
export const fetchTopic = (topicID: string) => {
	const endpoint = `topics/${topicID}`
	return backend.get(endpoint)
}
