import HelpPopup from 'components/help_popup/helpPopup'
import AlertContext from 'components/utilities/alertContext'
import UrgudulContext from 'components/utilities/urgudulContext'
import React, { useContext, useState } from 'react'
import { containerClass, UrgudulHeader, SaveButton } from './page1'
import FormRichText from 'components/urgudul_components/formRichText'
import FormInline from 'components/urgudul_components/formInline'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import { checkInvalid } from './page3'
import LoadFromOtherProject from '../loadFromOtherProject'

export default function UrgudulPage4({ projects = [] }) {
   const [form, setForm] = useState(initialState)
   const [validate, setValidate] = useState(false)

   const handleInput = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

   const handleInputFormat = (key, values) => setForm(prev => ({ ...prev, [key]: values.value }))

   const UrgudulCtx = useContext(UrgudulContext)
   const AlertCtx = useContext(AlertContext)
   const history = useHistory()

   const projectId = UrgudulCtx.data.id

   useEffect(() => {
      const temp = {}
      Object.keys(initialState).forEach(key => {
         const value = UrgudulCtx.data[key]
         if (value !== undefined && value !== null) {
            temp[key] = value
         }
      })
      setForm(prev => ({ ...prev, ...temp }))
   }, [projectId])

   const handleSubmit = () => {
      setValidate(true)
      const allValid = Object.keys(initialState).every(key => !checkInvalid(form[key], key !== 'project_duration' && 'quill'))
      if (!allValid) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Талбаруудыг гүйцэт бөглөнө үү.' })
         return
      }

      if (projectId === undefined || projectId === null) {
         AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Өргөдлийн маягт үүсээгүй байна. Та маягтаа сонгох юм уу, үүсгэнэ үү.' })
         history.push('/urgudul/1')
      }
      axios.put(`projects/${projectId}`, form, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         UrgudulCtx.setData(prev => ({ ...prev, ...res.data.data }))
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Өргөдлийг хадгаллаа.' })
         history.push('/urgudul/5')
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа, хадгалж чадсангүй.' })
      })
   }

   const otherProjects = projects.filter(project => project.id !== UrgudulCtx.data.id)

   const loadFromOtherProjectDirectors = (id) => {
      axios.get(`projects/${id}`, {
         headers: { Authorization: getLoggedUserToken() },
      }).then(res => {
         const projectToLoad = res.data.data
         const temp = {}
         Object.keys(initialState).forEach(key => {
            const value = projectToLoad[key]
            if (value !== undefined && value !== null) {
               temp[key] = value
            }
         })
         setForm({ ...initialState, ...temp })
         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Сонгосон өргөдлөөс мэдээллийг нь орууллаа.' })
      }).catch(err => {
         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Сонгосон өргөдлийн мэдээллийг татаж чадсангүй.' })
      })
   }

   return (
      <div className={containerClass}>
         <UrgudulHeader
            label="Төслийн мэдээлэл"
            LoadFromOtherProject={<LoadFromOtherProject classAppend="tw-absolute tw-right-4" otherProjects={otherProjects} loadFromOtherProject={loadFromOtherProjectDirectors} />}
         />

         <div className="tw-px-2">
            <FormInline label="Төслийг хэрэгжүүлэх нийт хугацаа" type="numberFormat" formats={{ format: '# сар' }} value={form.project_duration} name="project_duration" setter={handleInputFormat} classAppend="tw-w-64" classInput="tw-w-40"
               HelpPopup={<HelpPopup main="Сараар, дээд тал нь 9 сар байна." />}
               invalid={validate && checkInvalid(form.project_duration)}
            />

            <FormRichText
               label="Экспортын бүтээгдэхүүн, экспортын зорилтот орны зах зээлийн мэдээлэл"
               HelpPopup={<HelpPopup classAppend="tw-ml-2" main="Ямар бүтээгдэхүүнийг аль орны зах зээлд гаргах талаар товч танилцуулна. Уг зах зээлийн талаарх судалгаа хийгдсэн эсэх, зах зээлийн мэдээлэл, өрсөлдөгчид, бэлтгэн нийлүүлэлтийн сүлжээний талаар судалгаа хийгдсэн бол энд дурдана уу." />}
               modules="full"
               value={form.target_market}
               name="target_market"
               setter={handleInput}
               classAppend="tw-pl-2"
               invalid={validate && checkInvalid(form.target_market, 'quill')}
            />

            <FormRichText
               label="Тодорхойлсон асуудлууд"
               HelpPopup={<HelpPopup classAppend="tw-ml-2" main="Экспортын зорилтот орны зах зээлд өөрийн бүтээгдэхүүнээ борлуулахад ямар асуудлуудыг урьдчилж шийдвэрлэх шаардлагатай байгааг бичнэ үү." />}
               modules="full"
               value={form.defined_problems}
               name="defined_problems"
               setter={handleInput}
               classAppend="tw-pl-2"
               invalid={validate && checkInvalid(form.defined_problems, 'quill')}
            />
         </div>

         <div className="tw-flex tw-justify-end">
            <SaveButton buttonAppend="tw-m-6" onClick={handleSubmit} />
         </div>
      </div>
   )
}

const initialState = {
   project_duration: null,
   target_market: null,
   defined_problems: null,
}
