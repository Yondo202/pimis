import React, { useState } from 'react'
import { HeaderTwo } from "components/misc/CustomStyle"
import { Route, useLocation, useHistory } from "react-router-dom";
import ReportComp from "components/admin/contents/monitoring/mainReports/components/ReportComp";
import { IoHomeSharp } from "react-icons/io5";
import useQuery from 'components/utilities/useQueryLocation';
import { AiOutlinePrinter } from "react-icons/ai"
import PrintComp from '../components/PrintComp';
 
function MonitoringReports({ data }) {
    const years = useQuery().get('year');
    const season = useQuery().get('season');
    const half = useQuery().get('half');

    const [ showModal, setShowModal ] = useState(false);

    const [ errText, setErrText ] = useState('');
    
    const { push } = useHistory();
    // const { childcode } = useParams();
    let loc = useLocation(); 

    console.log(`data.type`, data.type);

    const clickHanlde = (element) => {
        const ErrMsg = text =>{
            setErrText(text);
            setTimeout(() => { setErrText('') }, 4000)
        }
        const HandlePush = (elem, url) =>{
            push({
                pathname: `/${data.route}/${element}`,
                search: `?year=${years}${url!==null?`&${url}=${elem}`:``}`,
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

    const HandleClick = () =>{

    }


    return (
        <HeaderTwo className="container-fluid">
            {showModal?<PrintComp dataChild={data?.childs} setShowModal={setShowModal} />:null}
            <div className="TitlePar">
                <div className="Title">
                    {data.title} →
                    <span className="datePick">{years!==null?years:`....`} оны {season!==null?`${season}-р улирал`:`...-р улирал`} </span>
                </div>
                <div onClick={_=>setShowModal(prev=>!prev)} className="PrintButton">
                    <AiOutlinePrinter /> <span> Хэвлэх болон pdf - татах</span>  
                </div>
            </div>
            
            <div className="smMenuPar">
                {data?.childs.map((el,ind)=>{
                    return(
                        <button key={ind} onClick={()=>clickHanlde(el.code)} className={`itemsPar ${loc.pathname.includes(`/${data.route}/${el.code}`)&&`itemsPar22 Active`}`}><span>{el.code!==0?el.title:<IoHomeSharp />}</span></button>
                    )
                })}
            </div>

            {data?.childs.map((el,ind)=>{
                return(
                    <Route key={ind} path={`/${data.route}/${el.code}`}>
                        <ReportComp
                            dataParent={data}
                            detail={el}
                            errText={errText}
                            clickHanlde={clickHanlde}
                        />
                    </Route>
                )
            })}
        </HeaderTwo>
    )
}

export default MonitoringReports