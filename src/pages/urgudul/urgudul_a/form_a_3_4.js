import React, { useState } from 'react'
import HelpPopup from 'components/helpModal/helpPopup'
import FormRichText from 'components/urgudul_components/formRichText'


const initialState = {
    companies_overview: '',
    companies_experience: '',
}

function UrgudulOverview() {
    const [form, setForm] = useState(initialState)

    return (
        <div className="tw-mt-8 tw-py-2 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2">A1</span>
                - Өргөдөл гаргагч

                {
                    'cluster_' && <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Кластерын тэргүүлэх аж ахуйн нэгжийн хувиар бөглөнө үү." position="bottom" />
                }
            </div>

            <h1>A33333333333333333333</h1>

            <FormRichText />

            <div className="tw-font-medium tw-p-3 tw-flex tw-items-center">
                <span className="tw-text-blue-500 tw-text-xl tw-mx-2">A1</span>
                - Өргөдөл гаргагч

                {
                    'cluster_' && <HelpPopup classAppend="tw-ml-auto tw-mr-2 sm:tw-ml-12" main="Кластерын тэргүүлэх аж ахуйн нэгжийн хувиар бөглөнө үү." position="bottom" />
                }
            </div>

            <h1>A4444444444444444444</h1>
        </div>
    )
}

export default UrgudulOverview
