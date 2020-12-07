import React,{useState} from "react";
import axios from "../axiosbase";
 

const UserContext = React.createContext();
const initialUserInfo = {
    userId:null,
    token:null,
    expireDate:null
}

export const UserStore= (props) =>{


    const [userInfo,setUserInfo] = useState(initialUserInfo);
    const loginUserSuccess= (id,token,expireDate)=>{
        setUserInfo(
            {
                userId: id,
                token,
                expireDate
            }
          )  
          sessionStorage.setItem("edp_loggedUser",token);
          sessionStorage.setItem("userId",id);
    }

    const loginUser= (email,passwowrd)=>{
        axios.post('users/login',  {
            email: email,
            password: passwowrd, }
              ).then((res)=>{
                console.log(res.data.user)  ;
                loginUserSuccess(res.data.user.id,res.data.token.token,res.data.token.expireDate);  
              }).catch((e)=>{
                console.log(e.response);  
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
                loginUserSuccess(res.data.user.id,res.data.token.token,res.data.token.expireDate);  
                  
              }).catch((e)=>{
                console.log(e.response);
                setUserInfo(initialUserInfo);
              });
    }

    const logout=()=>{

        setUserInfo(initialUserInfo);
        sessionStorage.removeItem()
    }
      

    return (
       <UserContext.Provider
       value = {{
           loginUser,
           signUpUser,
           loginUserSuccess,
           userInfo,
       }}
       >
       {props.children}    
       </UserContext.Provider> 

    )
}

export default UserContext;