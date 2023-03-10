import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios'

export const findChats = createAsyncThunk(
	'chats/findChats',
	async (id, { rejectWithValue }) => {
		try {
			const res = await axios(`/chats/${id}`)

			if (res.statusText !== 'OK') {
				throw new Error('Error')
			}

			return res.data
		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
)

const chatsSlice = createSlice({
	name: 'chats',
	initialState: {
		data: [],
		status: '',
		error: '',
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(findChats.pending, state => {
			state.status = 'loading'
			state.error = ''
		})
		builder.addCase(findChats.rejected, (state, action) => {
			state.status = 'error'
			state.error = action.payload
		})
		builder.addCase(findChats.fulfilled, (state, action) => {
			state.status = 'Done'
			state.data = action.payload
		})
	},
})
export default chatsSlice.reducer
