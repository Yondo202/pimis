import React, {useEffect, useState,useContext} from 'react'
import { motion } from "framer-motion";
import styled from 'styled-components'
import Ghost from "./components/Ghost";
import Menu from './containers/menu';
import UserContext from "./context/UserContext";
import HomeLogin from './components/home/homeLogin'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainForm from './components/checkComp/MainForm';
import SignUp from './components/signup/Signup'
import ResetPassword from './components/home/ResetPassword'
import { fontFamily } from './components/theme';
import MainRequest from './components/requests/mainRequest'

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
    <ParentComponent className="App">
        <Ghost />
      <Router>
          {userId? (<div className="menuPar container">
          <div className="menus">
                  <div className="items">
                  <Link to="/">Нүүр</Link>
                  <div className="line"></div>
                </div>
                <div className="items">
                  <Link to="/comp-check">Шалгах</Link>
                  <div className="line"></div>
                </div>
                <div className="items">
                  <Link to="/comp-request">Хүсэлт</Link>
                  <div className="line"></div>
                </div>
                <div className="items">
                  <Link to="/">{userName}</Link>
                  <div className="line"></div>
                </div>
                <div className="items">
                  <Link onClick={clickhandle} to="/">Log out</Link>
                  <div className="line"></div>
                </div>
              </div>
        </div>) : <></>}


        {userId ? (
          <Switch>
          {/* <Route path="/" exact> 
             <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                 <Menu />
             </motion.div>
         </Route> */}
         <Route path="/comp-check">
             <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                 <MainForm />
             </motion.div>
         </Route>
         <Route path="/comp-request" >
             {/* <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} > */}
                 <MainRequest />
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
      {/* <Menu/> */}
      {/* <HomeLogin /> */}
    </ParentComponent>
    
  );
}

export default App;

const ParentComponent = styled.div`
    font-family:${fontFamily};
    // background-color:#dadce0;
    width: 100%;
    // background-color: #dadce0;

    .menuPar {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 80px;
        .menus {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 40%;
          .items {
              font-size:18px;
              &:hover{
                  .line{
                    transform:scale(1);
                  }
              }
              .line{
                  transition:all 0.4s ease;
                  height:2px;
                  width:100%;
                  background-color:white;
                  transform:scale(0);
              }
            a {
              color:white;
              text-decoration: none !important;
            }
          }
        }
      }
      @media only screen and (max-width:768px){
          .menuPar{
              .menus{
                  width:100%;
              }
          }
      }

`