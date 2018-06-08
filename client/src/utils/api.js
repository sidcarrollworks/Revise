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
			if(res.data.success)
				return res.data.info;
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

client.createProject = function(projInfo) {
	this.setDefaultHeader();
	return this({ method: 'post', url: '/project/create', data: projInfo })
		.then(res => {
			if(res.data.success)
				return res.data.projId;
			else
				throw new Error("failed to create project");
		})
}

client.getProjInfo = function(pid) {
	this.setDefaultHeader();
	return this({ method: 'get', url: '/project/' + pid })
		.then(res => {
			if(res.data.success)
				return res.data.info;
			else
				throw new Error("failed to get prj info");
		})
}

client.archiveProj = function(pid) {
	this.setDefaultHeader();
	return this({ method: 'get', url: `/project/${pid}/archive` })
		.then(res => {
			if(res.data.success)
				return res.data.info;
			else
				throw new Error("failed to get prj info");
		})
}

client.createRev = function(pid, revInfo) {
	this.setDefaultHeader();
	return this({ method: 'post', url: `/project/${pid}/create_rev`, data: revInfo })
		.then(res => {
			if(res.data.success)
				return res.data.success;
			else
				throw new Error("failed create revision");
		})
}

client.createCmnt = function(pid, cmntInfo) {
	this.setDefaultHeader();
	return this({ method: 'post', url: `/project/${pid}/create_cmnt`, data: cmntInfo })
		.then(res => {
			if(res.data.success)
				return res.data.success;
			else
				throw new Error("failed create cmnt");
		})
}

client.inviteMember = function(pid, info) {
	this.setDefaultHeader();
	return this({ method: 'post', url: `/project/${pid}/invite`, data: info })
		.then(res => {
			if(res.data.success)
				return res.data.success;
			else
				throw new Error("failed create cmnt");
		})
}

client.removeMember = function(pid, info) {
	this.setDefaultHeader();
	return this({ method: 'post', url: `/project/${pid}/uninvite`, data: info })
		.then(res => {
			if(res.data.success)
				return res.data.success;
			else
				throw new Error("failed create cmnt");
		})
}

client.acceptInvite = function(pid) {
	this.setDefaultHeader();
	return this({ method: 'get', url: `/project/${pid}/accept` })
		.then(res => {
			if(res.data.success)
				return res.data.success;
			else
				throw new Error("failed to get accept");
		})
}

client.rejectInvite = function(pid) {
	this.setDefaultHeader();
	return this({ method: 'get', url: `/project/${pid}/decline` })
		.then(res => {
			if(res.data.success)
				return res.data.success;
			else
				throw new Error("failed to get accept");
		})
}


export default client
