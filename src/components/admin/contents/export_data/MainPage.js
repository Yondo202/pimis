import React, { useEffect, useState } from 'react';
import { Container, LangSwitch } from "components/misc/CustomStyle";
import AccessToken from "context/accessToken"
import { NumberComma } from "components/misc/NumberComma"
import { useTranslation } from 'react-i18next';
import axios from 'axiosbase';

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
            let years = await axios.get('years/true');
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

    console.log(`exportData`, exportData);
    console.log(`object`, 1+null+20);

    return (
        <Container style={{padding:`12px 12px`, boxShadow:`none`}}>
            <div className="TitlePar">
                <div className="Title">{t('Export Data')}</div>
                <LangSwitch>
                    <select onChange={handleChange}>
                        <option value="en">English</option>
                        <option value="mn">Монгол</option>
                    </select>
                </LangSwitch>
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
                                    <tr className="filterCountryRow" style={{borderBottomStyle:`none`}} key={index}><td className="filterCountry">{elem.description_mon}</td></tr>
                                    {exportData.map((el,ind)=>{
                                        if(elem.id===el.countryId){
                                            return(
                                                <tr key={ind} >
                                                    <td className="bold">{el.product_name}</td>
                                                    <td className="right">{NumberComma(el.e2016)} </td>
                                                    <td className="right">{NumberComma(el.e2017)} </td>
                                                    <td className="right">{NumberComma(el.e2018)} </td>
                                                    <td className="right">{NumberComma(el.e2019)} </td>
                                                    <td className="right">{NumberComma(el.e2020)} </td>
                                                    <td className="right">{NumberComma(el.e2021)} </td>
                                                    <td className="right bold blue">
                                                        {NumberComma(el.e2016+el.e2017+el.e2018+el.e2019+el.e2020+el.e2021+el.e2022+el.e2023+el.e2024+el.e2025+el.e2026+el.e2027+el.e2028+el.e2029+el.e2030)} ₮
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
    )
}

export default MainPage

// const years =  [
//     "2016","2017","2018","2019","2020","2021"
// ]