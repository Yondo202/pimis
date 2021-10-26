import React from 'react'
import { useHistory } from 'react-router-dom';
import { Container } from "components/misc/CustomStyle"
import { MdKeyboardArrowLeft } from 'react-icons/md';
import styled, { keyframes } from 'styled-components';
import { fontSize, textColor } from 'components/theme';

const Member_interest = () => {
    const history = useHistory();
    return (
        <Container className="container">
            {/* <NullParent className="NullPar">
                <div className="nullTitle">
                    <div onClick={() => history.goBack()} className="BackPar"><div className="SvgPar"><MdKeyboardArrowLeft /></div>  <span>Буцах</span> </div>
                    <h2 className="title">Мэдээлэл ороогүй байна</h2>
                    <div className="desc"></div>
                </div>
            </NullParent> */}

            <TitlePar className="TitlePar">
                <div className="title">
                    Ашиг сонирхлын зөрчилгүйг мэдэгдэх хуудас
                </div>
                <div className="desc">
                    {/* Төсөл бүрт өгсөн нэгтгэсэн санал */}
                    {/* Дугаар: {mainData?.project_number} */}
                </div>
            </TitlePar>
        </Container>
    )
}

export default Member_interest

const homeAnimeSvg = keyframes`
    0% { left:20px; opacity: 0.4; transform:scale(1) }
    100% { left:0px; opacity: 1; transform:scale(1.2) }
`

const TitlePar = styled.div`
    padding:10px 0px;
    margin-bottom:15px;
    .title{
        display:flex;
        justify-content:center;
        color:${textColor};
        padding-bottom:10px;
        font-size:16px;
        text-align:center;
        font-weight:500;

        .customRadio{
            display:flex;
            gap:25px;
            justify-content:center;
            .item{
                display:flex;
                flex-direction:column;
                align-items:center;
                text-align:center;
                .label{
                    margin-bottom:5px;
                }
            }
        }
        .customRadio{
            margin-left:20px;
        }
    }
    .desc{
        font-size:14px;
        text-align:center;
        font-style: italic;
    }
`

const NullParent = styled.div`
    .nullTitle{
        background-color:white;
        padding:30px 100px;
        font-size:${fontSize};
        margin-top:30px;
        border:1px solid rgba(0,0,0,.2);
        display:flex;
        justify-content:space-between;
        align-items:center;
        .BackPar{
            padding:5px 15px; 
            cursor:pointer;
            display:flex;
            align-items:center;
            .SvgPar{
                height:30px;
                width:30px;
                position:relative;
                overflow:hidden;
                margin-right:5px;
                svg{
                    position:absolute;
                    top:10%;
                    font-size:30px;
                    animation: ${homeAnimeSvg} ease 1s infinite;
                }
            }
            span{
                font-size:16px;
            }
            &:hover{
                background-color:rgba(0,0,0,0.2);
            }
        }
        .title{
            font-size:24px;
            font-weight:500;
        }
    }
`
