import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import FriendsIngoing from './FriendsIngoing/FriendsIngoing'
import FriendsOutgoing from './FriendsOutgoing/FriendsOutgoing'

const FriendsRequests = () => {
	return (
		<section className='requests'>
			<Tabs colorScheme='blue' isFitted variant='solid-rounded'>
				<TabList className='requests__heading'>
					<Tab className='requests__title' color='#ffffff'>
						Outgoing
					</Tab>
					<Tab className='requests__title' color='#ffffff'>
						Ingoing
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<FriendsOutgoing />
					</TabPanel>
					<TabPanel>
						<FriendsIngoing />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</section>
	)
}

export default FriendsRequests
