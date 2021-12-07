import React from 'react'
import { useReactToPrint } from "react-to-print";
import styled from 'styled-components';
import { AiOutlinePrinter } from "react-icons/ai"
import { HiOutlineArrowLeft } from "react-icons/hi"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import ProgressReport from './ReportTemplate';
import Template2_4 from './Template2_4';
import FetchTemplate from './FetchTemplate';
import axios from 'axiosbase'

const fetchStatic = [
    'insurance',
    'dedbureldhuun_heseg_zovloh',
    'SPSiin_mergejilten',
    'pps',
]

const initial = {
    insurance:'',
    dedbureldhuun_heseg_zovloh:'',
    SPSiin_mergejilten:'',
    pps:''
}

const PrintSector = ({ selected, setCompSwitch }) => {
    const componentRef = React.useRef();
    const [ template, setTemplate ] = React.useState(false);
    const [ reportData, setReportData ] = React.useState(initial);

    React.useEffect(()=>{
        fetchOne()
    },[])

    const fetchOne = async() =>{
        fetchStatic.forEach(el=>{
            fetchFunc(el)
        })
    }   

    const fetchFunc = async (el) => {
        let res = await axios.get(`main-report?reporttype=2&year=${selected?.year}&from_where=${el}`)
        setReportData(prev=>({ ...prev, [el]: res?.data?.data?.body_en  }));
    }

    // from_where =  dedbureldhuun_heseg_zovloh ( 2.1-2.2 Дэд бүрэлдхүүн хэсэгийн зөвлөх )
    // from_where =  SPSiin_mergejilten ( SPS - ийн мэргэжилтэн )
    // from_where =  pps ( түншлэлийн хөтөлбөрөөс )

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Container>
            <div className="header">
                <div className="texts">
                    <div onClick={_=>setCompSwitch(1)} className="backhandle"><HiOutlineArrowLeft /></div>
                    <h4 className="title">Явцын үнэлгээний тайлан</h4>
                    {selected?.id?<><span className="arrow">→</span>
                    <span className="datePick">
                        {selected?.year!==''?selected.year:`....`} оны
                    </span ></>:null}
                </div>

                <div className="addBtn" onClick={_=>setTemplate(prev=>!prev)}>{template?<AiOutlineEyeInvisible />:<AiOutlineEye />}  <span>Загвараар</span></div>
                <div className="addBtn" onClick={handlePrint}><AiOutlinePrinter /> <span> Хэвлэх болон татах</span></div>
                
            </div>

            <div className="print_body" ref={componentRef}>
                <div className="components">

                    {template&&<ProgressReport />}

                    {reportData?.insurance&&<FetchTemplate title="COMPONENT 1. DEVELOPMENT OF A NEW LINE OF EXPORT FINANCE PRODUCTS" reportData={reportData?.insurance} />}
                    {reportData?.dedbureldhuun_heseg_zovloh&&<FetchTemplate title="COMPONENT 2. EXPORT COMPETITIVENESS AND MARKET ACCESS ENHANCEMENT" reportData={reportData?.dedbureldhuun_heseg_zovloh} />}
                    {reportData?.pps&&<FetchTemplate title="SUB-COMPONENT 2.3: PRODUCTIVE PARTNERSHIP SCHEME" reportData={reportData?.pps} />}
                    {template&&<Template2_4 />}
                    {reportData?.SPSiin_mergejilten&&<FetchTemplate title="COMPONENT 3: STRENGTHENING CERTIFICATION SERVICE AND QUALITY MANAGEMENT" reportData={reportData?.SPSiin_mergejilten} />}

                </div>
            </div>

        </Container>
    )
}

export default PrintSector


const Container = styled.div`
    font-size:12px;
    color:#000;
    .header{
        padding:10px 10px;
        margin-bottom:20px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        .texts{
            display:flex;
            align-items:center;
            gap:14px;
            .backhandle{
                border-radius:50%;
                cursor:pointer;
                margin-right:20px;
                &:hover{
                    background-color:#fff;
                }
                svg{
                    font-size:24px;
                }
            }
        }
        // background-color:#fff;
        // position:sticky;
        // top:0;
        // left:0;
        .addBtn{
            cursor:pointer;
            padding:5px 30px;
            background-color: #fff;
            border-color: #ddd;
            color: #333;
            border-radius: 4px;
            border-width: 1px;
            border-style: solid;
            display:flex;
            align-items:center;
            span{
                font-weight:500;
                font-size:13px;
            }
            svg{
                margin-right:15px;
                font-size:18px;
            }
            &:hover{
                background-color:#ddd;
            }
        }
    }

    .print_body{
        width:100%;
        display:flex;
        justify-content:center;
        margin-bottom:100px;
        .components{
            box-shadow:0px 0px 14px -8px ${props=>props.theme.Color};
            border-radius:4px;
            padding:1rem 3rem;
            width:800px;
            background-color:#fff;
            padding-bottom:100px;
            .fetch_reports{
                margin-bottom:180px;
                page-break-inside: avoid !important;
                .comp_title{
                    font-weight:600;
                    font-size:13px;
                    color:#c00000;
                    border-bottom:1px solid rgba(0,0,0,0.8);
                    padding-bottom:4px;
                    margin-bottom:30px;
                }
            }
            
            .page_break{
                page-break-inside: avoid !important;
                .comp_title{
                    font-weight:600;
                    font-size:13px;
                    color:#c00000;
                    border-bottom:1px solid rgba(0,0,0,0.8);
                    padding-bottom:4px;
                    margin-bottom:30px;
                }
            }

            .first_body{
                font-size:12px;
                .page_break{
                    page-break-inside: avoid !important;
                }
                .mass_text{
                    .page_break{
                        page-break-inside: avoid !important;
                    }
                }
            }
        }
        
    }
`