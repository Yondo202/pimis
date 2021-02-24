import React, { useContext, useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import './style.css'
import PrintSVG from 'assets/svgComponents/printSVG'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import Row from './row'
import RowImage from './rowImage'
import RowHtml from './rowHtml'
import { districts } from 'pages/urgudul/urgudul_a/form_a_1'


const labels = {
    front: {
        project_type: 'Өргөдлийн төрөл:',
        company_name: 'Өргөдөл гаргагч ААН нэр',
        project_name: 'Төслийн нэр',
    },
    company: {
        company_name: 'Аж ахуйн нэгжийн нэр',
        representative_name: 'Аж ахуйн нэгжийг төлөөлөх албан тушаалтны овог нэр',
        representative_position: 'Төлөөлөгчийн албан тушаал',
        registered_date: 'ААН бүртгүүлсэн огноо',
        registration_number: 'Регистерийн дугаар',
        official_address: 'Албан ёсны хаяг',
        locationId: 'Хот/аймаг',
        districtId: 'Дүүрэг',
        telephone: 'Албан газрын утас',
        handphone: 'Гар утас',
        email: 'Имэйл хаяг',
        website: 'Вэбсайт',
        company_size: 'Компаний хэмжээ',
        project_plan: 'Төслийн төлөвлөлт, гүйцэтгэл дэх оролцоо',
        business_sectorId: 'Салбар',
        foreign_invested: 'Гадаад хөрөнгө оруулалттай эсэх',
        invested_countryid: 'Аль улсаас гадаад хөрөнгө оруулалдаг болох нь',
        investment_percent: 'Гадаад хөрөнгө оруулалтын эзлэх хувь',
    },
    clusters: {
        company_name: 'Кластерын гишүүн аж ахуйн нэгж',
        representative_name: 'Төлөөлөх албан тушаалтны нэр',
        representative_phone: 'Төлөөлөгчийн утас',
        representative_email: 'Төлөөлөгчийн имэйл',
        business_sectorId: 'Салбар',
        company_size: 'Аж ахуйн нэгжийн хэмжээ',
        support_recipient: 'Манай дэмжлэг хүртэгч мөн эсэх',
        project_contribution: 'Төслийн төлөвлөлт, гүйцэтгэлд оруулах хувь нэмэр',
        attachedFiles: 'Хавсаргасан файлууд',
    },
    directors: {
        position: 'Албан тушаал',
        director_name: 'Төлөөлөх албан тушаалтны нэр',
        employed_date: 'Тухайн байгууллагад ажиллаж эхэлсэн он сар өдөр',
        project_contribution: 'Энэхүү төслийн төлөвлөлт, гүйцэтгэлд оруулах хувь нэмэр',
    },
    a3_4: {
        applicant_overview: {
            cluster: 'Өргөдөл гаргагч кластерын хувьд кластерын хамтрагч талуудын товч танилцуулга',
            company: 'Өргөдөл гаргагч аж ахуй нэгжийн товч танилцуулга',
        },
        applicant_experience: {
            cluster: 'Кластерын төслийг хэрэгжүүлэх техникийн туршлага',
            company: 'ААН-ийн төслийг хэрэгжүүлэх техникийн туршлага',
        },
    },
    b: {
        project_duration: 'Төслийн үргэлжлэх хугацаа',
        project_start: 'Төслийн эхлэх хугацаа',
        project_end: 'Төслийн дуусах хугацаа',
        project_introduction: 'Төслийн танилцуулга',
        preperation: 'Бэлтгэл ажил',
        identified_problems: 'Тодорхойлсон асуудлууд',
        suggested_solutions: 'Санал болгож буй шийдэл',
        expected_result: 'Төлөвлөсөн үйл ажиллагаа болон зорилтот хүлээгдэж буй үр дүн',
    },
    activities: {
        activity: {
            cluster: 'Кластераар хийх үйл ажиллагаа',
            company: 'Аж ахуйн нэгжээр хийх үйл ажиллагаа',
        },
        budget_cost: 'Үйл ажиллагааны төсөвт зардал, доллароор',
    },
    benefit: {
        sales_growth: 'Борлуулалтын өсөлт',
        export_growth: 'Экспортын өсөлт',
        profit_growth: 'Ашгийн өсөлт',
        efficiency_growth: 'Бүтээмжийн өсөлт',
        workplace_growth: 'Ажлын байрны өсөлт',
        growths_explanation: 'Төслийн үр ашгийн талаар',
        assumptions: 'Таамаглал',
    },
    exportDatas: {
        sales: 'Борлуулалт',
        fullTime_workplace: 'Ажлын байр',
        productivity: 'Бүтээмж',
        export_details: 'Экспортын задаргаа',
    },
    noticeClusters: {
        companyId: 'Аж ахуйн нэгжийн нэр',
        representative_positionId: 'Албан тушаал',
        representative_name: 'Овог нэр',
        representative_signature: 'Гарын үсэг',
        submitDate: 'Огноо',
    },
    noticeCompany: {
        representative_positionId: 'Албан тушаал',
        representative_name: 'Овог нэр',
        representative_signature: 'Гарын үсэг',
        submitDate: 'Огноо',
    },
    e: {
        confirmed: 'Өргөдлийн маягт баталгаажсан эсэх',
    },
}

const companySizes = ['Бичил', 'Жижиг', 'Дунд']

export default function UrgudulPreview(props) {
    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const [project, setProject] = useState({})

    const AlertCtx = useContext(AlertContext)

    useEffect(() => {
        props.id &&
            axios.get(`projects/${props.id}`, {
                headers: { 'Authorization': getLoggedUserToken() }
            }).then(res => {
                console.log(res.data)
                setProject(res.data.data)
                AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Маягтын мэдээллийг амжилттай уншлаа.' })
            }).catch(err => {
                console.log(err.response?.data)
                AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Маягтын мэдээллийг уншиж чадсангүй.' })
            })
    }, [])

    const isCluster = project.project_type === 1 || false
    const type = isCluster ? 'cluster' : 'company'

    const [occupations, setOccupations] = useState([])

    useEffect(() => {
        axios.get('occupations')
            .then(res => {
                console.log(res.data)
                setOccupations(res.data.data)
            })
        axios.get('business-sector')
            .then(res => {
                console.log(res.data)
                setSectors(res.data.data)
            })
        axios.get('locations')
            .then(res => {
                console.log(res.data)
                setLocations(res.data.data)
            })
        axios.get('countries')
            .then(res => {
                console.log(res.data)
                setCountries(res.data.data)
            })
    }, [])

    const getOccupationName = (id) => occupations.filter(obj => obj.id === id)[0]?.description_mon

    const getCompanyName = (id) => project.clusters.filter(obj => obj.id === id)[0]?.company_name

    const [sectors, setSectors] = useState([])

    const getSectorName = (id) => sectors.filter(obj => obj.id === id)[0]?.bdescription_mon

    const [locations, setLocations] = useState([])

    const getLocationName = (id) => locations.filter(obj => obj.id === id)[0]?.description_mon

    const getDistrictName = (id) => districts.filter(obj => obj.id === id)[0]?.description_mon

    const [countries, setCountries] = useState([])

    const getCountryName = (id) => countries.filter(obj => obj.id === id)[0]?.description_mon

    return (
        <div className="tw-text-sm tw-text-gray-700">
            <button className="tw-flex tw-items-center tw-bg-blue-500 tw-text-white tw-py-1 tw-px-2 tw-rounded-md hover:tw-shadow-md active:tw-bg-blue-600 focus:tw-outline-none" onClick={handlePrint}>
                <span className="tw-text-sm">Хэвлэх болон PDF-ээр татах</span>
                <PrintSVG className="tw-w-5 tw-h-5 tw-ml-1" />
            </button>

            <div className="preview-container" ref={componentRef}>
                <div className="tw-text-lg text-center tw-font-medium">
                    Түншлэлийн дэмжлэг хүсэх өргөдлийн маягт
                </div>
                <Row label={labels.front.project_type} value={project.project_type === 1 ? 'Кластер' : (project.project_type === 0 && 'Аж ахуйн нэгж')} />
                <Row label={labels.front.company_name} value={project.company_name} />
                <Row label={labels.front.project_name} value={project.project_name} />

                <div className="tw-text-base tw-p-2 tw-pt-4 tw-font-medium">
                    A1 - Өргөдөл гаргагч
                </div>
                <Row label={labels.company.company_name} value={project.company?.company_name} />
                <Row label={labels.company.representative_name} value={project.company?.representative_name} />
                <Row label={labels.company.representative_position} value={project.company?.representative_position} />
                <Row label={labels.company.registered_date} value={project.company?.registered_date} />
                <Row label={labels.company.registration_number} value={project.company?.registration_number} />
                <Row label={labels.company.official_address} value={project.company?.official_address} />
                <Row label={labels.company.locationId} value={getLocationName(project.company?.locationId)} />
                {project.company?.locationId === 39 &&
                    <Row label={labels.company.districtId} value={getDistrictName(project.company?.districtId)} />
                }
                <Row label={labels.company.telephone} value={project.company?.telephone} />
                <Row label={labels.company.handphone} value={project.company?.handphone} />
                <Row label={labels.company.email} value={project.company?.email} />
                <Row label={labels.company.website} value={project.company?.website} />
                <Row label={labels.company.company_size} value={companySizes[project.company?.company_size]} />
                <Row label={labels.company.business_sectorId} value={getSectorName(project.company?.business_sectorId)} />
                <Row label={labels.company.foreign_invested} value={project.company?.foreign_invested ? 'Тийм' : 'Үгүй'} />
                {project.company?.foreign_invested === 1 &&
                    <>
                        <Row label={labels.company.invested_countryid} value={getCountryName(project.company?.invested_countryid)} />
                        <Row label={labels.company.investment_percent} value={project.company?.investment_percent + '%'} />
                    </>
                }
                <RowHtml label={labels.company.project_plan} html={project.company?.project_plan} />

                <div className="tw-text-base tw-p-2 tw-pt-4 tw-font-medium">
                    A2 - Кластерын гишүүн байгууллагууд
                </div>
                {isCluster ?
                    project.clusters?.map((item, i) =>
                        <>
                            <Row label={labels.clusters.company_name} value={item.company_name} />
                            <Row label={labels.clusters.representative_name} value={item.representative_name} />
                            <Row label={labels.clusters.representative_phone} value={item.representative_phone} />
                            <Row label={labels.clusters.representative_email} value={item.representative_email} />
                            <Row label={labels.clusters.business_sectorId} value={getSectorName(item.business_sectorId)} />
                            <Row label={labels.clusters.company_size} value={companySizes[item.company_size]} />
                            <Row label={labels.clusters.support_recipient} value={item.support_recipient ? 'Тийм' : 'Үгүй'} />
                            <RowHtml label={labels.clusters.project_contribution} html={item.project_contribution} />
                            <Row label={labels.clusters.attachedFiles} value={item.attachedFiles[0]?.name} />
                        </>
                    ) :
                    project.directors?.map((item, i) =>
                        <>
                            <Row label={labels.directors.position} value={getOccupationName(item.position)} />
                            <Row label={labels.directors.director_name} value={item.director_name} />
                            <Row label={labels.directors.employed_date} value={item.employed_date} />
                            <RowHtml label={labels.directors.project_contribution} html={item.project_contribution} />
                        </>
                    )
                }

                <div className="tw-text-base tw-p-2 tw-pt-4 tw-font-medium">
                    A3 - Товч танилцуулга
                </div>
                <RowHtml label={labels.a3_4.applicant_overview[type]} html={project.applicant_overview} />

                <div className="tw-text-base tw-p-2 tw-pt-4 tw-font-medium">
                    A4 - Техникийн туршлага
                </div>
                <RowHtml label={labels.a3_4.applicant_experience[type]} html={project.applicant_experience} />

                <div className="tw-text-base tw-p-2 tw-pt-4 tw-font-medium">
                    B - Төслийн задаргаа
                </div>
                <Row label={labels.b.project_duration} value={project.project_duration} />
                <Row label={labels.b.project_start} value={project.project_start} />
                <Row label={labels.b.project_end} value={project.project_end} />
                <RowHtml label={labels.b.project_introduction} html={project.project_introduction} />
                <RowHtml label={labels.b.preperation} html={project.preperation} />
                <RowHtml label={labels.b.identified_problems} html={project.identified_problems} />
                <RowHtml label={labels.b.suggested_solutions} html={project.suggested_solutions} />
                <RowHtml label={labels.b.expected_result} html={project.expected_result} />

                <div className="tw-text-base tw-p-2 tw-pt-4 tw-font-medium">
                    B6 - үйл ажиллагаа
                </div>
                {project.activities?.map((item, i) =>
                    <>
                        <RowHtml label={labels.activities.activity[type]} html={item.activity} />
                        <Row label={labels.activities.budget_cost} value={item.budget_cost} />
                    </>
                )}

                <div className="tw-text-base tw-p-2 tw-pt-4 tw-font-medium">
                    B7 - Төслийн үр ашгийн талаар
                </div>
                {Object.entries(labels.benefit).filter(([key, value]) => key !== 'growths_explanation' && key !== 'assumptions').map(([key, value]) =>
                    <Row label={value} value={project.benefit?.[key] + '%'} key={key} />
                )}
                <RowHtml label={labels.benefit.growths_explanation} html={project.benefit?.growths_explanation} />
                <RowHtml label={labels.benefit.assumptions} html={project.benefit?.assumptions} />

                <div className="tw-text-base tw-p-2 tw-pt-4 tw-font-medium">
                    B8 - Төслийн тооцоолол
                </div>
                {'Экспортын хүснэгт'}

                <div className="tw-text-base tw-p-2 tw-pt-4 tw-font-medium">
                    Мэдэгдэл
                </div>
                {isCluster ?
                    project.noticeClusters?.map((item, i) =>
                        <>
                            <Row label={labels.noticeClusters.companyId} value={getCompanyName(item.id)} />
                            <Row label={labels.noticeClusters.representative_positionId} value={getOccupationName(item.id)} />
                            <Row label={labels.noticeClusters.representative_name} value={item.representative_name} />
                            <RowImage label={labels.noticeClusters.representative_signature} src={item.representative_signature} />
                            <Row label={labels.noticeClusters.submitDate} value={item.submitDate} />
                        </>
                    ) :
                    project.noticeCompany?.map((item, i) =>
                        <>
                            <Row label={labels.noticeCompany.representative_positionId} value={getOccupationName(item.id)} />
                            <Row label={labels.noticeCompany.representative_name} value={item.representative_name} />
                            <RowImage label={labels.noticeCompany.representative_signature} src={item.representative_signature} />
                            <Row label={labels.noticeCompany.submitDate} value={item.submitDate} />
                        </>
                    )
                }

                <div className="tw-text-base tw-p-2 tw-pt-4 tw-font-medium">
                    Шалгах хуудас
                </div>
                <Row label={labels.e.confirmed} value={project.value} />

                <div className="tw-text-center tw-text-base tw-p-2 tw-pt-4">
                    {project.createdAt?.slice(0, 10).replaceAll('-', '.') || '   '}
                </div>
            </div>
        </div>
    )
}