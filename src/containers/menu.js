import React,{useEffect, useState,useContext} from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import MaiForm from "../components/checkComp/MainForm";
import Signup from '../components/signup/Signup'
import Ghost from "../components/Ghost";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../components/login/Login";
import UserContext from "../context/UserContext";
import HomeLogin from "../components/home/homeLogin";

function Menu(props) {
    const userCtx = useContext(UserContext);
    const [userId, setUserId] = useState();
    const [userName, setUserName] = useState();

    
    useEffect(() => {
      const userId = localStorage.getItem("userId", []);
      const userName = localStorage.getItem("userName", []);
      setUserId(userId);
      setUserName(userName);
    }, []);
    // console.log(ctxUser.userInfo.userId, "user id App js");
    console.log(userId, "user id App js local storage");

      // console.log(userCtx.userInfo.userId,'================ID');
      // console.log(userCtx.userInfo, "userInfo");
      const clickhandle = ()=>{
        userCtx.logout();
        window.location.reload(false);
        console.log("log out");
      }


  return (
    <Componentss>
      <Ghost />
      <Router>
        <div className="menuPar container">
          {/* {userId?<div>Success</div>:<div>Hooson</div>} */}
          {userId?(
            <div className="menus">
                <div className="items">
                <Link to="/">Нүүр</Link>
                <div className="line"></div>
              </div>
              <div className="items">
                <Link to="/check">Шалгах</Link>
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
          ) :( <div className="menus">
                  <div className="items">
                  <Link to="/">Нүүр</Link>
                  <div className="line"></div>
                </div>
                <div className="items">
                  <Link to="/check">Шалгах</Link>
                  <div className="line"></div>
                </div>
                <div className="items">
                  <Link to="/signup">Бүртгүүлэх</Link>
                  <div className="line"></div>
                </div>
                <div className="items">
                  <Link to="/login">Нэвтрэх</Link>
                  <div className="line"></div>
                </div>
            </div>)}
        </div>


        {userId? (
          <Switch>
            <Route path="/check">
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
              <MaiForm />
            </motion.div>
            </Route>
        </Switch>
        ): (
          <Switch>
            <Route path="/check">
          <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
             <MaiForm />
          </motion.div>
          </Route>
          <Route path="/signup">
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                <Signup />
            </motion.div>
            </Route>
            <Route path="/login">
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
              <Login />
            </motion.div>
            </Route>
          </Switch> 
        )
        
      }
        
      </Router>
    </Componentss>
  );
}

export default Menu;

const Componentss = styled.div`
  width: 100%;
  font-family: "Roboto", "Sans-serif";
  background-color: #dadce0;
  position: relative;
    z-index: 2;
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
`;
