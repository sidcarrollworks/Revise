import axios from 'axios'

// instantiate axios
const client = axios.create({
  baseURL: '/api'
})

client.fetchToken = function() {
	return localStorage.getItem('token')
}

client.setDefaultHeader = function() {
	this.defaults.headers.common.Authorization = "Bearer " + this.fetchToken()
}

client.getDashboardInfo = function() {
	this.setDefaultHeader();
	return this({ method: 'get', url: '/dashboard/info' })
		.then(res => {
			console.log(res)
			if(res.data.success)
				return res.data.user;
			else
				throw new Error("failed to get dashboard info");
		})
}

client.getCurrentUser = function() {
	this.setDefaultHeader();
	return this({ method: 'get', url: '/user/me' })
		.then(res => {
			if(res.data.success)
				return res.data.user;
			else
				throw new Error("failed to get user info");
		})
}




export default client
