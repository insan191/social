import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import findUsers from './reducers/findUsers'
import { friendsSlice } from './reducers/friends'
import { ingoingSlice } from './reducers/ingoing'
import { outgoingSlice } from './reducers/outgoing'
import user from './reducers/user'

const rootReducer = combineReducers({
	user,
	findUsers,
})

const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: {
		persistedReducer,
		[ingoingSlice.reducerPath]: ingoingSlice.reducer,
		[outgoingSlice.reducerPath]: outgoingSlice.reducer,
		[friendsSlice.reducerPath]: friendsSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		})
			.concat(ingoingSlice.middleware)
			.concat(outgoingSlice.middleware)
			.concat(friendsSlice.middleware),
})

export const persistor = persistStore(store)

export default store
