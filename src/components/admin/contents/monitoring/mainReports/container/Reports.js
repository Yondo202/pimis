import React, { useEffect, useState, useContext } from 'react'
import Ctx from "context/UserContext"
import { HeaderTwo } from "components/misc/CustomStyle"
import { Route, useLocation, useHistory } from "react-router-dom";
import ReportComp from "components/admin/contents/monitoring/mainReports/components/ReportComp";
import ProgressReport from '../progressReport/ProgressReport';
import { IoHomeSharp } from "react-icons/io5";
import useQuery from 'components/utilities/useQueryLocation';
import { AiOutlinePrinter } from "react-icons/ai"
import PrintComp from '../components/PrintComp';
import axios from 'axiosbase';
 
function MonitoringReports({ data }) {
    const { userInfo } = useContext(Ctx)
    const years = useQuery().get('year');
    const season = useQuery().get('season');
    const half = useQuery().get('half');
    const [ cond, setCond ] = useState(false);

    const [ showModal, setShowModal ] = useState(false);
    const [ errText, setErrText ] = useState('');
    const { push } = useHistory();

    const [ listData, setListData ] = useState([]);
    let loc = useLocation();
    const [ userName, setUserName ] = useState(null);

    const Fetch = () =>{
        axios.get(`main-report?reporttype=${data.type}`).then(res=>{
            if(res.data.data.length!==0){
                setListData(res.data.data);
                if(data.type===1||data.type===2){
                    res.data.data.forEach(item=>{
                        if(item.year===parseInt(years)){
                            item.details.forEach(el=>{
                                if(el.season===parseInt(season)){
                                    setUserName(el.user_name??null);
                                }
                            })
                        }
                    })
                }else if(data.type===3){
                    res.data.data.forEach(item=>{
                        if(item.year===parseInt(years)){
                            if(item.user_name){
                                setUserName(item.user_name);
                            }else{
                                setUserName(null);
                            }
                        }
                    })
                }
               
            }
        })
    }

    useEffect(()=>{
        if(userInfo?.role==="holbootoi_yamd"){
            if(years){
                setShowModal(prev=>!prev);
            }
        }
    },[years,season,half, cond])

    useEffect(()=>{
        Fetch();
        if(userInfo?.role==="holbootoi_yamd"&&loc.pathname==="/completion-report/0"){
            setShowModal(prev=>!prev);
        }
        if(userInfo?.role!=="holbootoi_yamd"&&loc.pathname==="/completion-report/0"){
            push({pathname:'/completion-report/1'})
        }
    },[loc.pathname])

    const clickHanlde = (element, modal) => {
        const ErrMsg = text =>{
            setErrText(text);
            setTimeout(() => { setErrText('') }, 4000)
        }
        const HandlePush = (elem, url) =>{
            if(modal) return setShowModal(prev=>!prev);

            

            push({
                pathname: `/${data.route}/${element}`,
                search: `${data.type!==4?`?year=${years}${url!==null?`&${url}=${elem}`:``}`:``}`,
            })
        }

        if(data.type===1){
            if(years===null) return ErrMsg('Жилээ сонгоно уу...');
            if(season===null) return ErrMsg('Улирлаа сонгоно уу...');
            HandlePush(season, 'season' );

        }else if(data.type===2){
            if(years===null) return ErrMsg('Жилээ сонгоно уу...');
            if(half===null) return ErrMsg('Хагас жил сонгоно уу...');
            HandlePush(half, 'half' );

        }else if(data.type===3){
            if(years===null) return ErrMsg('Жилээ сонгоно уу...');
            HandlePush(null, null );

        }else{
            HandlePush(null, null );
        }
    }

    return (
        <HeaderTwo className="container-fluid">
            {showModal?<PrintComp dataParent={data} setShowModal={setShowModal} />:null}
            <div className="TitlePar">
                <div className="Title">
                    {data.title}
                    {data.type!==4?
                        <><span className="arrow">→</span>
                        <span className="datePick">
                            {years!==null?years:`....`} оны
                            {season!==null?` ${season}-р улирал`:``}
                            {half!==null?` ${half}-р хагас`:``}
                        </span></>:null
                    }
                     {userName&&years?<><span className="arrow">→</span><span className="datePick">{`оруулсан: ${userName}`}</span></>:``}
                </div>
                <div onClick={()=>clickHanlde(null, true)} className="PrintButton">
                    <AiOutlinePrinter /> <span>Хэвлэх болон татах</span>  
                </div>
            </div>

            {userInfo?.role!=="holbootoi_yamd"&&<div className="smMenuPar">
                {data?.childs.map((el,ind)=>{
                    return(
                        data.type!==4||el.code!==0?<button key={ind} onClick={()=>clickHanlde(el.code)} className={`itemsPar ${loc.pathname===`/${data.route}/${el.code}`&&`itemsPar22 Active`}`}><span>{el.code!==0?el.title:<IoHomeSharp />}</span></button>:null
                    )
                })}
            </div>}

            {data?.childs.map((el,ind)=>{
                return(
                    <Route key={ind} path={`/${data.route}/${el.code}`}>
                        <ReportComp
                            userName={userName}
                            setUserName={setUserName}
                            dataParent={data}
                            detail={el}
                            errText={errText}
                            clickHanlde={clickHanlde}
                            listData={listData}
                            setCond={setCond}
                        />
                    </Route>
                )
            })}
        </HeaderTwo>
    )
}

export default MonitoringReports
