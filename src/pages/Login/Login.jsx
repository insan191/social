import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiErrorCircle } from 'react-icons/bi'

import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { fillUser } from '../../redux/reducers/user'
import axios from '../../utils/axios'

const Login = () => {
	const { t } = useTranslation()

	const navigate = useNavigate()

	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onTouched' })

	const loginUser = data => {
		axios
			.post('/auth/login', data)
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
						onSubmit={handleSubmit(loginUser)}
					>
						<h1 className='register__title'>{t('form.title2')}</h1>
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

						<button className='register__btn' type='submit'>
							{t('form.btn2')}
						</button>

						<Link className='register__question' to='/register'>
							{t('form.question2')}
						</Link>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
