import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import '../src/styles/style.scss'
import Layout from './Layout/Layout'
import Friends from './pages/Friends/Friends'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import MyProfile from './pages/MyProfile/MyProfile'
import NotFound from './pages/NotFound/NotFound'
import Register from './pages/Register/Register'
import './utils/i18n'

function App() {
	const { user } = useSelector(store => store.user)

	return (
		<Suspense fallback={'...Loading'}>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route path='' element={<Home />} />
					<Route path='friends' element={<Friends />} />

					{!user.login.length && (
						<Route path='register' element={<Register />} />
					)}
					{!user.login.length && <Route path='login' element={<Login />} />}

					<Route path='myprofile' element={<MyProfile />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</Suspense>
	)
}

export default App
