import React, {useRef, useEffect, useCallback, useContext, useState } from 'react'
import styled from 'styled-components'
import { Color,ColorRgb } from '../theme'
import {VscFilePdf} from 'react-icons/vsc';
import { useReactToPrint } from "react-to-print";




export default class PageOne extends React.Component {
    render() {
      return (
            <A4Format className="A4formatParent">
                    <div className="headImg">
                        <div className="imgItem"><img className="main" src="edp_logo.png" alt="edp" /></div>
                        <div className="imgItem"><img src="edp_logo2.png" alt="edp" /> </div>
                        <div className="imgItem"><img src="edp_logo3.gif" alt="edp" /> </div>
                    </div>
                    <div className="line"></div>
                    <div className="title">Ашиг сонирхлын зөрчилгүй тухай мэдэгдэх хуудас</div>
            </A4Format>
        )
    }
  }

const A4Format = styled.div`
        padding:10px 40px;
        background-color:white;
        width:1200px;
        height:1585px;
        border:1px solid black;
        .headImg{
            height:44px;
            width:50%;
            display:flex;
            justify-content:space-between;
            align-items:center;
            .imgItem{
                width:32%;
                img{ width:100%; }
                .main{ width:50%; }
            }
        }
        .line{
            height:1px;
            width:100%;
            background-color:rgba(44, 123, 229, 0.6);
        }
        .title{
            margin-top:15px;
            text-align:center;
            font-weight:500;
        }
`

const Components = styled.div`
    font-size:13px;
    // margin-top:25px;
`
