import React, { useState, useContext, useEffect } from 'react';
import styled from "styled-components";
import { CustomModal, InputStyle } from "../CustomTheme";
import axios from 'axiosbase';
import UserContext from "context/UserContext";
import NumberFormat from "react-number-format";
import { VscSave } from "react-icons/vsc";

const Edit = ({ setModal, SD, setCond, selected }) => {
    const { alertText } = useContext(UserContext);
    const [ cName, setName ] = useState('');
    const [ rate, setRate ] = useState('');
    const [ Premium, setPremium ] = useState('');

    useEffect(()=>{
        setRate(selected?.rate)
        setPremium(selected.amount);
    },[])

    const CloseHandle = () =>{
        setName('contentParent2');
        setTimeout(() => {
            setModal(false);
        }, 370)
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(`.gettInpps`); let arr = Array.from(inp); let final = {};
        arr.forEach(el=>{
            if(el.name=== "rate" || el.name=== "amount"|| el.name=== "amount_mnt"){
                if(el.value!==''){
                    final[el.name] = parseFloat(el.value.slice(0, -1).replace(/,/g, ''));
                }else{
                    final[el.name] = 0;
                }
            }else{
                final[el.name] = el.value;
            }
        });

        axios.put(`insurances/indemnity/${selected?.id}`, {...final, insuranceId:SD.id }).then(_=>{
            alertText('green','Амжилттай',true );
            setCond(prev=>!prev);
            setName('contentParent2');
            setTimeout(() => {
                setModal(false);
            }, 370)
        }).catch(()=>{
            alertText('orange','Хадаглахад алдаа гарлаа',true );
        })

    }

    return (
        <CustomModal>
            <div className={`contentParent ${cName}`} style={{width:"40rem"}}>
                <div className="head">
                    <div className="title">Edit Insurance data</div>
                    <div onClick={CloseHandle} className="close">✖</div>
                </div>

                <form onSubmit={SubmitHandle}>
                    <div className="content">

                        <InputsParent>
                            <InputStyle >
                                <div className="label">Transaction number <span className="reds">*</span></div>
                                <input type="number" defaultValue={selected?.transaction_number} name='transaction_number' className="gettInpps" required />
                            </InputStyle> 

                            <InputStyle >
                                <div className="label">Indemnity date <span className="reds">*</span></div>
                                <input type="date" defaultValue={selected?.date} name='date' className="gettInpps" required />
                            </InputStyle>
                        </InputsParent>

                        <InsureType contents="Indemnity amount">
                               
                                <InputsParent>
                                    <InputStyle >
                                        <div style={{fontWeight:`500`}} className="label">Rate</div>
                                        <NumberFormat placeholder={`0 ₮`} value={rate} onChange={e=>setRate(e.target.value.slice(0, -1).replace(/,/g, ''))} style={{textAlign:`right`, paddingRight:`7px`}} thousandSeparator={true} suffix={' ₮'} name="rate" className="gettInpps" required />
                                    </InputStyle>
                                    <InputStyle ></InputStyle>
                                </InputsParent>
                                

                                <InputsParent>
                                    <InputStyle >
                                        <div className="label">Indemnity $</div>
                                        <NumberFormat placeholder={`0 $`} value={Premium} onChange={e=>setPremium(e.target.value.slice(0, -1).replace(/,/g, ''))} style={{textAlign:`right`, paddingRight:`7px`}} thousandSeparator={true} suffix={' $'} name="amount" className="gettInpps" required />
                                    </InputStyle>

                                    <InputStyle >
                                        <div  className="label">Indemnity ₮</div>
                                        <NumberFormat disabled placeholder={`0 ₮`} value={Premium!==''?Premium*rate:''} style={{textAlign:`right`, paddingRight:`7px`}}  name="amount_mnt" className="gettInpps" thousandSeparator={true} suffix={' ₮'} required />
                                    </InputStyle>
                                </InputsParent>
                                
                        </InsureType>
                            
                        <div className="modalbtnPar">
                            <div style={{opacity:`0`}} className="errText"><span className="red">* </span> Тэмдэглэгээтэй хэсгийг заавал бөглөнө үү...</div>
                            <button type="submit" className="modalbtn"><VscSave /> Хадгалах</button>
                        </div>
                    </div>
                </form>
                
            </div>
        </CustomModal>
    )
}

export default Edit


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