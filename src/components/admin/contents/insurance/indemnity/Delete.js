import React, { useState, useContext } from 'react';
import styled from "styled-components";
import { CustomModal, InputStyle } from "../CustomTheme";
import axios from 'axiosbase';
import UserContext from "context/UserContext";
import { TiDeleteOutline } from "react-icons/ti"

const Delete = ({ setModal, setCond, selected }) => {
    const { alertText } = useContext(UserContext);
    const [ cName, setName ] = useState('');

    const CloseHandle = () =>{
        setName('contentParent2');
        setTimeout(() => {
            setModal(false);
        }, 370)
    }

    const SubmitHandle = () =>{
        axios.delete(`insurances/indemnity/${selected?.id}`).then(res=>{
            alertText('green','Амжилттай',true );
            setName('contentParent2');
            setTimeout(() => {
                setModal(false);
            }, 370)
            setCond(prev=>!prev);
        }).catch(()=>{
            alertText('orange','Хадаглахад алдаа гарлаа',true );
        })
    }

    return (
        <CustomModal>
            <div className={`contentParent ${cName}`} style={{width:"40rem"}}>
                <div className="head">
                    <div className="title">Delete Insurance data</div>
                    <div onClick={CloseHandle} className="close">✖</div>
                </div>

                <div className="content">
                    <div style={{opacity:`0.8`}}>
                        <InputsParent>
                            <InputStyle >
                                <div className="label">Transaction number <span className="reds">*</span></div>
                                <input disabled type="number" defaultValue={selected?.transaction_number} name='transaction_number' className="gettInpps" required />
                            </InputStyle> 

                            <InputStyle >
                                <div className="label">Indemnity date <span className="reds">*</span></div>
                                <input disabled type="date" defaultValue={selected?.date} name='date' className="gettInpps" required />
                            </InputStyle>
                        </InputsParent>
                    </div>
                        
                    <div className="modalbtnPar">
                        <div style={{opacity:`0`}} className="errText"><span className="red">* </span> Тэмдэглэгээтэй хэсгийг заавал бөглөнө үү...</div>
                        <button onClick={SubmitHandle}  className="modalbtn"><TiDeleteOutline /> Устгах</button>
                    </div>
                </div>
                
            </div>
        </CustomModal>
    )
}

export default Delete


const InputsParent = styled.div`
    display:flex;
    gap:35px;
`
const InsureType = styled.div`
    margin-top:15px;
    padding:30px 15px;
    border:1px solid #b5b8c8;
    border-radius:5px;
    position:relative;
    &:after{
        content:"${props=>props.contents}";
        top:-8px;
        left:10px;
        position:absolute;
        background-color:#fff;
        padding:0px 10px;
    }
`