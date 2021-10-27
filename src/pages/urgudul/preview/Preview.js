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
        export_countries: 'Экспортын зорилтот орны нэр',
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
        export_details: 'Экспортын задаргаа'
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

const notices = {
    cluster: {
        header: 'Өргөдөл гаргагч болон хамтран хүсэлт гаргаж буй аж ахуйн нэгжүүд нь дараах зүйлсийг мэдэгдэж байна:',
        list: [
            'Өргөдөл гаргагч нь шалгуур үзүүлэлтийг бүрэн хангасан бөгөөд хориотой зардал, хориотой үйл ажиллагааны чиглэлийг энэхүү санхүүжилтийн төсөлд хамруулаагүй.',
            'Өргөдөл гаргагч нь кластерын бусад гишүүдийг бүрэн төлөөлж, төслийн бэлтгэл ажил, хэрэгжилтэд шууд хариуцлага хүлээнэ.',
            'Өргөдөл гаргагч нь байгаль орчны шалгуур, өргөдөл гаргагчийн шалгуур, зардлын шалгуурыг бүрэн хангасан бөгөөд аль нэг гишүүн нь эдгээр шалгуурыг хангаагүй тохиолдолд энэ нь санхүүжилтийн хүсэлтээс бүрэн татгалзах үндэслэл болно.',
            'Өргөдөл гаргагч нь санал болгосон үйл ажиллагааны төлөвлөгөөг хэрэгжүүлэхэд санхүүгийн болон үйл ажиллагааны хувьд хүчин чадалтай бөгөөд үүнийг нотлох баримтуудыг бүрэн хавсаргасан.',
            'Кластерын гишүүд нь өргөдөл гаргагчид Экспортыг дэмжих төслөөс олгогдох Үр дүнтэй түншлэлийн санхүүжилтийн гэрээнд гарын үсэг зурах бүрэн эрхийг олгосон.',
            'Кластерын гишүүд нь энэхүү төслийн дэмжлэгийг хамтран хүртэх, төслийг хэрэгжүүлэхэд шаардлагатай удирдлага, санхүүжилтийн зардлыг хамтран гаргахаар тохиролцсон.',
            'Өргөдөл гаргагч болон кластерын гишүүн аж ахуйн нэгжүүд нь шаардлагатай тохиолдолд экспортын үйл ажиллагаатай холбоотой туршлага, мэдлэг, мэдээллээ Экспортыг дэмжих төсөлд хамрагдаж буй болон хамрагдах хүсэлт гаргасан бусад аж ахуйн нэгжүүдтэй нээлттэй, үнэ төлбөргүйгээр хуваалцаж, төслийн зүгээс зохион байгуулж буй албан ёсны сургалт, сурталчилгааны арга хэмжээнд оролцоно.',
            'Өргөдөл гаргагч болон кластерын гишүүн аж ахуйн нэгжүүд нь Экспортыг дэмжих төслийн зүгээс гаргах аливаа сурталчилгаа, мэдээллийн чанартай контентүүдэд тухайн аж ахуйн нэгжүүдийн талаарх мэдээллийг тусгаж, олон нийтэд мэдээлэхийг хүлээн зөвшөөрч байна.'
        ],
        subList2: [
            'Өргөдөл гаргагч нь кластерын гишүүн байгууллагуудтай дараах чиглэлээр нягт уялдаа холбоотой ажиллана: Бүх гишүүд энэхүү өргөдлийн маягтад бичсэн мэдээлэлтэй танилцсан бөгөөд өөр өөрсдийн үүргийг ойлгож байгаа.',
            'Өргөдөл гаргагч нь кластерын бусад гишүүдийг уг төслийн хэрэгжилтийн талаар тогтмол мэдээллээр хангаж ажиллана.',
            'Бүх гишүүд Экспортыг дэмжих төсөлд илгээж буй өргөдөл гаргагч аж ахуйн нэгжийн тайлан, мэдээлэлтэй танилцсан байна.Экспортыг дэмжих төсөлд илгээх төслийн өөрчлөлтүүд нь кластерын гишүүн байгууллага хооронд хэлэлцэгдэж, зөвшилцөлд хүрсэн санал байна.'
        ],
        footer: 'Өргөдөл гаргагчаас шалтгаалан мэдээлэл буруу бөглөх, материал дутуу илгээх, дэмжих чиглэлийн бус өргөдлийн материал хүргүүлэх тохиолдолд энэ нь төслийн нэгжийн зүгээс татгалзах шалтгаан болох бөгөөд дараагийн цонх нээгдэх хүртэл дахин материал авч судлах, тайлбар хүргүүлэх боломжгүйг хүлээн зөвшөөрөв. Энэхүү өргөдлийн маягтад орсон бүх мэдээллийг үнэн зөвөөр мэдүүлсэн бөгөөд санаатай болон санаандгүйгээр мэдээллийг хооронд нь зөрүүлэх, мэдээллийг нотлох баримт нь мэдээллээс зөрөх, нотлох баримтгүй байх нь уг санхүүжилтийг олгохоос татгалзах, цаашид өргөдөл хүлээн авахгүй байх хүртэлх шийдвэр гаргах шалтгаан болохыг бүрэн ойлгож, гарын үсэг зурсан:'
    },
    company: {
        header: 'Өргөдөл гаргагч болон уг төсөлд хамаарах түлхүүр албан тушаалтнууд нь дараах зүйлсийг мэдэгдэж байна:',
        list: [
            'Өргөдөл гаргагч нь шалгуур үзүүлэлтийг бүрэн хангасныг мэдэгдэж буй бөгөөд хориотой зардал, хориотой үйл ажиллагааны чиглэлийг энэхүү санхүүжилтийн төсөлд төлөвлөөгүй болно.',
            'Өргөдөл гаргагч аж ахуйн нэгжийг төлөөлөгч нь энэхүү өргөдөлд тусгасан түлхүүр албан тушаалтнуудтай нягт уялдаа холбоотой ажиллана.',
            'Өргөдөл гаргагч нь төслийн бэлтгэл ажил, хэрэгжилтэд шууд хариуцлага хүлээнэ.',
            'Өргөдөл гаргагч нь байгаль орчны шалгуур, өргөдөл гаргагчийн шалгуур, зардлын шалгуурыг бүрэн хангасан бөгөөд аль нэг шалгуурыг хангаагүй тохиолдолд энэ нь  санхүүжилтийн хүсэлтээс бүрэн татгалзах үндэслэл болно.',
            'Өргөдөл гаргагч нь санал болгосон үйл ажиллагааны төлөвлөгөөг хэрэгжүүлэхэд санхүүгийн болон үйл ажиллагааны хувьд хүчин чадалтай бөгөөд үүнийг нотлох баримтуудыг бүрэн хавсаргасан. Өргөдөл гаргагч аж ахуйн нэгж нь шаардлагатай тохиолдолд экспортын үйл ажиллагаатай холбоотой туршлага, мэдлэг, мэдээллээ Экспортыг дэмжих төсөлд хамрагдаж буй болон хамрагдах хүсэлт гаргасан бусад аж ахуйн нэгжүүдтэй нээлттэй, үнэ төлбөргүйгээр хуваалцаж, төслийн зүгээс зохион байгуулж буй албан ёсны сургалт, сурталчилгааны арга хэмжээнд оролцоно.',
            'Өргөдөл гаргагч нь Экспортыг дэмжих төслийн зүгээс гаргах аливаа сурталчилгаа, мэдээллийн чанартай контентүүдэд тухайн аж ахуйн нэгжийн талаарх мэдээллийг тусгаж, олон нийтэд мэдээлэхийг хүлээн зөвшөөрч байна.'
        ],
        subList2: [
            'Бүх түлхүүр албан тушаалтнууд энэхүү өргөдлийн маягтад бичсэн мэдээлэлтэй танилцсан бөгөөд өөр өөрсдийн үүргийг ойлгож байгаа.',
            'Өргөдөл гаргагч нь түлхүүр албан тушаалтнуудыг уг төслийн хэрэгжилтийн талаар тогтмол мэдээллээр хангаж ажиллана.',
            'Бүх түлхүүр албан тушаалтнууд Экспортыг дэмжих төсөлд илгээж буй өргөдөл гаргагч аж ахуйн нэгжийн тайлан, мэдээлэлтэй танилцсан байна.',
            'Экспортыг дэмжих төсөлд илгээх төслийн өөрчлөлтүүд нь байгууллагын дотоодод мөн түлхүүр албан тушаалтнуудын хооронд хэлэлцэгдэж, зөвшилцөлд хүрсэн санал байна.'
        ],
        footer: 'Өргөдөл гаргагчаас шалтгаалан мэдээлэл буруу бөглөх, материал дутуу илгээх, дэмжих чиглэлийн бус өргөдлийн материал хүргүүлэх тохиолдолд энэ нь төслийн нэгжийн зүгээс татгалзах шалтгаан болох бөгөөд дараагийн цонх нээгдэх хүртэл дахин материал авч судлах, тайлбар хүргүүлэх боломжгүйг хүлээн зөвшөөрөв. Энэхүү өргөдлийн маягтад орсон бүх мэдээллийг үнэн зөвөөр мэдүүлсэн бөгөөд санаатай болон санаандгүйгээр мэдээллийг хооронд нь зөрүүлэх, мэдээллийг нотлох баримт нь мэдээллээс зөрөх, нотлох баримтгүй байх нь уг санхүүжилтийг олгохоос татгалзах, цаашид өргөдөл хүлээн авахгүй байх хүртэлх шийдвэр гаргах шалтгаан болохыг бүрэн ойлгож, гарын үсэг зурсан:'
    }
}

const currentYear = new Date().getFullYear()
const initialExportYears = Array.from({ length: currentYear - 2016 + 3 }, (_, i) => 2016 + i)

export default function UrgudulPreview(props) {
    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const [project, setProject] = useState({})

    const AlertCtx = useContext(AlertContext)

    const projectId = useParams().id

    const [exportData, setExportData] = useState({})

    const loadExportData = (exportData) => {
        const sumExportYears = exportYears.map(
            year => exportData.data?.reduce((acc, cv) => acc + (+cv[`e${year}`] || 0), 0) ?? 0
        )
        const sumExportCountries = exportData.data?.reduce((acc, cv) => {
            if (cv.countryId in acc) {
                exportYears.forEach(year => acc[cv.countryId][year] += +cv[`e${year}`] || 0)
            } else {
                acc[cv.countryId] = {}
                exportYears.forEach(year => acc[cv.countryId][year] = +cv[`e${year}`] || 0)
            }
            return acc
        }, {})
        const sumExportProducts = exportData.data?.reduce((acc, cv) => {
            if (cv.hs_code in acc) {
                exportYears.forEach(year => acc[cv.hs_code][year] += +cv[`e${year}`] || 0)
            } else {
                acc[cv.hs_code] = {
                    product_name: cv.product_name
                }
                exportYears.forEach(year => acc[cv.hs_code][year] = +cv[`e${year}`] || 0)
            }
            return acc
        }, {})
        setExportData(exportData)
        setSumExportYears(sumExportYears)
        setSumExportCountries(sumExportCountries)
        setSumExportProducts(sumExportProducts)
    }

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
                    loadExportData(res.data)
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
                    loadExportData(res.data)
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
                loadExportData(res.data)
            }).catch(err => {
                AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Экспортын мэдээллийг татаж чадсангүй.' })
            })
        }
    }, [])

    const isCluster = project.project_type === 1

    const getActivityDirection = (id) => activityClass[id - 1]

    const getMainExport = (id, other) => id === -1
        ? `Бусад - ${other}`
        : getProductNameOther(id)

    const getExportCountry = (id, other) => {
        switch (id) {
            case -1:
                return `Бусад - ${other}`
            case -2:
                return 'Экспорт хийдэггүй'
            default:
                return getCountryNameOther(id)
        }
    }

    const salesDataYears = Object.keys(project.salesData?.net || []).sort()
    const salesDataNet = project.salesData?.net
    const salesDataExport = project.salesData?.export

    // const dates = Object.keys(project.exportDatas?.sales ?? []).sort()
    // const sliceIndex = Math.floor(dates.length / 2) + dates.length % 2
    // const datesFirstHalf = dates.slice(0, sliceIndex)
    // const datesSecondHalf = dates.slice(sliceIndex)
    // const dateHalves = [datesFirstHalf, datesSecondHalf]

    // const exportSums = dates.reduce((acc, cur) => ({ ...acc, [cur]: null }), {})
    // if (project.exportDatas?.export_details && project.exportDatas?.export_details?.length) {
    //     for (const country of project.exportDatas?.export_details) {
    //         if (country?.export_products && country?.export_products?.length) {
    //             for (const product of country?.export_products) {
    //                 Object.keys(exportSums).forEach(key => {
    //                     exportSums[key] = +exportSums[key] + +product[key]
    //                 })
    //             }
    //         }
    //     }
    // }

    useEffect(() => {
        axios.get('/urgudul-datas/products-other').then(res => setProductsOther(res.data.data))
        axios.get('/urgudul-datas/countries-other').then(res => setCountriesOther(res.data.data))
        axios.get('/urgudul-datas/activities').then(res => setActivitiesData(res.data.data))
        axios.get('countries').then(res => setCountries(res.data.data))
        axios.get('products').then(res => setProducts(res.data.data.docs))
        axios.get('occupations').then(res => setOccupations(res.data.data))
        axios.get('/years', {
            params: { type: 'export_data' }
        }).then(res => {
            const higestYear = res.data.data.reduce((higestYear, cv) => cv.year > higestYear ? cv.year : higestYear, 2016)
            const exportYears = Array.from({ length: higestYear - 2016 + 1 }, (_, i) => 2016 + i)
            setExportYears(exportYears)
        })
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

    const sumBudgetCost = project.activities?.reduce((acc, cv) => acc + (+cv.budget || 0), 0) ?? 0

    const getCompanyName = (id) => project.clusters.filter(obj => obj.id === id)[0]?.company_name

    const [occupations, setOccupations] = useState([])
    const getOccupationName = (id) => occupations.filter(obj => obj.id === id)[0]?.description_mon

    const noticeFinal = isCluster ? notices.cluster : notices.company

    const plannedActivities = ['export_marketing', 'quality_control', 'tech_control'].reduce((acc, cv) => {
        if (project[cv] === 1) {
            return [...acc, {
                label: plannedActivityClass[cv],
                cost: project[`${cv}_cost`]
            }]
        } else {
            return acc
        }
    }, [])
    const sumPlannedActivities = plannedActivities.reduce((acc, cv) => acc + (+cv.cost || 0), 0)

    const [exportYears, setExportYears] = useState(initialExportYears)
    const [sumExportYears, setSumExportYears] = useState([])
    const [sumExportCountries, setSumExportCountries] = useState({})
    const [sumExportProducts, setSumExportProducts] = useState({})

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
                            <div className="tw-pl-2">
                                {project.exportProducts?.length
                                    ? project.exportProducts?.map((product, i) =>
                                        <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-flex tw-items-center" key={i}>
                                            <span className="tw-mr-1.5">{i + 1}.</span>
                                            {product.product_name},
                                            <span className="tw-ml-3">HS код: {product.hs_code}</span>
                                        </div>
                                    )
                                    : <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-flex tw-items-center tw-italic tw-text-gray-400">
                                        Бүтээглэхүүн оруулаагүй байна.
                                    </div>
                                }
                            </div>

                            <RowLabel label={labels.page1.export_countries} />
                            <div className="tw-pl-2">
                                {project.exportCountries?.length
                                    ? project.exportCountries?.map((country, i) =>
                                        <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-grid tw-grid-cols-2">
                                            <span className="">
                                                <span className="tw-mr-1.5">{i + 1}.</span>
                                                Одоогийн байдлаар: {getExportCountry(country.current, country.current_other)}
                                            </span>
                                            <span className="tw-pl-2">
                                                Уг өргөдлийн хувьд төлөвлөсөн: {getExportCountry(country.planned, country.planned_other)}
                                            </span>
                                        </div>
                                    )
                                    : <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-flex tw-items-center tw-italic tw-text-gray-400">
                                        Улс оруулаагүй байна.
                                    </div>
                                }
                            </div>

                            <RowLabel label={labels.page1.planned_activity} />
                            <div className="tw-pl-2 tw-border-b tw-border-gray-400">
                                {plannedActivities.length
                                    ? plannedActivities.map((activity, i) =>
                                        <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-grid tw-grid-cols-2">
                                            <span className="">
                                                {i + 1}. {activity.label}
                                            </span>
                                            <span className="tw-pl-2">
                                                Үнийн дүн: {activity.cost}
                                            </span>
                                        </div>
                                    )
                                    : <div className="tw-px-2 tw-pt-1.5 tw-pb-1 tw-flex tw-items-center tw-italic tw-text-gray-400">
                                        Үйл ажиллагааны чиглэл сонгоогүй байна.
                                    </div>
                                }
                            </div>

                            <Row label={labels.page1.planned_activity_budget} value={toCurrencyString(sumPlannedActivities)} classAppend="tw-font-medium" />
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
                                    <div className="tw-border tw-border-gray-400 tw-px-2 tw-py-2 tw-text-gray-400 tw-italic">
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
                        {project.directors?.length
                            ? project.directors?.map((item, i) =>
                                <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400" key={i}>
                                    <Row label={labels.page3.directors.fullname} value={item.fullname} />
                                    <Row label={labels.page3.directors.position} value={item.position} />
                                    <Row label={labels.page3.directors.phone} value={item.phone} />
                                    <Row label={labels.page3.directors.email} value={item.email} />
                                    <RowHtml label={labels.page3.directors.project_role} html={item.project_role} />
                                </div>
                            )
                            : <div className="tw-border tw-border-t-0 tw-border-gray-400 tw-p-2 tw-text-gray-400 tw-italic">
                                Мэдээлэл оруулаагүй байна.
                            </div>
                        }
                    </div>

                    {isCluster &&
                        <div className="np-break">
                            <div className="tw-px-3 tw-pt-1.5 tw-pb-1 tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                                Кластерын гишүүн байгууллагууд
                            </div>
                            {project.clusters?.length
                                ? project.clusters?.map((item, i) => {
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
                                })
                                : <div className="tw-border tw-border-t-0 tw-border-gray-400 tw-p-2 tw-text-gray-400 tw-italic">
                                    Мэдээлэл оруулаагүй байна.
                                </div>
                            }
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
                            <table className="tw-text-xs">
                                <thead>
                                    <tr>
                                        <th className={classTableCell} style={{ minWidth: 120 }} />
                                        <th className={`${classTableCell} tw-text-center`} style={{ fontSize: 10 }}>
                                            Хэмжих нэгж
                                        </th>
                                        {exportYears.map(year =>
                                            <th className={`${classTableCell} tw-text-center`} style={{ minWidth: 60 }} key={year}>
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
                                        <td className={classTableCell} style={{ fontSize: 10 }}>
                                            Төгрөг
                                        </td>
                                        {exportYears.map(year =>
                                            <td className={`${classTableCell} tw-text-right`} key={year}>
                                                {/* {toCurrencyString(exportData?.types?.total_sales?.[`e${year}`])} */}
                                                {exportData?.types?.total_sales?.[`e${year}`]?.toLocaleString()}
                                            </td>
                                        )}
                                    </tr>
                                    <tr className="">
                                        <td className={classTableCell}>
                                            Нийт экспортын дүн
                                        </td>
                                        <td className={classTableCell} style={{ fontSize: 10 }}>
                                            Төгрөг
                                        </td>
                                        {exportYears.map(year =>
                                            <td className={`${classTableCell} tw-text-right`} key={year}>
                                                {/* {toCurrencyString(exportData?.types?.total_sales?.[`e${year}`])} */}
                                                {exportData?.types?.total_export?.[`e${year}`]?.toLocaleString()}
                                            </td>
                                        )}
                                    </tr>
                                    <tr className="">
                                        <td className={classTableCell} style={{ fontWeight: 500 }}>
                                            Экспорт /улсаар/
                                        </td>
                                        <td className={classTableCell} style={{ fontSize: 10, fontWeight: 500 }}>
                                            Төгрөг
                                        </td>
                                        {exportYears.map((year, i) =>
                                            <td className={`${classTableCell} tw-text-right`} style={{ fontWeight: 500 }} key={year}>
                                                {sumExportYears[i]?.toLocaleString()}
                                            </td>
                                        )}
                                    </tr>
                                    {Object.entries(sumExportCountries).map(([countryId, countryData]) =>
                                        <tr className="" key={countryId}>
                                            <td className={`${classTableCell} tw-pl-4`}>
                                                {getCountryName(+countryId)}
                                            </td>
                                            <td className={classTableCell} style={{ fontSize: 10 }}>
                                                Төгрөг
                                            </td>
                                            {exportYears.map(year =>
                                                <td className={`${classTableCell} tw-text-right`} key={year}>
                                                    {countryData[year]?.toLocaleString()}
                                                </td>
                                            )}
                                        </tr>
                                    )}
                                    <tr className="">
                                        <td className={classTableCell} style={{ fontWeight: 500 }}>
                                            Экспорт /бүтээгдэхүүнээр/
                                        </td>
                                        <td className={classTableCell} style={{ fontSize: 10, fontWeight: 500 }}>
                                            Төгрөг
                                        </td>
                                        {exportYears.map((year, i) =>
                                            <td className={`${classTableCell} tw-text-right`} style={{ fontWeight: 500 }} key={year}>
                                                {sumExportYears[i]?.toLocaleString()}
                                            </td>
                                        )}
                                    </tr>
                                    {Object.entries(sumExportProducts).map(([hs_code, productData]) =>
                                        <tr className="" key={hs_code}>
                                            <td className={`${classTableCell} tw-pl-4`}>
                                                {productData.product_name}
                                            </td>
                                            <td className={classTableCell} style={{ fontSize: 10 }}>
                                                Төгрөг
                                            </td>
                                            {exportYears.map(year =>
                                                <td className={`${classTableCell} tw-text-right`} key={year}>
                                                    {productData[year]?.toLocaleString()}
                                                </td>
                                            )}
                                        </tr>
                                    )}
                                    <tr className="">
                                        <td className={classTableCell}>
                                            Ажилчдын тоо
                                        </td>
                                        <td className={classTableCell} style={{ fontSize: 10 }}>
                                            Ажилтан
                                        </td>
                                        {exportYears.map(year =>
                                            <td className={`${classTableCell} tw-text-right`} key={year}>
                                                {/* {exportData?.types?.emp_count?.[`e${year}`]} */}
                                                {exportData?.types?.emp_count?.[`e${year}`]?.toLocaleString()}
                                            </td>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="no-break">
                        <div className="tw-px-3 tw-pt-1.5 tw-pb-1 tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                            Үйл ажиллагаа
                        </div>
                        {project.activities?.length > 0
                            ? project.activities?.map((item, i) =>
                                <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400" key={i}>
                                    <Row label={`${labels.page6.activity} ${i + 1}`} value={getActivityName(item.activityId)} />
                                    <RowHtml label={labels.page6.explanation} html={item.explanation} />
                                    <Row label={labels.page6.budget} value={item.budget.toLocaleString()} classAppend="tw-border-t tw-border-gray-400" />
                                </div>
                            )
                            : <div className="tw-border tw-border-t-0 tw-border-gray-400 tw-px-2 tw-py-2 tw-text-gray-400 tw-italic">
                                Үйл ажиллагааны мэдээллээ оруулаагүй байна.
                            </div>
                        }
                        <div className="tw-border-l tw-border-r tw-border-b tw-border-gray-400 tw-font-medium">
                            <Row label="Үйл ажиллагаануудын нийт төсөв" value={toCurrencyString(sumBudgetCost)} />
                            <Row label="Экспортыг дэмжих төслөөс хүсч буй санхүүжилт" value={toCurrencyString(sumBudgetCost / 2)} />
                        </div>
                    </div>

                    <div className="no-break">
                        <div className="tw-px-3 tw-pt-1.5 tw-pb-1 tw-bg-blue-900 tw-text-white tw-border tw-border-gray-800 tw-mt-8">
                            Мэдэгдэл
                        </div>

                        <div className="tw-border tw-border-t-0 tw-border-gray-400 tw-p-2">
                            <div className="tw-font-medium">
                                {noticeFinal.header}
                            </div>
                            <ul className="tw-mt-3 tw-list-disc tw-list-inside tw-pl-2">
                                {noticeFinal.list.map((notice, i) =>
                                    i === 2
                                        ? <div className="tw-pl-4 tw-py-2" key={i}>
                                            {noticeFinal.subList2.map((subNotice, j) =>
                                                <div className="" key={j}>
                                                    <span className="tw-mr-2.5">∘</span>{subNotice}
                                                </div>
                                            )}
                                        </div>
                                        : <li className="" key={i}>
                                            {notice}
                                        </li>
                                )}
                            </ul>
                            <div className="tw-mt-3" style={{ textIndent: 12 }}>
                                {noticeFinal.footer}
                            </div>
                        </div>

                        {isCluster
                            ? (project.noticeClusters?.length > 0
                                ? project.noticeClusters?.map((item, i) =>
                                    <div className="tw-border tw-border-t-0 tw-border-gray-400" key={i}>
                                        <Row label={labels.page7.noticeCluster.companyId} value={item.applicant ? project.user?.companyname : getCompanyName(item.companyId)} />
                                        <Row label={labels.page7.noticeCluster.representative_positionId} value={getOccupationName(item.id)} />
                                        <Row label={labels.page7.noticeCluster.representative_name} value={item.representative_name} />
                                        <RowImage label={labels.page7.noticeCluster.representative_signature} src={item.representative_signature} />
                                        <Row label={labels.page7.noticeCluster.submitDate} value={item.submitDate} />
                                    </div>
                                )
                                : <div className="tw-border tw-border-t-0 tw-border-gray-400 tw-px-2 tw-py-2 tw-text-gray-400 tw-italic">
                                    Мэдэгдэлд гарын үсэг зураагүй байна.
                                </div>
                            )
                            : (project.noticeCompany?.length > 0
                                ? project.noticeCompany?.map((item, i) =>
                                    <div className="tw-border tw-border-t-0 tw-border-gray-400" key={i}>
                                        <Row label={labels.page7.noticeCompany.representative_positionId} value={getOccupationName(item.id)} />
                                        <Row label={labels.page7.noticeCompany.representative_name} value={item.representative_name} />
                                        <RowImage label={labels.page7.noticeCompany.representative_signature} src={item.representative_signature} />
                                        <Row label={labels.page7.noticeCompany.submitDate} value={item.submitDate} />
                                    </div>
                                )
                                : <div className="tw-border tw-border-t-0 tw-border-gray-400 tw-px-2 tw-py-2 tw-text-gray-400 tw-italic">
                                    Мэдэгдэлд гарын үсэг зураагүй байна.
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
                </div >
            </div >
        </div >
    )
}

const classTableCell = 'tw-border tw-border-gray-400 tw-px-2 tw-font-normal'

export const toCurrencyString = (number) => {
    const localeString = number?.toLocaleString()
    return localeString
        ? `${localeString} ₮`
        : ' '
}

// commented out exoport products by countries
// {exportData.targ_country?.map(countryId =>
//     <Fragment key={countryId}>
//         <tr>
//             <td className={classTableCell} colSpan={exportYears.length + 3}>
//                 {getCountryName(countryId)}
//             </td>
//         </tr>
//         {exportData.data?.filter(country => country.countryId === countryId).map((country, i) =>
//             <tr key={i}>
//                 <td className={`${classTableCell} tw-pl-4`}>
//                     {country.product_name}
//                 </td>
//                 <td className={classTableCell} style={{ fontSize: 10 }}>
//                     Төгрөг
//                 </td>
//                 {exportYears.map(year =>
//                     <td className={`${classTableCell} tw-text-right`} key={year}>
//                         {/* {toCurrencyString(country[`e${year}`])} */}
//                         {country[`e${year}`]?.toLocaleString()}
//                     </td>
//                 )}
//             </tr>
//         )}
//     </Fragment>
// )}
