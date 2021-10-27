import React, { Fragment, useRef } from 'react'
import PrintSVG from 'assets/svgComponents/printSVG'
import { useReactToPrint } from "react-to-print"
import '../5a/style.css'
import { PDFDownloadLink, pdf } from '@react-pdf/renderer'
import AnalystReportPreviewPdf from './previewPdf'
import html2canvas from 'html2canvas'
import { headersFundingDeals } from './Page'
import { toCurrencyString } from 'pages/urgudul/preview/Preview'

const headerCodes = ['a', 'b', 'c']
// const emptyEditor = '<p><br></p>'
const emptyEditor = ''

export default function AnalystReportPreview(props) {
    const rows = props.rows ?? []
    const info = props.info ?? {}
    const deals = props.deals ?? []
    const company = props.company ?? {}
    const analyst = props.analyst ?? {}

    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    // const handleOpenPdf = async () => {
    //     const blob = await pdf(<AnalystReportPreviewPdf rows={rows} info={info} company={company} analyst={analyst} htmlImg={htmlImg} />).toBlob()
    //     const url = URL.createObjectURL(blob)
    //     window.open(url, '_blank ')
    // }

    // const htmlImgRef = useRef()

    // const [htmlImg, setHtmlImg] = useState()

    // useEffect(() => {
    //     html2canvas(htmlImgRef.current, {
    //         proxy: true,
    //         useCORS: true,
    //     }).then(canvas => {
    //         setHtmlImg(canvas.toDataURL())
    //     })
    // }, [])

    return (
        <div className="tw-text-gray-700 text-sm">
            <button className="tw-mb-4 tw-flex tw-items-center tw-bg-blue-800 tw-text-white tw-py-1 tw-px-5 tw-rounded hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors tw-font-light" onClick={handlePrint}>
                <span className="tw-text-sm">Хэвлэх болон хадгалах</span>
                <PrintSVG className="tw-w-5 tw-h-5 tw-ml-2" />
            </button>

            {/* <PDFDownloadLink
                document={<AnalystReportPreviewPdf rows={rows} info={info} company={company} />}
                fileName="5c.pdf"
            >
                {({ blob, url, loading, error }) => (loading ? 'Loading' : 'Download')}
            </PDFDownloadLink> */}

            {/* <button onClick={handleOpenPdf}>Open</button> */}

            {/* <div className="tw-fixed tw-top-0 tw-py-1 tw-px-2 tw-rounded" style={{ left: -840, width: 831, backgroundColor: '#f5faff' }} ref={htmlImgRef}>
                <div dangerouslySetInnerHTML={{ __html: info.info || emptyEditor }} style={{ minHeight: 20 }} />
            </div> */}

            <div className="tw-mx-auto" ref={componentRef}>
                <div className="tw-text-center tw-text-base tw-font-medium tw-mt-4 tw-mb-0.5">
                    Шинжилгээний тайлан
                </div>

                <div className="tw-text-13px tw-leading-snug tw-text-right tw-pb-1 tw-px-2">
                    <div className="">
                        Өргөдлийн дугаар:
                        <span className="tw-ml-2 tw-font-medium">{company.project?.project_number}</span>
                    </div>
                    <div className="">
                        Өргөдлийн төрөл:
                        <span className="tw-ml-2 tw-font-medium">{company.project?.project_type_name}</span>
                    </div>
                    <div className="">
                        Байгууллагын нэр:
                        <span className="tw-ml-2 tw-font-medium">{company.companyname}</span>
                    </div>
                    <div className="">
                        Төслийн нэр:
                        <span className="tw-ml-2 tw-font-medium">{company.project?.project_name}</span>
                    </div>
                </div>

                <div className="tw-p-1">
                    Хүсэж буй санхүүжилтийн дүн:
                    <span className="tw-font-medium tw-ml-2">
                        {info.requested_funding ? toCurrencyString(info.requested_funding) : `0 ₮`}
                    </span>
                </div>
                <div className="tw-p-1">
                    Хүсэж болох санхүүжилтийн дүн:
                    <span className="tw-font-medium tw-ml-2">
                        {info.available_funding ? toCurrencyString(info.available_funding) : `0 ₮`}
                    </span>
                    <span className="tw-ml-2">
                        /Өмнө нь санхүүжилт {info.available_funding ? 'авсан' : 'аваагүй'}/
                    </span>
                </div>
                <div className="tw-p-1">
                    Шинжилгээ хийсэн Бизнес шинжээч:
                    <span className="tw-font-medium tw-ml-2">
                        {info.analyst_name}
                    </span>
                </div>
                <div className="tw-p-1">
                    Шинжилгээ, дүгнэлт хийсэн хугацаа:
                    <span className="tw-font-medium tw-ml-2 tw-mr-1">{info.check_start?.replaceAll('-', '.')}</span>
                    -аас
                    <span className="tw-font-medium tw-mx-1">{info.check_end?.replaceAll('-', '.')}</span>
                    -ны хооронд.
                </div>
                <div className="tw-py-1 tw-px-2 tw-mb-3 tw-bg-blue-50 tw-bg-opacity-50 tw-rounded tw-mx-1 tw-mt-2">
                    <div dangerouslySetInnerHTML={{ __html: info.info }} style={{ minHeight: 20 }} />
                </div>
                <div className="tw-pb-5 tw-px-1 tw-pt-2">
                    <table>
                        <thead>
                            <tr>
                                {headersFundingDeals.map(header =>
                                    <th className={`${classCell} tw-font-medium`} key={header}>
                                        {header}
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {deals.map((deal, i) =>
                                <tr key={i}>
                                    <td className={classCell}>
                                        {i + 1}.
                                    </td>
                                    <td className={classCell}>
                                        {deal.planned_activity}
                                    </td>
                                    <td className={`${classCell} tw-text-right`}>
                                        {deal.requested_funding?.toLocaleString()}
                                    </td>
                                    <td className={`${classCell} tw-text-right`}>
                                        {deal.proposal_funding?.toLocaleString()}
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td className={`${classCell} tw-pl-2.5`} colSpan={2}>
                                    Нийт
                                </td>
                                <td className={`${classCell} tw-text-right`}>
                                    {toCurrencyString(deals.reduce((acc, cv) => acc + (+cv.requested_funding || 0), 0))}
                                </td>
                                <td className={`${classCell} tw-text-right`}>
                                    {toCurrencyString(deals.reduce((acc, cv) => acc + (+cv.proposal_funding || 0), 0))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {rows.filter(row => row.rowcode !== 'z').map(row => ({
                    'z': <Fragment key={row.rowcode}>
                        <div className="tw-bg-blue-900 tw-text-white tw-flex tw-border tw-border-gray-400" id="no-break">
                            <div className="tw-flex-grow tw-p-2 tw-pl-3 tw-border-r tw-border-gray-400">
                                {row.description}
                            </div>
                            <div className="tw-w-24 tw-py-2 tw-flex tw-justify-center tw-items-center tw-flex-shrink-0">
                                {row.isChecked ? 'Тэнцсэн' : 'Тэнцээгүй'}
                            </div>
                        </div>
                        {row.comment && row.comment !== emptyEditor &&
                            <div className="tw-border tw-border-t-0 tw-border-gray-400 tw-p-2">
                                <div className="tw-py-1 tw-px-2 tw-rounded" style={{ backgroundColor: '#f5faff' }} dangerouslySetInnerHTML={{ __html: row.comment }} />
                            </div>
                        }
                    </Fragment>,
                }[row.rowcode] ||
                    <Fragment key={row.rowcode}>
                        <div className={`tw-flex tw-border ${row.rowcode === 'a' ? '' : 'tw-border-t-0'} tw-border-gray-400`} id="no-break">
                            <div className={`tw-flex-grow tw-p-2 ${headerCodes.includes(row.rowcode) ? 'tw-pl-3' : 'tw-pl-5'} tw-border-r tw-border-gray-400`}>
                                {!headerCodes.includes(row.rowcode) &&
                                    <span className="tw-mr-2 tw-font-normal">
                                        {row.rowcode.substring(1)}.
                                    </span>
                                }
                                {row.description}
                            </div>
                            <div className="tw-w-24 tw-py-2 tw-flex tw-justify-center tw-items-center tw-flex-shrink-0">
                                {row.isChecked ? 'Тийм' : 'Үгүй'}
                            </div>
                        </div>
                        {row.comment && row.comment !== emptyEditor &&
                            <div className={`tw-border tw-border-t-0 tw-border-gray-400 tw-p-2 ${!headerCodes.includes(row.rowcode) ? 'tw-pl-5' : ''}`}>
                                <div className="tw-py-1 tw-px-2 tw-rounded" style={{ backgroundColor: '#f5faff' }} dangerouslySetInnerHTML={{ __html: row.comment }} />
                            </div>
                        }
                    </Fragment>
                ))}

                <div className="tw-mt-8 tw-p-2 tw-mb-4" style={{ marginLeft: '10%' }}>
                    <div className="">
                        Сонгон шалгаруулалтын багийн хуралд танилцуулахыг зөвшөөрсөн:
                    </div>
                    <div className="tw-pl-4 tw-mt-2">
                        <div className="">
                            {info.ahlah_name}
                        </div>
                        <p className="tw-mt-1">
                            Бизнес хөгжлийн ахлах мэргэжилтэн
                        </p>
                        {info.ahlah_signature
                            ? <img src={info.ahlah_signature} className={classSignature} alt="Гарын үсэг" />
                            : <div className={classSignature} />
                        }
                    </div>

                    <div className="tw-mt-6">
                        Боловсруулсан:
                    </div>
                    <div className="tw-pl-4 tw-mt-2">
                        <div className="">
                            {info.zuvluh_name}
                        </div>
                        <p className="tw-mt-1">
                            Бизнес хөгжлийн зөвлөх
                        </p>
                        {info.zuvluh_signature
                            ? <img src={info.zuvluh_signature} className={classSignature} alt="Гарын үсэг" />
                            : <div className={classSignature} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const classSignature = 'tw-w-52 tw-h-16 tw-border-b tw-border-gray-500'
const classCell = 'tw-border tw-border-gray-300 tw-px-2 tw-text-13px'
