import axios from 'axios';
import router from '../router';



axios.interceptors.response.use(
    (response) => {
        return response
    },
    async (err) => {
        if (err.response.status !== 401) {
            return Promise.reject(err);
        }
        try {
            const success = await axios.get('http://localhost:5075/api/auth/refreshtoken', {
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('refreshtoken')
                }
            });
            window.localStorage.setItem('token', success.data.token);
            window.localStorage.setItem("refreshtoken", success.data.refreshtoken);
            const config = err.response.config;
            config.headers.Authorization = 'Bearer ' + success.data.token;
            return await axios(config);
        }
        catch (err) {
            router.push('/');
            console.log(err);
        }
    }
)



class AuthService {

    async signUp(account) {
        return axios.post('http://localhost:5075/api/account', account)
    }


    async signIn(account) {
        return axios.post('http://localhost:5075/api/auth/login', account).then(res => {
            window.localStorage.setItem('token', res.data.token);
            window.localStorage.setItem("refreshtoken", res.data.refreshtoken);
            return true;
        })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                    return false
                }
            })
    }



}

export default new AuthService();

