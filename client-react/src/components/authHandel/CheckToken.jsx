import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../services/userService";
import socket from "../../config/socket";

const CheckToken = ({ children }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {userData} = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!userData) {
      getUser(dispatch,navigate)
    }
  },[userData])


  return (
    <>
      {localStorage.getItem("token") ? children : <Navigate to="/login" />}
    </>
  );
};

export default CheckToken;
