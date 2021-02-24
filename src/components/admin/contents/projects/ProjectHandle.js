import React, { useContext, useEffect, useRef, useState } from 'react'
import DataGrid, { Column, FilterRow, HeaderFilter, Paging, Scrolling, SearchPanel } from 'devextreme-react/data-grid'
import axios from 'axiosbase'
import getLoggedUserToken from 'components/utilities/getLoggedUserToken'
import EditDropdown from './editDropdown'
import UrgudulContext from 'components/utilities/urgudulContext'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
import './dataGrid.css'


export default function ProjectHandle() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('pps-infos/registered-companies', {
            headers: { 'Authorization': getLoggedUserToken() }
        }).then(res => {
            console.log(res.data)
            setData(res.data.data)
        }).catch(err => {
            console.log(err.response?.data)
        })
    }, [])

    const containerRef = useRef()

    const [width, setWidth] = useState()

    useEffect(() => {
        const handleResize = () => {
            setWidth(containerRef.current?.clientWidth)
        }
        if (width === undefined) handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [containerRef])

    const UrgudulCtx = useContext(UrgudulContext)
    const AlertCtx = useContext(AlertContext)

    const history = useHistory()

    const handleEditProject = (id) => {
        axios.get(`projects/${id}`, {
            headers: {
                'Authorization': getLoggedUserToken(),
            }
        }).then(res => {
            console.log(res.data)
            UrgudulCtx.setData(res.data.data)
            AlertCtx.setAlert({ open: true, variant: 'success', msg: 'Маягтын мэдээллийг амжилттай уншлаа.' })
            history.push('/urgudul/1')
        }).catch(err => {
            console.log(err.response?.data)
            AlertCtx.setAlert({ open: true, variant: 'error', msg: 'Маягтын мэдээллийг уншиж чадсангүй.' })
        })
    }

    return (
        <div className="tw-text-sm tw-text-gray-700" ref={containerRef}>
            <div className="tw-p-2 tw-text-lg tw-font-medium tw-mb-6">
                Дэмжлэг хүссэн өргөдлийн маягтууд
            </div>

            <DataGrid
                elementAttr={{ id: 'gridContainer' }}
                dataSource={data}
                showBorders={true}
                wordWrapEnabled={true}
                rowAlternationEnabled={true}
                columnAutoWidth={true}
                width={width && `${width - 2}px`}
            >
                <SearchPanel visible={true} width={240} placeholder="Хайх..." />
                <Scrolling mode="standart" columnRenderingMode="standart" showScrollbar="onHover" />
                <Paging enabled={false} />
                <HeaderFilter visible={true} />
                <FilterRow visible={true} />

                <Column dataField="companyname" caption="ААН нэр" headerCellRender={HeaderCell} />
                <Column dataField="companyregister" caption="ААН регистерийн дугаар" headerCellRender={HeaderCell} />
                <Column dataField="criteria" caption="Байгаль орчны шалгуур хангалт" headerCellRender={HeaderCell} />
                <Column dataField="esq" caption="Байгаль орчны үнэлгээ" headerCellRender={HeaderCell} />
                <Column dataField="esm" caption="Байгаль орчны үнэлгээ" headerCellRender={HeaderCell} />
                <Column dataField="letterOfInterst" caption="Сонирхол илэрхийлэх албан тоот" headerCellRender={HeaderCell} />

                <Column caption="Өргөдлийн маягт" headerCellRender={HeaderCellFirst}>
                    <Column dataField="project.project_type_name" caption="Төслийн төрөл" headerCellRender={HeaderCell} />
                    <Column dataField="project.project_name" caption="Төслийн нэр" headerCellRender={HeaderCell} />
                    <Column dataField="project.project_number" caption="Төслийн дугаар" headerCellRender={HeaderCell} />
                    <Column dataField="project.confirmed" caption="Баталгаажсан эсэх" headerCellRender={HeaderCell} />
                    <Column dataField="project.project_start" caption="Эхлэх хугацаа" headerCellRender={HeaderCell} />
                    <Column dataField="project.project_end" caption="Дуусах хугацаа" headerCellRender={HeaderCell} />
                </Column>

                <Column dataField="evidence" caption="Нотлох бичиг баримтууд" headerCellRender={HeaderCell} />
                <Column dataField="edpPlan" caption="Экспорт хөгжлийн төлөвлөгөө" headerCellRender={HeaderCell} />
                <Column dataField="firstEvalution.description" caption="Анхан шатны үнэлгээ" headerCellRender={HeaderCell} />
                <Column dataField="lastEvalution.description" caption="Сүүлийн шатны үнэлгээ" headerCellRender={HeaderCell} />
                <Column caption="Үйлдэл" cellRender={data => <EditDropdown data={data} handleEditProject={handleEditProject} />} headerCellRender={HeaderCell} width={124} />
            </DataGrid>
        </div>
    )
}

const HeaderCell = (data) => (
    <div className="tw-text-center tw-font-medium tw-text-gray-700 tw-text-sm">
        {data.column.caption}
    </div>
)

const HeaderCellFirst = (data) => (
    <div className="tw-font-medium tw-text-gray-700 tw-text-sm tw-pl-4">
        {data.column.caption}
    </div>
)