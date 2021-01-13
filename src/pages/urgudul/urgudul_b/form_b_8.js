import React, { useState } from 'react'


const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const dates = [
    `${year - 2}/${month}`,
    `${year - 1}/${month}`,
    `${year}/${month}`,
    'project_endDate',
    `${year + 1}/${month}`,
    `${year + 2}/${month}`,
    `${year + 3}/${month}`,
]

const initialState = {
    export: {
        [dates[0]]: '',
        [dates[1]]: '',
        [dates[2]]: '',
        [dates[3]]: '',
        [dates[4]]: '',
        [dates[5]]: '',
        [dates[6]]: '',
    },
    fullTime_workplace: {
        [dates[0]]: '',
        [dates[1]]: '',
        [dates[2]]: '',
        [dates[3]]: '',
        [dates[4]]: '',
        [dates[5]]: '',
        [dates[6]]: '',
    },
    sales: {
        [dates[0]]: '',
        [dates[1]]: '',
        [dates[2]]: '',
        [dates[3]]: '',
        [dates[4]]: '',
        [dates[5]]: '',
        [dates[6]]: '',
    },
    productivity: {
        [dates[0]]: '',
        [dates[1]]: '',
        [dates[2]]: '',
        [dates[3]]: '',
        [dates[4]]: '',
        [dates[5]]: '',
        [dates[6]]: '',
    },
}

function UrgudulCalculations() {
    const [form, setForm] = useState(initialState)

    const handleInput = (e) => {
        setForm({ ...form, [e.target.id]: { ...form[e.target.id], [e.target.name]: e.target.value } })
    }

    return (
        <div className="tw-mt-8 tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-border-t tw-border-gray-100 tw-bg-white tw-divide-y tw-divide-dashed">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>{dates[0]}</th>
                        <th>{dates[1]}</th>
                        <th>{dates[2]}</th>
                        <th>{`Төсөл дуусах хугацаа - ${year}/${month + 9}`}</th>
                        <th>{dates[4]}</th>
                        <th>{dates[5]}</th>
                        <th>{dates[6]}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Экспорт</td>
                        {
                            dates.map((item, i) =>
                                <td key={i}>
                                    <input className="tw-w-20" type="text" value={form.export[item]} name={item} id="export" onChange={handleInput} />
                                </td>
                            )
                        }
                    </tr>
                    <tr>
                        <td>Бүтэн цагийн ажлын байр /НДШ төлдөг/</td>
                        {
                            dates.map((item, i) =>
                                <td key={i}>
                                    <input className="tw-w-20" type="text" value={form.fullTime_workplace[item]} name={item} id="fullTime_workplace" onChange={handleInput} />
                                </td>
                            )
                        }
                    </tr>
                    <tr>
                        <td>Борлуулалт (ААН эсвэл кластер тэргүүлэгч )</td>
                        {
                            dates.map((item, i) =>
                                <td key={i}>
                                    <input className="tw-w-20" type="text" value={form.sales[item]} name={item} id="sales" onChange={handleInput} />
                                </td>
                            )
                        }
                    </tr>
                    <tr>
                        <td>Бүтээмж, гарц</td>
                        {
                            dates.map((item, i) =>
                                <td key={i}>
                                    <input className="tw-w-20" type="text" value={form.productivity[item]} name={item} id="productivity" onChange={handleInput} />
                                </td>
                            )
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UrgudulCalculations
