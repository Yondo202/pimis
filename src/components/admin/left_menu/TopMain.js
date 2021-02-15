import React, { useState,useContext } from 'react';
import { useIntl } from 'react-intl';
import Switch from 'react-switch';
import { FaHeart, FaBars } from 'react-icons/fa';
import styled  from 'styled-components';
import { VscSearch } from 'react-icons/vsc'
import { AiOutlineCaretRight } from 'react-icons/ai'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import {useSpring, animated} from 'react-spring';
import UserContext from '../../../context/UserContext'
// import reactLogo from './assets/logo.svg';

const Main = ({ collapsed,rtl, image, handleToggleSidebar,handleCollapsedChange,handleRtlChange,handleImageChange,}) => {
  const ctx = useContext(UserContext)
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
          <div className="block ">
            <Switch
              height={16}
              width={30}
              checkedIcon={false}
              uncheckedIcon={false}
              onChange={handleCollapsedChange}
              checked={collapsed}
              onColor="#219de9"
              offColor="#bbbbbb"
            />
            <span> {intl.formatMessage({ id: 'collapsed' })}</span>
          </div>
          {/* <div className="block">
            <Switch
              height={16}
              width={30}
              checkedIcon={false}
              uncheckedIcon={false}
              onChange={handleRtlChange}
              checked={rtl}
              onColor="#219de9"
              offColor="#bbbbbb"
            />
            <span> {intl.formatMessage({ id: 'rtl' })}</span>
          </div> */}
          <div className="block">
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
          </div>
      </div>
     
        <div className="profilePar">
          {/* <div className="svgPar"> <VscSearch /></div> */}
                <div onClick={showHanlde} className="Profile">
                    <img src='/profile.jpg' alt="profile" />
                    <AiOutlineCaretRight style={profileMenu? {transform:'rotate(90deg)' }: {transform:'rotate(0deg)'}} />
                </div>
              {profileMenu&&(<animated.div style={animation} ><div className="otherPar"><div onClick={()=>ctx.logout()} className="logout"><RiLogoutBoxRLine /> Гарах</div></div></animated.div>) }
                
          </div>
    
   </div>
  );
};

export default Main;


const TopMain = styled.div`
  
`
