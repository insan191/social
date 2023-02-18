import { Button } from '@mui/material'
import React, { useRef } from 'react'
import axios from '../../utils/axios'

const DownLoadBtn = ({ images, setImages, t }) => {
	const image = useRef()

	const handleChangeImage1 = async e => {
		try {
			const formData = new FormData()
			const file = e.target.files[0]
			formData.append('image', file)
			await axios
				.post('/upload', formData)
				.then(({ data }) => setImages(data.url))
		} catch (err) {
			console.log(e)
			console.log(err, 'Ошибка')
			alert('Ошибка при загрузке файла')
		}
	}

	return (
		<div className='register__photo'>
			<h2 className='register__label-title'>{t('form.labelSurname')}</h2>
			<Button
				className='register__photo-addBtn'
				onClick={() => image.current.click()}
				type='button'
				variant='contained'
				color='success'
			>
				{t('form.photoAddBtn')}
			</Button>
			<input
				ref={image}
				hidden
				type='file'
				className='register__photo-input'
				onChange={handleChangeImage1}
				id='image'
			/>
			{images && (
				<>
					<img
						className='register__photo-image'
						src={`http://localhost:4444${images}`}
						alt='Uploaded'
					/>
					<br />
					<Button
						className='register__photo-delBtn'
						onClick={() => setImages('')}
						type='button'
						variant='contained'
					>
						{t('form.photoDelBtn')}
					</Button>
				</>
			)}
		</div>
	)
}

export default DownLoadBtn
