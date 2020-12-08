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
    const [errMsg, setErrMsg] = useState("")
    
    const loginUserSuccess = (id,token,expireDate,name)=>{
        setUserInfo(
            {
                userId: id,
                token,
                expireDate,
                name
            }
          )  
          sessionStorage.setItem("edp_loggedUser",token);
          sessionStorage.setItem("userId",id);
          sessionStorage.setItem("userName",name);
    }

    const loginUser= (email,password)=>{
        axios.post('users/login',  {
            email: email,
            password: password, }
              ).then((res)=>{
                console.log(res, "login res");
                // setErrMsg(res.data.error.message);
                loginUserSuccess(res.data.user.id, res.data.token.token, res.data.token.expireDate, res.data.user.name);  
              }).catch((e)=>{
                setErrMsg(e.response.data.error.message);
                console.log(e.response.data.error.message, "err Response");  
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
                console.log(res.data.user.name, "my resss");
                loginUserSuccess(res.data.user.id,res.data.token.token,res.data.token.expireDate, res.data.user.name);  
              }).catch((e)=>{
                console.log(e.response);
                setUserInfo(initialUserInfo);
              });
      }

    const logout=()=>{
        setUserInfo(initialUserInfo);
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("edp_loggedUser");
    }
      

    return (
       <UserContext.Provider
        value = {{
            loginUser,
            signUpUser,
            loginUserSuccess,
            userInfo,
            logout,
            errMsg
        }}
        >
       {props.children}    
       </UserContext.Provider> 

    )
}

export default UserContext;