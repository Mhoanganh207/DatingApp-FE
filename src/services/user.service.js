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
        try{
        return axios.get('http://localhost:5075/api/chat', {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('token')
            }
        })
    }catch(err){
        console.log(err);
    }
           
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

    async putAvatar(avatar) {
        return axios.put('http://localhost:5075/api/account/avatar', avatar, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization : 'Bearer ' + window.localStorage.getItem('token')
            }
        })
        .then((res)=>{
            return res.data;
        });
    }

    async updateInterestedList(id, list, introduction) {
        axios.put('http://localhost:5075/api/account/' + id + '/info', {
            hobbies: list,
            introduction: introduction
        })
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
        }).then(res => {
            return res.data;
        })
            .catch(err => {
                console.log(err);
            });
    }
    async searchUser(query) {
        return axios.get('http://localhost:5075/api/account/search/?q=' + query,{
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('token')
            }
        })
            .then((response) => {
                return response.data;
            })
    }

    async updateUserInfor(infor){
        return axios.put('http://localhost:5075/api/account/infor',infor,{
            headers: {
                Authorization : 'Bearer ' + window.localStorage.getItem('token')
            }
    }).then((res)=>{
        return res.data;
    }).catch((err)=>{
        console.log(err);
    })
    }
}

export default new UserService();