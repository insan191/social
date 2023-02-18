import { useTranslation } from 'react-i18next'

const SwitchLang = () => {
	const { i18n } = useTranslation()

	const changesLanguage = lang => {
		i18n.changeLanguage(lang)
	}

	return (
		<div className='switchLangs'>
			<button
				className={`switchLangBtn ${i18n.language === 'ru' ? 'active' : ''}`}
				onClick={() => {
					changesLanguage('ru')
				}}
			>
				RU
			</button>
			<button
				className={`switchLangBtn ${i18n.language === 'en' ? 'active' : ''}`}
				onClick={() => {
					changesLanguage('en')
				}}
			>
				EN
			</button>
		</div>
	)
}

export default SwitchLang
