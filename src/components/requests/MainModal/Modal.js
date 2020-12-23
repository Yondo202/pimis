import React, {useRef, useEffect, useCallback, useContext} from 'react';
import {useSpring, animated} from 'react-spring';
import styled from 'styled-components'
import ModalOne from '../modals/modalOne'
// import HelperContext from '../../../context/HelperContext'

export const Modal = ({showModal,setShowModal }) => {
    // const HelpContext = useContext(HelperContext);
    const modalRef = useRef();
    const animation = useSpring({
        config:{
            duration:250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateX(0%)` : `translateX(-100%)`
    });
    const closeModal = e =>{
       if(modalRef.current === e.target){
         setShowModal(false);
       }
    }
    const keyPress = useCallback(e=>{
        if(e.key === 'Escape' && showModal){
            setShowModal(false);
        }
    },[setShowModal, showModal]);
    useEffect(()=>{
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)
    },[keyPress]);

    return(
        <>
            {showModal ?
            (<Background ref={modalRef} onClick={closeModal}>
                <animated.div style={animation} >
                    <div className="modalPar">
                        <button onClick={()=> setShowModal(prev => !prev)} >close</button>
                        <table>
                            <tr>
                                <th>Month</th>
                                <th>Savings</th>
                            </tr>
                            <tr>
                                <td>January</td>
                                <td>$100</td>
                            </tr>
                            <tr>
                                <td>January</td>
                                <td>$100</td>
                            </tr>
                            <tr>
                                <td>January</td>
                                <td>$100</td>
                            </tr>
                        </table>
                        <div><ModalOne /></div>
                    </div>
                </animated.div>
            </Background>)
             : null}
        </>
    )
}
// https://www.youtube.com/watch?v=d3aI1Dt0Z50

const Background = styled.div`
    font-size:14px;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: rgba(0,0,0,0.5);
    position:fixed;
    display:flex;
    justify-content:end;
    align-items:center;
    z-index:1000;
    .modalPar{
        overflow-x:scroll;
        background-color:#fff;
        width:700px;
        height:100vh;
    }
`