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
import UrgudulNavigator from "pages/urgudul/Page"
import BusinessSectorEditor from "pages/business_sector_edit/editorPage";
import ProductsEditor from "pages/products_edit/editorPage";
import LetterOfInterest from "pages/letter_of_interest/page";
import FirstEvaluation from "pages/decision_making/5a/Page";
import CompilationCheck from "pages/decision_making/5b/Page";
import AnalystReport from "pages/decision_making/5c/Page";
import AttachmentUploads from "pages/attachments/page";
import MainPage from "components/notifyPage/MainPage";
import WorkPerformance from 'components/workPerformance/MainWorkPerformance'

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
                    <Route path="/notify-page/:paramId" component={MainPage} />

                    {/* <Route path="/comp-request" component={MainRequest} /> */}
                    <Route path="/request/:url" component={MainRequestOld} />
                    <Route path="/feedback" component={Feedback} />
                    <Route path="/workperformance" component={WorkPerformance} />
                    <Route path="/email2" component={EmialSender2} />

                    {/* <Route path="/members" component={MembersHome} />
                    <Route path="/memberdecision" component={MemberDecision} /> */}

                    <Route path="/letter-of-interest" component={LetterOfInterest} />
                    <Route path="/urgudul/:page" component={UrgudulNavigator} />

                    <Route path="/attachments" component={AttachmentUploads} />

                    <Route path="/5a" component={FirstEvaluation} />
                    <Route path="/5b" component={CompilationCheck} />
                    <Route path="/5c" component={AnalystReport} />

                    <Route path="/sector-edit" component={BusinessSectorEditor} />
                    <Route path="/product-edit" component={ProductsEditor} />
                </Switch>
            </UrgudulStore>
        </HelpStore>
    )
}

export default UsersRoute
