import { Button, Icon, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'

const PhotosItem = ({ item, delPhoto }) => {
	const [mouse, setMouse] = useState(false)

	return (
		<div
			className='photos__row-item'
			onMouseEnter={() => setMouse(prev => !prev)}
			onMouseLeave={() => setMouse(prev => !prev)}
		>
			<img
				data-fancybox='gallery'
				data-caption={item.description}
				src={`${process.env.REACT_APP_URL}${item.url}`}
				alt={item.description}
				className='photos__row-img'
			/>
			{mouse === true && (
				<div className='photos__row-tools'>
					<span className='photos__row-tool' onClick={() => delPhoto(item.id)}>
						<Tooltip label='Удалить' aria-label='A tooltip'>
							<Button
								colorScheme='blackAlpha'
								variant='ghost'
								size='xs'
								className='profile__photos-row-tool'
								onClick={() => delPhoto(item.id)}
							>
								<Icon className='profile__photos-row-tool' as={AiFillDelete} />
							</Button>
						</Tooltip>
					</span>
				</div>
			)}
		</div>
	)
}

export default PhotosItem
