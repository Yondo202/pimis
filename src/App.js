import React, {useEffect, useState,useContext} from 'react'
import { motion } from "framer-motion";
import styled from 'styled-components'
import Menu from './containers/menu';
import UserContext from "./context/UserContext";
import HomeLogin from './components/home/homeLogin'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainForm from './components/checkComp/MainForm';
import SignUp from './components/signup/Signup'


function App() {

  const ctxUser = useContext(UserContext);

  

  useEffect(() => {
      const savedToken = sessionStorage.getItem("edp_loggedUser", []);
      const userId = sessionStorage.getItem("userId", []);
      if (userId) {
        ctxUser.loginUserSuccess(userId,savedToken,null);
      }

      // setUserProfile(parsedCount);
      // console.log(parsedCount , "this get token ee");
    }, []);
  
  return (
    
    <ParentComponent className="App">
      <Router>
      <Switch>
         <Route path="/" exact> 
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                <HomeLogin />
            </motion.div>
        </Route>

        <Route path="/check">
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                <MainForm />
            </motion.div>
        </Route>

        <Route path="/signup" >
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                <SignUp />
            </motion.div>
        </Route>
      </Switch>
       

      </Router>
      {/* <Menu/> */}
      {/* <HomeLogin /> */}
    </ParentComponent>
    
  );
}

export default App;

const ParentComponent = styled.div`
    // background-color:#dadce0;
`