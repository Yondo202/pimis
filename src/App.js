import React, { useEffect, useState, useContext } from 'react'
import { motion } from "framer-motion";
import Menu from './containers/menu/menu'
import UserContext from "./context/UserContext";
import { HelpStore } from './context/HelperContext'
import HomeLogin from './components/home/homeLogin'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainForm from './containers/checkComp/MainForm';
import CheckComp from './components/check/compCheck'
import SignUp from './components/signup/Signup'
import ResetPassword from './components/home/ResetPassword'
import MainRequest from './containers/requestComp/mainRequest'
import EmialSender from './components/emailSend/EmailSend'
import EmialSender2 from './components/emailSend/EmailSend2'
import LoginDoneHome from './components/LoginDoneHome/MainHome'
import LoginDoneHome2 from './components/LoginDoneHome/Home'
import ReqHome from './components/LoginDoneHome/RequestHome'
import MainRequestOld from './containers/requestComp/mainRequestOld'
import { UrgudulStore } from "components/utilities/urgudulContext"
import BusinessSectorEditor from 'pages/business_sector_edit/editorPage'
import ProductsEditor from 'pages/products_edit/editorPage'
import { AlertStore } from 'components/utilities/alertContext'
import AlertDialog from 'components/alert_dialog/alertDialog'
import UrgudulNavigator from 'pages/urgudul/page'
import LetterOfInterest from 'pages/letter_of_interest/page'
import FirstEvaluation from 'pages/decision_making/page_5a'
import CompilationCheck from 'pages/decision_making/page_5b'
import AnalystReport from 'pages/decision_making/page_5c';
import AttachmentUploads from 'pages/attachments/page';
import MainPage from 'components/notifyPage/MainPage'


function App() {
  const ctxUser = useContext(UserContext);

  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();

  useEffect(() => {
    const userId = localStorage.getItem("userId", []);
    const userName = localStorage.getItem("userName", []);
    setUserId(userId);
    setUserName(userName);
  }, []);

  // const clickhandle = () =>{
  //     ctxUser.logout();
  //     setTimeout(() => {
  //       window.location.reload(false);
  //      }, 100);
  // }

  return (
    <div className="App">
      <AlertStore>
        <Router>
          {userId && <Menu />}
          {userId ? (
            <HelpStore>
              <UrgudulStore>
                <Switch>
                  <Route path="/" exact>
                    <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                      {/* <LoginDoneHome /> */}
                      <LoginDoneHome2 />
                    </motion.div>
                  </Route>

                  <Route path="/comp-test" component={CheckComp} />
                  <Route path="/comp-check" component={MainForm} />
                  <Route path="/comp-request" component={ReqHome} exact />
                  <Route path="/notfy-page" component={MainPage} exact />

                  <Route path="/comp-request/new" component={MainRequest} />
                  <Route path="/comp-request/old" component={MainRequestOld} />

                  <Route path="/email" component={EmialSender} />
                  <Route path="/email2" component={EmialSender2} />

                  <Route path="/letter-of-interest" component={LetterOfInterest} />

                  <Route path="/urgudul/:page" component={UrgudulNavigator} />

                  <Route path="/5a" component={FirstEvaluation} />
                  <Route path="/5b" component={CompilationCheck} />
                  <Route path="/5c" component={AnalystReport} />

                  <Route path="/attachments" component={AttachmentUploads} />
                  <Route path="/sector-edit" component={BusinessSectorEditor} />
                  <Route path="/product-edit" component={ProductsEditor} />
                </Switch>
              </UrgudulStore>
            </HelpStore>
          ) : (
              <Switch>
                <Route path="/" exact>
                  <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                    <HomeLogin />
                  </motion.div>
                </Route>
                <Route path="/comp-check">
                  <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                    <MainForm />
                  </motion.div>
                </Route>
                <Route path="/signup" >
                  <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                    <SignUp />
                  </motion.div>
                </Route>
                <Route path="/changepassword/:id" children={<ResetPassword />}>
                  <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                    <ResetPassword />
                  </motion.div>
                </Route>
              </Switch>
            )}
        </Router>
        <AlertDialog />
      </AlertStore>
    </div>
  );
}

export default App;