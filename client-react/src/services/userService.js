import axios from "../config/axios";
import { setUser, loginFailure } from "../redux/authSlice";

export const getUser = (dispatch, navigate) => {
    axios.get("/user/1", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then((res) => {
            dispatch(setUser(res.data.data))
    }) .catch((err) => {
        navigate("/login");
    });
};

export const searchUser = (keywords) => {
    return axios.get(`/user?keyword=${keywords}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
}