import { Stack, Box, Text, Avatar } from '@chakra-ui/react'

const ProfPic = ({ name, src, size = '1.6em' }:
	{ name: string, src?: string, size?: string }) => {
	return (
		<Stack isInline spacing={`calc(${size}/4)`} align="center" flex={1}>
			<Box>
				<Avatar size={size} name={name} src={src} />
				{/*<Avatar size={size} name={name} src={src} round textSizeRatio={2.5} />*/}
			</Box>
			<Text m="0" fontSize={`calc(${size}/2)`}>
				{name}
			</Text>
		</Stack>
	)
}

export default ProfPic
