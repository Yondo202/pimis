import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
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
import { useParams } from 'react-router-dom'
import { sortDates } from 'pages/urgudul/urgudul_b/form_b_8'


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
        attachedFiles: 'Кластерийн хамтын ажиллагааны гэрээ файл',
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

    const params = useParams()

    useEffect(() => {
        if (props.id) {
            axios.get(`projects/${props.id}`, {
                headers: { 'Authorization': getLoggedUserToken() }
            }).then(res => {
                console.log(res.data)
                setProject(res.data.data)
            }).catch(err => {
                console.log(err.response?.data)
                AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Маягтын мэдээллийг уншиж чадсангүй.' })
            })
        } else if (params.id) {
            axios.get(`projects/${params.id}`, {
                headers: { 'Authorization': getLoggedUserToken() }
            }).then(res => {
                console.log(res.data)
                setProject(res.data.data)
            }).catch(err => {
                console.log(err.response?.data)
                AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Маягтын мэдээллийг уншиж чадсангүй.' })
            })
        } else if (props.project) {
            setProject(props.project)
        }
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
        axios.get('products')
            .then(res => {
                console.log(res.data)
                setProducts(res.data.data.docs)
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

    const dates = project.exportDatas?.sales ? sortDates(project.exportDatas?.sales) : []

    const exportSums = dates.reduce((acc, cur) => ({ ...acc, [cur]: null }), {})

    if (project.exportDatas?.export_details && project.exportDatas?.export_details?.length) {
        for (const country of project.exportDatas?.export_details) {
            if (country?.export_products && country?.export_products?.length) {
                for (const product of country?.export_products) {
                    Object.keys(exportSums).forEach(key => {
                        exportSums[key] = +exportSums[key] + +product[key]
                    })
                }
            }
        }
    }

    const [products, setProducts] = useState([])

    const getProductName = (id) => products.filter(obj => obj.id === id)[0]?.description_mon

    return (
        <div className="tw-text-sm tw-text-gray-700" id="urgudul-preview-page">
            <button className="tw-mb-4 tw-flex tw-items-center tw-bg-blue-800 tw-text-white tw-py-1 tw-px-5 tw-text-15px tw-rounded hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors" onClick={handlePrint}>
                <span className="tw-text-sm">Хэвлэх болон PDF-ээр татах</span>
                <PrintSVG className="tw-w-5 tw-h-5 tw-ml-2" />
            </button>

            <div className="preview-container" ref={componentRef}>
                <div className="tw-text-lg text-center tw-font-medium tw-p-4 tw-mt-2 tw-mb-4">
                    Түншлэлийн дэмжлэг хүсэх өргөдлийн маягт
                </div>

                <div className="no-break">
                    <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-font-medium tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800">
                        ID: {project.id}
                    </div>
                    <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400">
                        <Row label={labels.front.project_type} value={project.project_type === 1 ? 'Кластер' : (project.project_type === 0 && 'Аж ахуйн нэгж')} />
                        <Row label={labels.front.company_name} value={project.company_name} />
                        <Row label={labels.front.project_name} value={project.project_name} />
                    </div>
                </div>

                <div className="no-break">
                    <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-font-medium tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                        A1 - Өргөдөл гаргагч
                    </div>
                    <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400">
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
                    </div>
                </div>

                <div className="no-break">
                    <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-font-medium tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                        A2 - {isCluster ? 'Кластерын гишүүн байгууллагууд' : 'Аж ахуйн нэгжийг төлөөлөгчид'}
                    </div>
                    {isCluster ?
                        project.clusters?.map((item, i) =>
                            <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400" key={i}>
                                <Row label={labels.clusters.company_name} value={item.company_name} />
                                <Row label={labels.clusters.representative_name} value={item.representative_name} />
                                <Row label={labels.clusters.representative_phone} value={item.representative_phone} />
                                <Row label={labels.clusters.representative_email} value={item.representative_email} />
                                <Row label={labels.clusters.business_sectorId} value={getSectorName(item.business_sectorId)} />
                                <Row label={labels.clusters.company_size} value={companySizes[item.company_size]} />
                                <Row label={labels.clusters.support_recipient} value={item.support_recipient ? 'Тийм' : 'Үгүй'} />
                                <RowHtml label={labels.clusters.project_contribution} html={item.project_contribution} borderBottom={true} />
                                <Row label={labels.clusters.attachedFiles} value={item.attachedFiles[0]?.name} />
                            </div>
                        ) :
                        project.directors?.map((item, i) =>
                            <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400" key={i}>
                                <Row label={labels.directors.position} value={getOccupationName(item.position)} />
                                <Row label={labels.directors.director_name} value={item.director_name} />
                                <Row label={labels.directors.employed_date} value={item.employed_date} />
                                <RowHtml label={labels.directors.project_contribution} html={item.project_contribution} />
                            </div>
                        )
                    }
                </div>

                <div className="no-break">
                    <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-font-medium tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                        A3 - Товч танилцуулга
                    </div>
                    <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400">
                        <RowHtml label={labels.a3_4.applicant_overview[type]} html={project.applicant_overview} />
                    </div>
                </div>

                <div className="no-break">
                    <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-font-medium tw-bg-blue-900 tw-text-white tw-border tw-border-t-0 tw-border-gray-800">
                        A4 - Техникийн туршлага
                    </div>
                    <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400">
                        <RowHtml label={labels.a3_4.applicant_experience[type]} html={project.applicant_experience} />
                    </div>
                </div>

                <div className="no-break">
                    <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-font-medium tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                        B - Төслийн задаргаа
                    </div>
                    <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400" style={{ breakInside: 'avoid' }}>
                        <Row label={labels.b.project_duration} value={`${project.project_duration} сар`} />
                        <Row label={labels.b.project_start} value={project.project_start} />
                        <Row label={labels.b.project_end} value={project.project_end} />
                        <RowHtml label={labels.b.project_introduction} html={project.project_introduction} />
                        <RowHtml label={labels.b.preperation} html={project.preperation} />
                        <RowHtml label={labels.b.identified_problems} html={project.identified_problems} />
                        <RowHtml label={labels.b.suggested_solutions} html={project.suggested_solutions} />
                        <RowHtml label={labels.b.expected_result} html={project.expected_result} />
                    </div>
                </div>

                <div className="no-break">
                    <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-font-medium tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                        B6 - үйл ажиллагаа
                    </div>
                    {project.activities?.map((item, i) =>
                        <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400" key={i}>
                            <RowHtml label={labels.activities.activity[type]} html={item.activity} borderBottom={true} />
                            <Row label={labels.activities.budget_cost} value={item.budget_cost?.toLocaleString()} />
                        </div>
                    )}
                </div>

                <div className="no-break">
                    <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-font-medium tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                        B7 - Төслийн үр ашгийн талаар
                    </div>
                    <div className="tw-border tw-border-t-0 tw-border-gray-400">
                        {Object.entries(labels.benefit).filter(([key, value]) => key !== 'growths_explanation' && key !== 'assumptions').map(([key, value]) =>
                            <Row label={value} value={project.benefit?.[key]?.toLocaleString() + '%'} key={key} />
                        )}
                        <RowHtml label={labels.benefit.growths_explanation} html={project.benefit?.growths_explanation} />
                        <RowHtml label={labels.benefit.assumptions} html={project.benefit?.assumptions} />
                    </div>
                </div>

                <div className="no-break">
                    <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-font-medium tw-bg-blue-900 tw-text-white tw-border tw-border-b-0 tw-border-gray-800 tw-mt-8">
                        B8 - Төслийн тооцоолол
                    </div>
                    {Object.keys(project.exportDatas || {}).length > 0 ?
                        <table className="tw-border-collapse tw-table-auto tw-w-full">
                            <thead>
                                <tr>
                                    <th className="tw-border tw-border-gray-400"></th>
                                    {dates.map(date => {
                                        switch (date) {
                                            case 'submitDate':
                                                return <th className="tw-border tw-border-gray-400 tw-font-medium tw-text-center tw-px-0.5" key={date}>
                                                    {`${project.exportDatas?.submitDate?.year}-${project.exportDatas?.submitDate?.month}`}
                                                </th>
                                            case 'endDate':
                                                return <th className="tw-border tw-border-gray-400 tw-font-medium tw-text-center tw-px-0.5" key={date}>
                                                    {`${project.exportDatas?.endDate?.year ? project.exportDatas?.endDate?.year : ''}-${project.exportDatas?.endDate?.month ? project.exportDatas?.endDate?.month : ''}`}
                                                </th>
                                            default:
                                                return <th className="tw-border tw-border-gray-400 tw-font-medium tw-text-center tw-px-1" key={date}>
                                                    {date}
                                                </th>
                                        }
                                    })}
                                    <th className="tw-border tw-border-gray-400 tw-font-medium tw-text-center tw-px-1">Нэгж</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="tw-border tw-border-gray-400 tw-font-medium tw-px-1">Борлуулалт</td>
                                    {dates.map((item, i) =>
                                        <td className="tw-border tw-border-gray-400 tw-text-right tw-px-1" key={i}>{project.exportDatas?.sales?.[item]?.toLocaleString()}</td>
                                    )}
                                    <td className="tw-border tw-border-gray-400 tw-text-center tw-px-1">$</td>
                                </tr>
                                <tr>
                                    <td className="tw-border tw-border-gray-400 tw-font-medium tw-px-1">Ажлын байр</td>
                                    {dates.map((item, i) =>
                                        <td className="tw-border tw-border-gray-400 tw-text-right tw-px-1" key={i}>{project.exportDatas?.fullTime_workplace?.[item]?.toLocaleString()}</td>
                                    )}
                                    <td className="tw-border tw-border-gray-400 tw-text-center tw-px-1">Т/х</td>
                                </tr>
                                <tr>
                                    <td className="tw-border tw-border-gray-400 tw-font-medium tw-px-1">Бүтээмж</td>
                                    {dates.map((item, i) =>
                                        <td className="tw-border tw-border-gray-400 tw-text-right tw-px-1" key={i}>{project.exportDatas?.productivity?.[item]?.toLocaleString()}</td>
                                    )}
                                    <td className="tw-border tw-border-gray-400 tw-text-center tw-px-1">Т/х</td>
                                </tr>
                                <tr>
                                    <td className="tw-border tw-border-gray-400 tw-font-medium tw-px-1">Экспорт</td>
                                    {dates.map((item, i) =>
                                        <td className="tw-border tw-border-gray-400 tw-text-right tw-px-1" key={i}>{exportSums[item] !== 0 && exportSums[item]?.toLocaleString()}</td>
                                    )}
                                    <td className="tw-border tw-border-gray-400 tw-text-center tw-px-1">$</td>
                                </tr>
                                {project.exportDatas?.export_details?.map((country, i) =>
                                    <Fragment key={i}>
                                        <tr>
                                            <td className="tw-border tw-border-gray-400 tw-font-medium tw-px-1" colSpan={dates.length + 2}>{getCountryName(country?.countryId)} - улсад экспорт хийсэн бүтээгдэхүүнүүд</td>
                                        </tr>
                                        {country?.export_products?.map((product, j) =>
                                            <tr key={j}>
                                                <td className="tw-border tw-border-gray-400 tw-font-medium tw-px-1">{getProductName(product?.productId)}</td>
                                                {dates.map((item, k) =>
                                                    <td className="tw-border tw-border-gray-400 tw-text-right tw-px-1" key={k}>{product?.[item]?.toLocaleString()}</td>
                                                )}
                                                <td className="tw-border tw-border-gray-400 tw-text-center tw-px-1">$</td>
                                            </tr>
                                        )}
                                    </Fragment>
                                )}
                            </tbody>
                        </table>
                        :
                        <div className="tw-border tw-border-gray-400 tw-px-2 tw-py-4">
                            Төслийн тооцоолол хүснэгтийн мэдээлэл оруулаагүй байна.
                        </div>
                    }
                </div>

                <div className="no-break">
                    <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-font-medium tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                        D - Мэдэгдэл
                    </div>
                    {isCluster ?
                        project.noticeClusters?.map((item, i) =>
                            <div className="tw-border tw-border-t-0 tw-border-gray-400" key={i}>
                                <Row label={labels.noticeClusters.companyId} value={getCompanyName(item.id)} />
                                <Row label={labels.noticeClusters.representative_positionId} value={getOccupationName(item.id)} />
                                <Row label={labels.noticeClusters.representative_name} value={item.representative_name} />
                                <RowImage label={labels.noticeClusters.representative_signature} src={item.representative_signature} />
                                <Row label={labels.noticeClusters.submitDate} value={item.submitDate} />
                            </div>
                        ) :
                        project.noticeCompany?.map((item, i) =>
                            <div className="tw-border tw-border-t-0 tw-border-gray-400" key={i}>
                                <Row label={labels.noticeCompany.representative_positionId} value={getOccupationName(item.id)} />
                                <Row label={labels.noticeCompany.representative_name} value={item.representative_name} />
                                <RowImage label={labels.noticeCompany.representative_signature} src={item.representative_signature} />
                                <Row label={labels.noticeCompany.submitDate} value={item.submitDate} />
                            </div>
                        )
                    }
                </div>

                <div className="no-break">
                    <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-font-medium tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                        E - Шалгах хуудас
                    </div>
                    <div className="tw-border tw-border-t-0 tw-border-gray-400">
                        <Row label={labels.e.confirmed} value={project.confirmed ? 'Тийм' : 'Үгүй'} />
                    </div>
                </div>

                <div className="tw-text-center tw-text-base tw-p-4 tw-pt-6 tw-font-medium">
                    {project.createdAt?.slice(0, 10).replaceAll('-', '.') || '   '}
                </div>
            </div>
        </div>
    )
}