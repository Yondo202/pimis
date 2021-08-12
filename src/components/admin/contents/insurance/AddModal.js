import React, { useState } from 'react';
import { CustomModal, InputStyle } from "./CustomTheme";
import styled from "styled-components"



const AddModal = ({ setModal }) => {
    const [ cName, setName ] = useState('');

    const CloseHandle = () =>{
        setName('contentParent2');
        setTimeout(() => {
            setModal(false);
        }, 370)
    }

    return (
        <CustomModal>
            <div className={`contentParent ${cName}`} style={{width:"40rem"}}>
                <div className="head">
                    <div className="title">Add Insurance data</div>
                    <div onClick={CloseHandle} className="close">✖</div>
                </div>

                <div className="content">
                    <InputsParent>
                        <InputStyle >
                            <div className="label">Registration number <span className="reds">*</span></div>
                            <input type="text" name="desc" className="gettInp" required />
                        </InputStyle>

                        <InputStyle >
                            <div className="label">Company name <span className="reds">*</span></div>
                            <input type="text" name="desc" className="gettInp" required />
                        </InputStyle>
                    </InputsParent>

                    <InputsParent>
                        <InputStyle >
                            <div className="label">Issued date <span className="reds">*</span></div>
                            <input type="date" name="desc" className="gettInp" required />
                        </InputStyle> 

                        <InputStyle >
                            <div className="label">Expiration date <span className="reds">*</span></div>
                            <input type="date" name="desc" className="gettInp" required />
                        </InputStyle>
                    </InputsParent>

                   <InsureType>

                   </InsureType>
                        

                    <div className="modalbtnPar">
                        <button type="submit" className="modalbtn">Хадгалах</button>
                    </div>
                </div>
                
            </div>
        </CustomModal>
    )
}

export default AddModal

const InputsParent = styled.div`
    display:flex;
    gap:35px;
`
const InsureType = styled.div`
    padding:20px 15px;
    border-top:1px solid rgba(0,0,0,.2);

`
