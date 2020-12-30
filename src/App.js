import React, {useEffect, useState,useContext} from 'react'
import { motion } from "framer-motion";
import Menu from './containers/menu'
import UserContext from "./context/UserContext";
import HomeLogin from './components/home/homeLogin'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainForm from './components/checkComp/MainForm';
import SignUp from './components/signup/Signup'
import ResetPassword from './components/home/ResetPassword'
import MainRequest from './components/requests/mainRequest'
import EmialSender from './containers/emailSend/EmailSend'
import EmialSender2 from './containers/emailSend/EmailSend2'
import LoginDoneHome from './components/LoginDoneHome/MainHome'
import ReqHome from './components/LoginDoneHome/RequestHome'
import MainRequestOld from './components/requests/oldRequest/mainRequest'

function App() {
  const ctxUser = useContext(UserContext);
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  useEffect(() => {
      const userId = localStorage.getItem("userId", []);
      const userName = localStorage.getItem("userName", []);
      setUserId(userId);
      setUserName(userName);
    }, []);
    const clickhandle = ()=>{
        ctxUser.logout();
        setTimeout(() => {
          window.location.reload(false);
         }, 100);
    }
  
  return (
    <div className="App">
        {/* <Ghost /> */}
      <Router>
        {userId? <Menu /> : <></>}

        {userId ? (
        <Switch>
          <Route path="/" exact> 
             <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                 <LoginDoneHome />
             </motion.div>
         </Route>
         <Route path="/comp-check">
                 <MainForm />
         </Route>
         <Route path="/comp-request" >
                 <ReqHome />
         </Route>
         <Route path="/comp-request-new" >
                 <MainRequest />
         </Route>
         <Route path="/comp-request-old" >
                 <MainRequestOld />
         </Route>
         <Route path="/email" >
                 <EmialSender />
         </Route>
         <Route path="/email2" >
             {/* <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} > */}
                 <EmialSender2 />
             {/* </motion.div> */}
         </Route>
       </Switch>
        ) : (
          <Switch>
          <Route path="/" exact> 
             <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                 <HomeLogin />
             </motion.div>
         </Route>
         <Route path="/comp-check">
             <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                 <MainForm />
             </motion.div>
         </Route>
         <Route path="/signup" >
             <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                 <SignUp />
             </motion.div>
         </Route>
         <Route path="/changepassword/:id" children={<ResetPassword />}>
             <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                 <ResetPassword />
             </motion.div>
         </Route>
       </Switch>
        )}
      </Router>
    </div>
    
  );
}

export default App;

