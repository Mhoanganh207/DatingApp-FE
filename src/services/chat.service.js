import axios from "axios";
class ChatService {
    sendMessage(content, receiveId){
        axios.post('http://localhost:5075/api/chat',{content : content, receiveid : receiveId}, {
        headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('token')
        }
    })
   }

   async getChatById(id){
    return axios.get('http://localhost:5075/api/chat/messages/' + id).then((response) => {
        return response.data
    });
   }
}

export default new ChatService();