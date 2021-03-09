import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom'
import styled  from 'styled-components';
import { AiOutlineCaretRight,AiOutlineMenuUnfold } from 'react-icons/ai'
import UserContext from '../../../context/UserContext'

const Main = ({ handleCollapsedChange }) => {
  const ctx = useContext(UserContext)
  const [ profileMenu, setProfileMenu ] = useState(false);

  return (
    <div className="row topMenuPar"> 
      <div className="SwitchPar">
          <ToggleMenu onClick={()=>{handleCollapsedChange(prev=>!prev); setProfileMenu(prev=>!prev)}} className="block ">
             <div className="togglePar"><AiOutlineMenuUnfold style={profileMenu? {transform:`rotateY(0deg)`}:{transform:`rotateY(180deg)`} }  /> </div>
          </ToggleMenu>
      </div>
     
        <div className="profilePar">
                <Link onClick={()=>ctx.logout()} to="/"  className="Profile">
                    <img src='/profile.jpg' alt="profile" />
                    <AiOutlineCaretRight style={profileMenu? {transform:'rotate(90deg)' }: {transform:'rotate(0deg)'}} />
                </Link>
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
