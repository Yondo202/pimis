import React, { useEffect, useState } from 'react';
import { CustomModal, Container, LangSwitch } from "components/misc/CustomStyle";
import styled from "styled-components"
import AccessToken from "context/accessToken"
import { NumberComma } from "components/misc/NumberComma"
import { useTranslation } from 'react-i18next';
import axios from 'axiosbase';


const MainPage = () => {
    const [t, i18n] = useTranslation();
    const [ exCond, setExCond ] = useState(false);
    // const [ years, setYears ] = useState([]);
    const [ country, setCountry ] = useState([]);
    const [ exportData, setExportData ] = useState([]);
    const [ fCountry, setFCountry ] = useState([]);

    useEffect(()=>{
        // void async function fetch(){
        //    let res = await axios.get(`countries`);
        //    setCountry(res.data.data);
        //    let years = await axios.get('years/true');
        // }()
    },[])

    useEffect(()=>{
        setFCountry([])
        void async function fetch(){
            let data = await axios.get(`export-data`,{ headers: {Authorization: AccessToken()} });
            data?.data.targ_country.forEach(item=>{
                axios.get(`countries/${item}`).then(res=>{
                    setFCountry(prev=>[...prev, res.data.data]);
                })
            })
            setExportData(data?.data.data);
        }()
    },[exCond]);

    const handleChange = event => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <Container style={{padding:`12px 12px`, boxShadow:`none`}}>
            {/* <div className="smTitles">Export Data</div> */}
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
                {/* <div className="headPar ">
                    <div onClick={_=>ModalHandle('add')} className="addBtn addBtn2"><RiAddLine /><span>Нэмэх</span></div>
                    <div className={`additions ${selected.id?``:`opacity`}`}>
                        <div onClick={_=>ModalHandle('edit')} className="addBtn addBtn2"><RiEdit2Line /><span>Засах</span></div>
                        <div onClick={_=>ModalHandle('delete')} className="addBtn addBtn2"><VscError /><span>Устгах</span></div>
                    </div>
                </div> */}

                <table>
                    <tbody>

                        <tr>
                            <th>{t('Product name')}</th>
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
    )
}

export default MainPage

const years =  [
    "2016","2017","2018","2019","2020","2021"
]