import { ReactNode } from 'react'
import styled from 'styled-components'

type ContainerProps = {
	inline?: boolean,
	width?: string
}

const Container = styled.div<ContainerProps>`
  ${props => (props.inline ? 'display: inline-block;' : '')} 
	width: ${props => props.width || 'fit-to-content'};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

const ClampedDiv = ({ children, className, width, inline }: ContainerProps & 
	{ children: ReactNode|string, className?: string }) => {
	return (
		<Container className={className} width={width} inline={inline}>
			{children}
		</Container>
	)
}

export default ClampedDiv
