import React,{useEffect, useState,useContext} from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import MaiForm from "../components/checkComp/MainForm";
import Ghost from "../components/Ghost";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import MainRequest from '../components/requests/mainRequest'

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
    // console.log(userId, "user id App js local storage");
      const clickhandle = ()=>{
        userCtx.logout();
        window.location.reload(false);
      }


  return (
    <Componentss>
      <Ghost />
      <Router>
      <div className="menuPar container">
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
        </div>

            <Switch>
                <Route path="/comp-check" exact>
                <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                  <MaiForm />
              </motion.div>
              </Route>
          </Switch>

           <Switch>
              <Route path="/comp-request">
              <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                <MainRequest />
              </motion.div>
              </Route>
          </Switch>
      
      </Router>
    </Componentss>
  );
}

export default Menu;

const Componentss = styled.div`
  width: 100%;
  background-color: #dadce0;
  position: relative;
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
