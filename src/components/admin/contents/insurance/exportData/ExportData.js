import React, { useEffect, useState } from 'react';
import { CustomModal, InputStyle, Container } from "components/misc/CustomStyle";
import styled from "styled-components"
import { RiAddLine, RiEdit2Line } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import Modals from "./Modals"
import AccessToken from "context/accessToken"
import { NumberComma } from "components/misc/NumberComma"
import { useTranslation } from 'react-i18next';
import axios from 'axiosbase';

const IndemnityAdd = ({ setModal, setCond, SD, userId }) => {
    const [t] = useTranslation();
    const [ exCond, setExCond ] = useState(false);
    const [ cName, setName ] = useState('');
    // const [ years, setYears ] = useState([]);
    const [ modalHandle, setModalHandle ] = useState('');
    const [ showAdd, setShowAdd ] = useState(false);
    const [ selected, setSelected ] = useState({});
    const [ country, setCountry ] = useState([]);
    const [ exportData, setExportData ] = useState([]);
    const [ fCountry, setFCountry ] = useState([]);

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
        //    let years = await axios.get('years/true');
        }()
    },[])

    useEffect(()=>{
        setFCountry([])
        void async function fetch(){
            let data = await axios.get(`export-data?userId=${userId?userId:SD?.user_id}`,{ headers: {Authorization: AccessToken()} });
            data?.data.targ_country.forEach(item=>{
                axios.get(`countries/${item}`).then(res=>{
                    setFCountry(prev=>[...prev, res.data.data]);
                })
            })
            setExportData(data?.data.data);
        }()
    },[exCond]);

    const selectRowHandle = (el) =>{
        setSelected(el);
    }

    const ModalHandle = (type) =>{
        setModalHandle(type);
        if(type==="add"){
            setShowAdd(true);
        }else{
            if(selected?.id){
                setShowAdd(true);
            }
        }
    }

    return (
        <CustomModal style={{paddingTop:`3rem`}}>
            {showAdd?<Modals handle={modalHandle} selectedEx={selected} setSelectedEx={setSelected} setCond={setExCond} SD={SD} setModal={setShowAdd} years={years} country={country} />:null}

            <div className={`contentParent ${cName}`} style={{width:"54rem"}}>
                <div className="head">
                    <div className="title">{t('Export Data')}</div>
                    <div onClick={CloseHandle} className="close">✖</div>
                </div>

                <div style={{marginBottom:40}} className="content">
                    {!userId&&<div style={{opacity:`0.8`, marginBottom:`22px`}}>
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
                    </div>}

                    <Container style={{padding:`0px 0px`, boxShadow:`none`}}>
                        <div className="smTitles">Export Data</div>
                        <div className="customTable">
                            <div className="headPar ">
                                {/* <div className="title"></div> */}
                                <div onClick={_=>ModalHandle('add')} className="addBtn addBtn2"><RiAddLine /><span>Нэмэх</span></div>
                                <div className={`additions ${selected.id?``:`opacity`}`}>
                                    <div onClick={_=>ModalHandle('edit')} className="addBtn addBtn2"><RiEdit2Line /><span>Засах</span></div>
                                    <div onClick={_=>ModalHandle('delete')} className="addBtn addBtn2"><VscError /><span>Устгах</span></div>
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
                                        <th>{t('Total')}</th>
                                    </tr>

                                    {exportData.length===0&&<tr className={`cusorItems ghost`}>
                                        <td>example</td>
                                        <td>0.00 ₮</td>
                                        <td className="right">0.00 ₮</td>
                                        <td className="right">0.00 ₮</td>
                                        <td className="right">0.00 ₮</td>
                                        <td className="right">0.00 ₮</td>
                                        <td className="right">0.00 ₮</td>
                                        <td className="right">0.00 ₮</td>
                                    </tr>}

                                    {fCountry.map((elem,index)=>{
                                        return(
                                            <>
                                                <tr key={index}><td className="filterCountry">{elem.description_mon}</td></tr>
                                                {exportData.map((el,ind)=>{
                                                    if(elem.id===el.countryId){
                                                        return(
                                                            <tr onClick={()=>selectRowHandle(el)} key={ind} className={`cusorItems ${selected.id===el.id?`Selected`:``}`}>
                                                                <td className="bold">{el.product_name}</td>
                                                                <td className="right">{NumberComma(el.e2016)} ₮</td>
                                                                <td className="right">{NumberComma(el.e2017)} ₮</td>
                                                                <td className="right">{NumberComma(el.e2018)} ₮</td>
                                                                <td className="right">{NumberComma(el.e2019)} ₮</td>
                                                                <td className="right">{NumberComma(el.e2020)} ₮</td>
                                                                <td className="right">{NumberComma(el.e2021)} ₮</td>
                                                                <td className="right bold blue">
                                                                    {NumberComma(el.e2016+el.e2017+el.e2018+el.e2019+el.e2020+el.e2021)} ₮
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                })}
                                                
                                            </>
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

const years =  [
    "2016","2017","2018","2019","2020","2021"
]