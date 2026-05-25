import styled from 'styled-components'

import Button from './Button'
import { Obj } from '../../../../classroom/models'

const Container = styled.div`
	margin: 0 auto;
`

const CancelButton = styled(Button)`
	border: 0;
	padding: 0.5em 1em 0.5em 0.5em;
`

const ConfirmButton = styled(Button)`
	padding: 0.5em 2em;
`

const ConfirmCancel = ({
	className,
	cancelText = 'Cancel',
	confirmText = 'Confirm',
	cancelProps,
	confirmProps,
	cancelOnClick,
	confirmOnClick
}: {
	className: string,
	cancelText: string,
	confirmText: string,
	cancelProps: Obj,
	confirmProps: Obj,
	cancelOnClick: () => void,
	confirmOnClick: () => void
}) => {
	return (
		<Container className={className}>
			<CancelButton noOutline {...cancelProps} onClick={cancelOnClick}>
				{cancelText}
			</CancelButton>
			<ConfirmButton invert {...confirmProps} onClick={confirmOnClick}>
				{confirmText}
			</ConfirmButton>
		</Container>
	)
}

export default ConfirmCancel
