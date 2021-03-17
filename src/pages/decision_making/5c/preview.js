import PrintSVG from 'assets/svgComponents/printSVG'
import React from 'react'
import { Fragment } from 'react'
import { useRef } from 'react'
import { useReactToPrint } from "react-to-print"
import '../5a/style.css'
import Pdf from "react-to-pdf"


export default function AnalystReportPreview(props) {
    const rows = props.rows || []
    const info = props.info || {}
    const project = props.project || {}

    const isCheckedZ = rows.filter(row => row.rowcode === 'z')[0]?.isChecked

    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (
        <div className="tw-text-gray-700 text-sm">
            <button className="tw-mb-4 tw-flex tw-items-center tw-bg-blue-800 tw-text-white tw-py-1 tw-px-5 tw-rounded hover:tw-shadow-md active:tw-bg-blue-700 focus:tw-outline-none tw-transition-colors tw-text-15px" onClick={handlePrint}>
                <span className="tw-text-sm">Хэвлэх болон PDF-ээр татах</span>
                <PrintSVG className="tw-w-5 tw-h-5 tw-ml-2" />
            </button>

            <Pdf targetRef={componentRef} filename="code-example.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
            </Pdf>

            <div className="tw-mx-auto" ref={componentRef}>
                <div className="tw-text-center tw-text-base tw-font-medium tw-mt-4 tw-mb-8">
                    Бизнес шинжээчийн шинжилгээний тайлан
                </div>

                <div className="tw-p-1">
                    Шинжилгээ хийсэн Бизнес шинжээч:
                    <span className="tw-font-bold tw-ml-2">Zultsetseg</span>
                </div>
                <div className="tw-p-1">
                    Шинжилгээ, дүгнэлт хийсэн хугацаа:
                    <span className="tw-font-bold tw-ml-2 tw-mr-1">{info.check_start?.replaceAll('-', '.')}</span>
                    -аас
                    <span className="tw-font-bold tw-mx-1">{info.check_end?.replaceAll('-', '.')}</span>
                    -ны хооронд.
                </div>
                <div className="tw-p-1">
                    Байгууллагын нэр:
                    <span className="tw-font-bold tw-ml-2">{project.company_name}</span>
                </div>
                <div className="tw-p-1">
                    Төслийн нэр:
                    <span className="tw-font-bold tw-ml-2">{project.project_name}</span>
                </div>
                <div className="tw-p-1">
                    Өргөдлийн дугаар:
                    <span className="tw-font-bold tw-ml-2">{project.id}</span>
                </div>
                <div className="tw-p-1">
                    {isCheckedZ ? 'Төслийг хэрэгжүүлэх явцад анхаарах зөвлөмж:' : 'Төслийг дэмжихээс татгалзсан шалтгаан:'}
                </div>
                <div className="tw-py-1 tw-px-2 tw-mb-4 tw-bg-blue-50 tw-rounded tw-mx-3">
                    <div dangerouslySetInnerHTML={isCheckedZ ? { __html: info.accept_tips } : { __html: info.decline_reason }} style={{ minHeight: 20 }} />
                </div>

                {rows.map(row => ({
                    'z': <Fragment key={row.rowcode}>
                        <div className="tw-bg-blue-900 tw-text-white tw-flex tw-border tw-border-gray-400" id="no-break">
                            <div className="tw-flex-grow tw-p-2 tw-pl-3 tw-border-r tw-border-gray-400">
                                {row.description}
                            </div>
                            <div className="tw-w-24 tw-py-2 tw-flex tw-justify-center tw-items-center tw-flex-shrink-0 tw-font-medium">
                                {row.isChecked ? 'Тэнцсэн' : 'Тэнцээгүй'}
                            </div>
                        </div>
                        {row.comment &&
                            <div className="tw-px-4 tw-py-2 tw-border tw-border-t-0 tw-border-gray-400 tw-text-right tw-italic" id="no-break">
                                ({row.comment})
                            </div>
                        }
                    </Fragment>,
                }[row.rowcode] || <Fragment key={row.rowcode}>
                        <div className="tw-flex tw-border tw-border-t-0 tw-border-gray-400" id="no-break">
                            <div className={`tw-flex-grow tw-p-2 ${['a', 'b', 'c'].includes(row.rowcode) ? 'tw-pl-3' : 'tw-pl-5'} tw-border-r tw-border-gray-400`}>
                                {row.description}
                            </div>
                            <div className="tw-w-24 tw-py-2 tw-flex tw-justify-center tw-items-center tw-flex-shrink-0 tw-font-medium">
                                {row.isChecked ? 'Тийм' : 'Үгүй'}
                            </div>
                        </div>
                        {row.comment &&
                            <div className="tw-px-4 tw-py-2 tw-border tw-border-t-0 tw-border-gray-400 tw-text-right tw-italic" id="no-break">
                                ({row.comment})
                            </div>
                        }
                    </Fragment>
                ))}
            </div>
        </div>
    )
}