import React, { useEffect, useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { IoNotificationsOutline, IoLockClosed, IoCaretDownOutline } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';
import { FaPenNib } from 'react-icons/fa';
import { GiEntryDoor } from 'react-icons/gi';
import { useLocation } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';


function Menu() {
  const location = useLocation();
  const userCtx = useContext(UserContext);
  const [showProfile, setShowProfile] = useState(false);
  const [proHover, setProHover] = useState(false);
  const [userName, setUserName] = useState();
  const [currPath, setCurrPath] = useState();
  const [headerHeight, setheaderHeight] = useState("45px");
  const [open, close] = useState(false);
  const [activeMenu, setActiveMenu] = useState({
    Home: '',
    Req: '',
    Check: ''
  })

  const closeHandle = () => { setShowProfile(false); setProHover(false); }

  useEffect(() => {
    const userName = localStorage.getItem("username");
    setUserName(userName);
  }, []);

  const handleClick = () => {
    close(!open);
  }

  useEffect(() => {
    const currentPath = location.pathname;
    setCurrPath(currentPath);
    if (currentPath !== "/" && currentPath !== "/comp-request") {
      setheaderHeight("45px");
    } else { setheaderHeight("45px"); }
    if (currentPath === "/") { setActiveMenu({ Home: 'line2', Req: '', Check: '', Maygt: '' }) }
    if (currentPath === "/request/user") { setActiveMenu({ Home: '', Req: 'line2', Check: '', Maygt: '' }) }
    if (currentPath === "/check/user") { setActiveMenu({ Home: '', Req: '', Check: 'line2', Maygt: '' }) }
    if (currentPath === "/urgudul/1") { setActiveMenu({ Home: '', Req: '', Check: '', Maygt: 'line2' }) }
  }, [location]);

  return (
    <Componentss>
      <div style={{ height: headerHeight, display: 'flex' }} className="MainMenus">
        <div style={currPath === "/" ? { maxWidth: `1160px` } : { maxWidth: 1000 }} className="container">
          <input type="checkbox" id="check" name="check" />
          <span className="menuPar">
            <div className="backgroundGhost"></div>
            <label htmlFor="check" className="checkBtn">
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
                <Link to="/">Экспортыг дэмжих төсөл</Link>
                {/* <div style={{ transform: `${activeMenu.Home}` }} className={`line ${activeMenu.Home}`}></div> */}
              </div>
              <div className="items">
                <Link to="/trainings">Сургалтын хөтөлбөр</Link>
              </div>
            </div>

            <div className="userMenuPar">
              {/* <span className="UserNameMenu"><Link to="/">{userName}</Link> </span> */}
              <div className="Notification"><div className="notf" to="#" content="2" ><IoNotificationsOutline /></div> </div>
              <div className="UserNameMenu" >
                <div style={proHover ? { backgroundColor: `rgba(255,255,255,0.4)` } : { backgroundColor: `rgba(255,255,255,0.2)` }} onMouseEnter={() => { setShowProfile(true); setProHover(true) }} onMouseLeave={() => { setShowProfile(false); setProHover(false) }} className="par"><IoCaretDownOutline /></div>

                {showProfile && <div onMouseEnter={() => { setShowProfile(true); setProHover(true) }} onMouseLeave={() => { setShowProfile(false); setProHover(false) }} className="ghost">
                  <div className="HoverContent">
                    <div className="UserInfo"> <img src="/user1.svg" alt="src" /> <span className="name">{userCtx.userInfo.name}</span> </div>
                    <Link onClick={closeHandle} to="/signature" className="resPass">
                      <div className="initList"><div className="svg"><FaPenNib /></div><span>Хэрэглэгчийн мэдээлэл</span></div>
                      <div className="svgOther"><IoIosArrowForward /> </div>
                    </Link>
                    <Link onClick={closeHandle} to="/changepass" className="resPass">
                      <div className="initList"><div className="svg"><IoLockClosed /></div>  <span>Нууц үг солих</span></div>
                      <div className="svgOther"><IoIosArrowForward /> </div>
                    </Link>
                    <Link to="/" onClick={() => { closeHandle(); userCtx.logout() }} className="resPass">
                      <div className="initList"><div className="svg"><GiEntryDoor /></div>  <span>Гарах</span></div>
                      <div className="svgOther"><IoIosArrowForward /> </div>
                    </Link>
                  </div></div>}

              </div>
              {/* <span className="Logout"><Link  to="/" onClick={()=>userCtx.logout()}><span>Гарах</span><IoIosLogOut /></Link></span> */}
            </div>
          </span>

          <div className="MobileMenu">
            <label htmlFor="check" className="checkBtnHome">
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
            <div className="headLogoPar"><img src="/edp_logo.png" alt="edp-logo" /></div>
            <div></div>
          </div>
        </div>
      </div>
    </Componentss>
  );
}

export default Menu;

const cardAnimate = keyframes`
    0% { transform:translateY(30px);opacity:0;  }
    100% { transform:translateY(0px);opacity:1;  }
`

const Componentss = styled.div`
    font-family: ${(props) => props.theme.fontFamily};
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
      background-color: rgba(${(props) => props.theme.ColorRgb});
      display:flex;
      flex-direction:row;
      align-items:center;
      width: 100%;
      box-shadow: 0px 2px 8px -2px rgba(${(props) => props.theme.ColorRgb}, 0.5);
    
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
            width:10%;
            .Notification{
              .notf{
                position:relative;
                display:flex;
                flex-direction:row;
                align-items:center;
                /* &::before{
                  font-size:11px;
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
                } */
                svg{
                  margin-left:8px;
                  font-size:24px;
                  color:rgba(255,255,255,0.9);
                  
                }
              }
            }
            .UserNameMenu{
              position:relative;
              .ghost{
                animation-name: ${cardAnimate};
                animation-duration:0.5s;
                color:rgba(${(props) => props.theme.textColor},1);
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
                  width:300px;
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
                    text-decoration:none;
                    color:rgba(${(props) => props.theme.textColor},1);
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
                        color:rgba(${(props) => props.theme.textColor},1);
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
                        color:rgba(${(props) => props.theme.textColor},.7);
                        font-size:22px;
                      }
                    }
                    &:hover{
                      background-color:#e4e6eb;
                    }
                }
              }
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
