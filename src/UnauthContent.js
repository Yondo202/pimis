import React from "react";
import { Switch, Route } from "react-router-dom";
import { motion } from "framer-motion";
import HomeLogin from "./components/home/homeLogin";
import MainForm from "./containers/checkComp/MainForm";
import ResetPassword from "./components/home/ResetPassword";
import Email from "./components/emailSend/Email"
import SEctor from 'containers/users/Sector'
import TrainingFrontPage from "pages/training/frontPage";

const UnAuthContent = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <HomeLogin />
        </motion.div>
      </Route>
      <Route path="/comp-check">
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <MainForm />
        </motion.div>
      </Route>
      <Route path="/users/confirm/:id">
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Email />
        </motion.div>
      </Route>
      <Route path="/changepassword/:id" children={<ResetPassword />}>
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ResetPassword />
        </motion.div>
      </Route>
      <Route path="/sector" component={SEctor} exact />
      <Route path="/trainings" component={TrainingFrontPage} />
    </Switch>
  );
};

export default UnAuthContent;
