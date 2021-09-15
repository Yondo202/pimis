import ModalWindow from 'components/modal_window/modalWindow'
import React, { useContext, useState } from 'react'
import { Switch, useLocation, Route } from 'react-router'
import { useTransition, animated } from 'react-spring'
import LaboratoriesList from './laboratoriesList'
import LaboratoryEdit from './laboratoryEdit'
import axios from 'axiosbase'
import AlertContext from 'components/utilities/alertContext'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'

export default function LaboratoryNavigator() {
   const AlertCtx = useContext(AlertContext)

   const location = useLocation()

   const transitionsPages = useTransition(location, location => location.pathname, {
      from: { opacity: 0, transform: location.pathname === '/laboratories' ? 'translateX(-320px)' : 'translateX(320px)' },
      enter: { opacity: 1, transform: 'translateX(0)' },
      leave: { opacity: 0, transform: location.pathname === '/laboratories' ? 'translateX(320px)' : 'translateX(-320px)' },
      initial: { opacity: 1 },
      config: { tension: 300, clamp: true },
   })

   const [modalOpen, setModalOpen] = useState(false)

   const [modalForm, setModalForm] = useState({
      labId: null,
      lab_name: null,
      year: null,
      count: null
   })

   const handleInputModal = (key, value) => setModalForm(prev => ({ ...prev, [key]: value }))

   const [refetchToggle, setRefetchToggle] = useState(false)

   const handleSubmit = () => {
      if (modalForm.labId === null || modalForm.labId === undefined) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Лаборатор сонгоогүй байна.' })
         return
      }
      axios.put(`laboratories/${modalForm.labId}/add`, modalForm, {
         headers: { Authorization: getLoggedUserToken() }
      }).then(res => {
         setRefetchToggle(prev => !prev)
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Чанарын баталгаажуулалтын тоог нэмлээ.' })
         setModalForm({
            labId: null,
            lab_name: null,
            year: null,
            count: null
         })
         setModalOpen(false)
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Чанарын баталгаажуулалтын тоог нэмж чадсангүй.' })
      })
   }

   return <>
      {transitionsPages.map(({ item, props, key }) =>
         <animated.div className="tw-relative" key={key} style={props}>
            <Switch location={item}>
               <Route exact path="/laboratories">
                  <LaboratoriesList setModalOpen={setModalOpen} setter={setModalForm} refetchToggle={refetchToggle} />
               </Route>
               <Route exact path="/laboratories/id/">
                  <LaboratoryEdit />
               </Route>
               <Route path="/laboratories/id/:id">
                  <LaboratoryEdit />
               </Route>
            </Switch>
         </animated.div>
      )}
      <ModalWindow modalOpen={modalOpen} setModalOpen={setModalOpen} modalAppend="tw-max-w-sm tw-text-13px">
         <div className="tw-mt-2 tw-px-4 tw-text-center tw-text-sm tw-max">
            "<span className="tw-font-medium">{modalForm.lab_name}</span>" лабораторын өгсөн чанарын баталгаажуулалтын тоог нэмэгдүүлэх
         </div>
         <div className="tw-mt-6 tw-flex tw-justify-between tw-items-center tw-pl-4 tw-pr-20">
            <span className="tw-mr-2">
               Баталгаажуулалт өгсөн он:
            </span>
            <input className={classInput} type="number" value={modalForm.year ?? ''} onChange={e => handleInputModal('year', e.target.value)} />
         </div>
         <div className="tw-mt-2 tw-flex tw-justify-between tw-items-center tw-pl-4 tw-pr-20">
            <span className="tw-mr-2">
               Нэмэх баталгаажуулалтын тоо:
            </span>
            <input className={classInput} type="number" value={modalForm.count ?? ''} onChange={e => handleInputModal('count', e.target.value)} />
         </div>
         <div className="tw-flex tw-justify-center">
            <button className="tw-py-1.5 tw-px-6 tw-bg-gray-600 tw-text-white tw-rounded focus:tw-outline-none active:tw-bg-gray-700 tw-transition-colors hover:tw-shadow-md tw-text-13px tw-mt-6 tw-mb-3" onClick={handleSubmit}>
               Нэмэх
            </button>
         </div>
      </ModalWindow>
   </>
}

const classInput = 'focus:tw-outline-none focus:tw-ring-2 tw-ring-blue-400 tw-border tw-border-gray-400 tw-rounded tw-px-2 tw-py-1 tw-transition-colors tw-bg-transparent tw-w-24'
