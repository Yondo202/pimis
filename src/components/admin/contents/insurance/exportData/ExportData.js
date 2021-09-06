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

const ExportData = ({ setModal, SD, userId, set }) => {
    const [t] = useTranslation();
    const [cName, setName] = useState('');

    const CloseHandle = () => {
        setName('contentParent2');
        setTimeout(() => {
            setModal(false);
        }, 370)
    }

    return (
        set && !userId ? <CustomModal style={{ paddingTop: `3rem` }}>
            <div className={`contentParent ${cName}`} style={{ width: "54rem" }}>
                <div className="head">
                    <div className="title">{t('Export Data')}</div>
                    <div onClick={CloseHandle} className="close">✖</div>
                </div>

                <div style={{ marginBottom: 40 }} className="content">
                    {!userId && <div style={{ opacity: `0.8`, marginBottom: `22px` }}>
                        <InputsParent>
                            <InputStyle >
                                <div className="label">Registration number <span className="reds">*</span></div>
                                <h6>{SD?.companyregister}</h6>
                            </InputStyle>
                            <InputStyle >
                                <div className="label">Company name <span className="reds">*</span></div>
                                <h6>{SD?.companyname}</h6>
                            </InputStyle>
                        </InputsParent>
                    </div>}
                    <ExportDataContent SD={SD} />
                </div>
            </div>
        </CustomModal>
            : <ExportDataContent userId={userId} />
    )
}

export default ExportData

const ExportDataContent = ({ SD, userId }) => {
    const [t] = useTranslation();
    const [exCond, setExCond] = useState(false);
    const [modalHandle, setModalHandle] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const [selected, setSelected] = useState({});
    const [country, setCountry] = useState([]);
    const [exportData, setExportData] = useState([]);
    const [fCountry, setFCountry] = useState([]);
    const [type, setType] = useState('export_data');

    const [years, setYears] = useState([]);
    const [other, setOther] = useState({});

    useEffect(() => {
        void async function fetch() {
            let res = await axios.get(`countries`);
            let year = await axios.get(`years/true`);
            setYears(year?.data.data);
            setCountry(res.data.data);
        }()
    }, [])

    useEffect(() => {
        setFCountry([])
        void async function fetch() {
            let data = await axios.get(`export-data?userId=${userId ? userId : SD?.user_id}`, { headers: { Authorization: AccessToken() } });
            data?.data.targ_country.forEach(item => {
                axios.get(`countries/${item}`).then(res => {
                    setFCountry(prev => [...prev, res.data.data]);
                })
            })
            setExportData(data?.data.data);
            setOther(data?.data.types);
        }()
    }, [exCond]);

    const selectRowHandle = (el, type) => {
        if (type === "export_data") {
            if (selected.id === el.id) {
                setSelected({});
                setType('export_data');
            } else {
                setType(type);
                setSelected(el);
            }
        } else {
            if (el.id === "total_sales" || el.id === "emp_count") {
                setModalHandle('add');
                setType(type);
                setSelected(el);
                setShowAdd(true);
            } else {
                setModalHandle('edit');
                setType(type);
                setSelected(el);
                setShowAdd(true);
            }
        }

    }

<<<<<<< HEAD
    const ModalHandle = (typeModal) =>{
        setModalHandle(typeModal);
        if(typeModal==="add"){
            setType('export_data');
            setShowAdd(true);
        }else{
            if(type==="export_data"){
                if(selected?.id&&typeof selected?.id!=='string'){
                    setShowAdd(true);
                }
=======
    const ModalHandle = (type) => {
        setModalHandle(type);
        setType('export_data');
        if (type === "add") {
            setShowAdd(true);
        } else {
            if (selected?.id && typeof selected?.id !== 'string') {
                setShowAdd(true);
>>>>>>> 8c5091e353f0086cc2cfa09a873d7c3b53134006
            }
        }
    }

    return (
<<<<<<< HEAD
            <Container style={{padding:`0px 0px`, boxShadow:`none`}}>
                {showAdd?<Modals type={type} handle={modalHandle} selectedEx={selected} setSelectedEx={setSelected} setCond={setExCond} SD={userId?{user_id:userId}:SD} setModal={setShowAdd} years={years} country={country} />:null}

                {/* <div className="smTitles">Export Data</div> */}
                <div className="customTable T4">
                    <div className="headPar ">
                        <div onClick={_=>ModalHandle('add')} className="addBtn addBtn2"><RiAddLine /><span>Экспорт дата - Нэмэх</span></div>
                        <div className={`additions ${selected.id&&type==="export_data"?``:`opacity`}`}>
                            <div onClick={_=>ModalHandle('edit')} className="addBtn addBtn2"><RiEdit2Line /><span>Засах</span></div>
                            <div onClick={_=>ModalHandle('delete')} className="addBtn addBtn2"><VscError /><span>Устгах</span></div>
                        </div>
=======
        <Container style={{ padding: `0px 0px`, boxShadow: `none` }}>
            {showAdd ? <Modals type={type} handle={modalHandle} selectedEx={selected} setSelectedEx={setSelected} setCond={setExCond} SD={userId ? { user_id: userId } : SD} setModal={setShowAdd} years={years} country={country} /> : null}

            {/* <div className="smTitles">Export Data</div> */}
            <div className="customTable T4">
                <div className="headPar ">
                    <div onClick={_ => ModalHandle('add')} className="addBtn addBtn2"><RiAddLine /><span>Экспорт дата - Нэмэх</span></div>
                    <div className={`additions ${selected.id ? `` : `opacity`}`}>
                        <div onClick={_ => ModalHandle('edit')} className="addBtn addBtn2"><RiEdit2Line /><span>Засах</span></div>
                        <div onClick={_ => ModalHandle('delete')} className="addBtn addBtn2"><VscError /><span>Устгах</span></div>
>>>>>>> 8c5091e353f0086cc2cfa09a873d7c3b53134006
                    </div>
                </div>

<<<<<<< HEAD
                    <table>
                        <tbody>
                            <tr>
                                <th>Product name</th>
                                {years.map((el,ind)=>{
                                    return(
                                        <th key={ind}>{el?.year}</th>
                                    )
                                })}
                                <th>{t('Total')}</th>
                            </tr>
                            
                            {!userId?
=======
                <table>
                    <tbody>
                        <tr>
                            <th>Product name</th>
                            {years.map((el, ind) => {
                                return (
                                    <th key={ind}>{el?.year}</th>
                                )
                            })}
                            <th>{t('Total')}</th>
                        </tr>

                        {userId ?
>>>>>>> 8c5091e353f0086cc2cfa09a873d7c3b53134006
                            <>
                                <tr onClick={() => selectRowHandle(other.total_sales?.id ? other.total_sales : { id: 'total_sales' }, "total_sales")} className={`cusorItems ${selected.id === 'total_sales' ? `Selected` : selected.id && selected.id === other.total_sales?.id ? `Selected` : ``}`}>
                                    <td className="bold">Нийт борлуулалт</td>
                                    {years.map((e, i) => <td key={i} className="right">{other.total_sales?.id ? NumberComma(other.total_sales[`e${e.year}`]) : null}</td>)}
                                    <td className="right bold blue">
                                        {other.total_sales?.id ? NumberComma(other.total_sales.e2016 + other.total_sales.e2017 + other.total_sales.e2018 + other.total_sales.e2019 + other.total_sales.e2020 + other.total_sales.e2021 + other.total_sales.e2022 + other.total_sales.e2023 + other.total_sales.e2024 + other.total_sales.e2025
                                            + other.total_sales.e2026 + other.total_sales.e2027 + other.total_sales.e2028 + other.total_sales.e2029 + other.total_sales.e2030) : null} ₮
                                    </td>
                                </tr>
                                <tr onClick={() => selectRowHandle(other.emp_count?.id ? other.emp_count : { id: 'emp_count' }, "emp_count")} className={`cusorItems ${selected.id === 'emp_count' ? `Selected` : selected.id && selected.id === other.emp_count?.id ? `Selected` : ``}`}>
                                    <td className="bold">Ажилчдын тоо</td>
                                    {years.map((e, i) => <td key={i} className="center">{other.emp_count?.id ? NumberComma(other.emp_count[`e${e.year}`]) : null}</td>)}
                                    <td className="center bold blue">
                                        {other.emp_count?.id ? NumberComma(other.emp_count.e2016 + other.emp_count.e2017 + other.emp_count.e2018 + other.emp_count.e2019 + other.emp_count.e2020 + other.emp_count.e2021 + other.emp_count.e2022 + other.emp_count.e2023 + other.emp_count.e2024 + other.emp_count.e2025
                                            + other.emp_count.e2026 + other.emp_count.e2027 + other.emp_count.e2028 + other.emp_count.e2029 + other.emp_count.e2030) : null}
                                    </td>
                                </tr>
                            </>
                            : null}

                        {exportData.length === 0 && <tr className={`cusorItems ghost`}>
                            <td>example</td>
                            <td>0.00 ₮</td>
                            <td className="right">0.00 ₮</td>
                            <td className="right">0.00 ₮</td>
                            <td className="right">0.00 ₮</td>
                            <td className="right">0.00 ₮</td>
                            <td className="right">0.00 ₮</td>
                            <td className="right">0.00 ₮</td>
                        </tr>}

                        {fCountry.map((elem, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr className="filterCountryRow" ><td className="filterCountry">{elem?.description_mon}</td></tr>
                                    {exportData.map((el, ind) => {
                                        if (elem?.id === el?.countryId) {
                                            return (
                                                <tr onClick={() => selectRowHandle(el, "export_data")} key={ind} className={`cusorItems ${selected.id === el.id ? `Selected` : ``}`}>
                                                    <td className="bold">{el.product_name}</td>
                                                    {years.map((e, i) => {
                                                        return (
                                                            <td key={i} className="right">{NumberComma(el[`e${e.year}`])}</td>
                                                        )
                                                    })}
                                                    <td className="right bold blue">
                                                        {NumberComma(el.e2016 + el.e2017 + el.e2018 + el.e2019 + el.e2020 + el.e2021 + el.e2022 + el.e2023 + el.e2024 + el.e2025
                                                            + el.e2026 + el.e2027 + el.e2028 + el.e2029 + el.e2030)} ₮
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Container >
    )
}

const InputsParent = styled.div`
    display:flex;
    gap:35px;
`

// const years =  [
//     "2016","2017","2018","2019","2020","2021"
// ]
