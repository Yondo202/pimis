import React, { useEffect, useState } from 'react';
import { CustomModal, InputStyle, Container } from "components/misc/CustomStyle";
import styled from "styled-components"
import { RiAddLine, RiEdit2Line, RiFileEditLine } from "react-icons/ri"
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
    const [ hsCodes, setHsCodes ] = useState([]);
    const [ showList , setShowList ] = useState(false);

    const [years, setYears] = useState([]);
    const [other, setOther] = useState({});


    useEffect(() => {
        void async function fetch() {
            let res = await axios.get(`countries`);
            let year = await axios.get(`years?type=export_data`);
            setYears(year?.data.data);
            setCountry(res.data.data);
        }()
    }, [])

    useEffect(() => {
        setFCountry([])
        void async function fetch() {
            let data = await axios.get(`export-data?userId=${userId ? userId : SD?.user_id}`, { headers: { Authorization: AccessToken() } });
            setHsCodes(data?.data.hs_code)
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
            if (el.id === "total_sales" || el.id === "emp_count" || el.id === "total_export") {
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

    const ModalHandle = (typeModal) => {
        setModalHandle(typeModal);
        if (typeModal === "add") {
            setType('export_data');
            setShowAdd(true);
        } else {
            if (type === "export_data") {
                if (selected?.id && typeof selected?.id !== 'string') {
                    setShowAdd(true);
                }
            }
        }
    }

    return (
        <Container style={{ padding: `0px 0px`, boxShadow: `none` }}>
            {showAdd ? <Modals type={type} handle={modalHandle} selectedEx={selected} setSelectedEx={setSelected} setCond={setExCond} SD={userId ? { user_id: userId } : SD} setModal={setShowAdd} years={years} country={country} /> : null}

            {/* <div className="smTitles">Export Data</div> */}
            <div className="customTable T4 Tuniq">
                <div className="headPar ">
                    <div className="additions">
                        {exportData.length!==0
                        ?<div onClick={_ =>( setShowList(prev=>!prev), setSelected({}) )} className="addBtn addBtn2"><RiFileEditLine /><span>{showList?`Жагсаалт харах`:`Засварлах`} </span></div>
                        :null}
                        <div onClick={_ => ModalHandle('add')} className="addBtn addBtn2"><RiAddLine /><span>Экспорт дата - Нэмэх</span></div>
                    </div>
                   
                    <div className={`additions ${selected.id && type === "export_data" ? `` : `opacity`}`}>
                        <div onClick={_ => ModalHandle('edit')} className="addBtn addBtn2"><RiEdit2Line /><span>Засах</span></div>
                        <div onClick={_ => ModalHandle('delete')} className="addBtn addBtn2"><VscError /><span>Устгах</span></div>
                    </div>
                </div>

                <table>
                    <tbody>
                        <tr>
                            <th>Экспортын мэдээлэл</th>
                            {years.map((el, ind) => {
                                return (
                                    <th key={ind}>{el?.year}</th>
                                )
                            })}
                        </tr>

                        {userId ?
                            <>
                                <tr onClick={() => selectRowHandle(other.total_sales?.id ? other.total_sales : { id: 'total_sales' }, "total_sales")} className={`cusorItems ${selected.id === 'total_sales' ? `Selected` : selected.id && selected.id === other.total_sales?.id ? `Selected` : ``}`}>
                                    <td className="bold">Нийт борлуулалт</td>
                                    {years.map((e, i) => <td key={i} className="right">{other.total_sales?.id ? NumberComma(other.total_sales[`e${e.year}`]) : null}</td>)}
                                </tr>

                                <tr onClick={() => selectRowHandle(other.total_export?.id ? other.total_export : { id: 'total_export' }, "total_export")} className={`cusorItems ${selected.id === 'total_export' ? `Selected` : selected.id && selected.id === other.total_export?.id ? `Selected` : ``}`}>
                                    <td className="bold">Нийт экспортын дүн</td>
                                    {years.map((e, i) => <td key={i} className="right">{other.total_export?.id ? NumberComma(other.total_export[`e${e.year}`]) : null}</td>)}
                                </tr>

                            </>
                            : null}

                        {exportData.length === 0 && <tr onClick={_ => ModalHandle('add')} className={`cusorItems ghost`}>
                            <td>Экспорт дата</td>
                            <td className="right">0.00 ₮</td>
                            <td className="right">0.00 ₮</td>
                            <td className="right">0.00 ₮</td>
                            <td className="right">0.00 ₮</td>
                            <td className="right">0.00 ₮</td>
                            <td className="right">0.00 ₮</td>
                            <td className="right">0.00 ₮</td>
                            <td className="right">0.00 ₮</td>
                        </tr>}

                        {showList?<>
                            {fCountry.map((elem, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <tr className="filterCountryRow" >
                                            <td className="filterCountry">{elem?.description_mon}</td>
                                        </tr>
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
                                                    </tr>
                                                )
                                            }
                                        })}
                                    </React.Fragment>
                                )
                            })}
                            <Total exportData={exportData} years={years} title="Нийт" />
                            </>
                            :
                            <>
                                <Total exportData={exportData} years={years} title="Борлуулалт /экспорт хийгдсэн улсаар/" />
                                {fCountry.map((elem, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <tr  >
                                                <td >{elem?.description_mon}</td>
                                                {years.map((el,ind)=>{
                                                    return(
                                                        <td key={ind} className="right">
                                                            {NumberComma(exportData.filter(item=>elem.id===item.countryId ? item[`e${el.year}`] : 0).reduce((total, item)=>total+item[`e${el.year}`],0) )}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        </React.Fragment>
                                    )
                                })}

                                <Total exportData={exportData} years={years} title="Борлуулалт /экспорт хийгдсэн бүтээгдэхүүнээр/" />
                                {hsCodes.map((elem, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <tr  >
                                                <td >
                                                <p style={{marginBottom:8}}>Бүтээгдэхүүний нэр: {elem.product_name} </p> 
                                                    HS code: {elem.hs_code}
                                                </td>
                                                {years.map((el,ind)=>{
                                                    return(
                                                        <td key={ind} className="right">
                                                            {NumberComma(exportData.filter(item=>elem.hs_code===item.hs_code ? item[`e${el.year}`] : 0).reduce((total, item)=>total+item[`e${el.year}`],0) )}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        </React.Fragment>
                                    )
                                })}
                            </>
                        }

                        {userId ?
                                <>
                                    <tr onClick={() => selectRowHandle(other.emp_count?.id ? other.emp_count : { id: 'emp_count' }, "emp_count")} className={`cusorItems ${selected.id === 'emp_count' ? `Selected` : selected.id && selected.id === other.emp_count?.id ? `Selected` : ``}`}>
                                        <td className="bold">Ажилчдын тоо</td>
                                        {years.map((e, i) => <td key={i} className="center">{other.emp_count?.id ? NumberComma(other.emp_count[`e${e.year}`]) : null}</td>)}
                                    </tr>
                                </>
                            : null}

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

export const Total = ({exportData, years, title}) =>{
    const handleR = (elem) =>{
       return exportData.reduce((curr, item)=>item[`e${elem.year}`]+curr,0)
    }
    return(
        exportData.length!==0?<tr >
            <th className="bold blue"> {title}</th>
            {years.map((elem, i) =>{
                return(
                    <th key={i} className="right bold blue">
                        {handleR(elem)!==0?`${NumberComma(handleR(elem))} ₮`:null} 
                        {/* {0} */}
                    </th>
                )
            })}
        </tr>:null
    )
}