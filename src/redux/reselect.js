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
