import React, { useEffect, useState, useContext } from 'react'
import UserCtx from "context/UserContext"
import { useHistory } from "react-router-dom"
import ContentParser from 'components/misc/ContentParser'
import { ReportContainer, ButtonStyle2, CustomModal, InputStyle } from "components/misc/CustomStyle"
import CkEditor from 'components/misc/CkEditor'
import Select from 'react-select';
import useQuery from 'components/utilities/useQueryLocation'
import axios from 'axiosbase'
import styled, { keyframes } from "styled-components"
import { FiCheck } from "react-icons/fi"
import { VscSave } from "react-icons/vsc"
import { RiCheckboxBlankCircleFill } from "react-icons/ri"

const ReportComp = ({ dataParent, errText, detail, clickHanlde, modal, listData, userName, setUserName }) => {
    const { loadFunc, alertText } = useContext(UserCtx)
    const years = useQuery().get('year');
    const season = useQuery().get('season');
    const half = useQuery().get('half');

    const [ DataId, setDataId ] = useState(null);

    const [ nameModal, setNameModal ] = useState(false);
    // const [ userName, setUserName ] = useState(null);

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
        
        // setUserName(res?.data?.data?.user_name);
    }

    const clickHandle = () =>{
        const Success =_=>{
            alertText('green',"Амжилттай",true);
            loadFunc(false);
        }

        if(dataMn===''&&dataEng===''){
            setErrTxt('Мэдээллээ оруулна уу'); setTimeout(() => setErrTxt(''), 3000);
        }else{
            const data = {
                reporttype: dataParent?.type,
                childcode: detail?.code,
                year: years?parseInt(years):0,
                season: season?parseInt(season):0,
                year_half: half?parseInt(half):0,
                body_mn: dataMn,
                body_en: dataEng,
                user_name:userName
            }
           
            if(userName||dataParent.type===4){
                loadFunc(true);
                if(DataId){
                    axios.put(`main-report/${DataId}`, data).then(_=>{
                        Success();
                    }).catch(_=>alertText('orange',"Алдаа гарлаа",true))
                }else{
                    axios.post('main-report', data).then(_=>{
                        Success()
                    }).catch(_=>alertText('orange',"Алдаа гарлаа",true))
                }
            }else{
                setNameModal(true);
            }
        }
    }

    return (
        <>
            {nameModal?<UserNameModal setUserName={setUserName} setNameModal={setNameModal} />:null}
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
                    :
                        <SelectComponent 
                            dataParent={dataParent}
                            errText={errText}
                            clickHanlde={clickHanlde}
                            listData={listData}
                        />
                }
            </ReportContainer>}
        </>
    )
}

export default ReportComp;

const UserNameModal = ({ userName, setUserName, setNameModal }) =>{
        const [cName, setName] = useState('');
        const CloseHandle = () =>{
            setName('contentParent2');
            setTimeout(() => {
                setNameModal && setNameModal(false);
            }, 370)
        }

        const NameHandle = (e) =>{
            e.preventDefault();
            let name = document.querySelector('.getInp');
            setUserName(name.value);
            setName('contentParent2');
            setTimeout(() => {
                setNameModal && setNameModal(false);
            }, 370)
        }

        return(
            <CustomModal>
                <div className={`contentParent ${cName}`} >
                    <div className="head">
                        {/* Та өөрийн овог нэрээ оруулна уу */}
                        Тайлан оруулж буй хүний овог нэр
                        <div onClick={CloseHandle} className="close">X</div>
                    </div>
                    <form onSubmit={NameHandle}>
                        <div className="content">
                            <InputStyle>
                                <div className="label"></div>
                                <input type="text" defaultValue={userName} className="getInp" placeholder="нэрээ оруулна уу..." required />
                            </InputStyle>
                            <div className="modalbtnPar">
                                <div/>
                                <button type="submit" style={{width:`50%`}} className="modalbtn" ><VscSave /> Хадгалах</button>
                            </div>
                        </div>
                    </form>
                    
                </div>
            </CustomModal>
        )
}

const SelectComponent =  ({dataParent , errText, clickHanlde, listData}) =>{
    const years = useQuery().get('year');
    const season = useQuery().get('season');
    const half = useQuery().get('half');

    const { push } = useHistory();
    const [ selected, setSelected ] = useState({});
    const [ selectSeason, setSelectSeason ] = useState({});
    const [ selectHalfYear, setSelectHalfYear ] = useState({});

    const [ list, setList ] = useState([]);
    

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
        setList(dataParent.childs);
    }

    useEffect(()=>{
        if(dataParent.type===1) return pushHandle(selectSeason, 'season', '0');
        if(dataParent.type===2) return pushHandle(selectHalfYear, 'half', '0');
        pushHandle({}, '', '0');  setList(dataParent.childs);

    },[selected, selectSeason, selectHalfYear])


    const clickHandleLink = (reporttype, childcode, year, season, year_half) =>{
        if(reporttype===1){
            push({
                pathname: `/${dataParent.route}/${childcode}`,
                search: `?year=${year}&season=${season}`
            })
        }else if(reporttype===2){
            push({
                pathname: `/${dataParent.route}/${childcode}`,
                search: `?year=${year}&half=${year_half}`
            })
        }else if(reporttype===3){
            push({
                pathname: `/${dataParent.route}/${childcode}`,
                search: `?year=${year}`
            })
        }
        
    }

    const clickHandle = () =>{
        if(!selected?.id||!selectSeason?.id){
            clickHanlde(1);
        }else{
            if(dataParent.type===1) return pushHandle(selectSeason, 'season', '1' );
            if(dataParent.type===2) return pushHandle(selectHalfYear, 'half', '1');
            pushHandle({}, '', '1');
        }
    }

    return(
        <>
        <div className="ReporthomePar">
            <div className="Reporthome">
                <div className="SelectParent">
                        <div className="titleBig">Шинээр тайлан оруулах</div>
                        {dataParent.type!==4&&<div className="selectItem">
                            {/* <div className="title"> Жил сонгох</div> */}
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

                        {dataParent.type===1?<div className="selectItem">
                            {/* <div className="title">Улирал сонгох</div> */}
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
                        </div>:<div />}

                        {dataParent.type===2&&<div className="selectItem">
                            {/* <div className="title">Хагас жил сонгох</div> */}
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
                <ButtonStyle2 className="buttons" >
                    {<div className="errTxt">{`${errText}`}</div>}
                    <button onClick={clickHandle}  className="myBtn">Цааш → </button>
                </ButtonStyle2>
            </div>

            <ReportListComp dataParent={dataParent} clickHandle={clickHandleLink} list={list} listData={listData} />
            
            {/* {dataParent.type===1&&season&&years&&<ReportListComp dataParent={dataParent} clickHandle={clickHandle} list={list} />}
            {dataParent.type===2&&half&&years&&<ReportListComp dataParent={dataParent} clickHandle={clickHandle} list={list} />}
            {dataParent.type===3&&years&&<ReportListComp dataParent={dataParent} clickHandle={clickHandle} list={list} />} */}
        </div>
        </>
    )
}

const ReportListComp = ({ dataParent, clickHandle, list, listData }) =>{

    return(
        <ReportList >
            {/* <div className="titleList">{dataParent.title}</div> */}
            <div className="titleList">Оруулсан тайлангууд</div>
            <div className="ListCont">
                {listData?.map((el,ind)=>{
                    if(dataParent.type===1||dataParent.type===2){
                        return(
                            el?.details?.map((elem,ind)=>{
                                return(
                                    <div className="Cards" key={ind}>
                                        <div className="userName">
                                            <span>Бэлтгэсэн: </span> <span className="name">{elem.user_name} </span>
                                        </div>
                                        <div className=" YearParent">
                                            <RiCheckboxBlankCircleFill className="grey" /> 
                                            <span className="years">
                                                {el.year} он 
                                                {dataParent.type===1&&` ${elem.season}-р улирал`}
                                                {dataParent.type===2&&` ${elem.season}-р хагас`}
                                            </span>
                                        </div>
                                        {elem?.datas?.map((element,index)=>{
                                            return(
                                                <React.Fragment key={index} >
                                                    <ListComp element={element} list={list} clickHandle={clickHandle} />
                                                </React.Fragment>
                                            )
                                        })}
                                    </div>
                                )
                            })
                        )
                    }else if(dataParent.type===3){
                        return(
                            <div className="Cards" key={ind} >
                                <div className="userName">
                                    <span>Бэлтгэсэн: </span> <span className="name">{el.user_name} </span>
                                </div>
                                 <div className=" YearParent">
                                    <RiCheckboxBlankCircleFill className="grey" /> <span className="years">{el.year} он </span>
                                </div>
                                {el?.details?.sort((a,b)=>a.childcode-b.childcode).map((elem,ind)=>{
                                    return(
                                        <React.Fragment key={ind} >
                                            <ListComp element={elem} list={list} clickHandle={clickHandle} />
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        )
                    }
                })}
            </div>
        </ReportList>
    )
}

const ListComp = ( {element, list, clickHandle }) =>{
    return(
        list.sort((a,b)=>a.code-b.code).map((e, i)=>{
            if(e.code === element.childcode){
                return(
                    <React.Fragment key={i}>
                        <div onClick={()=>clickHandle(element.reporttype, element.childcode, element.year, element.season, element.year_half )} key={i} className="Lists">
                            <RiCheckboxBlankCircleFill className="green" /> <span className="itemss">{e.title}</span> 
                        </div>
                    </React.Fragment>
                )
            }
        })
    )
}

const animate = keyframes`
    0%{ transform:translateY(20px); opacity:0; }
    100%{ transform:translateY(0px); opacity:1; }
`

const ReportList = styled.div`
    width:100%;
    font-size:12px;
    max-height:70vh;
    overflow-y:auto;
    ::-webkit-scrollbar {
        // display:none;
        width: 4px;
    }
    .titleList{
        font-size:14px;
        font-weight:500;
        margin-bottom:20px;
        border-bottom:1px solid rgba(0,0,0,0.1);
        padding-bottom:10px;
        position:sticky;
        top:0;
        background-color:#fff;
    }
    
    .ListCont{
        display:flex;
        flex-wrap:wrap;
        gap:20px;
        .Cards{
            width:23.5%;
            border:1px solid rgba(0,0,0,0.3);
            // border-top:2px solid #337ab7;
            // padding:12px 0px;
            padding-bottom:15px;
            border-radius:4px;
            @media (max-width:1450px){
                width:45.5%;
            }
            @media (max-width:1600px){
                width:30.5%;
            }
            .YearParent{
                font-size:11px;
                display:flex;
                align-items:center;
                gap:10px;
                font-weight:500;
                padding:7px 12px;
                padding-top:15px;
                // margin-top:8px;
                .years{
                    color:#fff;
                    background-color:#337ab7;
                    border-radius:100px;
                    padding:4.5px 20px;
                    // border:1px solid rgba(0,0,0,.2);
                }
                svg{
                    display:none;
                    font-size:4px !important;
                }
            }
            .userName{
                color:rgba(${props=>props.theme.textColor},0.6);
                background-color:#f6f8fa;
                font-size:12px;
                display:flex;
                align-items:center;
                gap:10px;
                font-weight:400;
                padding:12px 12px;
                // padding-top:12px;
                border-bottom:1px solid rgba(0,0,0,0.16);
                .name{
                    font-weight:500;
                    color:rgba(${props=>props.theme.textColor},1);
                }
            }
            .Lists{
                display:flex;
                align-items:center;
                gap:10px;
                padding:8px 0px;
                padding-left:12px;
                padding-right:12px;
                cursor:pointer;
                color:${props=>props.theme.textColorHex};
                .itemss{
                    max-width:100%;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                &:hover{
                    background-color:rgba(0,0,0,0.07);
                }
                svg{
                    font-size:4px;
                    min-width:4px;
                }
                .green{
                    color:rgba(0,0,0,0.5);
                }
                .grey{
                    margin-right:2px;
                    font-size:15px;
                    color:grey;
                }
            }
        }
    }

    // .ListCont{
    //     animation:${animate} 0.8s ease;
    //     .Lists{
    //         display:flex;
    //         align-items:center;
    //         gap:10px;
    //         padding:8px 15px;
    //         cursor:pointer;
    //         color:${props=>props.theme.textColorHex};
    //         &:hover{
    //             background-color:rgba(0,0,0,0.07);
    //         }
    //         svg{
    //             font-size:15px;
    //             min-width:15px;
    //         }
    //         .green{
    //             color:green;
    //         }
    //         .grey{
    //             margin-right:2px;
    //             font-size:15px;
    //             color:grey;
    //         }
    //     }
    //     .YearParent{
    //         font-weight:500;
    //         padding:10px 0px;
    //         svg{
    //             font-size:7px !important;
    //         }
    //     }
    // }
`

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