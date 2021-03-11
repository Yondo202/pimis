import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Admin from "./containers/admin/MainMenu";
import UserContext from "./context/UserContext";
import UsersRoute from "containers/users/UsersRoute"
import UnAuthContent from "UnauthContent";
import { AlertStore } from "components/utilities/alertContext";
import AlertDialog from "components/alert_dialog/alertDialog";
import { FilePreviewStore } from "components/utilities/filePreviewContext";
import FilePreviewModal from "components/file_preview/filePreview";
import 'devextreme/dist/css/dx.common.css'
// import 'devextreme/dist/css/dx.light-compact.css'
import 'assets/devExtremeTheme/dx.material.blue-light-compact.css'
import MemberRoute from 'containers/member/MemberRoute'


function App() {
  const [userId, setUserId] = useState(null);
  const ctxUser = useContext(UserContext);

  useEffect(() => {
    setUserId(ctxUser.userInfo.id);
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
  }, [userId]);

  return (
    <div className="App">
      <AlertStore>
        <FilePreviewStore>
          <Router>
            {
              ctxUser.userInfo.userId ? ctxUser.userInfo.role !== "user" ? 
              ctxUser.userInfo.role==="member" ?<MemberRoute />
              :(
                <Switch>
                  <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Route path="/" >
                      <Admin />
                    </Route>
                  </motion.div>
                </Switch>
<<<<<<< HEAD
                //  <Route path="/admin" component={Admin} />
              ) : (
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

                      <Route path="/members" component={MembersHome} />
                      <Route path="/memberdecision" component={MemberDecision} />

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
=======
              ) : ( <UsersRoute />  )
>>>>>>> b9916d8d09a61d4b297c42fe99507c481eb733f1
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
