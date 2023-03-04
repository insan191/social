import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const friendsSlice = createApi({
	reducerPath: 'myFriends',
	tagTypes: ['users'],
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL }),
	endpoints: build => ({
		getFriends: build.query({
			query: arr => `users?friends=${arr.join(',')}`,
			providesTags: ['users'],
		}),
	}),
})
export const { useGetFriendsQuery } = friendsSlice
