import { ReactNode } from 'react'
import styled from 'styled-components'

type ContainerProps = {
	clamp?: number
}

const Container = styled.span<ContainerProps>`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: ${props => props.clamp || 2};
	overflow: hidden;
`

const ClampedText = ({ children, className, clamp }: ContainerProps & { children: ReactNode[], className: string }) => {
	return (
		<Container className={className} clamp={clamp}>
			{children}
		</Container>
	)
}

export default ClampedText
