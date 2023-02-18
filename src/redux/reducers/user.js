import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: {
		login: '',
	},
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		fillUser: (state, action) => {
			state.user = action.payload
		},
	},
})

export const { fillUser } = userSlice.actions
export default userSlice.reducer
