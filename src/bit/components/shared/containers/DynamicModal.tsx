import { ReactNode } from 'react'
import styled from 'styled-components'

//import Fade from '@material-ui/core/Fade'


import { Backdrop, Fade, Modal } from '@mui/material'
import { sizes } from '../../../styles/media'

type ContainerProps = {
	scaleX: string,
	scaleY: string,
	heightAuto: boolean
}

export const Container = styled.div<ContainerProps>`
	margin: 0 2em;
	border-radius: 5px;
	flex: 1;
	outline: 0;
	overflow-y: auto;
	font-size: 125%;

	display: flex;
	background-color: #fff;

	@media screen and (orientation: landscape) {
		font-size: 100%;
	}

	// SIZING

	max-width: calc(45em * ${props => props.scaleX});
	height: calc(36em * ${props => props.scaleY}); // ipad vertical

	@media screen and (orientation: landscape) and (max-height: ${sizes.tablet}px) {
		height: calc((100% - 4em) * ${props => props.scaleY});
		${props => props.heightAuto && 'height: auto;'}
	}

	// target vertical phone
	@media screen and (orientation: portrait) and (max-width: ${sizes.thone}px) {
		height: calc((100% - 10em) * ${props => props.scaleY});
		${props => props.heightAuto && 'height: auto;'}
	}

	${props =>
		props.heightAuto &&
		`height: auto;
  `}
`

const DynamicModal = ({
	className,
	children,
	open,
	closed,
	custom,
	scaleX = 1,
	scaleY = 1,
	heightAuto
}: {
	className: string,
	children: ReactNode[]
	open,
	closed,
	custom,
	scaleX: number,
	scaleY: number,
	heightAuto: boolean
}) => {
	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={open}
			onClose={closed}
			closeAfterTransition
			backdrop={Backdrop}
			BackdropProps={{
				timeout: 500
			}}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<Fade in={open}>
				{!custom ? (
					<Container
						className={`${className || ''} low-profile-scrollbar fat`}
						scaleX={scaleX}
						scaleY={scaleY}
						heightAuto={heightAuto}
					>
						{children}
					</Container>
				) : (
					children
				)}
			</Fade>
		</Modal>
	)
}

export default DynamicModal
