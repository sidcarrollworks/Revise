import axios from 'axios'

// instantiate axios
const client = axios.create({
  baseURL: '/api'
})

client.fetchToken = function() {
	return localStorage.getItem('token')
}


client.getCurrentUser = function() {
	this.defaults.headers.common.Authorization = "Bearer " + client.fetchToken()
	return this({ method: 'get', url: '/user/me' })
		.then(res => {
			if(res.data.success) {
				return res.data.user
			} else {
				throw new Error("failed to get user info")
			}
		})
}




export default client
