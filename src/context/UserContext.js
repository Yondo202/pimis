import React, { useState } from "react";
import axios from "../axiosbase";

const UserContext = React.createContext();
const initialStyle = { tableOne: "0%", tableTwo: "100%", tableThree: "200%", tableFour: "300%", tableFive: "400%", tableSix: "500%", tableheight: 150 };
const initialUserInfo = { userId: null, token: null, expireDate: null, name: null, refreshToken: null, role: null };
const initialSee = { tableOneData: {}, tableTwoData: {}, tableThree: {}, tableFour: {} };

export const UserStore = (props) => {
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [errMsg, setErrMsg] = useState("");
  const [errMsgSignup, setErrMsgSignUp] = useState("");
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

  const signUpUser = (name, email, password) => {
    axios
      .post("users/register", { name, email, password })
      .then((res) => {
        loginUserSuccess(res.data.token, res.data.refreshToken, res.data.token.expireDate, res.data.user);
      })
      .catch((e) => {
        setErrMsgSignUp(e.response.data.error.message);
        setUserInfo(initialUserInfo);
      });
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expireDate");
    localStorage.removeItem("role");

    setUserInfo({ userId: undefined });
  };

  const StyleComp = (valueOne, valueTwo, valueThree, valueFour, valueFive, valueSix) => {
    if (valueOne === "0%") {
      setGlobalStyle({ tableOne: valueOne, tableTwo: valueTwo, tableThree: valueThree, tableFour: valueFour, tableFive: valueFive, tableSix: valueSix, tableheight: 190 });
    } else if (valueTwo === "0%") {
      setGlobalStyle({ tableOne: valueOne, tableTwo: valueTwo, tableThree: valueThree, tableFour: valueFour, tableFive: valueFive, tableSix: valueSix, tableheight: 430 });
    } else if (valueThree === "0%") {
      setGlobalStyle({ tableOne: valueOne, tableTwo: valueTwo, tableThree: valueThree, tableFour: valueFour, tableFive: valueFive, tableSix: valueSix, tableheight: 300 });
    } else if (valueFour === "0%") {
      setGlobalStyle({ tableOne: valueOne, tableTwo: valueTwo, tableThree: valueThree, tableFour: valueFour, tableFive: valueFive, tableSix: valueSix, tableheight: 300 });
    } else if (valueFive === "0%") {
      setGlobalStyle({ tableOne: valueOne, tableTwo: valueTwo, tableThree: valueThree, tableFour: valueFour, tableFive: valueFive, tableSix: valueSix, tableheight: 500 });
    } else if (valueFive === "0%") {
      setGlobalStyle({ tableOne: valueOne, tableTwo: valueTwo, tableThree: valueThree, tableFour: valueFour, tableFive: valueFive, tableSix: valueSix, tableheight: 500 });
    } else {
      setGlobalStyle({ tableOne: valueOne, tableTwo: valueTwo, tableThree: valueThree, tableFour: valueFour, tableFive: valueFive, tableSix: valueSix, tableheight: 250 });
    }
  };

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
        StyleComp,
        GlobalStyle,
        idPass,
        reqID,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
