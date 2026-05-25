import styled from 'styled-components'

import DynamicModal, { Container } from './DynamicModal'

const CustomContainer = styled(Container)`
	display: flex;
	flex-direction: column;
`
type ContentProps={
	ratio:number
}
const Header = styled.div<ContentProps>`
	flex: ${props => props.ratio};
	background-color: black;
	color: white;
`
const Content = styled.div<ContentProps>`
	flex: ${props => 1 - props.ratio};
`

const PostModal = ({
	open,
	closed,
	scaleX = 1,
	scaleY = 1,
	header,
	content,
	children,
	ratio = 0.5
}:{
	open,
	closed,
	scaleX :number,
	scaleY :number,
	header,
	content,
	children,
	ratio :number
}) => (
	<DynamicModal
		className="low-profile-scrollbar fat"
		custom
		open={open}
		closed={closed}
	>
		<CustomContainer scaleX={scaleX} scaleY={scaleY}>
			<Header className="low-profile-scrollbar" ratio={ratio}>
				{header}
			</Header>
			<Content className="low-profile-scrollbar" ratio={ratio}>
				{content}
			</Content>
			{children}
		</CustomContainer>
	</DynamicModal>
)

export default PostModal
