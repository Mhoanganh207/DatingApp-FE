import axios from "axios";

class UserService {
    async getAvatar() {
        return axios.get('http://localhost:5075/api/account/avatar', {
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        }).then((res) => {
            window.localStorage.setItem('avatar', res.data);
            return res.data;
        })
    }

    async getChat() {
        return axios.get('http://localhost:5075/api/chat', {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('token')
            }
        })
    }

    async getUserById(id) {
        return axios.get(`http://localhost:5075/api/account/${id}`)
    }

    async getAvatarById(id) {
        return axios.get('http://localhost:5075/api/account/' + id + '/avatar', { responseType: 'blob' })
            .then((response) => {
                return response.data;
            })
    }

    async postAvatar(id, avatar) {
        return axios.post('http://localhost:5075/api/account/' + id + '/avatar', avatar, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    async updateInterestedList(list, introduction) {
        axios.put('http://localhost:5075/api/account/' + id.value + '/info', {
            interested: list,
            introduction: introduction
        });
    }

    async addUserToFavList(id) {
        axios.get('http://localhost:5075/api/account/favourite/' + id, {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('token')
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })

    }

    async getUser(page) {
        return axios.get('http://localhost:5075/api/account/all/' + page, {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('token')
            }
        })
            .then((response) => {
                return response.data;
            })
    }


    async getInfor() {
        return axios.get('http://localhost:5075/api/account/info', {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('token')
            }
        });
    }
}

export default new UserService();