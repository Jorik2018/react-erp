import React from 'react'
import styled from 'styled-components'
import RightArrow from '@mui/icons-material/KeyboardArrowRightRounded'
import Clipboard from '@mui/icons-material/AssignmentRounded'
import Flag from '@mui/icons-material/EmojiFlagsRounded'
import Finish from '@mui/icons-material/DoneRounded'

import {
	STATE_NEXT,
	STATE_FINISH,
	STATE_CONCEPT,
	STATE_CHECKPOINT,
	STATE_HINT
} from '../NextButton'

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 200%;
`

export default function CentralContent({ className, currentButtonState }) {
	const centralContent = () => {
		switch (currentButtonState) {
			case STATE_CHECKPOINT:
				return <Flag style={{ marginBottom: '0.1em' }} />

			case STATE_CONCEPT:
				return <Clipboard />

			case STATE_HINT:
			case STATE_NEXT:
				return <RightArrow />

			case STATE_FINISH:
				return <Finish />

			default:
				if (currentButtonState !== undefined)
					console.log('[CentralContent] error... missing state check?')
				return null
		}
	}

	return <Container className={className}>{centralContent()}</Container>
}
