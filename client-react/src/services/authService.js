import axios from "../config/axios"
import {login,
    loginFailure,
    loginSuccess,
    setError,
    setUser,
    cleanAuth} from "../redux/authSlice";
import {cleanChat} from "../redux/chatSlice";

export const handleLogin = (dataForm, dispatch, navigate) => {
    dispatch(login());
    axios.post("/auth", dataForm)
        .then((res) => {
            dispatch(loginSuccess(res.data.data.userData));
            localStorage.setItem("token", res.data.data.token);
            navigate("/");
        })
        .catch((err) => {
            dispatch(loginFailure(err.response.data.message));
        });
}

export const register = (dataForm, dispatch, navigate) => {
    axios.post(`/auth/user`, dataForm, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).then((res) => {
        if (res.status === 200) {
            dispatch(setUser(res.data.data.userData))
            dispatch(setError(null))
            localStorage.setItem("token", res.data.data.token);
            navigate("/");
        } else {
            dispatch(setError(res.data.message))
        }
    }).catch((err) => {
    })
};

export const logout = (dispatch, navigate) => {
    axios.get("/auth", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).then((res) => {
        dispatch(cleanChat())
        dispatch(cleanAuth())
        localStorage.removeItem("token")
        navigate("/login");
    }).catch((err) => {
        dispatch(cleanChat())
        dispatch(cleanAuth())
        localStorage.removeItem("token")
        navigate("/login");
    })
}

export const updatePassword = (values) => {
    return axios.put("/auth", values, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
}