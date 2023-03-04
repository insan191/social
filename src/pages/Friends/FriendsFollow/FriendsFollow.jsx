import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import FriendsFollowCard from './FriendsFollowCard/FriendsFollowCard'
const FriendsFollow = ({ search, setSearch, data }) => {
	return (
		<div className='friends__follow'>
			<div className='friends__top'>
				<h2 className='friends__title'>Search friends</h2>
			</div>
			<div className='friends__search'>
				<input
					value={search}
					onChange={e => setSearch(e.target.value)}
					type='text'
					className='friends__search-input'
					placeholder={'Search'}
				/>
				<button className='friends__search-btn'>
					<AiOutlineSearch />
				</button>
			</div>
			<div className='friends__cards'>
				{data.map(item => (
					<FriendsFollowCard key={item._id} item={item} />
				))}
			</div>
		</div>
	)
}

export default FriendsFollow
