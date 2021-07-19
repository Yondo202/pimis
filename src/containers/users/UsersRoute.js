import React from 'react'
import { motion } from "framer-motion";
import { Switch, Route } from "react-router-dom";
import Menu from "containers/menu/menu";
import { HelpStore } from "context/HelperContext";
import Feedback from 'components/feedback/Feedback'
// import CheckComp from "components/check/compCheck";
import CheckComp2 from "components/check/CompCheck2";
import EmialSender2 from "components/emailSend/EmailSend2";
import LoginDoneHome2 from "components/LoginDoneHome/Home";
import MainRequestOld from "containers/requestComp/mainRequestOld";
import { UrgudulStore } from "components/utilities/urgudulContext"
import UrgudulNavigator from "pages/urgudul/Page"
import FirstEvaluation from "pages/decision_making/5a/Page";
import CompilationCheck from "pages/decision_making/5b/Page";
import AnalystReport from "pages/decision_making/5c/Page";
import AttachmentUploads from "pages/attachments/page";
import WorkPerformance from 'components/workPerformance/MainWorkPerformance'
import PdfTest from 'components/check/PdfTest'
import MiddleRoute from "containers/middle/middleRoute"
import LetterNavigator from 'pages/letter_of_interest/LetterNavigator'
// import Holidays from "components/holidays/Holidays"
import { UrgudulPreviewForUser } from 'pages/urgudul/preview/previewPages'
import TrainingFrontPage from 'pages/training/frontPage';
import UrgudulPage1 from 'pages/urgudul/pages/1st';
import UrgudulPage2 from 'pages/urgudul/pages/2nd';
import UrgudulPage3 from 'pages/urgudul/pages/3rd';
import UrgudulPage4 from 'pages/urgudul/pages/4th';
import UrgudulPage5 from 'pages/urgudul/pages/5th';
import UrgudulPage6 from 'pages/urgudul/pages/6h';
import UrgudulPage7 from 'pages/urgudul/pages/7th';
import UrgudulPage8 from 'pages/urgudul/pages/8th';


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
                    <Route path="/check/:url" component={CheckComp2} />
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

                    <Route path="/urgudul-1" component={UrgudulPage1} />
                    <Route path="/urgudul-2" component={UrgudulPage2} />
                    <Route path="/urgudul-3" component={UrgudulPage3} />
                    <Route path="/urgudul-4" component={UrgudulPage4} />
                    <Route path="/urgudul-5" component={UrgudulPage5} />
                    <Route path="/urgudul-6" component={UrgudulPage6} />
                    <Route path="/urgudul-7" component={UrgudulPage7} />
                    <Route path="/urgudul-8" component={UrgudulPage8} />

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
