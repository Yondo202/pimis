import React, { useState } from 'react'
import { CustomModal, InputStyle } from "components/admin/contents/insurance/CustomTheme";
import { VscSave } from "react-icons/vsc";

const AddModal = ({ setAddModal, setConflict }) => {
    const [ cName, setName ] = useState('');
    
    const CloseHandle = () =>{
        setName('contentParent2');
        setTimeout(() => {
            setAddModal(false);
        }, 370)
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(`.gettInpps`); let arr = Array.from(inp); let final = {};
        arr.forEach(el=>{
            final[el.name] = el.value;
        });
        setConflict(prev=>[...prev, final]);
        setName('contentParent2');
        setTimeout(() => {
            setAddModal(false);
        }, 370)
    }
    // { compname:'', description:'' }
    
    return (
        <CustomModal>
            <div className={`contentParent ${cName}`} style={{width:"40rem"}}>
                <div className="head">
                    <div className="title">Сонирхлын зөрчил үүссэн тухай</div>
                    <div onClick={CloseHandle} className="close">✖</div>
                </div>
                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputStyle >
                            <div className="label">Аж ахуйн нэгж эсхүл кластерын нэр <span className="reds">*</span></div>
                            <input type="text" name='compname' className="gettInpps" required />
                        </InputStyle> 

                        <InputStyle >
                            <div className="label">Сонирхлын зөрчил <span className="reds">*</span></div>
                            <textarea type="date" name='description' className="gettInpps" required />
                        </InputStyle>

                        <div className="modalbtnPar">
                            <div style={{opacity:`0`}} className="errText"><span className="red">* </span></div>
                            <button type="submit" className="modalbtn"><VscSave /> Хадгалах</button>
                        </div>
                    </div>
                </form>
            </div>
        </CustomModal>
    )
}

export default AddModal
