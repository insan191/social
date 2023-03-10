import { Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiErrorCircle } from 'react-icons/bi'
import InputMask from 'react-input-mask'
import { useDispatch } from 'react-redux'
import { fillUser } from '../../../redux/reducers/user.js'
import axios from '../../../utils/axios.js'

const EditMyProfileContacts = ({ user }) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const toast = useToast()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onTouched' })

	const handleChangeContacts = data => {
		axios
			.patch(`/users/${user._id}/contactschange`, {
				...data,
			})
			.then(({ data }) => {
				dispatch(fillUser(data))
				toast({
					title: 'Изменения сохранены',
					status: 'success',
					duration: 5000,
					position: 'center-top',
					isClosable: true,
				})
			})
			.catch(err => console.log(err))
	}
	return (
		<form
			className='editMyProfile__form'
			onSubmit={handleSubmit(handleChangeContacts)}
		>
			<div className='editMyProfile__form-card'>
				<label htmlFor='phone' className='editMyProfile__form-label'>
					{t('form.labelPhone')}:
				</label>
				<div className='editMyProfile__form-block'>
					<InputMask
						style={{ border: errors.phone && '#f5222d 1px solid' }}
						mask={`+\\9\\96(999)99-99-99`}
						type='tel'
						defaultValue={user.phone}
						{...register('phone', {
							required: {
								value: true,
								message: 'Это поле обязательное',
							},
							pattern: {
								value: /^\+996\(\d{3}\)\d{2}-\d{2}-\d{2}$/,
								message: 'Заполните номер телефона',
							},
						})}
						className='editMyProfile__form-field'
						id='phone'
					/>
					<span className='editMyProfile__form-error'>
						{errors.phone && <BiErrorCircle fill='#f5222d' />}
						<span className='editMyProfile__form-error-text'>
							{errors.phone && errors.phone.message}
						</span>
					</span>
				</div>
			</div>
			<div className='editMyProfile__form-card'>
				<label htmlFor='additionalPhone' className='editMyProfile__form-label'>
					Доп. телефон:
				</label>
				<div className='editMyProfile__form-block'>
					<InputMask
						style={{ border: errors.phone && '#f5222d 1px solid' }}
						defaultValue={user.additionalPhone}
						mask={`+\\9\\96(999)99-99-99`}
						type='tel'
						{...register('additionalPhone', {
							required: {
								value: true,
								message: 'Это поле обязательное',
							},
							pattern: {
								value: /^\+996\(\d{3}\)\d{2}-\d{2}-\d{2}$/,
								message: 'Заполните номер телефона',
							},
						})}
						className='editMyProfile__form-field'
						id='additionalPhone'
					/>
					<span className='editMyProfile__form-error'>
						{errors.additionalPhone && <BiErrorCircle fill='#f5222d' />}
						<span className='editMyProfile__form-error-text'>
							{errors.additionalPhone && errors.additionalPhone.message}
						</span>
					</span>
				</div>
			</div>
			<div className='editMyProfile__form-card'>
				<label htmlFor='site' className='editMyProfile__form-label'>
					Личный сайт:
				</label>
				<div className='editMyProfile__form-block'>
					<input
						className='editMyProfile__form-field'
						id='site'
						defaultValue={user.site}
						{...register('site')}
					/>
				</div>
			</div>
			<div className='editMyProfile__form-card'>
				<Button
					colorScheme='blue'
					padding='10px'
					className='editMyProfile__form-btn'
					type='submit'
				>
					Сохранить
				</Button>
			</div>
		</form>
	)
}

export default EditMyProfileContacts
