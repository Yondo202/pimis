import React from 'react';
import { useIntl } from 'react-intl';
import Switch from 'react-switch';
import { FaHeart, FaBars } from 'react-icons/fa';
import styled  from 'styled-components';
import { VscSearch } from 'react-icons/vsc'
import { GoTriangleDown } from 'react-icons/go'
// import reactLogo from './assets/logo.svg';

const Main = ({
  collapsed,
  rtl,
  image,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
}) => {
  const intl = useIntl();
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
          <div className="svgPar"> <VscSearch /></div>
                <a className="Profile">
                    <img src='/profile.jpg' alt="profile" />
                    <GoTriangleDown />
                </a>
          </div>
    
   </div>
  );
};

export default Main;


const TopMain = styled.div`
  
`
