import React,{useEffect, useState,useContext} from "react";
import styled,{keyframes} from "styled-components";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { fontFamily,ColorRgb,textColor } from '../../components/theme';
import {IoIosLogOut} from 'react-icons/io';
import {CgProfile} from 'react-icons/cg';
import {IoNotificationsOutline,IoLockClosed} from 'react-icons/io5';
import {IoIosArrowForward} from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';
import RequestOld from '../../containers/requestComp/mainRequestOld'
import { Background } from "devextreme-react/range-selector";

function Menu() {
    const location = useLocation();
    const userCtx = useContext(UserContext);
    const [ showProfile, setShowProfile ] = useState(false);
    const [ proHover, setProHover ] = useState(false);
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
      const userName = localStorage.getItem("username");
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
      if(currentPath === "/request/user"){setActiveMenu({Home: '',Req:'line2',Check: '',Maygt:''})}
      if(currentPath === "/check/user"){setActiveMenu({Home: '',Req:'',Check:'line2',Maygt: ''})}
      if(currentPath === "/urgudul/1"){setActiveMenu({Home: '',Req: '',Check:'',Maygt:'line2'}) }
    }, [location]);
   

  return (
    <Componentss>
     
      <div style={{height:headerHeight,display:diplayFlex}} className="MainMenus">
            <div style={currPath === "/"? {maxWidth:`1160px`}:{maxWidth:1000}} className="container">
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
                                <Link to="/comp-check">Шалгах</Link>
                                <div  className={`line ${activeMenu.Check}`}></div>
                              </div> */}
                        </div>
                        <div className="userMenuPar">
                          {/* <span className="UserNameMenu"><Link to="/">{userName}</Link> </span> */}
                          <div className="Notification"><div className="notf" to="#" content="2" ><IoNotificationsOutline /></div> </div>
                          <div className="UserNameMenu" content={userName} >
                            <div style={proHover?{backgroundColor:`rgba(255,255,255,0.4)`}:{backgroundColor:`inherit`}} onMouseEnter={()=>{setShowProfile(prev=>!prev);setProHover(prev=>!prev)}} onMouseLeave={()=>{setShowProfile(prev=>!prev);setProHover(prev=>!prev)}} className="par"><CgProfile /></div> 

                             {showProfile&&<div onMouseEnter={()=>{setShowProfile(prev=>!prev);setProHover(prev=>!prev)}} onMouseLeave={()=>{setShowProfile(prev=>!prev);setProHover(prev=>!prev)}} className="ghost"> <div className="HoverContent">  
                                  <div className="UserInfo"> <img src="/user1.svg" alt="src" /> <span className="name">{userName}</span> </div>
                                  <div className="resPass">
                                        <div className="initList"><div className="svg"><IoLockClosed /></div>  <span>Нууц үг солих</span></div>
                                        <div className="svgOther"><IoIosArrowForward /> </div>                               
                                  </div>
                              </div></div>} 

                          </div>
                          <span className="Logout"><Link  to="/" onClick={()=>userCtx.logout()}><span>Гарах</span><IoIosLogOut /></Link></span>
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

const cardAnimate = keyframes`
    0% { transform:scale(1);opacity:0;  }
    30% { transform:scale(1.037);opacity:0.7;  }
    100% { transform:scale(1);opacity:1;  }
`

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
              .notf{
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
              .ghost{
                animation-name: ${cardAnimate};
                animation-duration:0.5s;
                color:rgba(${textColor},1);
                position:absolute;
                top:5px;
                right:0;
                transition:all 0.3s ease;
                .HoverContent{
                  display:flex;
                  align-items:center;
                  flex-direction:column;
                  justify-content:center;
                  margin-top:30px;
                  padding:0px 15px;
                  background-color:#fff;
                  max-height: calc(100vh - 60px);
                  box-shadow:1px 1px 20px -9px;
                  width:250px;
                  border-radius:4px;
                  .UserInfo{
                    display:flex;
                    align-items:center;
                    width:100%;
                    padding:20px 5px;
                    border-bottom:1px solid rgba(0,0,0,0.2);
                    img{
                      width:25px;
                      margin-right:15px;
                    }
                    .name{
                      font-size:16px;
                      font-weight:500;
                    }
                  }
                  .resPass{
                    cursor:pointer;
                    border-radius:4px;
                    width:100%;
                    padding: 9px 5px;
                    margin: 9px 0px;
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    .initList{
                      display:flex;
                      align-items:center;
                      span{
                        font-size:15px;
                        font-weight:500;
                        color:rgba(${textColor},1);
                      }
                      .svg{
                        margin-right:14px;
                        background-color:#e4e6eb;
                        padding:8px 8px;
                        border-radius:50%;
                        svg{
                          font-size:17px;
                        }
                      }
                    }
                    .svgOther{
                      svg{
                        color:rgba(${textColor},.7);
                        font-size:22px;
                      }
                    }
                    &:hover{
                      background-color:#e4e6eb;
                    }
                }
              }
              

          // <div className="resPass">
          //       <div className="initList><div className="svg"><IoLockClosed /></div>  <span>Нууц үг солих</span></div>
          //       <div className="svgOther"><IoIosArrowForward /> </div>                               
          // </div>
              }
              .par{
                padding:4px 4px;
                cursor:pointer;
                height:100%;
                border-radius:50%;
                // background-color:#e4e6eb;
                margin-left:8px;
                svg{
                  font-size:21px;
                  color:rgba(255,255,255,0.9);
                }
                &:hover{
                  color:black;
                  background-color:rgba(255,255,255,0.3);
                  svg{
                    color:white;
                  }
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
  @media print{
    display:none;
  }
`;
