import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ingoingSlice = createApi({
	reducerPath: 'ingoing',
	tagTypes: ['users'],
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL }),
	endpoints: build => ({
		getIngoing: build.query({
			query: arr => `users?requests=${arr.join(',')}`,
			providesTags: ['users'],
		}),
		cancelIngoing: build.mutation({
			query: arg => ({
				url: 'request/mycancel',
				method: 'PATCH',
				body: arg,
			}),
			invalidatesTags: ['users'],
		}),
	}),
})
export const { useGetIngoingQuery, useCancelIngoingMutation } = ingoingSlice
