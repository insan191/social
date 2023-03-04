import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios'

export const findAllUser = createAsyncThunk(
	'findUser/findAllUser',
	async (filter, { rejectWithValue }) => {
		try {
			const res = await axios(
				`/users?not=${filter.login}&search=${filter.search}`
			)

			if (res.statusText !== 'OK') {
				throw new Error('Error')
			}

			return res.data
		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
)

const findUserSlice = createSlice({
	name: 'findUser',
	initialState: {
		data: [],
		status: '',
		error: '',
		filter: {
			search: '',
		},
	},
	reducers: {
		changeSearch: (state, action) => {
			state.filter = {
				...state.filter,
				search: action.payload,
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(findAllUser.pending, state => {
			state.status = 'loading'
			state.error = ''
		})
		builder.addCase(findAllUser.rejected, (state, action) => {
			state.status = 'error'
			state.error = action.payload
		})
		builder.addCase(findAllUser.fulfilled, (state, action) => {
			state.status = 'Done'
			state.data = action.payload
		})
	},
})

export const { changeSearch } = findUserSlice.actions
export default findUserSlice.reducer
