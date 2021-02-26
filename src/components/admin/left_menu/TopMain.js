import React, { useState,useContext } from 'react';
import { useIntl } from 'react-intl';
import Switch from 'react-switch';
import { Link } from 'react-router-dom'
import { FaHeart, FaBars } from 'react-icons/fa';
import styled  from 'styled-components';
import { AiOutlineCaretRight } from 'react-icons/ai'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import {useSpring, animated} from 'react-spring';
import UserContext from '../../../context/UserContext'
import Hamburger from 'hamburger-react'
// import reactLogo from './assets/logo.svg';

const Main = ({ collapsed,rtl, image, handleToggleSidebar,handleCollapsedChange,handleRtlChange,handleImageChange,}) => {
  const ctx = useContext(UserContext)
  const [isOpen, setOpen] = useState(false);
  const [ profileMenu, setProfileMenu ] = useState(false);
  const intl = useIntl();

  const animation = useSpring({
    config:{  duration:100 },
    opacity: profileMenu ? 1 : 0,
    transform:profileMenu ? `scale(1)` : `scale(0.9)`
});

  const showHanlde = ()=>{ setProfileMenu(prev=>!prev); }

  return (
    <div className="row topMenuPar"> 
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
          <FaBars />
      </div>
      <div className="SwitchPar">
          <ToggleMenu onClick={()=>handleCollapsedChange(prev=>!prev)} className="block ">
             <Hamburger toggled={isOpen} toggle={setOpen} />
          </ToggleMenu>
          {/* <div className="block">
            <Switch
              height={16}
              width={30}
              checkedIcon={false}
              uncheckedIcon={false}
              onChange={handleImageChange}
              checked={image}
              onColor="#219de9"
              offColor="#bbbbbb"
            />
            <span>{intl.formatMessage({ id: 'image' })}</span>
          </div> */}
      </div>
     
        <div className="profilePar">
                {/* <Link  onClick={showHanlde} className="Profile"> */}
                <Link onClick={()=>ctx.logout()} to="/"  className="Profile">
                    <img src='/profile.jpg' alt="profile" />
                    <AiOutlineCaretRight style={profileMenu? {transform:'rotate(90deg)' }: {transform:'rotate(0deg)'}} />
                </Link>
              {/* {profileMenu&&(<animated.div style={animation} ><div className="otherPar"><Link onClick={()=>ctx.logout()} to="/" className="logout"><RiLogoutBoxRLine /> Гарах</Link></div></animated.div>) } */}
                
          </div>
   </div>
  );
};

export default Main;


const ToggleMenu = styled.div`
    .hamburger-react{
        height: 43px !important;
        width: 43px !important;
      div{
        background: currentcolor;
        height: 2px !important;
        left: 8px;
        position: absolute;
        width: 30px !important;
        transition: all 0.4s cubic-bezier(0, 0, 0, 1) 0s;
        transform: none;
      }
    }
`
