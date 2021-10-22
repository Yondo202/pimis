import React, { useEffect, useState } from 'react';
import { Container } from "components/misc/CustomStyle";
import AccessToken from "context/accessToken"
import { NumberComma, NumberComma2 } from "components/misc/NumberComma"
import { useTranslation } from 'react-i18next';
import axios from 'axiosbase';
import LangSwitch from "components/misc/LangSwitch";

const MainPage = () => {
    const [t, i18n] = useTranslation();
    const [ years, setYears ] = useState([]);
    // const [ country, setCountry ] = useState([]);
    const [ exportData, setExportData ] = useState([]);
    const [ fCountry, setFCountry ] = useState([]);

    useEffect(()=>{
        setFCountry([])
        void async function fetch(){
            let data = await axios.get(`export-data`,{ headers: {Authorization: AccessToken()} });
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

    // console.log(`exportData`, exportData)

    return (
        <Container style={{padding:`12px 12px`, boxShadow:`none`}}>
            <div className="TitlePar">
                <div className="Title">{t('Export Data')}</div>
                <LangSwitch language={i18n.language} handleChange={handleChange} />
            </div>

            <div className="customTable T4">
                <table>
                    <tbody>

                        <tr>
                            <th>{t('Product name')}</th>
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

                        {fCountry.map((elem,index)=>{
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
                                                    {/* <td className="right bold blue">
                                                        {NumberComma(years.reduce((curr, item)=>el[`e${item.year}`]+curr, 0))} ₮
                                                    </td> */}
                                                </tr>
                                            )
                                        }
                                    })}
                                    
                                </>
                            )
                        })}
                        {exportData.length!==0?<tr>
                            <td className="bold blue">Нийт</td>
                            {years.map((elem, i) =>{
                                return(
                                    <td key={i} className="right bold blue">
                                        {NumberComma(exportData.reduce((curr, item)=>item[`e${elem.year}`]+curr,0))} ₮
                                    </td>
                                )
                            })}
                        </tr>:null}
                        
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