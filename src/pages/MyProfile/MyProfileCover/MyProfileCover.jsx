import React, { useRef } from 'react'
import { SlPencil } from 'react-icons/sl'
import { useDispatch } from 'react-redux'
import { fillUser } from '../../../redux/reducers/user.js'
import axios from '../../../utils/axios.js'

const MyProfileCover = ({ user, mouse }) => {
	const image = useRef()
	const dispatch = useDispatch()
	const addCover = async data => {
		try {
			const res = await axios.patch(`/users/${user._id}/addcover`, {
				url: data,
			})

			dispatch(fillUser(res.data))
		} catch (err) {
			console.log(err)
		}
	}
	const handleImage = async e => {
		try {
			const formData = new FormData()
			const file = e.target.files[0]
			formData.append('image', file)
			await axios
				.post('/upload', formData)
				.then(({ data }) => addCover(data.url))
		} catch (error) {
			console.log(error)
			alert('Ошибка при загрузке файла')
		}
	}

	return (
		<>
			{mouse === true && (
				<button
					className='profile__info-cover'
					onClick={() => image.current.click()}
				>
					<SlPencil />
					Change cover
				</button>
			)}
			<input type='file' hidden id='image' ref={image} onChange={handleImage} />
		</>
	)
}

export default MyProfileCover
