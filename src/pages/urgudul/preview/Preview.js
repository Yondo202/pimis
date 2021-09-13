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
import { useParams } from 'react-router-dom'
import { statusNames } from 'components/admin/contents/projects/ProjectHandle'
import { activityClass, plannedActivityClass } from '../pages/page1'
import RowLabel from './rowLabel'

const labels = {
    page1: {
        project_type: 'Өргөдлийн төрөл:',
        project_name: 'Төслийн нэр',
        register_number: 'Регистрийн дугаар',
        activity_direction: 'Үйл ажиллагааны чиглэл',
        main_export: 'Экспортын гол бүтээгдэхүүний ангилал',
        export_products: 'Экспортийн бүтээгдэхүүнүүд',
        export_country: 'Экспортын зорилтот орны нэр',
        planned_activity: 'Төлөвлөсөн үйл ажиллагааны чиглэл',
        planned_activity_budget: 'Төлөвлөсөн үйл ажиллагааны нийт төсөв'
    },
    page2: {
        salesData: 'Борлуулалт болон экпортын хэмжээ',
        company_phone: 'Албан газрын утасны дугаар',
        company_website: 'Вэбсайт',
        company_address: 'Албан ёсны хаяг'
    },
    page3: {
        directors: {
            fullname: 'Албан тушаалтны овог нэр',
            position: 'Албан тушаал',
            phone: 'Гар утас',
            email: 'Имэйл хаяг',
            project_role: 'Төслийг хэрэгжүүлэхэд гүйцэтгэх үүрэг'
        },
        clusters: {
            company_name: 'Аж ахуйн нэгжийн нэр',
            company_register: 'Регистрийн дугаар',
            main_activity: 'Голлох борлуулалт хийдэг үйл ажиллагааны чиглэл',
            sales: 'Аж ахуйн нэгжийн борлуулалт',
            director_name: 'Гүйцэтгэх захирлын нэр',
            director_phone: 'Гүйцэтгэх захирлын утасны дугаар',
            director_email: 'Гүйцэтгэх захирлын имэйл'
        }
    },
    page4: {
        project_duration: 'Төслийг хэрэгжүүлэх нийт хугацаа',
        target_market: 'Экспортын бүтээгдэхүүн, экспортын зорилтот орны зах зээлийн мэдээлэл',
        defined_problems: 'Тодорхойлсон асуудлууд'
    },
    page5: {
        sales: 'Борлуулалт',
        fullTime_workplace: 'Ажлын байр',
        export_details: 'Экспортын задаргаа',
    },
    page6: {
        activity: 'Үйл ажиллагаа',
        explanation: 'Тайлбар',
        budget: 'Төсөв'
    },
    page7: {
        noticeCluster: {
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
        }
    },
    page8: {
        confirmed: 'Өргөдлийн маягт баталгаажсан эсэх'
    }
}

const currentYear = new Date().getFullYear()
const exportYears = Array.from({ length: currentYear - 2016 + 2 }, (x, i) => 2016 + i)

export default function UrgudulPreview(props) {
    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const [project, setProject] = useState({})

    const AlertCtx = useContext(AlertContext)

    const projectId = useParams().id

    const [exportData, setExportData] = useState({})

    useEffect(() => {
        if (props.id) {
            axios.get(`projects/${props.id}`, {
                headers: { 'Authorization': getLoggedUserToken() }
            }).then(res => {
                const project = res.data.data
                setProject(project)
                if (project.userId === null || project.userId === undefined) {
                    return
                }
                axios.get(`export-data?userId=${project.userId}`, {
                    headers: { Authorization: getLoggedUserToken() }
                }).then(res => {
                    setExportData(res.data)
                }).catch(err => {
                    AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Экспортын мэдээллийг татаж чадсангүй.' })
                })
            }).catch(err => {
                AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Маягтын мэдээллийг татаж чадсангүй.' })
            })
        } else if (projectId) {
            axios.get(`projects/${projectId}`, {
                headers: { 'Authorization': getLoggedUserToken() }
            }).then(res => {
                const project = res.data.data
                setProject(project)
                if (project.userId === null || project.userId === undefined) {
                    return
                }
                axios.get(`export-data?userId=${project.userId}`, {
                    headers: { Authorization: getLoggedUserToken() }
                }).then(res => {
                    setExportData(res.data)
                }).catch(err => {
                    AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Экспортын мэдээллийг татаж чадсангүй.' })
                })
            }).catch(err => {
                AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Маягтын мэдээллийг уншиж чадсангүй.' })
            })
        } else if (props.project) {
            setProject(props.project)
            const userId = props.project.userId
            if (userId === null || userId === undefined) {
                return
            }
            axios.get(`export-data?userId=${userId}`, {
                headers: { Authorization: getLoggedUserToken() }
            }).then(res => {
                setExportData(res.data)
            }).catch(err => {
                AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Экспортын мэдээллийг татаж чадсангүй.' })
            })
        }
    }, [])

    const isCluster = project.project_type === 1

    const getActivityDirection = (id) => activityClass[id - 1]
    const getMainExport = (id, other) => id === -1
        ? `Бусад:  ${other}`
        : getProductNameOther(id)

    const getExportCountry = (id, other) => id === -1
        ? `Бусад:  ${other}`
        : getCountryNameOther(id)

    const getPlannedActivity = (id, cost) => cost
        ? `${plannedActivityClass[id - 1]} - ${toCurrencyString(cost)}`
        : plannedActivityClass[id - 1]

    const salesDataYears = Object.keys(project.salesData?.net || []).sort()
    const salesDataNet = project.salesData?.net
    const salesDataExport = project.salesData?.export

    const dates = Object.keys(project.exportDatas?.sales ?? []).sort()
    const sliceIndex = Math.floor(dates.length / 2) + dates.length % 2
    const datesFirstHalf = dates.slice(0, sliceIndex)
    const datesSecondHalf = dates.slice(sliceIndex)
    const dateHalves = [datesFirstHalf, datesSecondHalf]

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

    useEffect(() => {
        axios.get('/urgudul-datas/products-other').then(res => setProductsOther(res.data.data))
        axios.get('/urgudul-datas/countries-other').then(res => setCountriesOther(res.data.data))
        axios.get('/urgudul-datas/activities').then(res => setActivitiesData(res.data.data))
        axios.get('countries').then(res => setCountries(res.data.data))
        axios.get('products').then(res => setProducts(res.data.data.docs))
        axios.get('occupations').then(res => setOccupations(res.data.data))
    }, [])

    const [productsOther, setProductsOther] = useState([])
    const getProductNameOther = (id) => productsOther.find(product => product.id === id)?.description_mon

    const [countriesOther, setCountriesOther] = useState([])
    const getCountryNameOther = (id) => countriesOther.find(country => country.id === id)?.description_mon

    const [activitiesData, setActivitiesData] = useState([])
    const getActivityName = (id) => activitiesData.find(activity => activity.id === id)?.description_mon

    const [countries, setCountries] = useState([])
    const getCountryName = (id) => countries.filter(obj => obj.id === id)[0]?.description_mon

    const [products, setProducts] = useState([])
    const getProductName = (id) => products.filter(obj => obj.id === id)[0]?.description_mon

    const sumBudgetCost = project.activities?.map(activity => +activity.budget).reduce((acc, cv) => acc + cv, 0)

    const getCompanyName = (id) => project.clusters.filter(obj => obj.id === id)[0]?.company_name

    const [occupations, setOccupations] = useState([])
    const getOccupationName = (id) => occupations.filter(obj => obj.id === id)[0]?.description_mon

    return (
        <div className="tw-overflow-x-auto tw-overflow-y-hidden">
            <div className="tw-text-sm tw-text-gray-700 tw-text-13px tw-bg-white tw-rounded tw-p-4" id="urgudul-preview-page">
                <div className="tw-flex tw-justify-between tw-items-center">
                    <button className="tw-flex tw-items-center tw-bg-blue-800 tw-text-white tw-py-1 tw-px-5 tw-text-15px tw-rounded hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors" onClick={handlePrint}>
                        <span className="tw-text-sm tw-font-light">Хэвлэх болон хадгалах</span>
                        <PrintSVG className="tw-w-5 tw-h-5 tw-ml-2" />
                    </button>

                    <div className="tw-text-sm tw-font-medium tw-pr-2 tw-flex tw-items-center">
                        Статус:
                        <span className="tw-text-indigo-600 tw-ml-1 tw-bg-indigo-50 tw-rounded tw-px-1.5 tw-py-0.5">
                            {statusNames[project.status] ?? 'Бөглөөгүй'}
                        </span>
                    </div>
                </div>

                <div className="preview-container" ref={componentRef}>
                    <div className="tw-text-lg text-center tw-font-medium tw-p-4 tw-mt-3 tw-mb-3">
                        Санхүүгийн дэмжлэг хүсэх өргөдлийн маягт
                    </div>

                    <div className="no-break">
                        <div className="tw-px-3 tw-pt-2 tw-pb-1.5 tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800">
                            Өргөдлийн дугаар:
                            <span className="tw-ml-2 tw-tracking-wide tw-font-medium">{project.project_number}</span>
                        </div>
                        <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400">
                            <Row label={labels.page1.project_type} value={project.project_type === 1 ? 'Кластер' : (project.project_type === 0 && 'Аж ахуйн нэгж')} />
                            <Row label={labels.page1.project_name} value={project.project_name} />
                            <Row label={isCluster ? 'Кластерын тэргүүлэгч ААН' : 'Аж ахуйн нэгж'} value={project.user?.companyname} />
                            <Row label={labels.page1.register_number} value={project.register_number} />
                            <Row label={labels.page1.activity_direction} value={getActivityDirection(project.activity_direction)} />
                            <RowLabel label={labels.page1.main_export} />
                            <Row label="Одоогийн байдлаар" value={getMainExport(project.main_export, project.main_export_other)} labelClass="tw-pl-4" />
                            <Row label="Уг өргөдлийн хувьд төлөвлөсөн" value={getMainExport(project.main_export_planned, project.main_export_planned_other)} labelClass="tw-pl-4" />

                            <RowLabel label={labels.page1.export_products} />
                            <div className="tw-border-b tw-border-gray-400 tw-pl-2">
                                {project.exportProducts?.map((product, i) =>
                                    <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-flex tw-items-center tw-border-t-0" key={i}>
                                        <span className="tw-mr-1.5">{i + 1}.</span>
                                        {product.product_name},
                                        <span className="tw-ml-3">HS код: {product.hs_code}</span>
                                    </div>
                                )}
                            </div>

                            <RowLabel label={labels.page1.export_country} style={{ borderTop: 'none' }} />
                            <Row label="Одоогийн байдлаар" value={getExportCountry(project.export_country, project.export_country_other)} labelClass="tw-pl-4" />
                            <Row label="Уг өргөдлийн хувьд төлөвлөсөн" value={getExportCountry(project.export_country_planned, project.export_country_planned_other)} labelClass="tw-pl-4" classAppend="tw-border-b tw-border-gray-400" />

                            <Row label={labels.page1.planned_activity} value={getPlannedActivity(project.planned_activity, project.planned_activity_cost)} />
                            <Row label={labels.page1.planned_activity_budget} value={toCurrencyString(project.planned_activity_budget)} />
                        </div>
                    </div>

                    <div className="no-break">
                        <div className="tw-px-3 tw-pt-1.5 tw-pb-1 tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                            Өргөдөл гаргагчийн мэдээлэл
                        </div>
                        <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400">
                            <div className="tw-px-2 tw-pt-1.5 tw-pb-1.5">
                                {labels.page2.salesData}
                            </div>
                            <div className="tw-border-b tw-border-gray-400 tw-px-2 tw-pb-3">
                                {salesDataYears.length
                                    ? <table>
                                        <thead>
                                            <tr>
                                                <th className={classTableCell}></th>
                                                {salesDataYears.map(year =>
                                                    <th className={`${classTableCell} tw-text-center`} key={year}>
                                                        {year}
                                                    </th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className={classTableCell}>
                                                    Жилийн борлуулалтын хэмжээ
                                                </td>
                                                {salesDataYears.map(year =>
                                                    <td className={`${classTableCell} tw-text-right tw-w-32`} key={year}>
                                                        {toCurrencyString(salesDataNet[year])}
                                                    </td>
                                                )}
                                            </tr>
                                            <tr>
                                                <td className={classTableCell}>
                                                    Жилийн экспортын хэмжээ
                                                </td>
                                                {salesDataYears.map(year =>
                                                    <td className={`${classTableCell} tw-text-right tw-w-32`} key={year}>
                                                        {toCurrencyString(salesDataExport[year])}
                                                    </td>
                                                )}
                                            </tr>
                                        </tbody>
                                    </table>
                                    :
                                    <div className="tw-border tw-border-gray-400 tw-px-2 tw-py-2">
                                        Борлуулалт болон экпортын мэдээллээ оруулаагүй байна.
                                    </div>
                                }
                            </div>

                            <Row label={labels.page2.company_phone} value={project.company_phone} />
                            <Row label={labels.page2.company_website} value={project.company_website} />
                            <Row label={labels.page2.company_address} value={project.company_address} />
                        </div>
                    </div>

                    <div className="no-break">
                        <div className="tw-px-3 tw-pt-1.5 tw-pb-1 tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                            Түлхүүр албан тушаалтнууд
                        </div>
                        {project.directors?.map((item, i) =>
                            <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400" key={i}>
                                <Row label={labels.page3.directors.fullname} value={item.fullname} />
                                <Row label={labels.page3.directors.position} value={item.position} />
                                <Row label={labels.page3.directors.phone} value={item.phone} />
                                <Row label={labels.page3.directors.email} value={item.email} />
                                <RowHtml label={labels.page3.directors.project_role} html={item.project_role} />
                            </div>
                        )}
                    </div>

                    {isCluster &&
                        <div className="np-break">
                            <div className="tw-px-3 tw-pt-1.5 tw-pb-1 tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                                Кластерын гишүүн байгууллагууд
                            </div>
                            {project.clusters?.map((item, i) => {
                                const sales = item.sales
                                const years = Object.keys(sales).sort()

                                return <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400" key={i}>
                                    <Row label={labels.page3.clusters.company_name} value={item.company_name} />
                                    <Row label={labels.page3.clusters.company_register} value={item.company_register} />
                                    <Row label={labels.page3.clusters.main_activity} value={item.main_activity} />
                                    <Row label={labels.page3.clusters.director_name} value={item.director_name} />
                                    <Row label={labels.page3.clusters.director_phone} value={item.director_phone} />
                                    <Row label={labels.page3.clusters.director_email} value={item.director_email} />

                                    <div className="tw-border-t tw-border-gray-400 tw-px-2 tw-py-3">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className={classTableCell}></th>
                                                    {years.map(year =>
                                                        <th className={`${classTableCell} tw-text-center`} key={year}>
                                                            {year}
                                                        </th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className={classTableCell}>
                                                        Аж ахуйн нэгжийн борлуулалт
                                                    </td>
                                                    {years.map(year =>
                                                        <td className={`${classTableCell} tw-text-right tw-w-32`} key={year}>
                                                            {toCurrencyString(sales[year])}
                                                        </td>
                                                    )}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            })}
                        </div>
                    }

                    <div className="no-break">
                        <div className="tw-px-3 tw-pt-1.5 tw-pb-1 tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                            Төслийн мэдээлэл
                        </div>
                        <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400" style={{ breakInside: 'avoid' }}>
                            <Row label={labels.page4.project_duration} value={project.project_duration ? `${project.project_duration} сар` : ' '} />
                            <RowHtml label={labels.page4.target_market} html={project.target_market} />
                            <RowHtml label={labels.page4.defined_problems} html={project.defined_problems} />
                        </div>
                    </div>

                    {/* <div className="no-break">
                        <div className="tw-px-3 tw-pt-1.5 tw-pb-1 tw-bg-blue-900 tw-text-white tw-border tw-border-b-0 tw-border-gray-800 tw-mt-8">
                            Экспортын мэдээлэл
                        </div>
                        {Object.keys(project.exportDatas || {}).length > 0 ?
                            dateHalves.map((dates, h) =>
                                <table className="tw-border-collapse tw-table-auto tw-mt-6" key={h}>
                                    <thead>
                                        <tr>
                                            <th className="tw-border tw-border-gray-400"></th>
                                            {dates.map(date =>
                                                <th className="tw-border tw-border-gray-400 tw-text-center tw-font-normal" style={{ minWidth: 90 }} key={date}>
                                                    {date}
                                                </th>
                                            )}
                                            <th className="tw-border tw-border-gray-400 tw-text-center tw-px-2 tw-font-normal">Нэгж</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="tw-border tw-border-gray-400 tw-px-2">Борлуулалт</td>
                                            {dates.map((item, i) =>
                                                <td className="tw-border tw-border-gray-400 tw-text-right tw-px-2" key={i}>
                                                    {project.exportDatas?.sales?.[item]?.toLocaleString()}
                                                </td>
                                            )}
                                            <td className="tw-border tw-border-gray-400 tw-text-center tw-px-2">₮</td>
                                        </tr>
                                        <tr>
                                            <td className="tw-border tw-border-gray-400 tw-px-2">Ажлын байр</td>
                                            {dates.map((item, i) =>
                                                <td className="tw-border tw-border-gray-400 tw-text-right tw-px-2" key={i}>
                                                    {project.exportDatas?.fullTime_workplace?.[item]?.toLocaleString()}
                                                </td>
                                            )}
                                            <td className="tw-border tw-border-gray-400 tw-text-center tw-px-2">Т/х</td>
                                        </tr>
                                        <tr>
                                            <td className="tw-border tw-border-gray-400 tw-px-2">Экспорт</td>
                                            {dates.map((item, i) =>
                                                <td className="tw-border tw-border-gray-400 tw-text-right tw-px-2" key={i}>
                                                    {exportSums[item] !== 0 && exportSums[item]?.toLocaleString()}
                                                </td>
                                            )}
                                            <td className="tw-border tw-border-gray-400 tw-text-center tw-px-2">₮</td>
                                        </tr>
                                        {project.exportDatas?.export_details?.map((country, i) =>
                                            <Fragment key={i}>
                                                <tr>
                                                    <td className="tw-border tw-border-gray-400 tw-px-2" colSpan={dates.length + 2}>{getCountryName(country?.countryId)} - экспорт хийсэн улс</td>
                                                </tr>
                                                {country?.export_products?.map((product, j) =>
                                                    <Fragment key={j}>
                                                        <tr>
                                                            <td className="tw-border tw-border-gray-400 tw-px-2 tw-pl-3" colSpan={dates.length + 2}>
                                                                {product?.product_name} - экпортын бүтээгдэхүүн
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tw-border tw-border-gray-400 tw-px-2 tw-pl-3">{product?.hs_code}</td>
                                                            {dates.map((item, k) =>
                                                                <td className="tw-border tw-border-gray-400 tw-text-right tw-px-2" key={k}>
                                                                    {product?.[item]?.toLocaleString()}
                                                                </td>
                                                            )}
                                                            <td className="tw-border tw-border-gray-400 tw-text-center tw-px-2">₮</td>
                                                        </tr>
                                                    </Fragment>
                                                )}
                                            </Fragment>
                                        )}
                                    </tbody>
                                </table>
                            )
                            :
                            <div className="tw-border tw-border-gray-400 tw-px-2 tw-py-2">
                                Экспортын мэдээлэл оруулаагүй байна.
                            </div>
                        }
                    </div> */}

                    <div className="no-break">
                        <div className="tw-px-3 tw-pt-1.5 tw-pb-1 tw-bg-blue-900 tw-text-white tw-border tw-border-b-0 tw-border-gray-800 tw-mt-8">
                            Экспортын мэдээлэл
                        </div>
                        <div className="tw-w-full tw-overflow-x-auto">
                            <table className="">
                                <thead>
                                    <tr>
                                        <th className={classTableCell}></th>
                                        {exportYears.map(year =>
                                            <th className={`${classTableCell} tw-text-center`} style={{ minWidth: 50 }} key={year}>
                                                {year}
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                        <td className={classTableCell}>
                                            Нийт борлуулалт
                                        </td>
                                        {exportYears.map(year =>
                                            <td className={`${classTableCell} tw-text-right`} key={year}>
                                                {toCurrencyString(exportData?.types?.total_sales?.[`e${year}`])}
                                            </td>
                                        )}
                                    </tr>
                                    <tr className="">
                                        <td className={classTableCell}>
                                            Ажилчдын тоо
                                        </td>
                                        {exportYears.map(year =>
                                            <td className={`${classTableCell} tw-text-right`} key={year}>
                                                {exportData?.types?.emp_count?.[`e${year}`]}
                                            </td>
                                        )}
                                    </tr>
                                    {exportData.targ_country?.map(countryId =>
                                        <Fragment key={countryId}>
                                            <tr>
                                                <td className={classTableCell} colSpan={exportYears.length + 1}>
                                                    {getCountryName(countryId)}
                                                </td>
                                            </tr>
                                            {exportData.data?.filter(country => country.countryId === countryId).map((country, i) =>
                                                <tr key={i}>
                                                    <td className={`${classTableCell} tw-pl-4`}>
                                                        {country.product_name}
                                                    </td>
                                                    {exportYears.map(year =>
                                                        <td className={`${classTableCell} tw-text-right`} key={year}>
                                                            {toCurrencyString(country[`e${year}`])}
                                                        </td>
                                                    )}
                                                </tr>
                                            )}
                                        </Fragment>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="no-break">
                        <div className="tw-px-3 tw-pt-1.5 tw-pb-1 tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                            Үйл ажиллагаа
                        </div>
                        {project.activities?.map((item, i) =>
                            <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400" key={i}>
                                <Row label={`${labels.page6.activity} ${i + 1}`} value={getActivityName(item.activityId)} />
                                <RowHtml label={labels.page6.explanation} html={item.explanation} />
                                <Row label={labels.page6.budget} value={item.budget.toLocaleString()} classAppend="tw-border-t tw-border-gray-400" />
                            </div>
                        )}
                        <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400 tw-font-medium">
                            <Row label="Үйл ажиллагаануудын нийт төсөв" value={sumBudgetCost?.toLocaleString()} />
                            <Row label="Экспортыг Дэмжих Төслөөс хүсч буй санхүүжилт" value={(sumBudgetCost / 2)?.toLocaleString()} />
                        </div>
                    </div>

                    <div className="no-break">
                        <div className="tw-px-3 tw-pt-1.5 tw-pb-1 tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                            Мэдэгдэл
                        </div>
                        {isCluster ?
                            project.noticeClusters?.map((item, i) =>
                                <div className="tw-border tw-border-t-0 tw-border-gray-400" key={i}>
                                    <Row label={labels.page7.noticeCluster.companyId} value={item.applicant ? project.user?.companyname : getCompanyName(item.companyId)} />
                                    <Row label={labels.page7.noticeCluster.representative_positionId} value={getOccupationName(item.id)} />
                                    <Row label={labels.page7.noticeCluster.representative_name} value={item.representative_name} />
                                    <RowImage label={labels.page7.noticeCluster.representative_signature} src={item.representative_signature} />
                                    <Row label={labels.page7.noticeCluster.submitDate} value={item.submitDate} />
                                </div>
                            ) :
                            project.noticeCompany?.map((item, i) =>
                                <div className="tw-border tw-border-t-0 tw-border-gray-400" key={i}>
                                    <Row label={labels.page7.noticeCompany.representative_positionId} value={getOccupationName(item.id)} />
                                    <Row label={labels.page7.noticeCompany.representative_name} value={item.representative_name} />
                                    <RowImage label={labels.page7.noticeCompany.representative_signature} src={item.representative_signature} />
                                    <Row label={labels.page7.noticeCompany.submitDate} value={item.submitDate} />
                                </div>
                            )
                        }
                    </div>

                    <div className="no-break">
                        <div className="tw-px-3 tw-pt-1.5 tw-pb-1 tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                            Шалгах хуудас
                        </div>
                        <div className="tw-border tw-border-t-0 tw-border-gray-400">
                            <Row label={labels.page8.confirmed} value={project.confirmed ? 'Тийм' : 'Үгүй'} />
                        </div>
                    </div>

                    <div className="tw-text-center tw-text-15px tw-p-4 tw-pt-8 tw-font-medium">
                        {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : ' '}
                    </div>
                </div>
            </div>
        </div >
    )
}

const classTableCell = 'tw-border tw-border-gray-400 tw-px-2 tw-font-normal'

const toCurrencyString = (number) => {
    const localeString = number?.toLocaleString()
    return localeString
        ? `${localeString} ₮`
        : ' '
}
