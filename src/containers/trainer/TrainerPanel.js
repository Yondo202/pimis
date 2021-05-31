import Main from 'components/admin/left_menu/TopMain'
import TrainerRoute from 'containers/trainer/trainerRoute'
import React, { useEffect, useState } from 'react'
import TrainerSidebar from '../../components/trainer/trainerSidebar'
import { IntlProvider } from 'react-intl'
import messages from 'components/admin/left_menu/messages'
import 'components/admin/left_menu/styles/AppAdmin.scss'
import { AdminApp } from "containers/admin/Layout"

export default function TrainerPanel() {
   useEffect(() => {
      document.title = 'EDP - Сургалт зохион байгуулагч'
   }, [])

   const [rtl, setRtl] = useState(false);
   const [collapsed, setCollapsed] = useState(false);
   const [image, setImage] = useState(false);
   const [toggled, setToggled] = useState(false);
   const [locale, setLocale] = useState('en');

   const handleCollapsedChange = (checked) => { setCollapsed(checked); };
   const handleToggleSidebar = (value) => { setToggled(value); };

   return (
      <AdminApp className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
         <IntlProvider locale={locale} messages={messages[locale]}>
            <div className="MainParent">
               <TrainerSidebar image={image} collapsed={collapsed} rtl={rtl} toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
            </div>
         </IntlProvider>

         <div className="container-fluid ContentPar">
            <Main handleCollapsedChange={handleCollapsedChange} />

            <div className="itemsPar2">
               <TrainerRoute />
            </div>
         </div>
      </AdminApp>
   )
}
