import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiErrorCircle } from 'react-icons/bi'
import InputMask from 'react-input-mask'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import DownLoadBtn from '../../components/DownloadBtn/DownloadBtn'
import { fillUser } from '../../redux/reducers/user'
import axios from '../../utils/axios'

const Friends = () => {
	const { t } = useTranslation()

	const [images, setImages] = useState('')

	const navigate = useNavigate()

	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({ mode: 'onTouched' })

	const registerUser = data => {
		const { passwordAgain, ...other } = data

		axios
			.post('/auth/register', {
				...other,
				image: images,
			})
			.then(({ data }) => {
				dispatch(fillUser(data))
				navigate('/')
			})
			.catch(err => console.log(err))
	}
	return (
		<div className='register'>
			<div className='container'>
				<div className='register__content'>
					<form
						className='register__form'
						noValidate
						onSubmit={handleSubmit(registerUser)}
					>
						<h1 className='register__title'>{t('form.title1')}</h1>
						<div className='register__block'>
							<label className='register__label'>
								<h2 className='register__label-title'>{t('form.labelName')}</h2>
								<input
									style={{ border: errors.name && '#f5222d 1px solid' }}
									placeholder={t('form.labelName')}
									type='text'
									{...register('name', {
										required: {
											message: 'Enter a first name',
											value: true,
										},
										maxLength: {
											message: 'Maximum length 20 characters',
											value: 20,
										},
										minLength: {
											message: 'Minimum length 3 characters',
											value: 3,
										},
									})}
									className='register__field'
								/>
								<span className='register__error'>
									{errors.name && <BiErrorCircle fill='#f5222d' />}
									<span className='register__error-text'>
										{errors.name && errors.name.message}
									</span>
								</span>
							</label>
							<label className='register__label'>
								<h2 className='register__label-title'>
									{t('form.labelSurname')}
								</h2>
								<input
									type='text'
									style={{ border: errors.surname && '#f5222d 1px solid' }}
									{...register('surname', {
										required: {
											message: 'Enter a last name',
											value: true,
										},
										maxLength: {
											message: 'Maximum length 20 characters',
											value: 20,
										},
										minLength: {
											message: 'Minimum length 3 characters',
											value: 3,
										},
									})}
									className='register__field'
									placeholder={t('form.labelSurname')}
								/>
								<span className='register__error'>
									{errors.surname && <BiErrorCircle fill='#f5222d' />}
									<span className='register__error-text'>
										{errors.surname && errors.surname.message}
									</span>
								</span>
							</label>
						</div>

						<label className='register__label'>
							<h2 className='register__label-title'>{t('form.labelLogin')}</h2>
							<input
								type='text'
								style={{ border: errors.login && '#f5222d 1px solid' }}
								{...register('login', {
									required: {
										message: 'Enter a login',
										value: true,
									},
									maxLength: {
										message: 'Maximum length 20 characters',
										value: 20,
									},
									minLength: {
										message: 'Minimum length 3 characters',
										value: 3,
									},
								})}
								placeholder={t('form.labelLogin')}
								className='register__field'
							/>
							<span className='register__error'>
								{errors.login && <BiErrorCircle fill='#f5222d' />}
								<span className='register__error-text'>
									{errors.login && errors.login.message}
								</span>
							</span>
						</label>
						<label className='register__label'>
							<h2 className='register__label-title'>{t('form.labelPhone')}</h2>
							<InputMask
								style={{ border: errors.phone && '#f5222d 1px solid' }}
								mask={`+\\9\\96(999)99-99-99`}
								type='tel'
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
								className='register__field'
								placeholder={t('form.labelPhone')}
							/>
							<span className='register__error'>
								{errors.phone && <BiErrorCircle fill='#f5222d' />}
								<span className='register__error-text'>
									{errors.phone && errors.phone.message}
								</span>
							</span>
						</label>
						<div className='register__block'>
							<label className='register__label'>
								<h2 className='register__label-title'>
									{t('form.labelPassword')}
								</h2>
								<input
									type='password'
									className='register__field'
									style={{ border: errors.password && '#f5222d 1px solid' }}
									{...register('password', {
										required: {
											message: 'Enter a password',
											value: true,
										},
										maxLength: {
											message: 'Maximum length 20 characters',
											value: 20,
										},
										minLength: {
											message: 'Minimum length 8 characters',
											value: 8,
										},
										pattern: {
											message: 'Enter your password correctly',
											value: /(?=.*[0-9])(?=.*[a-z]){6,}/g,
										},
									})}
									placeholder={t('form.labelPassword')}
								/>
								<span className='register__error'>
									{errors.password && <BiErrorCircle fill='#f5222d' />}
									<span className='register__error-text'>
										{errors.password && errors.password.message}
									</span>
								</span>
							</label>
							<label className='register__label'>
								<h2 className='register__label-title'>
									{t('form.labelPasswordAgain')}
								</h2>
								<input
									type='password'
									className='register__field'
									placeholder={t('form.labelPasswordAgain')}
									style={{
										border: errors.passwordAgain && '#f5222d 1px solid',
									}}
									{...register('passwordAgain', {
										required: {
											message: 'Repeat password',
											value: true,
										},
										validate: v => {
											if (getValues('password') !== v) {
												return 'Your passwords do no match'
											}
										},
									})}
								/>
								<span className='register__error'>
									{errors.passwordAgain && <BiErrorCircle fill='#f5222d' />}
									<span className='register__error-text'>
										{errors.passwordAgain && errors.passwordAgain.message}
									</span>
								</span>
							</label>
						</div>
						<div className='register__block'>
							<label className='register__label'>
								<h2 className='register__label-title'>
									{t('form.labelGender')}
								</h2>
								<div className='register__gender'>
									<div className='register__gender-item'>
										<input
											{...register('gender', {
												required: { value: true, message: 'Specify gender' },
											})}
											id='men'
											value='men'
											className='register__gender-input'
											type='radio'
										/>
										<label htmlFor='men'>Men</label>
									</div>
									<div className='register__gender-item'>
										<input
											{...register('gender', {
												required: { value: true, message: 'Specify gender' },
											})}
											id='women'
											className='register__gender-input'
											type='radio'
											value='women'
										/>
										<label htmlFor='women'>Women</label>
									</div>
								</div>
								<span className='register__error'>
									{errors.gender && <BiErrorCircle fill='#f5222d' />}
									<span className='register__error-text'>
										{errors.gender && errors.gender.message}
									</span>
								</span>
							</label>
						</div>

						<DownLoadBtn images={images} setImages={setImages} t={t} />

						<div className='register__block'>
							<label className='register__label'>
								<h2 className='register__label-title'>{t('form.labelAge')}</h2>
								<input
									type='date'
									{...register('birthday', {
										required: { value: true, message: 'Enter a date' },
									})}
									style={{
										border: errors.birthday && '#f5222d 1px solid',
									}}
									className='register__field'
								/>
								<span className='register__error'>
									{errors.birthday && <BiErrorCircle fill='#f5222d' />}
									<span className='register__error-text'>
										{errors.birthday && errors.birthday.message}
									</span>
								</span>
							</label>

							<label className='register__label'>
								<h2 className='register__label-title'>{t('form.labelCity')}</h2>
								<input
									type='text'
									{...register('city', {
										required: { value: true, message: 'Enter a city' },
									})}
									style={{
										border: errors.city && '#f5222d 1px solid',
									}}
									className='register__field'
									placeholder={t('form.labelCity')}
								/>
								<span className='register__error'>
									{errors.city && <BiErrorCircle fill='#f5222d' />}
									<span className='register__error-text'>
										{errors.city && errors.city.message}
									</span>
								</span>
							</label>
						</div>
						<button className='register__btn' type='submit'>
							{t('form.btn1')}
						</button>
						<Link className='register__question' to='/login'>
							{t('form.question1')}
						</Link>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Friends
