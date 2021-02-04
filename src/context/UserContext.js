import React,{useState} from "react";
import axios from "../axiosbase";

const UserContext = React.createContext();
const initialStyle ={tableOne: "0%", tableTwo: "100%",tableThree: "200%", tableFour: "300%", tableFive: "400%", tableSix: "500%", tableheight: 150,}
const initialUserInfo = { userId:null, token:null,  expireDate:null, name:null}
const initialSee = { tableOneData : {}, tableTwoData: {}, tableThree : {}, tableFour : {} }

export const UserStore= (props) =>{

    const [userInfo,setUserInfo] = useState(initialUserInfo);
    const [errMsg, setErrMsg] = useState("");
    const [errMsgSignup, setErrMsgSignUp] = useState("");
    const [ GlobalStyle, setGlobalStyle ] = useState(initialStyle);
    const [ tableSee, setTableSee ] = useState(initialSee);
    const [ reqID, setReqId ] = useState(0);

    const idPass = (id) => {
      setGlobalStyle(initialStyle);
      setReqId(id);
    }
    
    const loginUserSuccess = (id,token,expireDate,name)=>{
        setUserInfo( { userId: id, token, expireDate,name }  )  
          localStorage.setItem("edp_loggedUser",token);
          localStorage.setItem("userId",id);
          localStorage.setItem("userName",name);
    }

    const loginUser= (email,password)=>{
        axios.post('users/login', {email: email,password: password,})
        .then((res)=>{ console.log(res, "login res"); loginUserSuccess(res.data.user.id, res.data.token, res.data.token.expireDate, res.data.user.name); }).catch((e)=>{ setErrMsg(e.response.data.error.message); setUserInfo(initialUserInfo); });
      }

    const signUpUser= (name,email,password)=>{
        axios.post('users/register', { name, email, password, }  )
        .then((res)=>{loginUserSuccess(res.data.user.id,res.data.token,res.data.token.expireDate, res.data.user.name);})
        .catch((e)=>{ setErrMsgSignUp(e.response.data.error.message); setUserInfo(initialUserInfo); });
      }

    const logout=()=>{setUserInfo(initialUserInfo); localStorage.removeItem("userId"); localStorage.removeItem("userName"); localStorage.removeItem("edp_loggedUser"); }

    const StyleComp = (valueOne,valueTwo, valueThree,valueFour,valueFive,valueSix) =>{
      if(valueOne === "0%"){
        setGlobalStyle({  tableOne: valueOne,tableTwo: valueTwo,  tableThree: valueThree, tableFour : valueFour, tableFive : valueFive, tableSix : valueSix,tableheight: 190});
      }else if(valueTwo === "0%"){
        setGlobalStyle({ tableOne: valueOne,tableTwo: valueTwo,  tableThree: valueThree, tableFour : valueFour, tableFive : valueFive, tableSix : valueSix,tableheight: 400 });
      }else if(valueThree === "0%"){
        setGlobalStyle({tableOne: valueOne,tableTwo: valueTwo,  tableThree: valueThree, tableFour : valueFour, tableFive : valueFive, tableSix : valueSix, tableheight: 300 });
      }else if(valueFour === "0%"){
        setGlobalStyle({ tableOne: valueOne,tableTwo: valueTwo,  tableThree: valueThree, tableFour : valueFour, tableFive : valueFive, tableSix : valueSix, tableheight: 300 });
      }else if(valueFive === "0%"){
        setGlobalStyle({ tableOne: valueOne,tableTwo: valueTwo,  tableThree: valueThree, tableFour : valueFour, tableFive : valueFive, tableSix : valueSix, tableheight: 500 });
      }else if(valueFive === "0%"){
        setGlobalStyle({ tableOne: valueOne,tableTwo: valueTwo,  tableThree: valueThree, tableFour : valueFour, tableFive : valueFive, tableSix : valueSix, tableheight: 500 });
      }else{
        setGlobalStyle({tableOne: valueOne,tableTwo: valueTwo,  tableThree: valueThree, tableFour : valueFour, tableFive : valueFive, tableSix : valueSix, tableheight: 250 });
      }
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
            StyleComp,
            GlobalStyle,
            idPass,
            reqID
        }}
        >
       {props.children}    
       </UserContext.Provider> 

    )
}

export default UserContext;