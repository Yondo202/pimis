import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { IoLockClosed, IoCaretDownOutline } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';
import { FaPenNib } from 'react-icons/fa';
import { GiEntryDoor } from 'react-icons/gi';
import styled from 'styled-components';
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import UserContext from '../../../context/UserContext'

const Main = ({ handleCollapsedChange }) => {
  const ctx = useContext(UserContext)
  const [profileMenu, setProfileMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [proHover, setProHover] = useState(false);

  const closeHandle = () => { setShowProfile(false); setProHover(false); }

  return (
    <div className="row topMenuPar">
      <div className="SwitchPar">
        <ToggleMenu onClick={() => { handleCollapsedChange(prev => !prev); setProfileMenu(prev => !prev) }} className="block ">
          <div className="togglePar"><AiOutlineMenuUnfold style={profileMenu ? { transform: `rotateY(0deg)` } : { transform: `rotateY(180deg)` }} /> </div>
        </ToggleMenu>
      </div>
      <div className="profilePar">
        {/* <Link onClick={()=>ctx.logout()} to="/"  className="Profile">
                    <img src='/profile.jpg' alt="profile" />
                    <AiOutlineCaretRight style={profileMenu? {transform:'rotate(90deg)' }: {transform:'rotate(0deg)'}} />
                </Link> */}
        <div className="userMenuPar">
          <div className="UserNameMenu" >
            <div style={proHover ? { backgroundColor: `rgba(255,255,255,0.4)` } : { backgroundColor: `rgba(255,255,255,0.2)` }} onMouseEnter={() => { setShowProfile(true); setProHover(true) }} onMouseLeave={() => { setShowProfile(false); setProHover(false) }} className="par"><IoCaretDownOutline /></div>
            {showProfile && <div onMouseEnter={() => { setShowProfile(true); setProHover(true) }} onMouseLeave={() => { setShowProfile(false); setProHover(false) }} className="ghost">
              <div className="HoverContent">
                <div className="UserInfo"> <img src="/user1.svg" alt="src" /> <span className="name">{ctx.userInfo.name}</span> </div>
                <Link onClick={closeHandle} to="/signature" className="resPass">
                  <div className="initList"><div className="svg"><FaPenNib /></div><span>Хэрэглэгчийн мэдээлэл </span></div>
                  <div className="svgOther"><IoIosArrowForward /> </div>
                </Link>
                <Link onClick={closeHandle} to="/changepass" className="resPass">
                  <div className="initList"><div className="svg"><IoLockClosed /></div>  <span>Нууц үг солих</span></div>
                  <div className="svgOther"><IoIosArrowForward /> </div>
                </Link>
                <Link to="/" onClick={() => { closeHandle(); ctx.logout() }} className="resPass">
                  <div className="initList"><div className="svg"><GiEntryDoor /></div>  <span>Гарах</span></div>
                  <div className="svgOther"><IoIosArrowForward /> </div>
                </Link>
              </div></div>}
          </div>
          {/* <span className="Logout"><Link  to="/" onClick={()=>userCtx.logout()}><span>Гарах</span><IoIosLogOut /></Link></span> */}
        </div>
      </div>
    </div>
  );
};

export default Main;

const ToggleMenu = styled.div`
  .hamburger-react{
      margin-top:-12px;
      height: 36px !important;
      width: 43px !important;
    div{
      background: rgba(255,255,255,0.8) !important;
      height: 2px !important;
      left: 8px;
      position: absolute;
      width: 28px !important;
      transition: all 0.4s cubic-bezier(0, 0, 0, 1) 0s;
      transform: none;
    }
  }
  .togglePar{
    cursor:pointer;
    svg{
      transition:all 0.3s ease;
      font-size:22px;
      color: rgba(255,255,255,0.8) !important;
    }
  }
`
