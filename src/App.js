import React, {useEffect, useState,useContext} from 'react'
import { motion } from "framer-motion";
import styled from 'styled-components'
import Menu from './containers/menu';
import UserContext from "./context/UserContext";
import HomeLogin from './components/home/homeLogin'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainForm from './components/checkComp/MainForm';
import SignUp from './components/signup/Signup'
import ResetPassword from './components/home/ResetPassword'

function App() {
  const ctxUser = useContext(UserContext);
  const [userId, setUserId] = useState();
  useEffect(() => {
      const userId = localStorage.getItem("userId", []);
      setUserId(userId)
    }, []);

    console.log(ctxUser.userInfo.userId, "user id App js");
    console.log(userId, "user id App js local storage");

    


  
  return (
    
    <ParentComponent className="App">
      <Router>
        {userId ? (
          <Switch>
          <Route path="/" exact> 
             <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                 <Menu />
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
        ) : (
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
         <Route path="/reset-password/:id" children={<ResetPassword />}>
             <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                 <ResetPassword />
             </motion.div>
         </Route>
       </Switch>
        )}

      
       

      </Router>
      {/* <Menu/> */}
      {/* <HomeLogin /> */}
    </ParentComponent>
    
  );
}

export default App;

const ParentComponent = styled.div`
    background-color:#dadce0;
`