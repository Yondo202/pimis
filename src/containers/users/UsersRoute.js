import React from 'react'
import { motion } from "framer-motion";
import { Switch, Route } from "react-router-dom";
import Menu from "containers/menu/menu";
import { HelpStore } from "context/HelperContext";
import Feedback from 'components/feedback/Feedback'
import CheckComp from "components/check/compCheck";
import EmialSender2 from "components/emailSend/EmailSend2";
import LoginDoneHome2 from "components/LoginDoneHome/Home";
import MainRequestOld from "containers/requestComp/mainRequestOld";
import { UrgudulStore } from "components/utilities/urgudulContext"
import UrgudulNavigator from "pages/urgudul/Navigator"
import FirstEvaluation from "pages/decision_making/5a/Page";
import CompilationCheck from "pages/decision_making/5b/Page";
import AnalystReport from "pages/decision_making/5c/Page";
import AttachmentUploads from "pages/attachments/page";
import WorkPerformance from 'components/workPerformance/MainWorkPerformance'
import PdfTest from 'components/check/PdfTest'
import MiddleRoute from "containers/middle/middleRoute"
import LetterNavigator from 'pages/letter_of_interest/LetterNavigator'
import Holidays from "components/holidays/Holidays"
import { UrgudulPreviewForUser } from 'pages/urgudul/preview/previewPages'
import TrainingFrontPage from 'pages/training/frontPage';
import UrgudulPage1 from 'pages/urgudul/pages/page1';
import UrgudulPage2 from 'pages/urgudul/pages/page2';
import UrgudulPage3 from 'pages/urgudul/pages/page3';
import UrgudulPage4 from 'pages/urgudul/pages/page4';
import UrgudulPage5 from 'pages/urgudul/pages/page5';
import UrgudulPage6 from 'pages/urgudul/pages/page6';
import UrgudulPage7 from 'pages/urgudul/pages/page7_company';
import UrgudulPage8 from 'pages/urgudul/pages/page8';


function UsersRoute() {
    return (
        <HelpStore>
            <Menu />

            <UrgudulStore>
                <Switch>
                    <Route path="/" exact>
                        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <LoginDoneHome2 />
                        </motion.div>
                    </Route>
                    <Route path="/check/:url" component={CheckComp} />
                    <Route path="/checks/test" component={PdfTest} />
                    {/* <Route path="/test" component={Test} /> */}
                    {/* <Route path="/notify-page/:paramId" component={MainPage} /> */}
                    {/* <Route path="/comp-request" component={MainRequest} /> */}
                    <Route path="/request/:url" component={MainRequestOld} />
                    <Route path="/feedback" component={Feedback} />
                    <Route path="/workperformance" component={WorkPerformance} />
                    <Route path="/email2" component={EmialSender2} />
                    {/* <Route path="/members" component={MembersHome} />
                    <Route path="/memberdecision" component={MemberDecision} /> */}
                    <Route path="/letter-of-interest" component={LetterNavigator} />
                    <Route path="/urgudul/:page" component={UrgudulNavigator} />
                    <Route path="/urgudul-preview/:id" component={UrgudulPreviewForUser} />
                    <Route path="/attachments" component={AttachmentUploads} />
                    <Route path="/5a" component={FirstEvaluation} />
                    <Route path="/5b" component={CompilationCheck} />
                    <Route path="/5c" component={AnalystReport} />
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
