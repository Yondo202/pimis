import React, { useContext } from 'react'
// import UserContext from "global/UserContext"
import { HeaderTwo } from "components/misc/CustomStyle"
import { BrowserRouter as Switch, Route, useLocation, useHistory, useParams } from "react-router-dom";
import MonitoringReport from "components/admin/contents/monitoring/mainReports/components/MonitoringReport";
import { IoHomeSharp } from "react-icons/io5"


function MonitoringReports() {
    const history = useHistory();
    // const ctx = useContext(UserContext);
    const params = useParams().id;
    let loc = useLocation(); 

    const clickHanlde = (element) => {
        switch (element) {
            case "showHome":history.push(`/monitoring-report/0`); break;
            case "show1":history.push(`/monitoring-report/1`); break;
            case "show2": history.push(`/monitoring-report/2`); break;
            case "show3": history.push(`/monitoring-report/3`); break;
            case "show4": history.push(`/monitoring-report/4`); break;
            case "show5": history.push(`/monitoring-report/5`); break;
            case "show6": history.push(`/monitoring-report/6`); break;
            default:
        }
    }

    return (
        <HeaderTwo className="container-fluid">
            <div className="Title">Хяналт-шинжилгээний тайлан / Monitoring report /</div>
            <div className="smMenuPar">
                {/* <button onClick={()=>clickHanlde("show1")} disabled={ctx.total?.analysisone?false:true} className={`itemsPar ${ctx.total?.analysisone&&`Active`} ${loc.pathname.includes(`/analysis/1`)&&`itemsPar2`}`}><span>Экспортын зах зээлийн судалгаа</span></button>
                <button onClick={()=>clickHanlde("show2")} disabled={ctx.total?.analysistwo?false:true} className={`itemsPar ${ctx.total?.analysistwo&&`Active`} ${loc.pathname.includes(`/analysis/2`)&&`itemsPar2`}`}><span>Зорилтот зах зээл</span></button>
                <button onClick={()=>clickHanlde("show3")} disabled={ctx.total?.analysisthree?false:true} className={`itemsPar ${ctx.total?.analysisthree&&`Active`} ${loc.pathname.includes(`/analysis/3`)&&`itemsPar2`}`} ><span>Экспортыг өрсөлдөөний орчин, өрсөлдөгчийн судалгаа</span></button>
                <button onClick={()=>clickHanlde("show4")} disabled={ctx.total?.analysisfour?false:true} className={`itemsPar ${ctx.total?.analysisfour&&`Active`} ${loc.pathname.includes(`/analysis/4`)&&`itemsPar2`}`} ><span>SWOT шинжилгээ</span></button>
                <button onClick={()=>clickHanlde("show5")} disabled={ctx.total?.analysisfive?false:true} className={`itemsPar ${ctx.total?.analysisfive&&`Active`} ${loc.pathname.includes(`/analysis/5`)&&`itemsPar2`}`} ><span>Экспортын борлуулалтын төлөвлөгөө</span></button> */}
                <button onClick={()=>clickHanlde("showHome")} className={`itemsPar  ${loc.pathname.includes(`/monitoring-report/0`)&&`itemsPar22`}`}><span><IoHomeSharp /></span></button>
                
                <button onClick={()=>clickHanlde("show1")} className={`itemsPar  ${loc.pathname.includes(`/monitoring-report/1`)&&`itemsPar22`}`}><span>1.Хураангуй</span></button>
                <button onClick={()=>clickHanlde("show2")} className={`itemsPar ${loc.pathname.includes(`/monitoring-report/2`)&&`itemsPar22`}`}><span>2.Төсөлд оруулах шаардлагатай өөрчлөлт, түүний үндэслэл</span></button>
                <button onClick={()=>clickHanlde("show3")} className={`itemsPar ${loc.pathname.includes(`/monitoring-report/3`)&&`itemsPar22`}`} ><span>3.Үйл ажиллагааны үнэлгээ</span></button>
                <button onClick={()=>clickHanlde("show4")} className={`itemsPar ${loc.pathname.includes(`/monitoring-report/4`)&&`itemsPar22`}`} ><span>4.Төслийн орчны өөрчлөлт, таамаглал ба эрсдэл үүсэх магадлал, тэдгээрийн төсөлд үзүүлэх нөлөө</span></button>
                <button onClick={()=>clickHanlde("show5")} className={`itemsPar ${loc.pathname.includes(`/monitoring-report/5`)&&`itemsPar22`}`} ><span>5.Нийцтэй байдал ба тогтвортой байдал</span></button>
                <button onClick={()=>clickHanlde("show6")} className={`itemsPar ${loc.pathname.includes(`/monitoring-report/6`)&&`itemsPar22`}`} ><span>6.Хэрэгжилтийн үр ашгийн үнэлгээ</span></button>
            </div>
            {/* 
            <Route exact path="/:id/analysis/1/:slug"><AnalysisOne /></Route>
            <Route exact path="/:id/analysis/2/:slug"><AnalysisTwo /></Route>
            <Route exact path="/:id/analysis/3/:slug"><Analysisthree /></Route>
            <Route exact path="/:id/analysis/4/:slug"><AnalysisFour /></Route>
            <Route exact path="/:id/analysis/5/:slug"><AnalysisFive /></Route> */}
            
            {/* <Route key={ind}  path={`/monitoring-report/${el.code}`}><MonitoringReport field={el.field} code={el.code} title={el.title} /></Route> */}

            {MonitoringReportData.map((el,ind)=>{
                return(
                    <Route key={ind}  path={`/monitoring-report/${el.code}`}><MonitoringReport field={el.field} code={el.code} title={el.title} /></Route>
                )
            })}
            
        </HeaderTwo>
    )
}

export default MonitoringReports


const MonitoringReportData = [
    { code:0, field: "m_one", title: "icon", },
    { code:1, field: "m_one", title: "1.Хураангуй", },
    { code:2, field: "m_two", title: "2.Төсөлд оруулах шаардлагатай өөрчлөлт, түүний үндэслэл" },
    { code:3, field: "m_three", title: "3.Үйл ажиллагааны үнэлгээ" },
    { code:4, field: "m_four", title: "4.Төслийн орчны өөрчлөлт, таамаглал ба эрсдэл үүсэх магадлал, тэдгээрийн төсөлд үзүүлэх нөлөө" },
    { code:5, field: "m_five", title: "5.Нийцтэй байдал ба тогтвортой байдал" },
    { code:6, field: "m_five", title: "6.Хэрэгжилтийн үр ашгийн үнэлгээ" },
]
