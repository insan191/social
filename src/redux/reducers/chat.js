import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios'

export const findChat = createAsyncThunk(
	'chat/findChat',
	async (id, { rejectWithValue }) => {
		try {
			const res = await axios(`/users/${id}`)

			if (res.statusText !== 'OK') {
				throw new Error('Error')
			}

			return res.data
		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
)

const chatSlice = createSlice({
	name: 'chat',
	initialState: {
		data: [],
		status: '',
		error: '',
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(findChat.pending, state => {
			state.status = 'loading'
			state.error = ''
		})
		builder.addCase(findChat.rejected, (state, action) => {
			state.status = 'error'
			state.error = action.payload
		})
		builder.addCase(findChat.fulfilled, (state, action) => {
			state.status = 'Done'
			state.data = action.payload
		})
	},
})
export default chatSlice.reducer
