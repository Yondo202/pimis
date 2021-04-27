import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Layout from './Layout';
import messages from '../../components/admin/left_menu/messages';
import '../../components/admin/left_menu/styles/AppAdmin.scss';
import DocumentTitle from 'containers/document/DocumentTitle';
import { Switch, Route } from "react-router-dom";
import { motion } from "framer-motion";

function Main() {
  DocumentTitle("EDP - Админ");
  const [locale, setLocale] = useState('en');

  return (
    <Switch>
      <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Route path="/" >
          <IntlProvider locale={locale} messages={messages[locale]}>
            <Layout setLocale={setLocale} />
          </IntlProvider>
      </Route>
      </motion.div>
    </Switch>
    
  );
}

export default Main;
