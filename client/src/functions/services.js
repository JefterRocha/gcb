// const URI = 'https://singleplayer-api.herokuapp.com/posts'

const fetchData = async (id = '', params = { method: 'GET' }) => {
	try {
		const response = await fetch(`/doctors/${id}`, {
			headers: new Headers({ 'Content-Type': 'application/json' }),
			...params
		})
		return await response.json()

	} catch (e) {
		console.log(e)
	}
}

export { fetchData }