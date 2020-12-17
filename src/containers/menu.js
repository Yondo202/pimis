import React,{useEffect, useState,useContext} from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { fontFamily,ColorRgb } from '../components/theme';
import {IoIosLogOut} from 'react-icons/io'
import { useLocation } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu'

function Menu(props) {
  const location = useLocation();

    const userCtx = useContext(UserContext);
    const [userId, setUserId] = useState();
    const [userName, setUserName] = useState();
    const [ diplayNone, setDisplayNone ] = useState("block");
    const [ headerHeight, setheaderHeight ] = useState("50px");
    const [open, close] = useState('');
    
    useEffect(() => {
      const userId = localStorage.getItem("userId", []);
      const userName = localStorage.getItem("userName", []);
      setUserId(userId);
      setUserName(userName);
    }, []);

    const handleClick = () => {
      close(!open);
    }

    const handleClickMenus = () => {
      close(!open);
    }

      const clickhandle = ()=>{
        userCtx.logout();
        window.location.reload(false);
      };

      useEffect(() => {
        const currentPath = location.pathname;
        console.log(currentPath);
        if(currentPath !== "/"){
          setDisplayNone("none");
          setheaderHeight("70px");
        }else{
          setDisplayNone("block");
          setheaderHeight("50px");
        }
      }, [location]);
      

  return (
    <Componentss>
      <div style={{display:diplayNone}} className="Background">
        <div className="LogoHeadPar container">
            <div style={{backgroundImage:`url(/head.jpg)`}} className="logoPar"></div>
        </div>
      </div>
     
      <div style={{height:headerHeight}} className="MainMenus">
            <div className="container">
              <input type="checkbox" id="check" />

                <div className="menuPar">
                      <div className="backgroundGhost"></div>

                      <label for="check" className="checkBtn">
                          <HamburgerMenu
                              isOpen={open}
                              menuClicked={handleClick}
                              width={32}
                              height={15}
                              strokeWidth={2}
                              rotate={0}
                              // color={this.state.color}
                              color="black"
                              borderRadius={0}
                              animationDuration={0.5}
                          />
                      </label>
                        <div className="menus">
                                <div className="items">
                                <Link onClick={handleClickMenus} to="/">Нүүр</Link>
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
                        </div>
                        <div className="userMenuPar">
                          {/* <span className="UserNameMenu"><Link to="/">{userName}</Link> </span> */}
                          <span className="UserNameMenu"><Link to="#">Дондогдулам</Link> </span>
                          <span className="Logout"><Link onClick={clickhandle} to="/"><span>Гарах</span><IoIosLogOut /></Link></span>
                        </div>
                </div>
                <label for="check" className="checkBtnHome">
                          <HamburgerMenu
                              isOpen={open}
                              menuClicked={handleClick}
                              width={32}
                              height={15}
                              strokeWidth={2}
                              rotate={0}
                              // color={this.state.color}
                              color="black"
                              borderRadius={0}
                              animationDuration={0.5}
                          />
                </label>
            </div>
          
  
      </div>
    </Componentss>
  );
}

export default Menu;

const Componentss = styled.div`
    font-family:${fontFamily};
    letter-spacing: -0.1px;
    position: relative;
    z-index: 2;
    .Background{
      width:100%;
      background-color:white;
    .LogoHeadPar{
        // background-color:red;
        height:130px;
        width:100%;
        .logoPar{
          // background: url("/head.jpg");
          text-align:center;
          width:100%;
          height:100%;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  
    .MainMenus{
      position:relative;
      // border-top: 0.1px solid rgba(${ColorRgb}, 0.5);
      background-color:white;
      display:flex;
      flex-direction:row;
      align-items:center;
      width: 100%;
      box-shadow: 0px 2px 8px -2px rgba(${ColorRgb}, 0.5);
      .checkBtnHome{
        display:none;
      }
      #check{
        display:none;
      }
      .menuPar {
        display: flex;
        flex-direction:row;
        align-items: center;
        justify-content: space-between;
        width:100%;
        .backgroundGhost{
          display:none;
        }
        .checkBtn{
          display:none;
        }
        .userMenuPar{
          display:flex;
          flex-direction:row;
          justify-content:space-between;
          align-items:center;
          width:20%;
          .UserNameMenu{
              a {
                color:black;
                text-decoration: none !important;
              }
          }
          .Logout{
            a {
              display:flex;
              align-items:center;
              color:black;
              text-decoration: none !important;
              color:rgba(${ColorRgb},0.9);
              svg{
                margin-left:4px;
                font-size:22px;
                color:rgba(${ColorRgb},0.9);
              }
            }
          }
        }
        .menus {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 30%;
          
          .items {
              font-size:17px;
              font-weight:500;
              &:hover{
                  .line{
                    transform:scale(1);
                  }
              }
              .line{
                  transition:all 0.4s ease;
                  height:2px;
                  width:100%;
                  background-color:black;
                  transform:scale(0);
              }
            a {
              color:black;
              text-decoration: none !important;
            }
          }
        }
    }
    }

    
  @media only screen and (max-width:768px){
    .LogoHeadPar{
      // background-color:red;
      height:40px;
      width:100%;
      .logoPar{
      }
    }


    .MainMenus{
      position:relative;
      .checkBtnHome{
        display:block;
        cursor:pointer;
        width:100%;
        text-align:center;
      }
      .menuPar{
        position:fixed;
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        justify-content:flex-start;
        z-index:1;
        background-color:blue;
        height:100vh;
        transition:all 0.4s ease;
        width:80%;
        top:0px;
        left:-100%;
        opacity:0;
        .backgroundGhost{
            display:block;
            position:fixed;
            right:0;
            background-color:rgba(0,0,0,0.6);
            height:100vh;
            width:0%;
        }
        .checkBtn{
          display:block;
          margin:36px 0px;
          cursor:pointer;
        }

        .menus{
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:space-between;
          height:13vh;
          .items{
            font-size:22px;
          }
        }
        .userMenuPar{
          margin-top:30px;
          display:flex;
          flex-direction:column;
        }

      }
    
       #check:checked + .menuPar{
        top: 0;
        left: 0%;
        opacity:1;
        .backgroundGhost{
          width:20%;
        }
      }
    }
    
}
`;
