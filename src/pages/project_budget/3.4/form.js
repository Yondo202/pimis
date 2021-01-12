import React, { useContext, useEffect } from 'react'
import PlusCircleSVG from 'assets/svgComponents/plusCircleSVG'
import FormTextarea from 'components/form_textarea/formTextarea'
import CloseSVG from 'assets/svgComponents/closeSVG'
import UrgudulContext from 'components/utilities/urgudulContext'


const newField = {
    description: '',
}

function ProjectBudget4(props) {
    const UrgudulCtx = useContext(UrgudulContext)
    const data = UrgudulCtx.data
    const setData = UrgudulCtx.setData
    const swot = UrgudulCtx.data.applicationDetail4s

    const handleInput = (e) => {
        const newArray = [...swot[e.target.name]]
        newArray[e.target.id].description = e.target.value
        setData({ ...data, applicationDetail4s: { ...swot, [e.target.name]: newArray } })
    }

    useEffect(() => {
        const newSwot = { ...swot }
        if (swot.strength_swot.length === 0) newSwot.strength_swot = [{ ...newField }]
        if (swot.weakness_swot.length === 0) newSwot.weakness_swot = [{ ...newField }]
        if (swot.opportunity_swot.length === 0) newSwot.opportunity_swot = [{ ...newField }]
        if (swot.threat_swot.length === 0) newSwot.threat_swot = [{ ...newField }]
        setData({ ...data, applicationDetail4s: newSwot })
    }, [])

    const handleAdd = (name) => {
        const newSwot = { ...swot }
        newSwot[name] = [...newSwot[name], { ...newField }]
        setData({ ...data, applicationDetail4s: newSwot })
    }

    const handleRemove = (name, index) => {
        const newSwot = { ...swot }
        newSwot[name] = newSwot[name].filter((_, i) => i !== index)
        setData({ ...data, applicationDetail4s: newSwot })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <h3 className="tw-text-gray-600 tw-font-semibold tw-ml-4 tw-mb-4">3.4 Өөрийн үнэлгээ буюу нөхцөл байдлын үнэлгээ</h3>
            <h3 className="tw-text-gray-600 tw-font-semibold tw-ml-4 tw-mb-1">Аж ахуйн нэгжийн SWOT үнэлгээ.</h3>
            <p className="tw-text-sm tw-italic tw-opacity-80 tw-mb-8 tw-ml-4">Ач холбогдлын зэргээг нь жагсаана уу.</p>

            <form onSubmit={handleSubmit}>
                <div className="tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mb-20 tw-mx-auto tw-text-sm tw-pb-10 tw-border-t tw-bg-white">
                    <div className="tw-w-full tw-rounded-t-lg tw-font-semibold tw-bg-gray-100 tw-h-12 tw-flex tw-border-b">
                        <p className="tw-font-semibold tw-self-center tw-ml-4">Байгууллагын дотоод асуудал:</p>
                    </div>

                    <div className="tw-w-full tw-flex tw-items-center tw-bg-gray-100">
                        <p className="tw-italic tw-opacity-80 tw-ml-4 tw-py-3">Аж ахуйн нэгжийн холбогдох давуу талыг бичнэ үү. Бусад хэсгүүдээс илүү сайн гэж бодож байгаа хэсгүүдээ дурьдана уу:</p>
                    </div>

                    {
                        swot.strength_swot.map((item, i) =>
                            <div className="tw-flex tw-items-center tw-border-b tw-border-dashed" key={i}>
                                <FormTextarea label={`Давуу тал ${i + 1}.`} value={swot.strength_swot[i].description} name="strength_swot" id={i} onChange={handleInput} />
                                <button className="tw-mr-3 focus:tw-outline-none tw-text-red-500 active:tw-text-red-600 active:tw-bg-red-200 tw-rounded-md" onClick={() => handleRemove('strength_swot', i)}>
                                    <CloseSVG className="tw-w-5 tw-h-5" />
                                </button>
                            </div>
                        )
                    }

                    {
                        swot.strength_swot.length < 5 && <button className="tw-float-right tw-mr-2 tw-my-1 tw-text-green-500 active:tw-text-green-600 focus:tw-outline-none" onClick={() => handleAdd('strength_swot')}>
                            <PlusCircleSVG className="tw-w-8 tw-h-8" />
                        </button>
                    }
                    <span className="tw-text-xs tw-italic tw-opacity-80 tw-mr-3 tw-my-3 tw-float-right">{swot.strength_swot.length}/5</span>

                    <div className="tw-w-full tw-flex tw-items-center tw-bg-gray-100">
                        <p className="tw-italic tw-opacity-80 tw-ml-4 tw-py-3">Аж ахуйн нэгжийн өсөлтийг сааруулж болох дотоод асуудлуудыг бичнэ үү (ЭДТ-ийн анхааралдаа авч болох):</p>
                    </div>

                    {
                        swot.weakness_swot.map((item, i) =>
                            <div className="tw-flex tw-items-center tw-border-b tw-border-dashed" key={i}>
                                <FormTextarea label={`Сул тал ${i + 1}.`} value={swot.weakness_swot[i].description} name="weakness_swot" id={i} onChange={handleInput} />
                                <button className="tw-mr-3 focus:tw-outline-none tw-text-red-500 active:tw-text-red-600 active:tw-bg-red-200 tw-rounded-md" onClick={() => handleRemove('weakness_swot', i)}>
                                    <CloseSVG className="tw-w-5 tw-h-5" />
                                </button>
                            </div>
                        )
                    }

                    {
                        swot.weakness_swot.length < 5 && <button className="tw-float-right tw-mr-2 tw-my-1 tw-text-green-500 active:tw-text-green-600 focus:tw-outline-none" onClick={() => handleAdd('weakness_swot')}>
                            <PlusCircleSVG className="tw-w-8 tw-h-8" />
                        </button>
                    }
                    <span className="tw-text-xs tw-italic tw-opacity-80 tw-mr-3 tw-my-3 tw-float-right">{swot.weakness_swot.length}/5</span>
                </div>

                <div className="tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mb-20 tw-mx-auto tw-text-sm tw-pb-10 tw-border-t tw-bg-white">
                    <div className="tw-w-full tw-rounded-t-lg tw-font-semibold tw-bg-gray-100 tw-h-12 tw-flex tw-border-b">
                        <p className="tw-font-semibold tw-self-center tw-ml-4">Байгууллагын гадаад асуудал:</p>
                    </div>

                    <div className="tw-w-full tw-flex tw-items-center tw-bg-gray-100">
                        <p className="tw-italic tw-opacity-80 tw-ml-4 tw-py-3">Аж ахуйн нэгжийн бизнесийг өсгөж болох боломжуудыг бичнэ үү (ЭДТ-ийн дэмжлэгтэйгээр хөгжүүлж, эсвэл олж авахыг хүсч буй):</p>
                    </div>

                    {
                        swot.opportunity_swot.map((item, i) =>
                            <div className="tw-flex tw-items-center tw-border-b tw-border-dashed" key={i}>
                                <FormTextarea label={`Боломж ${i + 1}.`} value={swot.opportunity_swot[i].description} name="opportunity_swot" id={i} onChange={handleInput} />
                                <button className="tw-mr-3 focus:tw-outline-none tw-text-red-500 active:tw-text-red-600 active:tw-bg-red-200 tw-rounded-md" onClick={() => handleRemove('opportunity_swot', i)}>
                                    <CloseSVG className="tw-w-5 tw-h-5" />
                                </button>
                            </div>
                        )
                    }

                    {
                        swot.opportunity_swot.length < 5 && <button className="tw-float-right tw-mr-2 tw-my-1 tw-text-green-500 active:tw-text-green-600 focus:tw-outline-none" onClick={() => handleAdd('opportunity_swot')}>
                            <PlusCircleSVG className="tw-w-8 tw-h-8" />
                        </button>
                    }
                    <span className="tw-text-xs tw-italic tw-opacity-80 tw-mr-3 tw-my-3 tw-float-right">{swot.opportunity_swot.length}/5</span>

                    <div className="tw-w-full tw-h-12 tw-flex tw-items-center tw-bg-gray-100">
                        <p className="tw-italic tw-opacity-80 tw-ml-4 tw-py-1">Аж ахуйн нэгжийн өсөлт, эсвэл оршин тогтнолд заналхийлж буй гадаад аюулыг бичнэ үү:</p>
                    </div>

                    {
                        swot.threat_swot.map((item, i) =>
                            <div className="tw-flex tw-items-center tw-border-b tw-border-dashed" key={i}>
                                <FormTextarea label={`Аюул ${i + 1}.`} value={swot.threat_swot[i].description} name="threat_swot" id={i} onChange={handleInput} />
                                <button className="tw-mr-3 focus:tw-outline-none tw-text-red-500 active:tw-text-red-600 active:tw-bg-red-200 tw-rounded-md" onClick={() => handleRemove('threat_swot', i)}>
                                    <CloseSVG className="tw-w-5 tw-h-5" />
                                </button>
                            </div>
                        )
                    }

                    {
                        swot.threat_swot.length < 5 && <button className="tw-float-right tw-mr-2 tw-my-1 tw-text-green-500 active:tw-text-green-600 focus:tw-outline-none" onClick={() => handleAdd('threat_swot')}>
                            <PlusCircleSVG className="tw-w-8 tw-h-8" />
                        </button>
                    }
                    <span className="tw-text-xs tw-italic tw-opacity-80 tw-mr-3 tw-my-3 tw-float-right">{swot.threat_swot.length}/5</span>
                </div>
            </form>
        </>
    )
}

export default ProjectBudget4
