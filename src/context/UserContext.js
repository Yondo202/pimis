import React, { useState } from "react";
import axios from "../axiosbase";
import { useHistory } from "react-router-dom"

const UserContext = React.createContext();
const initialStyle = { tableOne: "0%", tableTwo: "100%", tableThree: "200%", tableFour: "300%", tableFive: "400%", tableSix: "500%", tableheight: 150 };
const initialUserInfo = { userId: null, token: null, expireDate: null, name: null, refreshToken: null, role: null, email:null };
const initialSee = { tableOneData: {}, tableTwoData: {}, tableThree: {}, tableFour: {} };

export const UserStore = (props) => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [ alert, setAlert ] = useState({ color:'white', text: '', cond: false });
  const [errMsg, setErrMsg] = useState("");
  const [errMsgSignup, setErrMsgSignUp] = useState({msg:"", cond: false });
  const [GlobalStyle, setGlobalStyle] = useState(initialStyle);
  const [tableSee, setTableSee] = useState(initialSee);
  const [reqID, setReqId] = useState(0);

  const idPass = (id) => {
    setGlobalStyle(initialStyle);
    setReqId(id);
  };

  const loginUserSuccess = (token, refreshToken, expireDate, user) => {
    setUserInfo({ userId: user.id, token, expireDate, name: user.name, refreshToken, role: user.role });
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("expireDate", expireDate);
    localStorage.setItem("role" ,user.role );
    localStorage.setItem("username" ,user.name );
  };

  const loginUser = (email, password) => {
    axios.post("users/login", { email: email, password: password })
      .then((res) => {
        loginUserSuccess(res.data.token, res.data.refreshToken, res.data.expireDate, res.data.user);
      }).catch((err) => {
        console.log(err, "User context deeer aldaa garlaa");
        if (err) {
          setErrMsg(err.response.data.error.message);
        }else{
          setUserInfo(initialUserInfo);
        }
      });
  };
  const autoRenewTokenAfterMillisec = (milliSec) => {
    axios
      .post("users/token", {
        token: localStorage.getItem("refreshToken"),
      })
      .then((result) => {
        console.log("Token refreshed .....", result.data);
        const token = result.data.token;
        const refreshToken = result.data.refreshToken;
        const expireDate = result.data.expireDate;
        const user = result.data.user;

        loginUserSuccess(token, refreshToken, expireDate, user);
      })
      .catch((err) => {
        setUserInfo({
          ...userInfo,
          error: err.message,
          errorCode: err.code,
          token: null,
          userId: null,
          expireDate: null,
        });
      });
  };

  const signUpUser = (userinfos) => {
    axios.post("users/register", userinfos)
      .then((res) => {
        console.log(res, "^new user");
        setErrMsgSignUp({msg: `Таны бүртгүүлсэн "${res.data.user.email}" имэйл хаягаар бид имэйл илгээсэн тул та шалгаж БАТАЛГААЖУУЛАЛТ дээр дарна уу.`, cond:true});;
      })
      .catch((e) => {
        setErrMsgSignUp({msg: e.response.data.error.message, cond:false});
        setUserInfo(initialUserInfo);
      });
  };



  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expireDate");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("tableId");
    setUserInfo({ userId: undefined });

      setTimeout(()=>{
        window.location.reload(false);
      },100);
  };

  const alertText = ( color, text, cond ) =>{
    setAlert({ color:color, text:text, cond:cond });
    setTimeout(()=>{  setAlert({ cond:false }); },[4000]);
  }


  return (
    <UserContext.Provider
      value={{
        loginUser,
        signUpUser,
        loginUserSuccess,
        autoRenewTokenAfterMillisec,
        userInfo,
        logout,
        errMsg,
        errMsgSignup,
        GlobalStyle,
        idPass,
        reqID,
        alertText,
        alert,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
