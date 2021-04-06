import React, { useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import PenAltSVG from 'assets/svgComponents/penAltSVG'
import TrashSVG from 'assets/svgComponents/trashSVG'
import PlusSVG from 'assets/svgComponents/plusSVG'
import { Transition } from 'react-spring/renderprops-universal'
import CloseSVG from 'assets/svgComponents/closeSVG'
import { DataGrid } from 'devextreme-react'
import { Column, Editing, HeaderFilter, Lookup, Paging, Scrolling } from 'devextreme-react/data-grid'
import './dataGrid.css'


export default function AcceptPeriodHandle() {
    const [periods, setPeriods] = useState([])

    useEffect(() => {
        axios.get('accept-periods', {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            console.log(res)
            setPeriods(res.data.data)
        }).catch(err => console.error(err.response))
    }, [])

    const handleAddPeriod = () => {
        setModal({
            type: 'add',
            period: {
                eyear: '',
                quarter: '',
                start_date: '',
                end_date: '',
            }
        })
    }

    const handleEditPeriod = (period) => {
        setModal({
            type: 'edit',
            period: period,
        })
    }

    const handleDeletePeriod = (id) => {
        axios.delete('accept-periods', {
            headers: { Authorization: getLoggedUserToken() },
            params: { id: id },
        }).then(res => {
            console.log(res)
            setPeriods(res.data.data)
        }).catch(err => console.log(err.response))
    }

    const [modal, setModal] = useState({
        type: '',
        period: {},
    })

    const showModal = modal.type ? true : false

    const handleInputModal = (key, value) => {
        setModal(prev => ({ ...prev, period: { ...prev.period, [key]: value } }))
    }

    const handleCloseModal = () => setModal(prev => ({ ...prev, type: '' }))

    const handleSubmitAdd = () => {
        axios.post('accept-periods', modal.period, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            console.log(res)
            setPeriods(res.data.data)
        }).catch(err => console.error(err.response))
    }

    const handleSubmitEdit = () => {
        axios.put('accept-periods', modal.period, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            console.log(res)
            setPeriods(res.data.data)
        }).catch(err => console.error(err.response))
    }

    const onRowInserted = (e) => {
        axios.post('accept-periods', e.data, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            console.log(res)
            setPeriods(res.data.data)
        }).catch(err => console.error(err.response))
    }

    const onRowUpdated = (e) => {
        axios.put('accept-periods', e.data, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            console.log(res)
            setPeriods(res.data.data)
        }).catch(err => console.error(err.response))
    }

    const onRowRemoved = (e) => {
        axios.delete('accept-periods', {
            headers: { Authorization: getLoggedUserToken() },
            params: { id: e.data.id },
        }).then(res => {
            console.log(res)
            setPeriods(res.data.data)
        }).catch(err => console.log(err.response))
    }

    return (
        <div className="tw-text-sm tw-text-gray-700">
            <div className="tw-text-xl tw-font-medium tw-p-2 tw-mt-2">
                Өргөдөл хүлээж авах нээлттэй хугацааг тохируулах
            </div>

            <div className="tw-inline-flex tw-flex-col">
                <button className="tw-flex tw-items-center tw-self-end" onClick={handleAddPeriod}>
                    <PlusSVG className="tw-w-5 tw-h-5" />
                    Хугацаа нэмэх
                </button>

                <table className="tw-mt-2" style={{ minWidth: 768 }}>
                    <thead>
                        <tr>
                            <th className="tw-border">Д/д</th>
                            <th className="tw-border">Жил</th>
                            <th className="tw-border">Улирал</th>
                            <th className="tw-border">Эхлэх хугацаа</th>
                            <th className="tw-border">Дуусах хугацаа</th>
                            <th className="tw-border">Үйлдэл</th>
                        </tr>
                    </thead>
                    <tbody>
                        {periods.map((period, i) =>
                            <tr className="" key={period.id}>
                                <td className="tw-border">{i + 1}</td>
                                <td className="tw-border">{period.eyear}</td>
                                <td className="tw-border">{period.quarter}</td>
                                <td className="tw-border">{period.start_date}</td>
                                <td className="tw-border">{period.end_date}</td>
                                <td className="tw-border">
                                    <button onClick={() => handleEditPeriod(period)}>
                                        <PenAltSVG className="tw-w-5 tw-h-5" />
                                    </button>
                                    <button onClick={() => handleDeletePeriod(period.id)}>
                                        <TrashSVG className="tw-w-5 tw-h-5" />
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Transition
                items={showModal}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {item => item && (anims =>
                    <div className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-700 tw-bg-opacity-80 tw-z-10 tw-p-2 sm:tw-p-8" style={anims}>
                        <div className="tw-bg-white tw-px-4 tw-relative">
                            <button className="tw-absolute tw-top-1 tw-right-1" onClick={handleCloseModal}>
                                <CloseSVG className="tw-w-5 tw-h-5" />
                            </button>
                            <div className="">
                                <div className="">
                                    Жил
                                </div>
                                <input className="" type="number" value={modal.period.eyear} onChange={e => handleInputModal('eyear', e.target.value)} />
                            </div>
                            <div className="">
                                <div className="">
                                    Улирал
                                </div>
                                <input className="" type="number" value={modal.period.quarter} onChange={e => handleInputModal('quarter', e.target.value)} />
                            </div>
                            <div className="">
                                <div className="">
                                    Нээгдэх хугацаа
                                </div>
                                <input className="" type="date" value={modal.period.start_date} onChange={e => handleInputModal('start_date', e.target.value)} />
                            </div>
                            <div className="">
                                <div className="">
                                    Хаагдах хугацаа
                                </div>
                                <input className="" type="date" value={modal.period.end_date} onChange={e => handleInputModal('end_date', e.target.value)} />
                            </div>
                            <div className="">
                                {{
                                    'add': <button onClick={handleSubmitAdd}>
                                        Нэмэх
                                    </button>,
                                    'edit': <button onClick={handleSubmitEdit}>
                                        Засах
                                    </button>
                                }[modal.type]}
                            </div>
                        </div>
                    </div>
                )}
            </Transition>

            <div className="tw-mt-8 tw-p-4 tw-pt-0 tw-bg-white tw-rounded-md tw-shadow tw-inline-flex">
                <DataGrid
                    elementAttr={{ id: 'accept-periods-data-grid' }}
                    dataSource={periods}
                    showBorders={true}
                    onRowInserted={onRowInserted}
                    onRowUpdated={onRowUpdated}
                    onRowRemoved={onRowRemoved}
                    columnAutoWidth={true}
                    columnWidth="auto"
                    rowAlternationEnabled={true}
                    showRowLines={true}
                    showColumnLines={true}
                >
                    <Scrolling mode="standard" columnRenderingMode="standard" showScrollbar="always" />
                    <Paging defaultPageSize={20} />
                    <HeaderFilter visible={true} />
                    <Editing
                        mode="row"
                        allowUpdating={true}
                        allowDeleting={true}
                        allowAdding={true} />

                    <Column dataField="eyear" caption="Жил" alignment="right" minWidth={120} headerCellRender={HeaderCell} />
                    <Column dataField="quarter" caption="Улирал" alignment="right" minWidth={120} headerCellRender={HeaderCell}>
                        <Lookup dataSource={quarters} displayExpr="Name" valueExpr="id" minWidth={120} headerCellRender={HeaderCell} />
                    </Column>
                    <Column dataField="start_date" dataType="date" caption="Нээгдэх хугацаа" alignment="right" minWidth={120} headerCellRender={HeaderCell} />
                    <Column dataField="end_date" dataType="date" caption="Хаагдах хугацаа" alignment="right" minWidth={120} headerCellRender={HeaderCell} />
                </DataGrid>
            </div>
        </div>
    )
}

const quarters = [{
    id: 1,
    Name: 'I улирал',
}, {
    id: 2,
    Name: 'II улирал',
}, {
    id: 3,
    Name: 'III улирал',
}, {
    id: 4,
    Name: 'IV улирал',
}]

const HeaderCell = (data) => (
    <div className="tw-text-center tw-font-medium tw-text-gray-700 tw-text-sm">
        {data.column.caption}
    </div>
)