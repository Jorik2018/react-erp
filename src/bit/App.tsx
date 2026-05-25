import React, { useEffect } from 'react'
import { Route, Switch, BrowserRouter, Routes } from 'react-router-dom'

import Home from './components/Home'

import Student from './components/Student/Student'
import Teacher from './components/Teacher/Teacher'

import Learn from './components/Learn/Learn'
import Explore from './components/Explore/Explore'
import Module from './components/Student/Module/Module'
import Activity from './components/Student/Activity/Activity'
import World from './components/Student/World/World'

import NotFound from './components/Error/404NotFound'

import WithGlobalHOC from './components/HOC/WithGlobalHOC'

import { ping } from './services/TestService'

const App = () => {
	useEffect(() => {
		ping()
	}, [])

	return (
		<Routes>
			<WithGlobalHOC>
					<Route path="/" element={<Home/>} />
					<Route path="/explore/" element={<Explore/>} />
					<Route path="/modules/:id/" element={<Module/>} />
					<Route path="/activities/:id/" element={<Activity/>} />
					<Route path="/worlds/:id/" element={<World/>} />
					<Route path="/dashboard/" element={<Student/>} />
					<Route path="/learn/" element={<Learn/>} />
					<Route path="/grade/" element={<Teacher/>} />
					<Route element={<NotFound/>} />
			</WithGlobalHOC>
		</Routes>
	)
}

export default App
