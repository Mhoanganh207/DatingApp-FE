import axios from 'axios';
class AuthService{

    async signUp(account) {
        return axios.post('http://localhost:5075/api/account', account)
    }


    async signIn(account){
        return axios.post('http://localhost:5075/api/account/login', account).then(res=>{
            window.localStorage.setItem('token',res.data.token)
            return true;
        })
        .catch(err =>{
            console.log(err)
            if (err.response.status === 401) {
               return false
            }
        })
    }
}

export default new AuthService();

