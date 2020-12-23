import React,{useEffect, useState,useContext} from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { fontFamily,ColorRgb } from '../components/theme';
import {IoIosLogOut} from 'react-icons/io';
import {CgProfile} from 'react-icons/cg';
import {IoNotificationsOutline} from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';


function Menu(props) {
    const location = useLocation();
    const userCtx = useContext(UserContext);
    const [userId, setUserId] = useState();
    const [userName, setUserName] = useState();
    const [ diplayNone, setDisplayNone ] = useState("block");
    const [ headerHeight, setheaderHeight ] = useState("70px");
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
        setheaderHeight("70px");
      }
    }, [location]);

    //   useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    // });
    // const handleScroll = () => {
    //     console.log('lalalall', window.pageYOffset);
    //     if(window.pageYOffset > 100){
    //       setClassNameId("MainMenusNormal");
    //       setHeadStyle("50px");
    //     }else{
    //       setClassNameId("");
    //       setHeadStyle("70px");
    //     }
    // }
  return (
    <Componentss>
      <div style={{display:diplayNone}} className="Background">
        <div className="LogoHeadPar container">
            <div style={{backgroundImage:`url(/head.jpg)`}} className="logoPar"></div>
        </div>
      </div>
     
      <div style={{height:headerHeight}} className="MainMenus">
            <div className="container">
               <input type="checkbox" id="check" name="check" />

                <span className="menuPar">
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
                        </div>
                        <div className="userMenuPar">
                          {/* <span className="UserNameMenu"><Link to="/">{userName}</Link> </span> */}
                          <div className="Notification"><Link to="#" content="2" ><IoNotificationsOutline /></Link> </div>
                          <span className="UserNameMenu" content={userName} ><Link to="#"><CgProfile /></Link> </span>
                          <span className="Logout"><Link onClick={clickhandle} to="/"><span>Гарах</span><IoIosLogOut /></Link></span>
                        </div>
                </span>

                <div className="MobileMenu">
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
                    <div className="headLogoPar"><img src="/edp_logo.png" /></div>
                    <div></div>
                </div>
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
    #MainMenusNormal{
      transition:all 0.4s ease;
      position: fixed;
      top:0px;
      left:0;
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
        // .headLogoPar{
        //   width:30%;
        //   img{
        //     // width:120px;
        //     height:60px;
        //   }
        // }
        .MobileMenu{
          display:none;
          .checkBtnHome{
          }
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
           
            .Notification{
              a{
                position:relative;
                display:flex;
                flex-direction:row;
                align-items:center;
                &::before{
                  font-size:14px;
                  font-weight:600;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  content: ""attr(content)"";
                  position:absolute;
                  top:-6px;
                  right:-6px;
                  width:18px;
                  height:18px;
                  color:white;
                  border-radius:50%;
                  background-color:#ff0000;
                }
                svg{
                  margin-left:8px;
                  font-size:28px;
                  color:rgba(${ColorRgb},0.9);
                  
                }
              }
            }
            .UserNameMenu{
              position:relative;
              &:hover{
                &::before{
                  transform:scale(1);
                  opacity:1;
                }
              }
              &::before{
                content:""attr(content)"";
                color:white;
                text-align:center;
                display:flex;
                justify-content:center;
                height:30px;
                width:100px;
                background-color:rgb(${ColorRgb});
                position:absolute;
                top:40px;
                // clip-path: polygon(48% 29%, 100% 29%, 100% 100%, 0 100%, 0 30%, 22% 30%, 22% 0);
                left:0;
                border-radius:4px;
                transition:all 0.3s ease;
                transform:scale(0.6);
                opacity:0;
              }
                a {
                  display:flex;
                  flex-direction:row;
                  align-items:center;
                  color:black;
                  text-decoration: none !important;
                  svg{
                    margin-left:8px;
                    font-size:28px;
                    color:rgba(${ColorRgb},0.9);
                  }
                }
            }
            .Logout{
                margin-left:8px;

              a {
                font-weight:500;
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
    .Background{
      display:none !important;
      .LogoHeadPar{
        height:40px;
        width:100%;
        .logoPar{
        }
      }
    }


    .MainMenus{
      position:relative;
      .MobileMenu{
        display:block;
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        align-items:center;
        .checkBtnHome{
          cursor:pointer;
          // width:10%;
          text-align:center;
        }
        .headLogoPar{
            height:54px;
            img{
              height:100%;

            }
        }
      }
     
      .menuPar{
        position:fixed;
        display:flex;
        flex-direction:column;
        align-items:flex-end;
        justify-content:start;
        z-index:1;
        background-color:white;
        height:100vh;
        transition:all 0.4s ease;
        width:80%;
        top:0px;
        left:-100%;
        opacity:0;
        padding-right:38px;
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
          height:15%;
        }

        .menus{
          width:100%;
          display:flex;
          flex-direction:column;
          align-items:flex-end;
          justify-content:space;
          padding-right:100%;
          height:25%;
          transition:padding-right 1s ease, opacity 1.4s ease;
          // transition-delay: 10s
          opacity:0;
          .items{
            font-size:22px;
          }
        }
        .userMenuPar{
          margin-top:30px;
          display:flex;
          flex-direction:row;
          justify-content:flex-end;
          height:60%;
          align-items:flex-end;
          width: 100%;
          margin-bottom:22px;
          .UserNameMenu{
            display:none;
          }
        }

      }
    
       input[type=checkbox]:checked + span{
        top: 0;
        left: 0%;
        opacity:1;
          .menus{
            padding-right:0%;
            opacity:1;
          }
        // align-items:flex-start;
        .backgroundGhost{
          width:20%;
        }
      }
    }
    
}
`;
