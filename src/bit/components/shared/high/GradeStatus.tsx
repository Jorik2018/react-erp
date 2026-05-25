import { ReactNode } from 'react'
import styled from 'styled-components'
import Dot from '@mui/icons-material/FiberManualRecord'

import IconLine from '../low/IconLine'
import { Obj } from '../../../../classroom/models'

const selectColor = (props: ContainerProps) => {
	switch (props.status) {
		case 'success':
			return props.theme.pastel.green
		case 'fatal':
			return props.theme.pastel.red
		case 'warning':
			return props.theme.muted.yellow
		case 'none':
			return '#aaaaaa'
		default:
			return props.theme.accent
	}
}

type ContainerProps={ status: string, theme: { pastel: Obj, muted: Obj, accent: Obj } }

const Container = styled<ContainerProps>(IconLine)`
	margin-top: 0;
	font-weight: bold;
	color: ${(props) => selectColor(props)};
`

const GradeStatus = ({ className, status = '', children }: {
	className: string, status: string, children: ReactNode[]
}) => {
	return (
		<Container
			className={className}
			icon={<Dot />}
			gap={'0.5em'}
			status={status.toLowerCase()}
		>
			{children}
		</Container>
	)
}

export default GradeStatus
