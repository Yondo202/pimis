import React from "react";
import { Switch, Route } from "react-router-dom";
import { motion } from "framer-motion";
import HomeLogin from "./components/home/homeLogin";
import MainForm from "./containers/checkComp/MainForm";
import SignUp from "./components/signup/Signup";
import ResetPassword from "./components/home/ResetPassword";

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
      <Route path="/signup">
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <SignUp />
        </motion.div>
      </Route>
      <Route path="/changepassword/:id" children={<ResetPassword />}>
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ResetPassword />
        </motion.div>
      </Route>
    </Switch>
  );
};

export default UnAuthContent;
