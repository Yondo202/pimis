import React, { useContext, useState } from 'react';
import { AlertStyle } from 'components/theme'
import { Loading } from "components/misc/CustomComp"
import Aside from '../../components/admin/left_menu/Aside';
import Main from '../../components/admin/left_menu/TopMain';
import UserContext from '../../context/UserContext'
import MiddleRoute from "containers/middle/middleRoute"
import styled, { keyframes } from 'styled-components'
import HomeAdmin from '../../components/admin/HomeAdmin'
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { CgDanger } from 'react-icons/cg';
import { Route, Switch } from "react-router-dom";
import UserHandle from 'components/admin/contents/users/UserHandle';
import ProjectHandle from 'components/admin/contents/projects/ProjectHandle'
import { UrgudulStore } from 'components/utilities/urgudulContext'
import Home from 'components/LoginDoneHome/Home'
import MainRequest from 'containers/requestComp/mainRequestOld'
import CompCheck2 from 'components/check/CompCheck2'
import EvidenceAttachments1 from 'pages/attachments/evidenceAttachments1';
import EvidenceAttachments2 from 'pages/attachments/evidenceAttachments2';
import FirstEvaluation from 'pages/decision_making/5a/Page';
import CompilationChecklist from 'pages/decision_making/5b/Page';
import AnalystReport from 'pages/decision_making/5c/Page';
import MainDecision from '../../components/admin/contents/main_decision/Main_decision';
import NotifyPage1 from '../../components/admin/contents/notifyPage/MainPage';
import EvaluatorsMeetingNavigator from 'components/admin/contents/evaluators_meeting/MeetingNavigator'
import EdpInformationHome from 'components/admin/contents/edpInformation/EdpInformation';
import FirstEvaluationSendNotice from 'pages/decision_making/5a/sendNotice'
import AcceptPeriodHandle from 'components/admin/contents/accept_period/acceptPeriodHandle'
import ReportLayout from 'components/admin/contents/Report/container/ReportLayout';
import ProjectStatusHandle from 'components/admin/contents/project_status/projectStatusHandle'
import CurrencyRateHandle from 'components/admin/contents/currency_rate/currencyRateHandle'
import LetterNavigator from 'pages/letter_of_interest/LetterNavigator'
import { UrgudulPreviewForAdmin } from 'pages/urgudul/preview/previewPages'
import Holidays from "components/holidays/Holidays"
import TrainingNavigatorAdmin from 'pages/training/training_admin/TrainingNavigator';
import TrainingRequestsList from 'pages/training/training_admin/requestsList';
import FeedbackQuestionnaireHandle from 'components/admin/contents/feedback_questionnaire/feedbackQuestionnaireHandle';
import TrainingsReport from 'pages/training/training_admin/trainingReport';
import TrainerOrganizationNavigator from 'components/admin/contents/trainer_organization/organizationNavigator';
import Insurance from 'components/admin/contents/insurance/Insurance';
import PerformanceAttachments from 'pages/attachments/performanceAttachements';
import InvoiceAttachments from 'pages/attachments/invoiceAttachments';
import FinancialAttachments from 'pages/attachments/financialAttachments';
import ExportDataList from "components/admin/contents/export_data/MainPage"
import InsuranceTypeHandle from 'components/admin/contents/insurance_type/insuranceTypeHandle';
import ResultMeasure from 'components/admin/contents/monitoring/resultReport/ResultMeasure';
import { MakeContractForAdmin } from 'pages/contract/make_contract/makeContractPages';
import { ContractReportsForAdmin } from 'pages/contract/contract_reports/contractReportPages';
import LaboratoryNavigator from 'components/admin/contents/laboratory/laboratoryNavigator';
import MainReports from "components/admin/contents/monitoring/mainReports/container/Reports"
import Member_interest from 'components/admin/contents/evaluation_results/Member_interest';
import PrintSector from 'components/admin/contents/monitoring/mainReports/progressReport/PrintSector';
import InsuranceMonitoring from 'components/admin/contents/insurance/monitoring/InsuranceMonitoring';

function Layout({ setLocale }) {
  const ctx = useContext(UserContext);
  const [rtl, setRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = (checked) => { setCollapsed(checked); };
  const handleRtlChange = (checked) => { setRtl(checked); setLocale(checked ? 'ar' : 'en'); };
  const handleImageChange = (checked) => { setImage(checked); };
  const handleToggleSidebar = (value) => { setToggled(value); };


  return (
    <AdminApp className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
      <div className="MainParent">
        <Aside image={image} collapsed={collapsed} rtl={rtl} toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
      </div>

      <div className="container-fluid ContentPar">
        <Main image={image} toggled={toggled} collapsed={collapsed} rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
        />

        <div className="itemsPar2">
          <UrgudulStore>
            <Switch>
              <Route path="/" component={HomeAdmin} exact />
              <Route path="/users" component={UserHandle} />
              <Route path="/projects" component={ProjectHandle} />
              <Route path="/report/" component={ReportLayout} />
              <Route path="/holidays" component={Holidays} />
              <Route path="/insurance" component={Insurance} />
              <Route path="/result-measure" component={ResultMeasure} />
              {MainReportsData.map((el, ind) => {
                return (
                  <Route key={ind} path={`/${el.route}/:childcode`}>
                    <MainReports data={el} />
                  </Route>
                )
              })}
              <Route path="/progress-report" component={PrintSector} />

              <Route path="/incurance-report" component={InsuranceMonitoring} />
              {/* <Route path="/urgudul/:page">
                <UrgudulNavigator preloaded={true} />
              </Route> */}
              <Route path="/meetings" component={EvaluatorsMeetingNavigator} />
              <Route path="/accept-periods" component={AcceptPeriodHandle} />
              <Route path="/epd-information" component={EdpInformationHome} />
              <Route path="/project-status" component={ProjectStatusHandle} />
              <Route path="/currency-rates" component={CurrencyRateHandle} />
              <Route path="/progress" component={Home} />
              <Route path="/request/:url" component={MainRequest} />
              <Route path="/check/:url" component={CompCheck2} />
              <Route path="/notify-page/:paramId" component={NotifyPage1} />
              {/* <Route path="/memberdecision" component={MemberDecision} /> */}
              <Route path="/member-interest/:id" component={Member_interest} />
              <Route path="/maindecision/:id" component={MainDecision} />
              
              <Route path="/letter-of-interest" component={LetterNavigator} />
              <Route path="/urgudul-preview/:id" component={UrgudulPreviewForAdmin} />
              <Route path="/attachments/evidence-1/:id" component={EvidenceAttachments1} />
              <Route path="/attachments/evidence-2/:id" component={EvidenceAttachments2} />
              <Route path="/attachments/performance/:id" component={PerformanceAttachments} />
              <Route path="/attachments/financial/:id" component={FinancialAttachments} />
              <Route path="/attachments/invoice/:id" component={InvoiceAttachments} />
              <Route exact path="/5a/:id" component={FirstEvaluation} />
              <Route path="/5a/:id/send-notice" component={FirstEvaluationSendNotice} />
              <Route path="/5b/:id" component={CompilationChecklist} />
              <Route path="/5c/:id" component={AnalystReport} />
              <Route path="/make-contract" component={MakeContractForAdmin} />
              <Route path="/contract-reports" component={ContractReportsForAdmin} />
              <Route path="/trainings" component={TrainingNavigatorAdmin} />
              <Route path="/training-requests" component={TrainingRequestsList} />
              <Route path="/training-questionnaire" component={FeedbackQuestionnaireHandle} />
              <Route path="/training-report" component={TrainingsReport} />
              <Route path="/trainer-organizations" component={TrainerOrganizationNavigator} />
              <Route path="/export-data" component={ExportDataList} />
              <Route path="/insurance-types" component={InsuranceTypeHandle} />
              <Route path="/laboratories" component={LaboratoryNavigator} />
              <MiddleRoute />
            </Switch>
          </UrgudulStore>
        </div>
      </div>

      <AlertStyle style={ctx.alert.cond === true ? { bottom: `100px`, opacity: `1`, borderLeft: `4px solid ${ctx.alert.color}` } : { bottom: `50px`, opacity: `0` }} >
        {ctx.alert.color === "green" ? <IoMdCheckmarkCircle style={{ color: `${ctx.alert.color}` }} className="true" /> : <CgDanger style={{ color: `${ctx.alert.color}` }} className="true" />}
        <span>{ctx.alert.text}</span>
      </AlertStyle>
      {ctx.loading && <Loading />}
    </AdminApp>
  );
}

export default Layout;

const MainReportsData = [
  {
    route: "monitoring-report",
    type: 1,
    title: "Хяналт-шинжилгээний тайлан",
    childs: [
      { code: 0, title: "icon", },
      { code: 1, title: "1.Хураангуй", },
      { code: 2, title: "2.Төсөлд оруулах шаардлагатай өөрчлөлт, түүний үндэслэл" },
      { code: 3, title: "3.Үйл ажиллагааны үнэлгээ" },
      { code: 4, title: "4.Төслийн орчны өөрчлөлт, таамаглал ба эрсдэл үүсэх магадлал, тэдгээрийн төсөлд үзүүлэх нөлөө" },
      { code: 5, title: "5.Нийцтэй байдал ба тогтвортой байдал" },
      { code: 6, title: "6.Хэрэгжилтийн үр ашгийн үнэлгээ" },
    ],
  },
  // {
  //   route: "progress-report",
  //   type: 2,
  //   title: "Явцын үнэлгээний тайлан",
  //   childs: [
  //     { code: 0, title: "icon", },
  //     { code: 1, title: "1.lessons learned and recommendations", },
  //     { code: 2, title: "2.detailed project progress report" },
  //   ],
  // },
  {
    route: "evaluation-report",
    type: 3,
    title: "Үнэлгээний тайлан",
    childs: [
      { code: 0, title: "icon", },
      { code: 1, title: "1.Хураангуй", },
      { code: 2, title: "2.Төслийн үйл ажиллагааны товч түүх, төслийн орчны өөрчлөлт, тэдгээрийн төсөлд үзүүлсэн нөлөө", },
      { code: 3, title: "3.Үнэлгээний зорилго, хэрэглэсэн арга зүй, сул тал", },
      { code: 4, title: "4.Үнэлгээ", },
      { code: 5, title: "5.Нийцтэй байдал ба тогтвортой байдал", },
      { code: 6, title: "6.Дүгнэлт ба зөвлөмж: үйл ажиллагааг сайжруулах саналууд, сургамж", },
    ],
  },
  {
    route: "completion-report",
    type: 4,
    title: "Эцсийн тайлан",
    childs: [
      { code: 0, title: "icon", },
      { code: 1, title: "1.Хураангуй ба сургамж ", },
      { code: 2, title: "2.Төслийн суурь мэдээлэл ", },
      { code: 3, title: "3.Төслийн дизайн ", },
      { code: 4, title: "4.Нөөцүүд", },
      { code: 5, title: "5.Үйл ажиллагаа ", },
      { code: 6, title: "6.Үр дүн", },
      { code: 7, title: "7.Зорилгын биелэлт", },
      { code: 8, title: "8.Тогтвортой байдал", },
      { code: 9, title: "9.Төслийн алтернативыг тодорхойлох ", },
      { code: 10, title: "10.Хийгдэж болох нэмэлт шинжилгээ ", },
      { code: 11, title: "11.Нэмэлт зээлийн хэрэгцээ", },
      { code: 12, title: "12.Бодлогын хамааралтай байдал ", },
      { code: 13, title: "13.Хуримтлуулсан туршлага, сургамж", },
    ],
  },
]



const cardAnimate = keyframes`
  0% { transform:translateY(30px);opacity:0; }
  100% { transform:translateY(0px);opacity:1; }
`

export const AdminApp = styled.div`
    .MainParent{
        height:100vh;
        // display:flex;
        .leftMenuPar{
            box-shadow: 5px 0 8px -4px rgba(0,80,180,0.2);
        }
    }
    .ContentPar{
        position:relative;
        height:100vh;
        background-color: #f2f2f2;
        .itemsPar2{
            position:relative;
            margin-right:-15px;
            padding-right:25px;
            padding-top:25px;
            padding-left:10px;
            overflow-y:scroll;
            height:94vh;
        }
        .topMenuPar{
            display:flex;
            align-items:center;
            justify-content:space-between;
            box-shadow: 0 1px 8px -2px rgba(0,80,180,0.2);
            // background-color:white;
            background-color:#32373d;
            
            padding:6px 30px;
            // margin-bottom:15px;
            .SwitchPar{
                display:flex;
                align-items:center;
            }
            .profilePar{
                display:flex;
                // position:relative;
                .userMenuPar{
                    display:flex;
                    flex-direction:row;
                    justify-content:space-between;
                    align-items:center;
                    width:10%;
                    .UserNameMenu{
                      position:relative;
                      .ghost{
                        animation-name: ${cardAnimate};
                        animation-duration:0.5s;
                        color:rgba(${(props) => props.theme.textColor},1);
                        position:absolute;
                        z-index:10;
                        top:5px;
                        right:0;
                        transition:all 0.3s ease;
                        .HoverContent{
                          display:flex;
                          align-items:center;
                          flex-direction:column;
                          justify-content:center;
                          margin-top:30px;
                          padding:0px 15px;
                          background-color:#fff;
                          max-height: calc(100vh - 60px);
                          box-shadow:1px 1px 20px -9px;
                          width:300px;
                          border-radius:4px;
                          .UserInfo{
                            display:flex;
                            align-items:center;
                            width:100%;
                            padding:20px 5px;
                            border-bottom:1px solid rgba(0,0,0,0.2);
                            img{
                              width:25px;
                              margin-right:15px;
                            }
                            .name{
                              font-size:16px;
                              font-weight:500;
                            }
                          }
                          .resPass{
                            text-decoration:none;
                            color:rgba(${(props) => props.theme.textColor},1);
                            cursor:pointer;
                            border-radius:4px;
                            width:100%;
                            padding: 9px 5px;
                            margin: 9px 0px;
                            display:flex;
                            align-items:center;
                            justify-content:space-between;
                            .initList{
                              display:flex;
                              align-items:center;
                              span{
                                font-size:15px;
                                font-weight:500;
                                color:rgba(${(props) => props.theme.textColor},1);
                              }
                              .svg{
                                margin-right:14px;
                                background-color:#e4e6eb;
                                padding:8px 8px;
                                border-radius:50%;
                                svg{
                                  font-size:17px;
                                }
                              }
                            }
                            .svgOther{
                              svg{
                                color:rgba(${(props) => props.theme.textColor},.7);
                                font-size:22px;
                              }
                            }
                            &:hover{
                              background-color:#e4e6eb;
                            }
                        }
                      }
                      }
                      .par{
                        padding:4px 4px;
                        cursor:pointer;
                        height:100%;
                        border-radius:50%;
                        // background-color:#e4e6eb;
                        margin-left:8px;
                        svg{
                          font-size:21px;
                          color:rgba(255,255,255,0.9);
                        }
                        &:hover{
                          color:black;
                          background-color:rgba(255,255,255,0.3);
                          svg{
                            color:white;
                          }
                        }
                      }
                    }
                    .Logout{
                        margin-left:8px;
                      a {
                        font-weight:500;
                        display:flex;
                        align-items:center;
                        color:black;
                        text-decoration: none !important;
                        color:rgba(255,255,255,0.9);
                        font-size:15px;
                        svg{
                          margin-left:4px;
                          font-size:18px;
                          color:rgba(255,255,255,0.9);        
                        }
                      }
                    }
                  }
              
                .Profile{
                    cursor:pointer;
                    display:flex;
                    align-items:center;
                    img{
                        border-radius:50%;
                        width:28px;
                        height:28px;
                        object-fit:cover;
                        border:1px solid rgba(0,30,80,0.1);
                    }
                    svg{
                        transition:all 0.3s ease;
                        margin-left:2px;
                        font-size:14px;
                        // color:rgba(0,30,80,1);
                        color:rgba(255,255,255,.8);
                    }
                }
            }
        }
        @media (max-width:760px){
            .SwitchPar{
                display:none !important;
            }
        }
    }
`

