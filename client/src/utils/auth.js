import axios from 'axios';

// instantiate axios
const client = axios.create({
  baseURL: '/auth'
})


client.setToken = function(token) {
  localStorage.setItem('token', token)
	return token
}

// credentials = {username: "jhon", password: "wasabi"}
client.logIn = function(credentials) {
	return this({ method: 'post', url: '/login', data: credentials })
		.then(res => {
			if(res.data.success) {
				this.setToken(res.data.token)
				return res.data.user
			} else {
				return false
			}
		})
}

// {
//   firstName: "jhon",
//   lastName: "wasabi",
//   username: "jwashere",
//   email: "theJ@wasabi.co.uk.isis",
//   dob
// }
// logIn and signUp functions could be combined into one since the only difference is the url we're sending a request to..
client.signUp = function(userInfo) {
	return this({ method: 'post', url: '/signup', data: userInfo})
		.then(res => {
			return res.data.success
		})
}

client.logOut = function() {
	localStorage.removeItem('token')
	return true
}

export default client
