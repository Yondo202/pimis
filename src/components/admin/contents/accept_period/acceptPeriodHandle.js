import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import PenAltSVG from 'assets/svgComponents/penAltSVG'
import TrashSVG from 'assets/svgComponents/trashSVG'
import PlusSVG from 'assets/svgComponents/plusSVG'
import { Transition } from 'react-spring/renderprops'
import CloseSVG from 'assets/svgComponents/closeSVG'
import { DataGrid } from 'devextreme-react'
import { Column, Editing, HeaderFilter, Lookup, Paging, Scrolling } from 'devextreme-react/data-grid'
import './dataGrid.css'
import AlertContext from 'components/utilities/alertContext'
import { loadMessages } from 'devextreme/localization'


loadMessages({
    "en": {
        "dxDataGrid-editingConfirmDeleteMessage": "Та энэ бичлэгийг устгахдаа итгэлтэй байна уу?",
        "Yes": "Тийм",
        "No": "Үгүй",
        "dxDataGrid-editingEditRow": "Өөрчлөх",
        "dxDataGrid-editingSaveRowChanges": "Хадгалах",
        "dxDataGrid-editingCancelRowChanges": "Болих",
        "dxDataGrid-editingDeleteRow": "Устгах",
        "dxDataGrid-editingAddRow": "Шинээр бичвэр оруулах",
    }
})

export default function AcceptPeriodHandle() {
    const [periods, setPeriods] = useState([])

    useEffect(() => {
        axios.get('accept-periods', {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            console.log(res)
            setPeriods(res.data.data)
        }).catch(err => {
            console.error(err.response)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Нээлттэй хугацааны мэдээллүүдийг татаж чадсангүй.' })
        })
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
        console.log("i am run 😁😁😁")
    }
    console.log('I rerendered 😀😀😀😀')

    const handleEditPeriod = (period) => {
        setModal({
            type: 'edit',
            period: period,
        })
    }

    const handleDeletePeriod = (period) => {
        setModal({
            type: 'delete',
            period: period,
        })
    }

    const [modal, setModal] = useState({
        type: '',
        period: {},
    })

    const addEditModal = ['add', 'edit'].includes(modal.type)

    const deleteModal = modal.type === 'delete'

    const handleInputModal = (key, value) => {
        setModal(prev => ({ ...prev, period: { ...prev.period, [key]: value } }))
    }

    const handleCloseModal = () => setModal(prev => ({ ...prev, type: '' }))

    const AlertCtx = useContext(AlertContext)

    const handleSubmitAdd = () => {
        axios.post('accept-periods', modal.period, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            console.log(res)
            setPeriods(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Нээлттэй хугацааг хадгаллаа.' })
            handleCloseModal()
        }).catch(err => {
            console.error(err.response)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Нээлттэй хугацааг нэмж чадсангүй.' })
            handleCloseModal()
        })
    }

    const handleSubmitEdit = () => {
        axios.put('accept-periods', modal.period, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            console.log(res)
            setPeriods(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Нээлттэй хугацааг өөрчиллөө.' })
            handleCloseModal()
        }).catch(err => {
            console.error(err.response)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Нээлттэй хугацааг өөрчилж чадсангүй.' })
            handleCloseModal()
        })
    }

    const handleButtonAddEdit = () => {
        switch (modal.type) {
            case 'add':
                return handleSubmitAdd()
            case 'edit':
                return handleSubmitEdit()
            default:
        }
    }

    const handleSubmitDelete = () => {
        axios.delete('accept-periods', {
            headers: { Authorization: getLoggedUserToken() },
            params: { id: modal.period.id },
        }).then(res => {
            console.log(res)
            setPeriods(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Нээлттэй хугацааг устгалаа.' })
            handleCloseModal()
        }).catch(err => {
            console.log(err.response)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Нээлттэй хугацааг устгаж чадсангүй.' })
            handleCloseModal()
        })
    }

    const modalRef = useRef()

    const handleClickOutside = (e) => {
        if (modal.type && !modalRef.current?.contains(e.target)) {
            handleCloseModal()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    const onRowInserted = (e) => {
        axios.post('accept-periods', e.data, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            console.log(res)
            setPeriods(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Нээлттэй хугацааг хадгаллаа.' })
        }).catch(err => {
            console.error(err.response)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Нээлттэй хугацааг нэмж чадсангүй.' })
            axios.get('accept-periods', {
                headers: { Authorization: getLoggedUserToken() },
            }).then(res => {
                console.log(res)
                setPeriods(res.data.data)
            }).catch(err => console.error(err.response))
        })
    }

    const onRowUpdated = (e) => {
        axios.put('accept-periods', e.data, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            console.log(res)
            setPeriods(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Нээлттэй хугацааг өөрчиллөө.' })
        }).catch(err => {
            console.error(err.response)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Нээлттэй хугацааг өөрчилж чадсангүй.' })
            axios.get('accept-periods', {
                headers: { Authorization: getLoggedUserToken() },
            }).then(res => {
                console.log(res)
                setPeriods(res.data.data)
            }).catch(err => console.error(err.response))
        })
    }

    const onRowRemoved = async (e) => {
        axios.delete('accept-periods', {
            headers: { Authorization: getLoggedUserToken() },
            params: { id: e.data.id },
        }).then(res => {
            console.log(res)
            setPeriods(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Нээлттэй хугацааг устгалаа.' })
        }).catch(err => {
            console.log(err.response)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Нээлттэй хугацааг устгаж чадсангүй.' })
            axios.get('accept-periods', {
                headers: { Authorization: getLoggedUserToken() },
            }).then(res => {
                console.log(res)
                setPeriods(res.data.data)
            }).catch(err => console.error(err.response))
        })

        // const isCanceled = async () => {
        //     await axios.delete('accept-periodsaaa', {
        //         headers: { Authorization: getLoggedUserToken() },
        //         params: { id: e.data.id },
        //     }).then(res => {
        //         console.log(res)
        //         setPeriods(res.data.data)
        //         AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Нээлттэй хугацааг устгалаа.' })
        //     }).catch(err => {
        //         console.log(err.response)
        //         AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Алдаа гарлаа. Нээлттэй хугацааг устгаж чадсангүй.' })
        //         return true
        //     })
        // }
        // e.cancel = await isCanceled()
    }

    return (
        <div className="tw-text-sm tw-text-gray-700">
            <div className="tw-text-xl tw-font-medium tw-p-2 tw-mt-2">
                Өргөдөл хүлээн авах нээлттэй хугацааг тохируулах
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
                                    <button onClick={() => handleDeletePeriod(period)}>
                                        <TrashSVG className="tw-w-5 tw-h-5" />
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Transition
                items={addEditModal}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {item => item && (anims =>
                    <div className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-700 tw-bg-opacity-80 tw-z-10 tw-p-2 sm:tw-p-8" style={anims}>
                        <div className="tw-bg-white tw-p-4 tw-relative tw-rounded tw-shadow" ref={modalRef}>
                            <button className="tw-absolute tw-top-1.5 tw-right-1.5 tw-text-red-500 active:tw-text-red-600 tw-transition-colors focus:tw-outline-none tw-border tw-border-red-500 tw-rounded active:tw-border-red-600" onClick={handleCloseModal}>
                                <CloseSVG className="tw-w-5 tw-h-5" />
                            </button>
                            <div className="tw-flex tw-p-2 tw-mt-3">
                                <div className="tw-w-40">
                                    Жил:
                                </div>
                                <input className="tw-mx-3 tw-border tw-rounded focus:tw-outline-none" type="number" value={modal.period.eyear} onChange={e => handleInputModal('eyear', e.target.value)} />
                            </div>
                            <div className="tw-flex tw-p-2">
                                <div className="tw-w-40">
                                    Улирал:
                                </div>
                                <input className="tw-mx-3 tw-border tw-rounded focus:tw-outline-none" type="number" value={modal.period.quarter} onChange={e => handleInputModal('quarter', e.target.value)} />
                            </div>
                            <div className="tw-flex tw-p-2">
                                <div className="tw-w-40">
                                    Нээгдэх хугацаа:
                                </div>
                                <input className="tw-mx-3 tw-border tw-rounded focus:tw-outline-none" type="date" value={modal.period.start_date} onChange={e => handleInputModal('start_date', e.target.value)} />
                            </div>
                            <div className="tw-flex tw-p-2">
                                <div className="tw-w-40">
                                    Хаагдах хугацаа:
                                </div>
                                <input className="tw-mx-3 tw-border tw-rounded focus:tw-outline-none" type="date" value={modal.period.end_date} onChange={e => handleInputModal('end_date', e.target.value)} />
                            </div>
                            <div className="tw-flex tw-items-center tw-justify-center">
                                <button className="focus:tw-outline-none tw-mt-4 tw-w-28 tw-h-8 tw-bg-gray-700 tw-text-white active:tw-bg-gray-800 tw-transition-colors tw-rounded" onClick={handleButtonAddEdit}>
                                    {{
                                        'add': 'Нэмэх',
                                        'edit': 'Өөрчлөх',
                                    }[modal.type] || ' '}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Transition>

            <Transition
                items={deleteModal}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {item => item && (anims =>
                    <div className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-700 tw-bg-opacity-80 tw-z-10 tw-p-2 sm:tw-p-8" style={anims}>
                        <div className="tw-bg-white tw-p-4 tw-relative tw-rounded tw-shadow tw-ring-2 tw-ring-red-500" ref={modalRef}>
                            <div className="tw-p-2 tw-text-center" style={{ minWidth: 300 }}>
                                Нээлттэй хугацааг устгах уу?
                            </div>
                            <div className="tw-flex tw-items-center tw-justify-center">
                                <button className="focus:tw-outline-none tw-mt-4 px-4 tw-py-1.5 tw-bg-gray-700 tw-text-white active:tw-bg-gray-800 tw-transition-colors tw-rounded" onClick={handleSubmitDelete}>
                                    Тийм
                                </button>
                                <button className="tw-ml-3 focus:tw-outline-none tw-mt-4 tw-px-4 tw-py-1.5 tw-bg-gray-700 tw-text-white active:tw-bg-gray-800 tw-transition-colors tw-rounded" onClick={handleCloseModal}>
                                    Үгүй
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Transition>

            <div className="tw-mt-8 tw-p-4 tw-pt-0 tw-bg-white tw-rounded-md tw-shadow tw-max-w-2xl">
                <div className="tw-text-xl tw-font-medium tw-p-2 tw-pt-8 tw-text-center">
                    Өргөдөл хүлээн авах нээлттэй хугацааг тохируулах
                </div>

                <DataGrid
                    elementAttr={{ id: 'accept-periods-data-grid' }}
                    dataSource={periods}
                    showBorders={true}
                    onRowInserted={onRowInserted}
                    onRowUpdated={onRowUpdated}
                    onRowRemoved={onRowRemoved}
                    rowAlternationEnabled={true}
                    showRowLines={true}
                    showColumnLines={true}
                    columnAutoWidth={true}
                >
                    <Scrolling mode="standard" columnRenderingMode="standard" showScrollbar="always" />
                    <Paging defaultPageSize={20} />
                    <HeaderFilter visible={true} />
                    <Editing
                        mode="row"
                        allowUpdating={true}
                        allowDeleting={true}
                        allowAdding={true}
                    />
                    <Column dataField="eyear" caption="Жил" alignment="right" headerCellRender={HeaderCell} />
                    <Column dataField="quarter" caption="Улирал" alignment="right" headerCellRender={HeaderCell}>
                        <Lookup dataSource={quarters} displayExpr="name" valueExpr="id" />
                    </Column>
                    <Column dataField="start_date" dataType="date" caption="Нээгдэх хугацаа" alignment="right" headerCellRender={HeaderCell} />
                    <Column dataField="end_date" dataType="date" caption="Хаагдах хугацаа" alignment="right" headerCellRender={HeaderCell} />
                </DataGrid>
            </div>
        </div>
    )
}

const quarters = [{
    id: 1,
    name: 'Q1',
}, {
    id: 2,
    name: 'Q2',
}, {
    id: 3,
    name: 'Q3',
}, {
    id: 4,
    name: 'Q4',
}]

const HeaderCell = (data) => (
    <div className="tw-text-center tw-font-medium tw-text-gray-700 tw-text-sm tw-inline-flex">
        {data.column.caption}
    </div>
)
