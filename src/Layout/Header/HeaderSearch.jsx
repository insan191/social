import React from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineSearch } from 'react-icons/ai'

const HeaderSearch = () => {
	const { t } = useTranslation()

	return (
		<label className='header__search'>
			<span className='header__search-icon'>
				<AiOutlineSearch />
			</span>
			<input
				placeholder={t('header.field')}
				className='header__search-field'
				type='text'
			/>
		</label>
	)
}

export default HeaderSearch
