import React, { useState, useContext } from 'react';
import { CustomModal, InputStyle } from "./CustomTheme";
import styled from "styled-components"
import { TiDeleteOutline } from "react-icons/ti"
import axios from 'axiosbase';
import UserContext from "context/UserContext"

const DeleteModal = ({ setModal, setCond, SD }) => {
    const { alertText } = useContext(UserContext);
    const [ cName, setName ] = useState('');

    const CloseHandle = () =>{
        setName('contentParent2');
        setTimeout(() => {
            setModal(false);
        }, 370)
    }

    const SubmitHandle = () =>{
        axios.delete(`insurances/insurance/${SD.id}`).then(_=>{
            alertText('green','Устгагдлаа',true );
            setName('contentParent2');
            setTimeout(() => {
                setModal(false);
            }, 370)
            setCond(prev=>!prev);
        }).catch(()=>{
            alertText('orange','Устгахад алдаа гарлаа',true );
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
                                        <div className="label">Registration number <span className="reds">*</span></div>
                                        <h5>{SD.companyregister}</h5>
                                    </InputStyle>

                                    <InputStyle >
                                        <div className="label">Company name <span className="reds">*</span></div>
                                        <h5>{SD.companyname}</h5>
                                    </InputStyle>
                                </InputsParent>

                                <InputsParent>
                                    <InputStyle >
                                        <div className="label">Issued date <span className="reds">*</span></div>
                                        <input disabled type="date" defaultValue={SD.issued_date} name='issued_date' className="gettInpp" required />
                                    </InputStyle> 

                                    <InputStyle >
                                        <div className="label">Expiration date <span className="reds">*</span></div>
                                        <input disabled type="date" defaultValue={SD.expiration_date} name='expiration_date' className="gettInpp" required />
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

export default DeleteModal

const InputsParent = styled.div`
    display:flex;
    gap:35px;
`
