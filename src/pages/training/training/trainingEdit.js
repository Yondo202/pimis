import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import { useParams } from 'react-router'
import FileCardAdd from 'pages/attachments/fileCardAdd'
import { Transition, animated } from 'react-spring/renderprops'
import ChevronDownSVG from 'assets/svgComponents/chevronDownSVG'

export default function TrainingEdit() {
   const [training, setTraining] = useState(initialState)

   const handleInput = (key, value) => setTraining(prev => ({ ...prev, [key]: value }))

   const [trainingId, setTrainingId] = useState(useParams().id)

   const AlertCtx = useContext(AlertContext)

   useEffect(() => {
      if (trainingId !== null && trainingId !== undefined) {
         axios.get(`trainings/${trainingId}`, {
            headers: { Authorization: getLoggedUserToken() },
         }).then(res => {
            console.log(res)
            setTraining(res.data.data)
         }).catch(err => {
            console.error(err.response)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Сургалтыг татаж чадсангүй.' })
         })
      }
   }, [])

   const handleSubmit = () => {
      if (trainingId !== null && trainingId !== undefined) {
         axios.put(`training/${trainingId}`, training, {
            headers: { Authorization: getLoggedUserToken() },
         }).then(res => {
            console.log(res)
            setTraining(res.data.data)
         }).catch(err => {
            console.error(err.response)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Сургалт үүсгэж чадсангүй.' })
         })
      }
      else {
         axios.post('training', training, {
            headers: { Authorization: getLoggedUserToken() },
         }).then(res => {
            console.log(res)
            setTraining(res.data.data)
            setTrainingId(res.data.data.id)
         }).catch(err => {
            console.error(err.response)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Сургалт засаж чадсангүй.' })
         })
      }
   }

   return (
      <div className="tw-text-gray-700 tw-text-sm tw-flex tw-justify-center tw-p-4">
         <div className="tw-rounded tw-shadow tw-bg-white tw-max-w-5xl tw-w-full">
            <div className="tw-text-center tw-p-2 tw-my-8 tw-text-lg tw-font-semibold">
               Сургалтын мэдээлэл оруулах
            </div>

            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-place-items-start tw-p-2">
               <FormElement label="Сургалтын нэр" value={training.training_name} key="training_name" onChange={handleInput} />

               <FormElement label="Сургалтын агуулга">
                  <FileCardAdd />
               </FormElement>

               <FormElement label="Сургалтын төрөл">
                  <SelectChild options={trainingTypes} />
               </FormElement>

               <FormElement label="Сургалтын хэлбэр">

               </FormElement>

               <FormElement label="Сургалт эхлэх өдөр" value={training.start_date} key="start_date" onChange={handleInput} />

               <FormElement label="Сургалт дуусах өдөр" value={training.end_date} key="end_date" onChange={handleInput} />

               <FormElement label="Сургалт дуусах өдөр" value={training.end_date} key="end_date" onChange={handleInput} />

               <FormElement label="Сургалтын цаг">

               </FormElement>

               <FormElement label="Сургалт зохион байгуулагч байгууллага" value={training.organizer} key="organizer" onChange={handleInput} />

               <FormElement label="Байршил, сургалт зохион байгуулагдах хаяг" value={training.location} key="location" onChange={handleInput} />

               <FormElement label="Оролцогчдын тоо" value={training.participant_number} key="participant_number" onChange={handleInput} />

               <FormElement label="Сургалтын цар хүрээ">

               </FormElement>
            </div>

            <div className="tw-flex tw-justify-end">
               <button className="tw-rounded tw-bg-blue-700 active:tw-bg-blue-600 tw-transition-colors hover:tw-shadow tw-py-2 tw-px-6 tw-text-white tw-font-medium tw-my-6 focus:tw-outline-none tw-mr-8" onClick={handleSubmit}>
                  Хадгалах
               </button>
            </div>
         </div>
      </div>
   )
}

const initialState = {
   training_name: null,
   module_file: null,
   training_type: null,
   training_method: null,
   start_date: null,
   end_date: null,
   start_time: null,
   end_time: null,
   organizer: null,
   location: null,
   participant_number: null,
   scope: null,
}

const FormElement = (props) => (
   <div className="tw-max-w-md">
      <div className="tw-font-medium tw-p-2">
         {props.label}
      </div>

      {props.children
         ? props.children
         : <input className="focus:tw-outline-none focus:tw-ring-2 tw-ring-blue-400 tw-border tw-border-gray-400 tw-rounded tw-px-2 tw-py-1 tw-transition-colors" type={props.type ?? 'text'} style={props.width ? { width: props.width } : {}} value={props.value ?? ''} onChange={e => props.onChange(props.key, e.target.value)} />
      }
   </div>
)

const SelectChild = ({ options, value, key, handleInput }) => {
   const [dropOpen, setDropOpen] = useState(false)
   const [otherSelected, setOtherSelected] = useState(false)

   const handleSelect = (option) => {
      handleInput(key, option)
   }

   return (
      <div className="">
         <button className="tw-w-40 tw-h-7 tw-rounded focus:tw-outline-none hover:tw-shadow tw-border tw-border-gray-400 tw-flex tw-items-center" onClick={() => setDropOpen(prev => !prev)}>
            {trainingTypes[value]}
            <ChevronDownSVG className="tw-w-4 tw-h-4 tw-ml-auto" />
         </button>

         <Transition
            items={dropOpen}
            from={{}}
            enter={{}}
            leave={{}}>
            {item => item && (anims =>
               <animated.div className="" style={anims}>
                  {[...options, 'Бусад'].map(option =>
                     <div className="" key={option} onClick={() => handleSelect(option)}>
                        {option}
                     </div>
                  )}
               </animated.div>
            )}
            {otherSelected &&
               <div className="">
                  <span className="">Бусад</span>
                  <input className="" type="text" value={value} onChange={e => handleInput(key, e.target.value)} />
               </div>
            }
         </Transition>
      </div>
   )
}

const trainingTypes = {
   general: 'Ерөнхий сургалт',
   request: 'Захиалгат сургалт',
}