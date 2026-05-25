import { ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import NavBar from '../NavBar/NavBar'

const Main = styled.main`
	background-color: #f9fafa;
	position: relative;
`

const WithNavBar = (props:{children:ReactNode[]}) => (
	<>
		<Routes>
			<Route path="/learn/" />
			<Route path="/grade/" />
			<Route path="/" element={NavBar} />
		</Routes>
		<Main>{props.children}</Main>
	</>
)

export default WithNavBar
