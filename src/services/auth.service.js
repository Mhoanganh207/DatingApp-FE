import axios from 'axios';
class AuthService{

    async signUp(account) {
        return axios.post('http://localhost:5075/api/account', account)
    }


    async signIn(account){
        return axios.post('http://localhost:5075/api/auth/login', account).then(res=>{
            window.localStorage.setItem('token',res.data.token);
            window.localStorage.setItem("refreshtoken", res.data.refreshtoken);
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

