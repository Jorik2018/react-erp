import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import BackIcon from '@mui/icons-material/KeyboardArrowLeftRounded'

import IconLine from '../low/IconLine'

const Container = styled.div`
	margin-bottom: 0.2em;
	width: fit-content;
	color: ${props => props.theme.offFont};
	cursor: pointer;

	&:hover {
		color: ${props => props.theme.accentVariant};
	}
`

const GoBack = ({ history, className, text = 'Back', hardcodedUrl }:
	{ history:string[], className:string, text :string, hardcodedUrl:string}
) => (
	<Container
		className={className}
		onClick={
			hardcodedUrl
				? () => {
					history.push(hardcodedUrl)
				}
				: history.goBack
		}
	>
		<IconLine icon={<BackIcon />}>{text}</IconLine>
	</Container>
)

export default withRouter(GoBack)
