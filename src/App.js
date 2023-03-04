import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import '../src/styles/style.scss'
import AuthRouting from './routing/AuthRouting'
import PrivateRouting from './routing/PrivateRouting'
import './utils/i18n'

function App() {
	const { user } = useSelector(store => store.persistedReducer.user)

	return (
		<Suspense fallback={'...Loading'}>
			{!user.login.length ? <AuthRouting /> : <PrivateRouting />}
		</Suspense>
	)
}

export default App
