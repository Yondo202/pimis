import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { IoMdAdd } from 'react-icons/io'
import axios from 'axiosbase'
import { motion } from "framer-motion";
import { Container } from "./CustomTheme"
import { RiAddLine, RiEdit2Line } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import { MdZoomOutMap } from "react-icons/md"
import AddModal from "./AddModal"


const Insurance = () => {
    const [usersData, setUsersData] = useState([]);
    const [ showAddModal, showSetAddModal ] = useState(false);

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            {showAddModal?<AddModal setModal={showSetAddModal} />:null}

            <Container>
                <div className="Title">Company list</div>

                {/* <div className="listHead">
                    <div className="Inputs">
                        <select  className="roleFilter">
                            <option value="all" selected>- Бүгд -</option>
                        </select>
                    </div>
                    <div className="AddBtn">
                        <IoMdAdd className="addSvg" />Нэмэх
                    </div>
                </div> */}

                <div className="customTable">
                    <div className="headPar">
                        <div className="title"></div>
                        <div onClick={()=>showSetAddModal(true)} className="addBtn"><RiAddLine /><span>Нэмэх</span></div>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Register number</th>
                                <th>Company name</th>
                                <th>ESM</th>

                                <th>Issued</th>
                                <th>Expiration</th>
                                 

                                <th>Policy number</th>
                                <th>Insurance type</th>
                                <th >Үйлдэл</th>
                            </tr>

                            <tr>
                                <td>6194958</td>
                                <td>"Монгол ноос ноолуурын үйлдвэр" ХХК</td>
                                <td className="center">C</td>

                                <td>4/7/2018</td>
                                <td>4/7/2018</td>

                                {/* <td>4/7/2018</td>
                                <td>10/4/2018</td> */}
                                
                                <td>00008</td>
                                <td> Working capital cover</td>

                                <td className="editDelete">
                                    <div className="editDeletePar">
                                        <div className="smBtn"><MdZoomOutMap /></div>
                                        <div className="smBtn"><RiEdit2Line /></div>
                                        <div  className="smBtn"><VscError /></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Container>
        </motion.div>
    )
}

export default Insurance

const Animate = keyframes`
    0% { opacity:0; }
    100% { opacity:1; }
`

const Users = styled.div`
    font-family: ${props => props.theme.fontFamily1} !important;
    font-size:13px;
    color:#2c2945;
    

   
    .listHead{
        display:flex;
        aling-items:center;
        justify-content:space-between;
        margin-bottom:12px;
        .Inputs{
            display:flex;
            font-size:14px;
            .searchInp{
                position:relative;
                font-size:14px;
                display:flex;
                align-items:center;
                margin-right:15px;
                input{
                    border:1px solid rgba(0,0,0,0.1);
                    border-radius:4px;
                    padding:5px 15px;
                }
                .searchIcon{
                    position:absolute;
                    right:5px;
                }
            }
            .roleFilter{
                border:1px solid rgba(0,0,0,0.1);
                border-radius:4px;
                padding:0px 10px;
                padding-right:20px;
            }   
        }
        .AddBtn{
            font-size:14px;
            cursor:pointer;
            display:flex;
            align-items:center;
            color:white;
            background-color:#5a5278;
            position:relative;
            overflow: hidden;
            padding:5px 20px;
            border-radius:4px;
            // font-weight:500;
            .addSvg{
                font-size:15px;
                margin-right:5px;
            }
            &:after{
                content: "";
                background: white;
                display: block;
                position: absolute;
                padding-top: 300%;
                padding-left: 350%;
                margin-left: -20px!important;
                margin-top: -120%;
                opacity: 0;
                transition: all 0.8s
            }
            &:active:after {
                padding: 0;
                margin: 0;
                opacity: 1;
                transition: 0s
            }
        }
    }
    @media only screen and (max-width:768px){
        .listHead{
            flex-direction:column;
            .Inputs{
                margin:10px 0px;
                flex-direction:column;
            }
        }
    }
`