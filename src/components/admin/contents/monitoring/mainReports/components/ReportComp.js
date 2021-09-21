import React, { useEffect, useState, useContext } from 'react'
import UserCtx from "context/UserContext"
import { useHistory } from "react-router-dom"
import ContentParser from 'components/misc/ContentParser'
import { ReportContainer, ButtonStyle2 } from "components/misc/CustomStyle"
import CkEditor from 'components/misc/CkEditor'
import Select from 'react-select';
import useQuery from 'components/utilities/useQueryLocation'
import axios from 'axiosbase'

const ReportComp = ({ dataParent, errText, detail, clickHanlde, modal }) => {
    const { loadFunc, alertText } = useContext(UserCtx)
    const years = useQuery().get('year');
    const season = useQuery().get('season');
    const half = useQuery().get('half');

    const [ DataId, setDataId ] = useState(null); 

    const [ errTxt, setErrTxt ] = useState('');
    const [ dataMn, setDataMn ] = useState('');
    const [ dataEng, setDataEng ] = useState('');

    useEffect(()=>{
        if(detail?.code!==0){
            fetchOne();
        }
    },[])

    const fetchOne = async() =>{
        const res = await axios.get(`main-report?reporttype=${dataParent?.type}&childcode=${detail?.code}&year=${years??0}&season=${season??0}&year_half=${half??0}`)
        setDataMn(res?.data?.data?.body_mn);
        setDataEng(res?.data?.data?.body_en);
        setDataId(res?.data?.data?.id);
    }

    const clickHandle = () =>{
        const Success =_=>{
            alertText('green',"Амжилттай",true);
            loadFunc(false);
        }
        if(dataMn===''&&dataEng===''){
            setErrTxt('Мэдээллээ оруулна уу'); setTimeout(() => setErrTxt(''), 3000);
        }else{
            loadFunc(true);
            const data = {
                reporttype: dataParent?.type,
                childcode: detail?.code,
                year: years?parseInt(years):0,
                season: season?parseInt(season):0,
                year_half: half?parseInt(half):0,
                body_mn: dataMn,
                body_en: dataEng,
            }
            if(DataId){
                axios.put(`main-report/${DataId}`, data).then(_=>{
                    Success();
                }).catch(_=>alertText('orange',"Алдаа гарлаа",true))
            }else{
                axios.post('main-report', data).then(_=>{
                    Success()
                }).catch(_=>alertText('orange',"Алдаа гарлаа",true))
            }
        }
    }

    return (
        <>
            {modal?
            DataId&&detail?.code!==0?<ContentParser data={dataMn} titleSm={''} titleBig={detail?.title} />:null
            :<ReportContainer>
                {detail?.code!==0?
                    <>
                        <div className="EditorParent">
                            <CkEditor data={dataMn} title={detail?.title} lang="mn" setData={setDataMn} />
                            <CkEditor data={dataEng} title={detail?.title} lang="en" setData={setDataEng} />
                        </div>

                        <ButtonStyle2 >
                            {errTxt!==""?<div className="errTxt">{errTxt}</div>:<div />}
                            <button onClick={clickHandle} className="myBtn">Хадгалах</button>
                        </ButtonStyle2>
                    </>
                    :<div className="Reporthome">
                        <SelectComponent 
                            dataParent={dataParent}
                            errText={errText}
                            clickHanlde={clickHanlde}
                        />
                    </div>
                }
            </ReportContainer>}
        </>
    )
}

export default ReportComp;

const SelectComponent =  ({dataParent , errText, clickHanlde}) =>{
    const years = useQuery().get('year');
    const season = useQuery().get('season');
    const half = useQuery().get('half');

    const { push } = useHistory();
    const [ selected, setSelected ] = useState({});
    const [ selectSeason, setSelectSeason ] = useState({});
    const [ selectHalfYear, setSelectHalfYear ] = useState({});

    useEffect(()=>{
        const pushYear = () =>{
            yearsData.forEach(item=>{
                if(item.year===years) setSelected(item);
            })
        } 

        if(years&&season){
            pushYear();
            Seasons.forEach(item=>{
                if(item.id=== parseInt(season)) setSelectSeason(item);
            })
        }else if(years&&half){
            pushYear();
            half_year.forEach(item=>{
                if(item.id===parseInt(half)) setSelectHalfYear(item);
            })
        }else if(years){
            pushYear();
        }else{
            setSelected({})
            setSelectSeason({});
        }
    },[dataParent?.route])

    const pushHandle = (elem, url, route) =>{
        push({
            pathname: `/${dataParent.route}/${route}`,
            search: `${selected?.id?`?year=${selected.year}`:``}${elem?.id?`&${url}=${elem.id}`:``}`
        })
    }

    useEffect(()=>{
        if(dataParent.type===1) return pushHandle(selectSeason, 'season', '0');
        if(dataParent.type===2) return pushHandle(selectHalfYear, 'half', '0');
        pushHandle({}, '', '0');
    },[selected, selectSeason, selectHalfYear])


    const clickHandle = () =>{
        if(!selected?.id||!selectSeason?.id){
            clickHanlde(1);
        }else{
            if(dataParent.type===1) return pushHandle(selectSeason, 'season', '1');
            if(dataParent.type===2) return pushHandle(selectHalfYear, 'half', '1' );
            pushHandle({}, '', '1');
        }
    }

    return(
        <>
            <div className="SelectParent">
                {dataParent.type!==4&&<div className="selectItem">
                    <div className="title"> Жил сонгох</div>
                    <Select
                        value={selected?.id?selected:false}
                        isClearable 
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        options={yearsData}
                        getOptionValue={option => `${option.id}`}
                        onChange={e=>setSelected(e)}
                        placeholder={'Жил...'}
                        getOptionLabel={option => `${option.year}`}
                    />
                </div>}

                {dataParent.type===1&&<div className="selectItem">
                    <div className="title">Улирал сонгох</div>
                    <Select
                        value={selectSeason?.id?selectSeason:false}
                        isClearable 
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        options={Seasons}
                        getOptionValue={option => `${option?.id}`}
                        onChange={e=>setSelectSeason(e)}
                        placeholder={'Улирал...'}
                        getOptionLabel={option => `${option?.season}`}
                    />
                </div>}

                {dataParent.type===2&&<div className="selectItem">
                    <div className="title">Хагас жил сонгох</div>
                    <Select
                        value={selectHalfYear?.id?selectHalfYear:false}
                        isClearable 
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        options={half_year}
                        getOptionValue={option => `${option?.id}`}
                        onChange={e=>setSelectHalfYear(e)}
                        placeholder={'Хагас жил...'}
                        getOptionLabel={option => `${option?.text}`}
                    />
                </div>}
            </div>
            <ButtonStyle2 >
                {errText!==''?<div className="errTxt">{`${errText}`}</div>:<div />}
                <button onClick={clickHandle}  className="myBtn">Цааш → </button>
            </ButtonStyle2>
        </>
    )
}

const Seasons = [
    { id:1, season:"1-р улирал"},
    { id:2, season:"2-р улирал"},
    { id:3, season:"3-р улирал"},
    { id:4, season:"4-р улирал"},
]

const yearsData = [
    { id:1, year:"2016"},
    { id:3, year:"2017"},
    { id:4, year:"2018"},
    { id:5, year:"2019"},
    { id:6, year:"2020"},
    { id:7, year:"2021"},
    { id:8, year:"2022"},
    { id:9, year:"2023"},
    { id:10, year:"2024"},
    { id:11, year:"2025"},
    { id:12, year:"2026"},
    { id:13, year:"2027"},
    { id:14, year:"2028"},
    { id:15, year:"2029"},
    { id:16, year:"2030"},
]

const half_year = [
    { id:1, text:"1-р хагас"  },
    { id:2, text:"2-р хагас"  }
]