import React, { useEffect, useState } from 'react';
import { CustomModal, InputStyle, Container } from "components/misc/CustomStyle";
import styled from "styled-components"
import { RiAddLine, RiEdit2Line } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import Add from "./Add"
// import Edit from "./indemnity/Edit"
// import Delete from "./indemnity/Delete"
import { NumberComma } from "components/misc/NumberComma"
import { useTranslation } from 'react-i18next';
import axios from 'axiosbase';

const IndemnityAdd = ({ setModal, setCond, SD }) => {
    const [t] = useTranslation();
    const [ cName, setName ] = useState('');
    const [ showAdd, setShowAdd ] = useState(false);
    const [ showEdit, setShowEdit ] = useState(false);
    const [ showDelete, setShowDelete ] = useState(false);
    const [ selected, setSelected ] = useState({});
    const [ indemnity, setIndemnity ] = useState([]);
    const [ country, setCountry ] = useState([]);

    const CloseHandle = () =>{
        setName('contentParent2');
        setTimeout(() => {
            setModal(false);
        }, 370)
    }

    useEffect(()=>{
        void async function fetch(){
           let res = await axios.get(`countries`);
           setCountry(res.data.data);
        }()
    },[])

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
            {showAdd?<Add setCond={setCond} SD={SD} setModal={setShowAdd} years={years} country={country} />:null}/
            {/* {showEdit?<Edit setCond={setCond} SD={SD} setModal={setShowEdit} selected={selected}  />:null} */}
            {/* {showDelete?<Delete setCond={setCond} setModal={setShowDelete} selected={selected}  />:null} */}

            <div className={`contentParent ${cName}`} style={{width:"54rem"}}>
                <div className="head">
                    <div className="title">{t('Export Data')}</div>
                    <div onClick={CloseHandle} className="close">✖</div>
                </div>

                <div style={{marginBottom:40}} className="content">
                    <div style={{opacity:`0.8`, marginBottom:`22px`}}>
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

                        {/* <InputsParent>
                            <InputStyle >
                                <div className="label">Issued date <span className="reds">*</span></div>
                                <h6>{SD.issued_date}</h6>
                            </InputStyle> 
                            <InputStyle >
                                <div className="label">Expiration date <span className="reds">*</span></div>
                                <h6>{SD.expiration_date}</h6>
                            </InputStyle>
                        </InputsParent> */}
                    </div>

                    <Container style={{padding:`0px 0px`, boxShadow:`none`}}>
                        <div className="smTitles">Export Data</div>
                        <div className="customTable">
                            <div className="headPar ">
                                {/* <div className="title"></div> */}
                                <div onClick={()=>setShowAdd(true)} className="addBtn addBtn2"><RiAddLine /><span>Нэмэх</span></div>
                                <div className={`additions ${selected.id?``:`opacity`}`}>
                                    <div onClick={EditHandle} className="addBtn addBtn2"><RiEdit2Line /><span>Засах</span></div>
                                    <div onClick={DeleteHandle} className="addBtn addBtn2"><VscError /><span>Устгах</span></div>
                                </div>
                            </div>

                            <table>
                                <tbody>

                                    <tr>
                                        <th>Product name</th>
                                        {years.map((el,ind)=>{
                                            return(
                                                <th key={ind}>{el}</th>
                                            )
                                        })}
                                    </tr>

                                    <tr className={`cusorItems ghost`}>
                                        <td>example</td>
                                        <td>0.00 ₮</td>
                                        <td className="right">0.00 ₮</td>
                                        <td className="right">0.00 ₮</td>
                                        <td className="right">0.00 ₮</td>
                                        <td className="right">0.00 ₮</td>
                                        <td className="right">0.00 ₮</td>
                                        <td className="right">0.00 ₮</td>
                                        <td className="right">0.00 ₮</td>
                                    </tr>
                                    {/* {indemnity.map((el,ind)=>{
                                        return(
                                            <tr onClick={()=>selectRowHandle(el)} key={ind} className={`cusorItems ${selected.id===el.id?`Selected`:``}`}>
                                                <td>{el.transaction_number}</td>
                                                <td>{el.date}</td>
                                                <td className="right">{NumberComma(el.rate)} ₮</td>
                                                <td className="right">{NumberComma(el.amount)} $</td>
                                                <td className="right">{NumberComma(el.amount_mnt)} ₮</td>
                                            </tr>
                                        )
                                    })} */}

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

const years =  [
    "2016","2017","2018","2019","2020","2021","2022","2023"
]