import {
	Button,
	Radio,
	RadioGroup,
	Select,
	Stack,
	useToast,
} from '@chakra-ui/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiErrorCircle } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { fillUser } from '../../../redux/reducers/user'
import axios from '../../../utils/axios.js'
import { days, months, years } from '../../../utils/birthday'

const EditMyProfileMain = ({ user }) => {
	const dispatch = useDispatch()
	const { t, i18n } = useTranslation()
	const toast = useToast()
	const status = [
		{ ru: { men: 'Не выбрано', women: 'Не выбрано' }, en: 'Not selected' },
		{ ru: { men: 'Не женат', women: 'Не замужем' }, en: 'Unmarried' },
		{ ru: { men: 'Женат', women: 'Замужем' }, en: 'Married' },
		{ ru: { men: 'Встречаюсь', women: 'Встречаюсь' }, en: 'Dating' },
	]
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({ mode: 'onTouched' })
	const handleChangeUser = data => {
		const { days, months, years, ...other } = data
		axios
			.patch(`/users/${user._id}/profilechange`, {
				...other,
				birthday: `${days} ${months} ${years}`,
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
			onSubmit={handleSubmit(handleChangeUser)}
		>
			<div className='editMyProfile__form-card'>
				<label htmlFor='name' className='editMyProfile__form-label'>
					{t('form.labelName')}:
				</label>
				<div className='editMyProfile__form-block'>
					<input
						className='editMyProfile__form-field'
						defaultValue={user.name}
						style={{ border: errors.name && '#f5222d 1px solid' }}
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
						id='name'
					/>
					<span className='editMyProfile__form-error'>
						{errors.name && <BiErrorCircle fill='#f5222d' />}
						<span className='editMyProfile__form-error-text'>
							{errors.name && errors.name.message}
						</span>
					</span>
				</div>
			</div>
			<div className='editMyProfile__form-card'>
				<label htmlFor='surname' className='editMyProfile__form-label'>
					{t('form.labelSurname')}:
				</label>
				<div className='editMyProfile__form-block'>
					<input
						className='editMyProfile__form-field'
						defaultValue={user.surname}
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
						id='surname'
					/>
					<span className='register__error'>
						{errors.surname && <BiErrorCircle fill='#f5222d' />}
						<span className='register__error-text'>
							{errors.surname && errors.surname.message}
						</span>
					</span>
				</div>
			</div>
			<div className='editMyProfile__form-card'>
				<label htmlFor='gender' className='editMyProfile__form-label'>
					{t('form.labelGender')}:
				</label>
				<div className='editMyProfile__form-block'>
					<Controller
						name='gender'
						control={control}
						render={({ field: { onChange, value } }) => (
							<RadioGroup
								onChange={onChange}
								value={value}
								defaultValue={user.gender}
								className='editMyProfile__form-field'
								id='gender'
							>
								<Stack direction='row'>
									<Radio value='men'>Мужской</Radio>
									<Radio value='women'>Женский</Radio>
								</Stack>
							</RadioGroup>
						)}
					/>
				</div>
			</div>
			<div className='editMyProfile__form-card'>
				<label htmlFor='info' className='editMyProfile__form-label'>
					Краткая информация:
				</label>
				<textarea
					className='editMyProfile__form-textarea'
					{...register('info')}
					id='info'
					defaultValue={user.info}
				/>
			</div>
			<div className='editMyProfile__form-card'>
				<label htmlFor='status' className='editMyProfile__form-label'>
					Семейное положение:
				</label>
				<div className='editMyProfile__form-block'>
					<div className='editMyProfile__form-field'>
						<Select
							variant='unstyled'
							{...register('status')}
							defaultValue={user.status}
						>
							{status.map(item => (
								<option
									className='editMyProfile__form-option'
									bg='red'
									value={item.en}
									key={item.en}
								>
									{i18n.language === 'ru' && user.gender === 'men'
										? item.ru.men
										: i18n.language === 'ru' && user.gender === 'women'
										? item.ru.women
										: item.en}
								</option>
							))}
						</Select>
					</div>
				</div>
			</div>
			<div className='editMyProfile__form-card'>
				<label htmlFor='birthday' className='editMyProfile__form-label'>
					{t('form.labelAge')}:
				</label>
				<div className='editMyProfile__form-birthday' id='birthday'>
					<Select
						variant='unstyled'
						className='editMyProfile__form-field'
						{...register('days')}
						defaultValue={user.birthday.split(' ')[0]}
					>
						{days.map(item => (
							<option
								className='editMyProfile__form-option'
								value={item}
								key={item}
							>
								{item}
							</option>
						))}
					</Select>
					<Select
						variant='unstyled'
						{...register('months')}
						defaultValue={user.birthday.split(' ')[1]}
						className='editMyProfile__form-field'
					>
						{months.map(item => (
							<option
								className='editMyProfile__form-option'
								value={item.en}
								key={item.en}
							>
								{i18n.language === 'ru' ? item.ru : item.en}
							</option>
						))}
					</Select>
					<Select
						variant='unstyled'
						{...register('years')}
						defaultValue={user.birthday.split(' ')[2]}
						className='editMyProfile__form-field'
					>
						{years(2009).map(item => (
							<option
								className='editMyProfile__form-option'
								bg='red'
								value={item}
								key={item}
							>
								{item}
							</option>
						))}
					</Select>
				</div>
			</div>
			<div className='editMyProfile__form-card'>
				<label htmlFor='city' className='editMyProfile__form-label'>
					{t('form.labelCity')}:
				</label>
				<div className='editMyProfile__form-block'>
					<input
						className='editMyProfile__form-field'
						defaultValue={user.city}
						id='city'
						{...register('city', {
							required: { value: true, message: 'Enter a city' },
						})}
						style={{
							border: errors.city && '#f5222d 1px solid',
						}}
					/>
					<span className='register__error'>
						{errors.city && <BiErrorCircle fill='#f5222d' />}
						<span className='register__error-text'>
							{errors.city && errors.city.message}
						</span>
					</span>
				</div>
			</div>
			<div className='editMyProfile__form-card'>
				<label htmlFor='language' className='editMyProfile__form-label'>
					Владение языками:
				</label>
				<div className='editMyProfile__form-block'>
					<input
						className='editMyProfile__form-field'
						id='language'
						defaultValue={user.language}
						{...register('language')}
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

export default EditMyProfileMain
