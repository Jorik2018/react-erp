import {
	RESET_STUDENT_DATA,
	SET_STUDENT_DATA,
	INCREMENT_GEMS_BY
} from '../actionTypes'

import {
	fetchStudentData,
	setChosenProjects
} from '../../services/StudentService'
import { setSelectedActivity } from './learnData'
import { saveToCache } from './cache'
import { CACHE_MODULE_PROGRESS } from '../../components/HOC/WithApiCache'
import { Obj } from '../../../classroom/models'

/* ===== INITIALIZATION */

export const init = (studentId: string) => async (dispatch: (args: Obj) => void) => {
	dispatch({
		type: RESET_STUDENT_DATA
	})

	const studentData = await fetchStudentData(studentId)

	/**
	 * TODO TEMPORARY CODE TEMP WARN
	 */
	let inprogressModules = [...studentData.inprogressModules]
	if (studentData.incompleteModules.length) {
		inprogressModules = inprogressModules.concat(studentData.incompleteModules)
	}

	dispatch(setStudentData({ ...studentData, inprogressModules }))

	// external
	dispatch(setSelectedActivity(studentData.suggestedActivity))
}

const setStudentData = studentData => ({
	type: SET_STUDENT_DATA,
	studentData
})

/**
 *
 * @param {int} moduleId
 * @param {int} id
 * @param {string} actionType inprogress | completed
 */
export const updateModuleActivityProgress = (moduleId: string, id: string, actionType: string) => ({
	type: 'UPDATE_MODULE_ACTIVITY_PROGRESS',
	moduleId,
	id,
	actionType
})

// ===== RUNTIME

export const chooseProjects = (moduleId: string, projects: string[]) => (dispatch: (args: Obj) => void) => {
	dispatch(
		saveToCache(
			CACHE_MODULE_PROGRESS,
			{ [moduleId]: { chosenProjects: projects } },
			{ merge: true }
		)
	)

	setChosenProjects(moduleId, projects)
		.then((_: { data:{message: string} }) => console.log(_.data.message))
}

export const incrementGemsBy = (gemAmount: () => void) => ({
	type: INCREMENT_GEMS_BY,
	gemAmount
})
