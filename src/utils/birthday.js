export const days = new Array(31).fill(null, 0, 31).map((item, idx) => idx + 1)
export const months = [
	{ ru: 'Январь', en: 'January' },
	{ ru: 'Февраль', en: 'February' },
	{ ru: 'Март', en: 'March' },
	{ ru: 'Апрель', en: 'April' },
	{ ru: 'Май', en: 'May' },
	{ ru: 'Июнь', en: 'June' },
	{ ru: 'Июль', en: 'July' },
	{ ru: 'Август', en: 'August' },
	{ ru: 'Сентябрь', en: 'September' },
	{ ru: 'Октябрь', en: 'October' },
	{ ru: 'Ноябрь', en: 'November' },
	{ ru: 'Декабрь', en: 'December' },
]
export const years = max => {
	let arr = []
	for (let i = max; i > max - 50; i--) {
		arr = [...arr, i]
	}
	return arr
}
