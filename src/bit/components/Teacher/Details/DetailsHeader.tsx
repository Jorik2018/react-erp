import styled from 'styled-components'
import { connect } from 'react-redux'
import GradeStatus from '../../shared/high/GradeStatus'
import ProfPic from '../../shared/low/ProfPic'
import ClampedDiv from '../../shared/utils/ClampedDiv'
import { Obj } from '../../../../classroom/models'

const Container = styled.div`
	padding: 1em 2em;
	flex-shrink: 0;
	width: 100%;
`

const AssignmentName = styled(ClampedDiv)`
	margin-top: 0;
	margin-bottom: 0.5em;
	font-weight: bold;
	font-size: 120%;
	width: 12em;
`

const DetailsHeader = ({ isReady, activity, user, feedbacksArray }: {
	isReady: boolean, activity: { name: string },
	user: { name: string, image: string, githubUsername: string }, feedbacksArray: Obj[]
}) => {
	const isAllowedToSubmit = feedbacksArray?.every(
		feedback => feedback?.isPassed !== undefined && feedback?.comment
	)

	const hasNotStarted = feedbacksArray?.every(
		feedback => feedback?.isPassed === undefined && !feedback?.comment
	)

	return (
		isReady && (
			<Container>
				<div style={{ fontSize: '75%' }}>
					<GradeStatus
						status={(() => {
							if (isAllowedToSubmit) return 'success'
							if (hasNotStarted) return 'fatal'
							return 'warning'
						})()}
					>
						{(() => {
							if (isAllowedToSubmit) return 'READY TO SUBMIT'
							if (hasNotStarted) return 'NOT STARTED'
							return 'PARTIALLY GRADED'
						})()}
					</GradeStatus>
				</div>
				<AssignmentName>{activity.name}</AssignmentName>
				<ProfPic
					name={user?.name === 'None' ? user?.githubUsername : user?.name}
					src={user?.image}
				/>
			</Container>
		)
	)
}

const mapStateToProps = (state: {
	cache: { cachedActivities: { [key: string]: Obj }, cachedUsers: { [key: string]: Obj } },
	teacherData: {
		submissions: {
			userId?: string,
			user: { id: string },
			studentId: string,
			activity?: { id: string },
			checkpoints: { checkpoint: { id: string } }[]
		}[],
		indicators: { currentSubmissionIndex: number },
		ram: { feedbacks: Obj }
	}
}) => {
	const {
		cache: { cachedActivities, cachedUsers },
		teacherData: {
			submissions,
			indicators: { currentSubmissionIndex },
			ram: { feedbacks }
		}
	} = state

	const { userId, user, studentId, activity, checkpoints } =
		submissions?.[currentSubmissionIndex] ?? {}

	const feedbacksArray = checkpoints?.map((checkpoint: { checkpoint: { id: string } }) => {
		const { id: checkpointId } = checkpoint.checkpoint
		return feedbacks[`student${studentId}_checkpoint${checkpointId}`]
	})

	return {
		isReady: !!submissions.length,
		activity: cachedActivities[activity!.id],
		user: cachedUsers[userId ?? user.id],
		feedbacksArray
	}
}

export default connect(mapStateToProps)(DetailsHeader)
