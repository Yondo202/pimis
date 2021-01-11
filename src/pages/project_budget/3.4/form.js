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
            <h3 className="text-gray-600 font-semibold ml-4 mb-4">3.4 Өөрийн үнэлгээ буюу нөхцөл байдлын үнэлгээ</h3>
            <h3 className="text-gray-600 font-semibold ml-4 mb-1">Аж ахуйн нэгжийн SWOT үнэлгээ.</h3>
            <p className="text-sm italic opacity-80 mb-4 ml-4">Ач холбогдлын зэргээг нь жагсаана уу.</p>

            <form onSubmit={handleSubmit}>
                <div className="rounded-lg shadow-md min-w-min w-11/12 max-w-5xl mb-20 mx-auto text-sm pb-10">
                    <div className="w-full rounded-t-lg font-semibold bg-gray-100 h-12 flex border-b">
                        <p className="font-semibold self-center ml-4">Байгууллагын дотоод асуудал:</p>
                    </div>

                    <div className="w-full flex items-center bg-gray-100">
                        <p className="italic opacity-80 ml-4 py-3">Аж ахуйн нэгжийн холбогдох давуу талыг бичнэ үү. Бусад хэсгүүдээс илүү сайн гэж бодож байгаа хэсгүүдээ дурьдана уу:</p>
                    </div>

                    {
                        swot.strength_swot.map((item, i) =>
                            <div className="flex items-center border-b border-dashed" key={i}>
                                <FormTextarea label={`Давуу тал ${i + 1}.`} value={swot.strength_swot[i].description} name="strength_swot" id={i} onChange={handleInput} />
                                <button className="mr-3 focus:outline-none text-red-500 active:text-red-600 active:bg-red-200 rounded-md" onClick={() => handleRemove('strength_swot', i)}>
                                    <CloseSVG className="w-5 h-5" />
                                </button>
                            </div>
                        )
                    }

                    {
                        swot.strength_swot.length < 5 && <button className="float-right mr-2 my-1 text-green-500 active:text-green-600 focus:outline-none" onClick={() => handleAdd('strength_swot')}>
                            <PlusCircleSVG className="w-8 h-8" />
                        </button>
                    }
                    <span className="text-xs italic opacity-80 mr-3 my-3 float-right">{swot.strength_swot.length}/5</span>

                    <div className="w-full flex items-center bg-gray-100">
                        <p className="italic opacity-80 ml-4 py-3">Аж ахуйн нэгжийн өсөлтийг сааруулж болох дотоод асуудлуудыг бичнэ үү (ЭДТ-ийн анхааралдаа авч болох):</p>
                    </div>

                    {
                        swot.weakness_swot.map((item, i) =>
                            <div className="flex items-center border-b border-dashed" key={i}>
                                <FormTextarea label={`Сул тал ${i + 1}.`} value={swot.weakness_swot[i].description} name="weakness_swot" id={i} onChange={handleInput} />
                                <button className="mr-3 focus:outline-none text-red-500 active:text-red-600 active:bg-red-200 rounded-md" onClick={() => handleRemove('weakness_swot', i)}>
                                    <CloseSVG className="w-5 h-5" />
                                </button>
                            </div>
                        )
                    }

                    {
                        swot.weakness_swot.length < 5 && <button className="float-right mr-2 my-1 text-green-500 active:text-green-600 focus:outline-none" onClick={() => handleAdd('weakness_swot')}>
                            <PlusCircleSVG className="w-8 h-8" />
                        </button>
                    }
                    <span className="text-xs italic opacity-80 mr-3 my-3 float-right">{swot.weakness_swot.length}/5</span>
                </div>

                <div className="rounded-lg shadow-md min-w-min w-11/12 max-w-5xl mb-20 mx-auto text-sm pb-10">
                    <div className="w-full rounded-t-lg font-semibold bg-gray-100 h-12 flex border-b">
                        <p className="font-semibold self-center ml-4">Байгууллагын гадаад асуудал:</p>
                    </div>

                    <div className="w-full flex items-center bg-gray-100">
                        <p className="italic opacity-80 ml-4 py-3">Аж ахуйн нэгжийн бизнесийг өсгөж болох боломжуудыг бичнэ үү (ЭДТ-ийн дэмжлэгтэйгээр хөгжүүлж, эсвэл олж авахыг хүсч буй):</p>
                    </div>

                    {
                        swot.opportunity_swot.map((item, i) =>
                            <div className="flex items-center border-b border-dashed" key={i}>
                                <FormTextarea label={`Боломж ${i + 1}.`} value={swot.opportunity_swot[i].description} name="opportunity_swot" id={i} onChange={handleInput} />
                                <button className="mr-3 focus:outline-none text-red-500 active:text-red-600 active:bg-red-200 rounded-md" onClick={() => handleRemove('opportunity_swot', i)}>
                                    <CloseSVG className="w-5 h-5" />
                                </button>
                            </div>
                        )
                    }

                    {
                        swot.opportunity_swot.length < 5 && <button className="float-right mr-2 my-1 text-green-500 active:text-green-600 focus:outline-none" onClick={() => handleAdd('opportunity_swot')}>
                            <PlusCircleSVG className="w-8 h-8" />
                        </button>
                    }
                    <span className="text-xs italic opacity-80 mr-3 my-3 float-right">{swot.opportunity_swot.length}/5</span>

                    <div className="w-full h-12 flex items-center bg-gray-100">
                        <p className="italic opacity-80 ml-4 py-1">Аж ахуйн нэгжийн өсөлт, эсвэл оршин тогтнолд заналхийлж буй гадаад аюулыг бичнэ үү:</p>
                    </div>

                    {
                        swot.threat_swot.map((item, i) =>
                            <div className="flex items-center border-b border-dashed" key={i}>
                                <FormTextarea label={`Аюул ${i + 1}.`} value={swot.threat_swot[i].description} name="threat_swot" id={i} onChange={handleInput} />
                                <button className="mr-3 focus:outline-none text-red-500 active:text-red-600 active:bg-red-200 rounded-md" onClick={() => handleRemove('threat_swot', i)}>
                                    <CloseSVG className="w-5 h-5" />
                                </button>
                            </div>
                        )
                    }

                    {
                        swot.threat_swot.length < 5 && <button className="float-right mr-2 my-1 text-green-500 active:text-green-600 focus:outline-none" onClick={() => handleAdd('threat_swot')}>
                            <PlusCircleSVG className="w-8 h-8" />
                        </button>
                    }
                    <span className="text-xs italic opacity-80 mr-3 my-3 float-right">{swot.threat_swot.length}/5</span>
                </div>
            </form>
        </>
    )
}

export default ProjectBudget4
