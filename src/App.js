import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Admin from "./containers/admin/MainMenu";
import Menu from "./containers/menu/menu";
import UserContext from "./context/UserContext";
import { HelpStore } from "./context/HelperContext";
import Feedback from './components/feedback/Feedback'
import CheckComp from "./components/check/compCheck";
import MainRequest from "./containers/requestComp/mainRequest";
import EmialSender from "./components/emailSend/EmailSend";
import EmialSender2 from "./components/emailSend/EmailSend2";
import LoginDoneHome2 from "./components/LoginDoneHome/Home";
import ReqHome from "./components/LoginDoneHome/RequestHome";
import MainRequestOld from "./containers/requestComp/mainRequestOld";
import { UrgudulStore } from "components/utilities/urgudulContext";
import BusinessSectorEditor from "pages/business_sector_edit/editorPage";
import ProductsEditor from "pages/products_edit/editorPage";
import { AlertStore } from "components/utilities/alertContext";
import AlertDialog from "components/alert_dialog/alertDialog";
import UrgudulNavigator from "pages/urgudul/page";
import LetterOfInterest from "pages/letter_of_interest/page";
import FirstEvaluation from "pages/decision_making/page_5a";
import CompilationCheck from "pages/decision_making/page_5b";
import AnalystReport from "pages/decision_making/page_5c";
import AttachmentUploads from "pages/attachments/page";
import MainPage from "components/notifyPage/MainPage";
import UnAuthContent from "UnauthContent";
import { FilePreviewStore } from "components/utilities/filePreviewContext";
import FilePreviewModal from "components/file_preview/filePreview";



function App() {
  const ctxUser = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const expireDate = new Date(localStorage.getItem("expireDate"));

    if (token) {
      if (expireDate > new Date()) {
        console.log(expireDate);
        // Hugatsaa n duusaaagui token baina, automat login hiine

        ctxUser.autoRenewTokenAfterMillisec(expireDate.getTime() - new Date().getTime());
      } else {
        //Хугацаа дууссан байсанч токен байвал логин хийнэ
        // Token - oo refresh hiij daraagiin refresh hiih hugatsaag tohiruulna
        ctxUser.autoRenewTokenAfterMillisec(3600000);
      }
    }
  }, [ctxUser.userInfo.id]);

  return (
    <div className="App">


      <AlertStore>
        <FilePreviewStore>
          <Router>
            {/* <Admin /> */}
            {
              ctxUser.userInfo.userId ? ctxUser.userInfo.role === "admin" ? (
                <Switch>
                  <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Route path="/" >
                      <Admin />
                    </Route>
                  </motion.div>
                </Switch>
                //  <Route path="/admin" component={Admin} />
              ) : (
                  <HelpStore>
                    <Menu />
                    <UrgudulStore>
                      <Switch>
                        <Route path="/" exact>
                          <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {/* <LoginDoneHome /> */}
                            <LoginDoneHome2 />
                          </motion.div>
                        </Route>
                        <Route path="/comp-test" component={CheckComp} />
                        {/* <Route path="/comp-check" component={MainForm} /> */}
                        <Route path="/comp-request" component={ReqHome} exact />
                        <Route path="/notify-page/:paramId" component={MainPage} />

                        <Route path="/comp-request/new" component={MainRequest} />
                        <Route path="/comp-request/old" component={MainRequestOld} />
                        <Route path="/feedback" component={Feedback} />

                        <Route path="/email" component={EmialSender} />
                        <Route path="/email2" component={EmialSender2} />

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
                : (<UnAuthContent />)
            }
          </Router>
          <FilePreviewModal />
        </FilePreviewStore>
        <AlertDialog />
      </AlertStore>
    </div>
  );
}

export default App;
