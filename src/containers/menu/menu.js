import React,{useEffect, useState,useContext} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { fontFamily,ColorRgb, } from '../../components/theme';
import {IoIosLogOut} from 'react-icons/io';
import {CgProfile} from 'react-icons/cg';
import {IoNotificationsOutline} from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';
import RequestOld from '../../containers/requestComp/mainRequestOld'

function Menu() {
    const location = useLocation();
    const userCtx = useContext(UserContext);
    const [userName, setUserName] = useState();
    const [ currPath, setCurrPath ] = useState();
    const [ diplayFlex, setDisplayNone ] = useState("flex");
    const [ headerHeight, setheaderHeight ] = useState("45px");
    const [open, close] = useState('');
    const [ activeMenu, setActiveMenu ]=useState({
      Home: '',
      Req: '',
      Check: ''
    })
    
    useEffect(() => {
      const userId = localStorage.getItem("userId", []);
      const userName = localStorage.getItem("userName", []);
      setUserName(userName);
    }, []);

    const handleClick = () => {
      close(!open);
    }

    const clickhandle = ()=>{
      userCtx.logout();
      // setTimeout(()=>{
      //   window.location.reload(false);
      // },600);
    };

    const clickhandle2 = ()=>{
      console.log("done");
     
    };

    useEffect(() => {
      const currentPath = location.pathname;
      setCurrPath(currentPath);
      if(currentPath !== "/" && currentPath !== "/comp-request"){  setheaderHeight("45px");
      }else{ setheaderHeight("45px");}
      if(currentPath === "/"){setActiveMenu({Home:'line2',Req:'',Check:'',Maygt:''})}
      // if(currentPath === "/admin"){ setDisplayNone("none");}
      if(currentPath === "/comp-request"){setActiveMenu({Home: '',Req:'line2',Check: '',Maygt:''})}
      if(currentPath === "/comp-check"){setActiveMenu({Home: '',Req:'',Check:'line2',Maygt: ''})}
      if(currentPath === "/urgudul/1"){setActiveMenu({Home: '',Req: '',Check:'',Maygt:'line2'}) }
    }, [location]);
   

  return (
    <Componentss>
     
      <div style={{height:headerHeight,display:diplayFlex}} className="MainMenus">
            <div style={currPath === "/"? {maxWidth:`1160px`,padding:`0px 0px`}:{maxWidth:1000}} className="container">
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
                                  <Link to="/">Нүүр хуудас</Link>
                                  {/* <div style={{transform:`${activeMenu.Home}`}} className={`line ${activeMenu.Home}`}></div> */}
                              </div>
                              {/* <div className="items">
                                <Link to="/comp-request">Хүсэлт</Link>
                                <div style={{transform:`${activeMenu.Check}`}} className={`line ${activeMenu.Req}`}></div>
                              </div>
                              <div className="items">
                                <Link to="/urgudul/1">Өргөдөлийн маягт</Link>
                                <div  className={`line ${activeMenu.Maygt}`}></div>
                              </div>
                              <div className="items">
                                <Link to="/comp-test">Шалгуур</Link>
                                <div  className={`line ${activeMenu.Check}`}></div>
                              </div> */}
                              {/* <div className="items">
                                <Link to="/comp-check">Шалгах</Link>
                                <div  className={`line ${activeMenu.Check}`}></div>
                              </div> */}
                        </div>
                        <div className="userMenuPar">
                          {/* <span className="UserNameMenu"><Link to="/">{userName}</Link> </span> */}
                          <div className="Notification"><Link to="#" content="2" ><IoNotificationsOutline /></Link> </div>
                          <span className="UserNameMenu" content={userName} ><Link to="#"><CgProfile /></Link> </span>
                          <span className="Logout"><Link onClick={()=>userCtx.logout()} to="/"><span>Гарах</span><IoIosLogOut /></Link></span>
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
                                color="white"
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
      background-color:rgba(${ColorRgb});
      display:flex;
      flex-direction:row;
      align-items:center;
      width: 100%;
      box-shadow: 0px 2px 8px -2px rgba(${ColorRgb}, 0.5);
    
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
                  font-size:12px;
                  font-weight:600;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  content: ""attr(content)"";
                  position:absolute;
                  top:-6px;
                  right:-5px;
                  width:16px;
                  height:16px;
                  color:white;
                  border-radius:50%;
                  background-color:#ff0000;
                }
                svg{
                  margin-left:8px;
                  font-size:21px;
                  color:rgba(255,255,255,0.9);
                  
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
                    font-size:21px;
                    color:rgba(255,255,255,0.9);
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
                color:rgba(255,255,255,0.9);
                font-size:15px;
                svg{
                  margin-left:4px;
                  font-size:18px;
                  color:rgba(255,255,255,0.9);        
                }
              }
            }
          }
          .menus {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 36%;
            .items {
                font-size:15px;
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
                    background-color:white;
                    transform:scale(0);
                }
                .line2{
                  transition:all 0.4s ease;
                  height:2px;
                  width:100%;
                  background-color:white;
                  transform:scale(1);
                }
              a {
                color:white;
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
            height:45px;
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
            font-size:20px;
            a{
              color:black;
            }
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
          .Logout{
            a{
              color:black;
            }
          }
          .Notification{
            a{
              svg{
                color:black;
              }
            }
          }
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
