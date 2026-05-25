import { ReactNode } from 'react'
import styled from 'styled-components'

type ContainerProps = {
	orientation: string,
	fullSizeAxis?: boolean,
	fullSizeOffAxis?: boolean
}

const Container = styled.div<ContainerProps>`
	${props => {
		if (props.orientation.toUpperCase() !== 'VERTICAL') {
			return `
        ${props.fullSizeAxis ? 'width: 100%;' : ''}
        ${props.fullSizeOffAxis ? 'height: 100%;' : ''}
      `
		}
		return `
    ${props.fullSizeAxis ? 'height: 100%;' : ''}
    ${props.fullSizeOffAxis ? 'width: 100%;' : ''}
    `
	}}
	display: flex;
	flex-direction: ${props =>
		props.orientation.toUpperCase() !== 'VERTICAL' ? 'row' : 'column'};
`
type LeftPanelWrapper = {
	ratio?: number,
	centerX?: boolean,
	centerY?: boolean,
	centerBoth?: boolean,
	className?: string,
	style?: string
}

const centering = (props: LeftPanelWrapper) => `
  ${props.centerX || props.centerY || props.centerBoth
		? `display: flex;
    flex-direction: column;`
		: ''
	}
  ${props.centerX || props.centerBoth ? 'align-items: center;' : ''}
  ${props.centerY || props.centerBoth ? 'justify-content: center;' : ''}
`

const LeftPanelWrapper = styled.div<LeftPanelWrapper>`
	flex: ${props => props.ratio || 0.5};
	${props => centering(props)}
	position: relative;
`

const RightPanelWrapper = styled.div<LeftPanelWrapper>`
	flex: ${props => 1 - (props.ratio || 0.5)};
	${props => centering(props)}
	position: relative;
`

const TwoPanel = ({
	className,
	ratio,
	orientation = 'horizontal',

	fullSizeAxis,
	fullSizeOffAxis,

	first,
	firstStyle,
	firstCenterX,
	firstCenterY,
	firstCenterBoth,

	second,
	secondStyle,
	secondCenterX,
	secondCenterY,
	secondCenterBoth,

	children
}: {
	className: string,
	ratio: number,
	orientation?: string,

	fullSizeAxis?: boolean,
	fullSizeOffAxis?: boolean,

	first: ReactNode,
	firstStyle?: string,
	firstCenterX?: boolean,
	firstCenterY?: boolean,
	firstCenterBoth: boolean,

	second: ReactNode,
	secondStyle?: string,
	secondCenterX: boolean,
	secondCenterY?: boolean,
	secondCenterBoth?: boolean,
	children?: ReactNode[]
}) => (
	<Container
		className={className}
		orientation={orientation}
		fullSizeAxis={fullSizeAxis}
		fullSizeOffAxis={fullSizeOffAxis}
	>
		<LeftPanelWrapper
			style={firstStyle}
			className="low-profile-scrollbar only-hover"
			centerX={firstCenterX}
			centerY={firstCenterY}
			centerBoth={firstCenterBoth}
			ratio={ratio}
		>
			{first}
		</LeftPanelWrapper>
		<RightPanelWrapper
			style={secondStyle}
			className="low-profile-scrollbar fat"
			centerX={secondCenterX}
			centerY={secondCenterY}
			centerBoth={secondCenterBoth}
			ratio={ratio}
		>
			{second}
		</RightPanelWrapper>
		{children}
	</Container>
)

export default TwoPanel
