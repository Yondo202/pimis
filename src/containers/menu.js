import React,{useEffect, useState,useContext} from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import MaiForm from "../components/checkComp/MainForm";
import Signup from '../components/signup/Signup'
import Ghost from "../components/Ghost";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../components/login/Login";
import UserContext from "../context/UserContext";

function Menu(props) {
    const [userProfile, setUserProfile] = useState({});
    const userCtx = useContext(UserContext);
    useEffect(() => {
        const parsedCount = localStorage.getItem("UserProfile");
        const finalUser = parsedCount ? JSON.parse(parsedCount) : [];
        setUserProfile(finalUser);
        // console.log(finalUser , "this get userProfileeeee");
      }, []);

    //   console.log(userProfile.name, "My state ym bgn");
      console.log(userCtx.userInfo.userId,'================ID');

  return (
    <Componentss>
      <Ghost />
      <Router>
        <div className="menuPar container">
          <div className="menus">
          {userCtx.userInfo.userId?<div>Success</div>:<div>Hooson</div>}
            
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
              {/* <Link to="/login">{userProfile.name}</Link> */}
              <Link to="/login">Нэвтрэх</Link>
              <div className="line"></div>
            </div>
          </div>
        </div>


        {userCtx.userInfo.userId? (
          <Switch>
        
          <Route path="/check">
          <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
             <MaiForm />
          </motion.div>
          </Route>
        </Switch>

        ): (
          <Switch>
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
