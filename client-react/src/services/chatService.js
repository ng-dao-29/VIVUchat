import axios from "../config/axios";
import { getChatSuccess, getChatFailure, startGetChat } from "../redux/chatSlice";

export const getChats = (dispatch) => {
    dispatch(startGetChat())
    axios.get("/chat", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then((res) => {
            console.log(res.data.data)
            dispatch(getChatSuccess(res.data.data));
        })
        .catch((err) => {
            dispatch(getChatFailure(err.response.data.message))
        })
}

export const getDataChat = (params) => {
    return axios.get(`/chat/1/${params.id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
}

export const getMessages = (params) => {
    return axios.get(`/message/${params.id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
}

export const sendMessage = (params, message) => {
    let bodyReq = {
        roomId: params.id,
        content: message
    }
    return axios.post(`message`, bodyReq, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
};

export const findOrCreateNewChat = (userId) => {
    return axios.post(`/chat`, { userId: userId }, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
}

export const createNewGroupChat = (values) => {
    return axios.post(`/group`, values, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
}