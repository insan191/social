import { createSelector } from '@reduxjs/toolkit'

export const userSelector = createSelector(
	store => store.persistedReducer.user,
	item => item
)
export const notificationSelector = createSelector(
	store => store.persistedReducer.notification,
	item => item
)
export const findUserSelector = createSelector(
	store => store.persistedReducer.findUser,
	item => item
)
export const chatsSelector = createSelector(
	store => store.persistedReducer.chats,
	item => item
)
export const chatSelector = createSelector(
	store => store.persistedReducer.chat,
	item => item
)

