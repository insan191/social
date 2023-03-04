import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'

import MyProfilePostsItem from './MyProfilePostsItem/MyProfilePostsItem'
const MyProfilePosts = ({ user }) => {
	const arrPosts = [...user.posts].reverse()
	return (
		<div className='profile__posts'>
			<Tabs colorScheme='blue' variant='solid-rounded'>
				<TabList className='profile__posts-heading'>
					<Tab color='#ffffff' className='profile__posts-title'>
						Все записи
					</Tab>
					<Tab color='#ffffff' className='profile__posts-title'>
						Мои записи
					</Tab>
					<Tab color='#ffffff' className='profile__posts-title'>
						Архив записей
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel className='profile__posts-list'>
						{arrPosts.map((item, idx) => (
							<MyProfilePostsItem item={item} idx={idx} key={item.id} />
						))}
					</TabPanel>
					<TabPanel className='profile__posts-list'>
						{arrPosts.map((item, idx) => (
							<MyProfilePostsItem item={item} idx={idx} key={item.id} />
						))}
					</TabPanel>
					<TabPanel className='profile__posts-list'>
						{arrPosts.map((item, idx) => (
							<MyProfilePostsItem item={item} idx={idx} key={item.id} />
						))}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	)
}

export default MyProfilePosts
