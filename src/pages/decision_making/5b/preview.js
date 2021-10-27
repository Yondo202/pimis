import React, { useRef } from 'react'
import { PDFDownloadLink, pdf } from '@react-pdf/renderer'
import PrintSVG from 'assets/svgComponents/printSVG'
import { Fragment } from 'react'
import { useReactToPrint } from 'react-to-print'
import '../5a/style.css'
import CompilationChecklistPreviewPdf from './previewPdf'

const headerCodes = ['a', 'b', 'c']
// const emptyEditor = '<p><br></p>'
const emptyEditor = ''

export default function CompilationChecklistPreview(props) {
    const rows = props.rows ?? []
    const company = props.company ?? {}

    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const handleOpenPdf = async () => {
        const blob = await pdf(<CompilationChecklistPreviewPdf rows={rows} company={company} />).toBlob()
        const url = URL.createObjectURL(blob)
        window.open(url, '_blank ')
    }

    return (
        <div className="tw-text-gray-700 text-sm">
            <button className="tw-mb-4 tw-flex tw-items-center tw-bg-blue-800 tw-text-white tw-py-1 tw-px-5 tw-rounded hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors tw-font-light" onClick={handlePrint}>
                <span className="tw-text-sm">Хэвлэх болон хадгалах</span>
                <PrintSVG className="tw-w-5 tw-h-5 tw-ml-2" />
            </button>

            {/* <PDFDownloadLink
                document={<CompilationChecklistPreviewPdf rows={rows} company={company} />}
                fileName="5b.pdf"
            >
                {({ blob, url, loading, error }) => (loading ? 'Loading' : 'Download')}
            </PDFDownloadLink> */}

            {/* <button onClick={handleOpenPdf}>Open</button> */}

            <div className="tw-mx-auto" ref={componentRef}>
                <div className="tw-text-center tw-text-base tw-font-medium tw-mt-4 tw-mb-0.5">
                    Бүрдүүлбэрийн нотлох баримтыг шалгах хуудас
                </div>

                <div className="tw-text-13px tw-leading-snug tw-text-right tw-mb-2 tw-px-2">
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

                {rows.map(row => ({
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
                        <div className="tw-flex tw-border tw-border-t-0 tw-border-gray-400" id="no-break">
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
            </div>
        </div>
    )
}
