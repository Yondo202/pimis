import React from 'react'
// import { motion } from "framer-motion";
import { Switch, Route } from "react-router-dom";
import Menu from "containers/menu/menu";
import { HelpStore } from "context/HelperContext";
import Feedback from 'components/feedback/Feedback'
import CheckComp2 from "components/check/CompCheck2";
import EmialSender2 from "components/emailSend/EmailSend2";
import LoginDoneHome2 from "components/LoginDoneHome/Home";
import MainRequest from "containers/requestComp/mainRequestOld";
import { UrgudulStore } from "components/utilities/urgudulContext"
import UrgudulNavigator from "pages/urgudul/Navigator"
import FirstEvaluation from "pages/decision_making/5a/Page";
import CompilationCheck from "pages/decision_making/5b/Page";
import AnalystReport from "pages/decision_making/5c/Page";
import EvidenceAttachments1 from 'pages/attachments/evidenceAttachments1';
import EvidenceAttachments2 from "pages/attachments/evidenceAttachments2";
import PdfTest from 'components/check/PdfTest'
import MiddleRoute from "containers/middle/middleRoute"
import LetterNavigator from 'pages/letter_of_interest/LetterNavigator'
// import Holidays from "components/holidays/Holidays"
import { UrgudulPreviewForUser } from 'pages/urgudul/preview/previewPages'
import TrainingFrontPage from 'pages/training/frontPage';
import PerformanceAttachments from 'pages/attachments/performanceAttachements';
import InvoiceAttachments from 'pages/attachments/invoiceAttachments';
import FinancialAttachments from 'pages/attachments/financialAttachments';
import { MakeContractForUser } from 'pages/contract/make_contract/makeContractPages';
import { ContractReportsForUser } from 'pages/contract/contract_reports/contractReportPages';

function UsersRoute() {
    return (
        <HelpStore>
            <Menu />

            <UrgudulStore>
                <Switch>
                    <Route path="/" exact>
                        {/* <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}> */}
                            <LoginDoneHome2 />
                        {/* </motion.div> */}
                    </Route>
                    <Route path="/check/:url" component={CheckComp2} />
                    <Route path="/checks/test" component={PdfTest} />
                    {/* <Route path="/notify-page/:paramId" component={MainPage} /> */}
                    {/* <Route path="/comp-request" component={MainRequest} /> */}
                    <Route path="/request/:url" component={MainRequest} />
                    <Route path="/feedback" component={Feedback} />
                    <Route path="/email2" component={EmialSender2} />
                    {/* <Route path="/members" component={MembersHome} />
                    <Route path="/memberdecision" component={MemberDecision} /> */}
                    <Route path="/letter-of-interest" component={LetterNavigator} />
                    <Route path="/urgudul/:page" component={UrgudulNavigator} />
                    <Route path="/urgudul-preview/:id" component={UrgudulPreviewForUser} />
                    <Route path="/attachments/evidence-1" component={EvidenceAttachments1} />
                    <Route path="/attachments/evidence-2" component={EvidenceAttachments2} />
                    <Route path="/attachments/performance" component={PerformanceAttachments} />
                    <Route path="/attachments/financial" component={FinancialAttachments} />
                    <Route path="/attachments/invoice" component={InvoiceAttachments} />
                    <Route path="/5a" component={FirstEvaluation} />
                    <Route path="/5b" component={CompilationCheck} />
                    <Route path="/5c" component={AnalystReport} />
                    <Route path="/make-contract" component={MakeContractForUser} />
                    <Route path="/contract-reports" component={ContractReportsForUser} />
                    <Route path="/trainings">
                        <TrainingFrontPage user={true} />
                    </Route>
                    <MiddleRoute />
                </Switch>
            </UrgudulStore>
        </HelpStore>
    )
}

export default UsersRoute;
