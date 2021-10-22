import React, { useEffect, useState } from 'react';
import { Container } from "components/misc/CustomStyle";
import AccessToken from "context/accessToken"
import { NumberComma } from "components/misc/NumberComma"
import { useTranslation } from 'react-i18next';
import axios from 'axiosbase';
import LangSwitch from "components/misc/LangSwitch";
import { Total } from "components/admin/contents/insurance/exportData/ExportData"
import { HiSwitchHorizontal } from "react-icons/hi"


const MainPage = () => {
    const [t, i18n] = useTranslation();
    const [ years, setYears ] = useState([]);
    // const [ country, setCountry ] = useState([]);
    const [ exportData, setExportData ] = useState([]);
    const [ fCountry, setFCountry ] = useState([]);

    const [type, setType] = useState('export_data');
    const [ hsCodes, setHsCodes ] = useState([]);
    const [ showList , setShowList ] = useState(false);

    useEffect(()=>{
        setFCountry([])
        void async function fetch(){
            let data = await axios.get(`export-data`,{ headers: {Authorization: AccessToken()} });
            setHsCodes(data?.data.hs_code);
            let years = await axios.get('years?type=export_data');
            setYears(years.data.data);
            data?.data.targ_country.forEach(item=>{
                axios.get(`countries/${item}`).then(res=>{
                    setFCountry(prev=>[...prev, res.data.data]);
                })
            })
            setExportData(data?.data.data);
        }()
    },[]);

    const handleChange = event => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <Container style={{padding:`12px 12px`, boxShadow:`none`}}>
            <div className="TitlePar">
                <div className="Title">{t('Export Data')}</div>
                <div onClick={()=>setShowList(prev=>!prev)}><HiSwitchHorizontal style={{fontSize:20, cursor:`pointer`}} /></div>
                <LangSwitch language={i18n.language} handleChange={handleChange} />
            </div>

            <div className="customTable T4">
                <table>
                    <tbody>

                        <tr>
                            <th>{t('Export Data')}</th>
                            {years.map((el,ind)=>{
                                return(
                                    <th key={ind}>{el.year}</th>
                                )
                            })}
                            {/* <th>{t('Total')}</th> */}
                        </tr>

                        {exportData.length===0&&<tr className={`cusorItems ghost`}>
                            <td>example</td>
                            <td className="right"></td>
                            {years.map((e,i)=>{
                                return(
                                    <td key={i} className="right">0.00 ₮</td>
                                )
                            })}
                            <td>0.00 ₮</td>
                            <td>0.00 ₮</td>
                            <td>0.00 ₮</td>
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
                                                    <tr  key={ind} className={`cusorItems `}>
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
                                                <td style={{textAlign:`left`, paddingLeft:`20px`}}>{elem?.description_mon}</td>
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
                                                <td style={{textAlign:`left`, paddingLeft:`20px`}}>
                                                    <p style={{marginBottom:8}}>Бүтээгдэхүүний нэр: <span>{elem.product_name}</span> </p> 
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

                        {/* {fCountry.map((elem,index)=>{
                            return(
                                <>
                                    <tr className="filterCountryRow" style={{borderBottomStyle:`none`}} key={index}><td className="filterCountry">{elem.description_mon}</td></tr>
                                    {exportData.map((el,ind)=>{
                                        if(elem.id===el.countryId){
                                            return(
                                                <tr key={ind} >
                                                    <td className="bold">{el.product_name}</td>
                                                    {years.map((e,i)=>{
                                                        return(
                                                            <td key={i} className="right">{NumberComma(el[`e${e.year}`]) } </td>
                                                        )
                                                    })}
                                                </tr>
                                            )
                                        }
                                    })}
                                    
                                </>
                            )
                        })}
                        <Total years={years} exportData={exportData} title="Нийт"  /> */}
                        
                    </tbody>
                </table>
            </div>
        </Container>
    )
}

export default MainPage

// const years =  [
//     "2016","2017","2018","2019","2020","2021"
// ]

// const Total = ({exportData, years, title}) =>{
//     const handleR = (elem) =>{
//        return exportData.reduce((curr, item)=>item[`e${elem.year}`]+curr,0)
//     }
//     return(
//         exportData.length!==0?<tr >
//             <th className="bold blue"> {title}</th>
//             {years.map((elem, i) =>{
//                 return(
//                     <th key={i} className="right bold blue">
//                         {handleR(elem)!==0?`${NumberComma(handleR(elem))} ₮`:null} 
//                         {/* {0} */}
//                     </th>
//                 )
//             })}
//         </tr>:null
//     )
// }