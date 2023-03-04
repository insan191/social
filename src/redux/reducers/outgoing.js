import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const outgoingSlice = createApi({
	reducerPath: 'outgoing',
	tagTypes: ['users'],
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL }),
	endpoints: build => ({
		getOutgoing: build.query({
			query: arr => `users?notification=${arr.join(',')}`,
			providesTags: ['users'],
		}),
		cancelOutgoing: build.mutation({
			query: arg => ({
				url: '/request/cancel',
				method: 'PATCH',
				body: arg,
			}),
			invalidatesTags: ['users'],
		}),
		acceptOutgoing: build.mutation({
			query: arg => ({
				url: '/request/add',
				method: 'PATCH',
				body: arg,
			}),
		}),
	}),
})
export const {
	useGetOutgoingQuery,
	useCancelOutgoingMutation,
	useAcceptOutgoingMutation,
} = outgoingSlice
