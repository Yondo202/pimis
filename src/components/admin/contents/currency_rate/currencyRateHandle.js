import React, { useContext, useEffect, useState } from 'react'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import AlertContext from 'components/utilities/alertContext'
import { DataGrid } from 'devextreme-react'
import { Column, Editing, HeaderFilter, Paging, Scrolling } from 'devextreme-react/data-grid'

export default function CurrencyRateHandle() {
    const [rates, setRates] = useState([])

    const AlertCtx = useContext(AlertContext)

    useEffect(() => {
        axios.get('currency-rates').then(res => {
            setRates(res.data.data)
        }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Ханшийн мэдээллийг татаж чадсангүй.' })
        })
    }, [])

    const onRowInserted = (e) => {
        axios.post('currency-rates', e.data, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            setRates(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Ханшийн мэдээллийг хадгаллаа.' })
        }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Ханшийн мэдээллийг нэмж чадсангүй.' })
            axios.get('currency-rates').then(res => {
                setRates(res.data.data)
            })
        })
    }

    const onRowUpdated = (e) => {
        axios.put('currency-rates', e.data, {
            headers: { Authorization: getLoggedUserToken() },
        }).then(res => {
            setRates(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Ханшийн мэдээллийг өөрчиллөө.' })
        }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Ханшийн мэдээллийг өөрчилж чадсангүй.' })
            axios.get('currency-rates').then(res => {
                setRates(res.data.data)
            })
        })
    }

    const onRowRemoved = (e) => {
        axios.delete('currency-rates', {
            headers: { Authorization: getLoggedUserToken() },
            params: { id: e.data.id },
        }).then(res => {
            setRates(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Ханшийн мэдээллийг устгалаа.' })
        }).catch(err => {
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Ханшийн мэдээллийг устгаж чадсангүй.' })
            axios.get('currency-rates').then(res => {
                setRates(res.data.data)
            })
        })
    }

    return (
        <div className="tw-text-gray-700 tw-text-sm tw-pb-10">
            <div className="tw-p-4 tw-pt-0 tw-bg-white tw-rounded tw-shadow-md tw-max-w-2xl">
                <div className="tw-text-lg tw-font-medium tw-p-2 tw-pt-8 tw-text-center">
                    Төслийн тооцоололд хэрэглэгдэх ханшийн мэдээллийг оруулах
                </div>

                <DataGrid
                    dataSource={rates}
                    showBorders={true}
                    onRowInserted={onRowInserted}
                    onRowUpdated={onRowUpdated}
                    onRowRemoved={onRowRemoved}
                    rowAlternationEnabled={true}
                    showRowLines={true}
                    showColumnLines={true}
                    columnAutoWidth={true}
                    width={360}
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
                    <Column dataField="eyear" caption="Он" alignment="right" headerCellRender={HeaderCell} customizeText={customizeTextYear} />
                    <Column dataField="usd_to_mnt" caption="Долларын ханш" alignment="right" headerCellRender={HeaderCell} customizeText={customizeTextUSD} />
                </DataGrid>
            </div>
        </div>
    )
}

const HeaderCell = (data) => (
    <div className="tw-text-center tw-font-medium tw-text-gray-700 tw-text-sm tw-inline-flex">
        {data.column.caption}
    </div>
)

const customizeTextYear = (cellinfo) => `${cellinfo.value} он`

const customizeTextUSD = (cellinfo) => `${cellinfo.value} ₮`
