import React, { useEffect, useState } from 'react'
import { Container, InputStyle, CustomModal } from "components/misc/CustomStyle"
import { useTranslation } from 'react-i18next';
import axios from 'axiosbase';
import styled from "styled-components";
import NumberFormat from "react-number-format";
import { VscSave } from "react-icons/vsc"
import { AiOutlineDownload, AiOutlinePrinter, AiOutlineCalculator } from "react-icons/ai"
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import ResultMeasurePdf from "./ResultMeasurePdf"
import LangSwitch from "components/misc/LangSwitch"

const ProjectResult = () => {
    const [t, i18n] = useTranslation();
    const [ years, setYears ] = useState([]);
    const [ resultData, setResultData ] = useState([]);
    const [ selected, setSelected ] = useState({});
    const [ modal, setModal ] = useState(false);

    const [ showPdf, setShowPdf ] = useState(false);
    const [ wait, setWait ] = useState(false);

    const [ wait2, setWait2 ] = useState(false);

    const [ cond, setCond ] = useState(false);
    const [ lang, setLang ] = useState('en');

    useEffect(()=>{
        setLang(i18n.language);
        setTimeout(() => {
            setWait(true);
        }, 1000)
        setTimeout(() => {
            setWait2(true);
        }, 3000)
        
    },[])

    useEffect(()=>{
        try{
            void async function Fetch(){
                const result = await axios.get(`result-measure`);
                setResultData(result?.data.data);
                const year = await axios.get(`years?type=result_measure`);
                setYears(year?.data.data);
            }()
        }catch(err){
            console.log(`err`, err);
        }
    },[cond])


    const handleChange = event => {
        setLang(event.target.value);
        i18n.changeLanguage(event.target.value);
    };

    const selectRowHandle = (el) =>{
        if(selected.id===el.id){
            setSelected({});
        }else{
            setSelected(el);
            setModal(true);
        }
    }

    // console.log(`resultData`, resultData)

    return (
        <>
            {modal&&<Modal setModal={setModal} selected={selected} years={years} i18n={i18n} setCond={setCond}  />}
            {showPdf&&<PDFViewerComponent wait={wait} setModal={setShowPdf} data={resultData} years={years} title={t('Төслийн үр дүнг хэмжих')} lang={lang} />}
            <Container >
                <div className="TitlePar">
                    <div className="Title">{t('Project Results Indicators')}</div>
                    <LangSwitch language={i18n.language} handleChange={handleChange} />
                </div>
                <div className="customTable T5 T6">
                    <div className="headPar">
                        <div className="addBtn"><AiOutlineCalculator /><span>{t("Calculate")}</span></div>
                        <div className={`additions`}>
                            {wait?<div onClick={()=>setShowPdf(true)} className="addBtn"><AiOutlinePrinter /><span>{t("Print")}</span></div>:<div />}
                            {/* <div className="addBtn"><AiOutlineDownload /><span>Татах</span></div> */}

                            {wait2?<PDFDownloadLink document={<ResultMeasurePdf wait={wait2} data={resultData} years={years} lang={lang} />} fileName={t('Төслийн үр дүнг хэмжих')}>
                                {({ blob, url, loading, error }) => (!wait2 ? <div className="addBtn"><AiOutlineDownload /><span>Loading...</span></div> : <div className="addBtn"><AiOutlineDownload /><span>{t("Download")}</span></div>)}
                            </PDFDownloadLink>:<div />}
                        </div>
                    </div>
                        <table>
                            <tbody>
                                <tr>
                                    <th rowSpan="2">#</th>
                                    <th rowSpan="2">{t("Indicator Name")}</th>
                                    <th rowSpan="2">{t("Measurement")}</th>
                                    {years.map((el,ind)=> <th key={ind} colSpan="2" scope="colgroup">{el.year}</th>)}
                                </tr>
                                <tr>
                                    {years.map((el,ind)=>{
                                        return(
                                            <React.Fragment key={ind}>
                                                <th style={{fontWeight:'normal'}} scope="col">{t("Cumalative")}</th>
                                                <th style={{fontWeight:'normal'}} scope="col">{t("Current")}</th>
                                            </React.Fragment>
                                        )
                                    })}
                                </tr>

                                <tr className="smHead">
                                    <td colSpan={3+years.length*2}>{t("PDO Level I Results Indicators")}</td>
                                </tr>
                                <FilteredRow resultData={resultData.filter(item=>item.row_type==="level1").sort((a,b)=>a.row_number-b.row_number)} selectRowHandle={selectRowHandle} years={years} selected={selected} lang={lang} />

                                <tr className="smHead">
                                    <td colSpan={3+years.length*2}>
                                        {t("Intermediate Results Indicators")}
                                    </td>
                                </tr>
                                <FilteredRow resultData={resultData.filter(item=>item.row_type==="level2").sort((a,b)=>a.row_number-b.row_number)} selectRowHandle={selectRowHandle} years={years} selected={selected} lang={lang} />
                            </tbody>
                        </table>
                        
                </div>
            </Container>
        </>
    )
}

export default ProjectResult;

const FilteredRow = ({ resultData, selectRowHandle, years, selected, lang }) =>{
    const [t] = useTranslation();
    return(
        resultData.map((el,ind)=>{
            return(
                <tr key={ind} onClick={()=>selectRowHandle(el)} key={ind} className={`cusorItems ${selected.id===el.id?`Selected`:``}`} >
                    <td className="number">{el.row_number}</td>
                    <td className="left" >{el[`description_${lang}`]}</td>
                    <td className="center">{el.measure==="Хувь"?`${t('percent')}`:el.measure==="Тоо"?`${t('number')}`:`${t('amount')} (USD)`}</td>
                    {years.map((elem,index)=>{
                        return(
                            <React.Fragment key={index}>
                                <td className="center bold">{el[`cum${elem.year}`]!==null?el[`cum${elem.year}`]:'-'} {el.measure==="Хувь"&&el[`cum${elem.year}`]?` %`:``}</td>
                                <td className="center bold">{el[`cur${elem.year}`]}</td>
                            </React.Fragment>
                        )
                    })}
                </tr>
            )
        })
    )
}


const PDFViewerComponent = ({setModal, data, years, wait, title, lang}) =>{
    const [cName, setName] = useState('');
    
    const CloseHandle = () =>{
        setName('contentParent2');
        setTimeout(() => {
            setModal && setModal(false);
        }, 370)
    }

    return(
        <CustomModal style={{paddingTop:'0.45rem' }} >
            <div className={`container-fluid contentParent contentParentPdf ${cName}`} style={{ width: "100%" }}>
                <div className="head">
                    <div className="title">Төслийн үр дүнг хэмжих</div>
                    <div onClick={CloseHandle} className="close">✖</div>
                </div>

                <PDFViewerStyle>
                    <div className="content">
                        <PDFViewer style={{ height: '90vh', width: `100%` }} >
                            <ResultMeasurePdf wait={wait} data={data} years={years} title={title} lang={lang} />
                        </PDFViewer>
                    </div>
                </PDFViewerStyle>
            </div>
        </CustomModal>
        
    )
}

const PDFViewerStyle = styled.div`
    .content{
        iframe{
            width: 100%;
            height: 80vh;
        }
    }
`



const Modal = ({ setModal, selected, years, i18n, setCond }) =>{
    const [cName, setName] = useState('');

    const CloseHandle = () =>{
        setName('contentParent2');
        setTimeout(() => {
            setModal && setModal(false);
        }, 370)
    }

    const SaveHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(`.gettInpps`); let arr = Array.from(inp); let final = {};
        arr.forEach(el => {
            if (el.value !== '') {
                final[`${el.name}`] = parseFloat(el.value.slice(0, -1).replace(/,/g, ''));
            } else {
                final[`${el.name}`] = null;
            }
        });

        axios.put(`result-measure/${selected.id}`, final).then(_=>{
            setCond(prev=>!prev);
            setName('contentParent2');
            setTimeout(() => {
                setModal && setModal(false);
            }, 370)
        }).catch(err=>console.log(`err`, err?.response));
    }

    return(
        <CustomModal style={{paddingTop:'3rem' }} >
            <div className={`contentParent ${cName}`} style={{ width: "50rem" }}>
                <div className="head">
                    <div className="title">Төслийн үр дүнг хэмжих</div>
                    <div onClick={CloseHandle} className="close">✖</div>
                </div>
                <form onSubmit={SaveHandle}>
                    <div className="content">
                        <InputsParent2 style={{ opacity: `0.8` }} >
                            <InputStyle style={{justifyContent:'start'}} >
                                <div className="label">Шалгуур үзүүлэлт<span className="reds">*</span></div>
                                <div style={{fontWeight:'500'}}>{selected[`description_${i18n.language}`]}</div>
                            </InputStyle>

                            <InputStyle style={{justifyContent:'start'}} >
                                <div className="label">Хэмжих нэгж <span className="reds">*</span></div>
                                <div style={{fontWeight:'500'}}>{selected.measure}</div>
                            </InputStyle>
                        </InputsParent2>

                        <YearsType contents="Years -> Cumalative">
                            <InputsParent>
                                {years.map((el,ind)=>{
                                    return(
                                        <InputStyle key={ind} className="itemss">
                                            <div style={{fontWeight:`500`}} className="label">{el.year}</div>
                                            <NumberFormat
                                                defaultValue={selected[`cum${el.year}`]}
                                                placeholder={`0`} 
                                                // value={rate}
                                                //  onChange={e=>setRate(e.target.value.slice(0, -1).replace(/,/g, ''))}
                                                style={{textAlign:`right`, paddingRight:`7px`}} thousandSeparator={true} suffix={selected?.measure==="Хувь"?' %':selected?.measure==="Дүн (USD)"?" $":'  '}
                                                name={`cum${el.year}`}
                                                className="gettInpps"
                                            />
                                        </InputStyle>
                                    )
                                })}
                            </InputsParent>
                        </YearsType>


                        <YearsType contents="Years -> Current">
                            <InputsParent>
                                {years.map((el,ind)=>{
                                    return(
                                        <InputStyle key={ind} className="itemss">
                                            <div style={{fontWeight:`500`}} className="label">{el.year}</div>
                                            <NumberFormat
                                                defaultValue={selected[`cur${el.year}`]}
                                                placeholder={`0`} 
                                                // value={rate}
                                                //  onChange={e=>setRate(e.target.value.slice(0, -1).replace(/,/g, ''))}
                                                style={{textAlign:`right`, paddingRight:`7px`}} thousandSeparator={true} suffix={selected?.measure==="Хувь"?' %':selected?.measure==="Дүн (USD)"?" $":'  '}
                                                name={`cur${el.year}`}
                                                className="gettInpps"
                                            />
                                        </InputStyle>
                                    )
                                })}
                            </InputsParent>
                        </YearsType>

                        <div className="modalbtnPar">
                            <div />
                            <button type="submit" className="modalbtn"><VscSave /> Хадгалах </button>
                        </div>
                    </div>
                </form>
                
            </div>
            
        </CustomModal>
    )
}

const InputsParent = styled.div`
    display:flex;
    gap:15px;
    align-items:start;
    justify-content:start;
    flex-wrap:wrap;
    flex-grow:2;
    flex-shrink: 2;
    width:100%;
    .itemss{
        width:23%;
    }
`
const InputsParent2 = styled.div`
    display:flex;
    gap:35px;
    justify-content:space-between;
`

const YearsType = styled.div`
    transition:all 250ms ease;
    opacity:0.7;
    margin-top:15px;
    margin-bottom:25px;
    padding:30px 15px;
    border:1px solid #b5b8c8;
    border-radius:5px;
    position:relative;
    &:hover{
        color:#000;
        opacity:1;
        box-shadow:0 0 20px -14px;
    }
    &:after{
        content:"${props => props.contents}";
        top:-8px;
        left:10px;
        position:absolute;
        background-color:#fff;
        padding:0px 10px;
    }
`