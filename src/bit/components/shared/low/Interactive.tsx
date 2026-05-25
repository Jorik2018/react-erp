import { Box } from '@chakra-ui/react'
import styled from 'styled-components'

const Rendered = styled(Box)`
	transition: 250ms all;
	cursor: pointer;
	outline: 0;

	&.interactive:focus {
    box-shadow: 0 0 0 3px ${props => props.theme.accentVariant};
    z-index: 999;
	}
`

const Interactive = ({ className, onClick, ...props }:
	{ className: string, onClick: () => void }
) => {
	return (
		<Rendered
			className={`interactive ${className || ''}`}
			tabIndex="0"
			onKeyDown={(e: { key: string, preventDefault: () => void }) => {
				switch (e.key) {
					case ' ':
					case 'Enter':
						e.preventDefault()
						onClick()
						break;
					default:
						break
				}
			}}
			onClick={onClick}
			{...props}
		/>
	)
}

export default Interactive
