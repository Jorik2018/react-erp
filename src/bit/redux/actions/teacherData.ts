import {
	SET_SUBMISSIONS,
	UPDATE_FEEDBACKS,
	SET_CURRENT_CLASSROOM_BY_INDEX,
	SET_CURRENT_SUBMISSION_BY_INDEX
} from '../actionTypes'

import {
	fetchTeacherData,
	fetchClassroom,
	fetchSubmissionsAll
} from '../../services/TeacherService'

/* ===== INITIALIZATION */
export const init = (teacherId: string) => async dispatch => {
	const teacherData = await fetchTeacherData(teacherId)
	const classroomId = teacherData.classrooms[0].id

	const [classroom, submissions] = await Promise.all([
		fetchClassroom(classroomId),
		fetchSubmissionsAll(classroomId)
	])

	console.log(classroom, submissions)
	dispatch(setSubmissions(submissions))
}

const setSubmissions = (submissions: string[]) => ({
	type: SET_SUBMISSIONS,
	submissions
})

/* ===== RUNTIME */
export const updateFeedbacks = (studentId: string, checkpointId: string, feedbackChanges) => ({
	type: UPDATE_FEEDBACKS,
	studentId,
	checkpointId,
	feedbackChanges
})

export const setCurrentClassroomByIndex = (classroomIndex:number) => ({
	type: SET_CURRENT_CLASSROOM_BY_INDEX,
	classroomIndex
})

export const setCurrentSubmissionByIndex = (submissionIndex:number) => ({
	type: SET_CURRENT_SUBMISSION_BY_INDEX,
	submissionIndex
})
