import React, { useState } from "react";
import axios, { edplan } from "axiosbase";

const UserContext = React.createContext();
const initialStyle = { tableOne: "0%", tableTwo: "100%", tableThree: "200%", tableFour: "300%", tableFive: "400%", tableSix: "500%", tableheight: 150 };
const initialUserInfo = { userId: null, token: null, expireDate: null, name: null, refreshToken: null, role: null, email: null };

export const UserStore = (props) => {
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [alert, setAlert] = useState({ color: 'white', text: '', cond: false });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [errMsgSignup, setErrMsgSignUp] = useState({ msg: "", cond: false });
  const [GlobalStyle, setGlobalStyle] = useState(initialStyle);
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
    localStorage.setItem("role", user.role);
    localStorage.setItem("username", user.name);
    localStorage.setItem("signature", user.signature);
    localStorage.setItem("trainerOrganizationId", user.trainerOrganizationId);
    localStorage.setItem("companyname", user.companyname);
  };


  const loginUser = (email, password) => {
    axios.post("users/login", { email: email, password: password })
      .then((res) => {
        loginUserSuccess(res.data.token, res.data.refreshToken, res.data.expireDate, res.data.user);
        EdplanApprove(res.data.user.id, res.data.token, true);
      }).catch((err) => {
        console.log(err, "User context deeer aldaa garlaa");
        if (err?.response?.data) {
          setErrMsg(err.response.data.error.message);
          setTimeout(() => { setErrMsg(""); }, 5000);
        } else {
          setErrMsg("Холболт алдаатай байна");
          setTimeout(() => { setErrMsg(""); }, 5000);
          setUserInfo(initialUserInfo);
        }
      });
  };

  const EdplanApprove = async (id, token, approves) => {
    await edplan.get(`approves?idd=${id}`).then(res => {
      if (res.data.length) {
        edplan.put(`approves/${res.data[0]?.id}`, { idd: parseInt(id), token: `${token}`, approve: approves });
        if (approves === false) {
          setTimeout(() => {
            window.location.reload(false);
          }, 100);
        }
      }
    })
  }

  const autoRenewTokenAfterMillisec = (milliSec) => {
    axios
      .post("users/token", {
        token: localStorage.getItem("refreshToken"),
      })
      .then((result) => {
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
        // edplan.post(`approves`, { idd: res.data.user.id, approve: false, seen:false })
        setErrMsgSignUp({ msg: `Та "${res.data.user.email}" цахим хаягаар илгээсэн холбоос дээр дарж бүртгэлээ баталгаажуулна уу. Хэрэв таны цахим хаягийн INBOX хэсэгт баталгаажуулалтын имэйл очоогүй бол SPAM-аа шалгана уу.`, cond: true });;
      })
      .catch((e) => {
        setErrMsgSignUp({ msg: e.response?.data.error.message, cond: false });
        setUserInfo(initialUserInfo);
      });
  };

  const logout = () => {
    let id = localStorage.getItem("userId");
    EdplanApprove(id, `token`, false);

    localStorage.clear();
    setUserInfo({ userId: undefined });


  };

  const loadFunc = (cond) => {
    setLoading(cond);
    setTimeout(() => {
      setLoading(false);
    }, 3000)

  }

  const alertText = (color, text, cond) => {
    setAlert({ color: color, text: text, cond: cond });
    setTimeout(() => { setAlert({ cond: false }); }, 4000);
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
        loadFunc,
        loading
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
