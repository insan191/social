import React, { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'
const PhotosItem = ({ item, delPhoto }) => {
	const [mouse, setMouse] = useState(false)

	return (
		<div
			className='profile__photos-row-item'
			onMouseEnter={() => setMouse(prev => !prev)}
			onMouseLeave={() => setMouse(prev => !prev)}
		>
			<img
				data-fancybox='gallery'
				data-caption={item.description}
				src={`${process.env.REACT_APP_URL}${item.url}`}
				alt={item.description}
				className='profile__photos-row-img'
			/>
			{mouse === true && (
				<div className='profile__photos-row-tools'>
					<Icon
						className='profile__photos-row-tool'
						onClick={() => delPhoto(item.id)}
						as={AiFillDelete}
					/>
				</div>
			)}
		</div>
	)
}

export default PhotosItem
