import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import { useHistory, useParams } from 'react-router'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'
import { FormElement } from 'pages/training/training_admin/trainingEdit'
import AlertContext from 'components/utilities/alertContext'

export default function TrainerOrganizationEdit() {
   const [organization, setOrganization] = useState(initialState)

   const handleInput = (key, value) => setOrganization(prev => ({ ...prev, [key]: value }))

   const [trainerOrgId, setTrainerOrgId] = useState(useParams().id)

   const AlertCtx = useContext(AlertContext)

   useEffect(() => {
      if (trainerOrgId !== null && trainerOrgId !== undefined) {
         axios.get(`trainings/organizations/${trainerOrgId}`, {
            headers: { Authorization: getLoggedUserToken() },
         }).then(res => {
            setOrganization(res.data.data)
         })
      }
   }, [])

   const history = useHistory()

   const handleSubmit = () => {
      if (trainerOrgId !== null && trainerOrgId !== undefined) {
         axios.put(`trainings/organizations/${trainerOrgId}`, organization, {
            headers: { Authorization: getLoggedUserToken() },
         }).then(res => {
            setOrganization(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Байгууллагын мэдээллийг шинэчиллээ.' })
            history.push('/trainer-organizations')
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Байгууллагын мэдээллийг засаж чадсангүй.' })
         })
      }
      else {
         axios.post('trainings/organizations', organization, {
            headers: { Authorization: getLoggedUserToken() },
         }).then(res => {
            setOrganization(res.data.data)
            setTrainerOrgId(res.data.data.id)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Байгууллагын мэдээлэл нэмэгдлээ.' })
            history.push('/trainer-organizations')
         }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Байгууллагын мэдээлэл нэмж чадсангүй.' })
         })
      }
   }

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-absolute tw-w-full">
         <button className="tw-flex tw-items-center tw-pl-2 tw-pr-4 tw-py-0.5 tw-rounded tw-bg-gray-600 tw-text-white focus:tw-outline-none active:tw-bg-gray-700 hover:tw-shadow-md tw-transition-colors tw-uppercase tw-text-13px" onClick={() => history.push('/trainer-organizations')}>
            <ChevronDownSVG className="tw-w-4 tw-h-4 tw-transform tw-rotate-90 tw-mr-1" />
            Буцах
         </button>

         <div className="tw-rounded tw-shadow-md tw-bg-white tw-max-w-5xl tw-w-full tw-pt-8 tw-mt-6">
            <div className="tw-text-center tw-p-2 tw-mb-8 tw-text-lg tw-font-medium">
               Cургалтын байгууллагын мэдээлэл оруулах
            </div>

            <div className="tw-flex tw-flex-col tw-w-full">
               <FormElement label="Байгууллагын нэр" value={organization.organization_name} keyName="organization_name" onChange={handleInput} />

               <FormElement label="Улсын бүртгэлийн дугаар" type="number" value={organization.registration_number} keyName="registration_number" onChange={handleInput} width={200} />
            </div>

            <div className="tw-flex tw-justify-center">
               <button className="tw-rounded tw-bg-gray-600 active:tw-bg-gray-700 tw-transition-colors hover:tw-shadow-md tw-py-1.5 tw-px-6 tw-text-white tw-font-medium tw-my-6 focus:tw-outline-none tw-text-13px" onClick={handleSubmit}>
                  Хадгалах
               </button>
            </div>
         </div>
      </div>
   )
}

const initialState = {
   organization_name: null,
   registration_number: null,
}
