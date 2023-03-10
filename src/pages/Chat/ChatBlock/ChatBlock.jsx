import {
	Avatar,
	Button,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
} from '@chakra-ui/react'
import EmojiPicker from 'emoji-picker-react'
import React, { useState } from 'react'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { BsFillEmojiLaughingFill } from 'react-icons/bs'
import { FaMicrophone } from 'react-icons/fa'
import { FiMoreHorizontal } from 'react-icons/fi'
import { RiSendPlaneFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { chatSelector } from '../../../redux/reselect'
const ChatBlock = () => {
	const [message, setMessage] = useState('')
	const {data} = useSelector(chatSelector)
	return (
		<div className='chat__block'>
			<div className='chat__block-top'>
				<h3 className='chat__block-top-name'>
					{data.name} {data.surname}
				</h3>
				<div className='chat__block-top-right'>
					<Popover className='chat__block-top-popover'>
						<PopoverTrigger>
							<Button colorScheme='blackAlpha' variant='ghost'>
								<FiMoreHorizontal />
							</Button>
						</PopoverTrigger>
						<PopoverContent
							bg=' rgba(0, 0, 0, 0.4)'
							border='none'
							borderRadius='8px'
							width='200px'
							placement='bottom-end'
						>
							<PopoverArrow />
							<PopoverBody>
								<ul className='chat__block-top-popover-list'>
									<li className='chat__block-top-popover-item'>
										Search message history
									</li>
									<li className='chat__block-top-popover-item'>Report</li>
								</ul>
							</PopoverBody>
						</PopoverContent>
					</Popover>
					<Avatar
						name={data.name}
						src={`${process.env.REACT_APP_URL}${data.image}`}
						className='chat__block-top-avatar'
					/>
				</div>
			</div>
			<div className='chat__block-message'></div>
			<div className='chat__block-bottom'>
				<Button colorScheme='blackAlpha' variant='ghost'>
					<AiOutlinePaperClip size='25px' />
				</Button>
				<textarea
					type='text'
					value={message}
					onChange={e => setMessage(e.target.value)}
					className='chat__block-bottom-field'
				/>

				<Popover>
					<PopoverTrigger>
						<Button
							colorScheme='blackAlpha'
							className='chat__block-bottom-emojiIcon'
							variant='ghost'
						>
							<BsFillEmojiLaughingFill size='20px' />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						border='none'
						borderRadius='8px'
						placement='bottom-end'
					>
						<PopoverBody className='chat__block-bottom-emojiPicker'>
							<EmojiPicker
								onEmojiClick={e => setMessage(message + e.emoji)}
								theme='light'
								emojiStyle='google'
								height='300px'
								skinTonePickerLocation='PREVIEW'
								searchDisabled='true'
								lazyLoadEmojis='trues'
							/>
						</PopoverBody>
					</PopoverContent>
				</Popover>
				{message.length ? (
					<Button colorScheme='blackAlpha' variant='ghost'>
						<RiSendPlaneFill size='25px' />
					</Button>
				) : (
					<Button colorScheme='blackAlpha' variant='ghost'>
						<FaMicrophone size='25px' />
					</Button>
				)}
			</div>
		</div>
	)
}

export default ChatBlock
