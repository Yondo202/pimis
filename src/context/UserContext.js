import React,{useState} from "react";
import axios from "../axiosbase";
 

const UserContext = React.createContext();
const initialUserInfo = {
    userId:null,
    token:null,
    expireDate:null,
    name:null
}

export const UserStore= (props) =>{

    const [userInfo,setUserInfo] = useState(initialUserInfo);
    const [errMsg, setErrMsg] = useState("");
    const [errMsgSignup, setErrMsgSignUp] = useState("");
    
    const loginUserSuccess = (id,token,expireDate,name)=>{
        setUserInfo(
            { userId: id, token, expireDate,name }
          )  
          localStorage.setItem("edp_loggedUser",token);
          localStorage.setItem("userId",id);
          localStorage.setItem("userName",name);
    }

    const loginUser= (email,password)=>{
        axios.post('users/login',  {
            email: email,
            password: password, }
              ).then((res)=>{
                console.log(res, "login res");
                // setErrMsg(res.data.error.message);
                loginUserSuccess(res.data.user.id, res.data.token, res.data.token.expireDate, res.data.user.name);  
              }).catch((e)=>{
                setErrMsg(e.response.data.error.message);
                console.log(e.response, "err Response");  
                setUserInfo(initialUserInfo);
              });
      }

    const signUpUser= (name,email,password)=>{
        axios.post('users/register',  {
            name,
            email,
            password,
             }
              ).then((res)=>{
                console.log(res.data, "my resss");
                // setErrMsgSignUp(res.data.success);
                loginUserSuccess(res.data.user.id,res.data.token,res.data.token.expireDate, res.data.user.name);  
              }).catch((e)=>{
                console.log(e.response);
                setErrMsgSignUp(e.response.data.error.message);
                setUserInfo(initialUserInfo);
              });
      }

    const logout=()=>{
        setUserInfo(initialUserInfo);
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("edp_loggedUser");
    }
      

    return (
       <UserContext.Provider
        value = {{
            loginUser,
            signUpUser,
            loginUserSuccess,
            userInfo,
            logout,
            errMsg,
            errMsgSignup,
        }}
        >
       {props.children}    
       </UserContext.Provider> 

    )
}

export default UserContext;