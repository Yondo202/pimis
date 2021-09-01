import React, { useEffect, useState } from 'react';
import { CustomModal, InputStyle, Container } from "components/misc/CustomStyle";
import styled from "styled-components"
import { RiAddLine, RiEdit2Line } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import Add from "./indemnity/Add"
import Edit from "./indemnity/Edit"
import Delete from "./indemnity/Delete"
import { NumberComma } from "./NumberComma"

const IndemnityAdd = ({ setModal, setCond, SD }) => {
    const [ cName, setName ] = useState('');
    const [ showAdd, setShowAdd ] = useState(false);
    const [ showEdit, setShowEdit ] = useState(false);
    const [ showDelete, setShowDelete ] = useState(false);
    const [ selected, setSelected ] = useState({});
    const [ indemnity, setIndemnity ] = useState([]);

    const CloseHandle = () =>{
        setName('contentParent2');
        setTimeout(() => {
            setModal(false);
        }, 370)
    }

    useEffect(()=>{
        setIndemnity(SD?.indemnities);
        setSelected({...SD.indemnities.filter(item=>item.id===selected.id)});
    },[SD.indemnities])

    const selectRowHandle = (el) =>{
        setSelected(el);
    }

    const EditHandle = () =>{
        if(selected?.id){
            setShowEdit(true);
        }
    }
    
    const DeleteHandle = () =>{
        if(selected?.id){
            setShowDelete(true);
        }
    }

    return (
        <CustomModal style={{paddingTop:`3rem`}}>
            {showAdd?<Add setCond={setCond} SD={SD} setModal={setShowAdd} />:null}
            {showEdit?<Edit setCond={setCond} SD={SD} setModal={setShowEdit} selected={selected}  />:null}
            {showDelete?<Delete setCond={setCond} setModal={setShowDelete} selected={selected}  />:null}

            <div className={`contentParent ${cName}`} style={{width:"50rem"}}>
                <div className="head">
                    <div className="title">Add Indemnity Data</div>
                    <div onClick={CloseHandle} className="close">✖</div>
                </div>

                <div style={{marginBottom:40}} className="content">
                    <div style={{opacity:`0.8`}}>
                        <InputsParent>
                                <InputStyle >
                                    <div className="label">Registration number <span className="reds">*</span></div>
                                    <h6>{SD.companyregister}</h6>
                                </InputStyle>

                                <InputStyle >
                                    <div className="label">Company name <span className="reds">*</span></div>
                                    <h6>{SD.companyname}</h6>
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

                    <Container style={{padding:`0px 0px`, boxShadow:`none`}}>
                        <div className="smTitles">Detail of Indemnity</div>
                        <div className="customTable">
                            <div className="headPar ">
                                {/* <div className="title"></div> */}
                                <div onClick={()=>setShowAdd(true)} className="addBtn addBtn2"><RiAddLine /><span>Нэмэх</span></div>
                                <div className="additions">
                                    <div onClick={EditHandle} className="addBtn addBtn2"><RiEdit2Line /><span>Засах</span></div>
                                    <div onClick={DeleteHandle} className="addBtn addBtn2"><VscError /><span>Устгах</span></div>
                                </div>
                            </div>

                            <table>
                                <tbody>
                                    <tr>
                                        <th>Transaction number</th>
                                        <th>Indemnity date</th>
                                        <th>Rate</th>
                                        <th>Amount (USD)</th>
                                        <th>Amount (MNT)</th>
                                    </tr>
                                        {indemnity.map((el,ind)=>{
                                            return(
                                                <tr onClick={()=>selectRowHandle(el)} key={ind} className={`cusorItems ${selected.id===el.id?`Selected`:``}`}>
                                                    <td>{el.transaction_number}</td>
                                                    <td>{el.date}</td>
                                                    <td className="right">{NumberComma(el.rate)} ₮</td>
                                                    <td className="right">{NumberComma(el.amount)} $</td>
                                                    <td className="right">{NumberComma(el.amount_mnt)} ₮</td>
                                                </tr>
                                            )
                                        })}

                                    
                                </tbody>
                            </table>
                        </div>
                    </Container>
                </div>

                    
                
            </div>
        </CustomModal>
    )
}

export default IndemnityAdd

const InputsParent = styled.div`
    display:flex;
    gap:35px;
`
