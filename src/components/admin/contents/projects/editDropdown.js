import { DropDownButton } from 'devextreme-react'
import React, { useContext } from 'react'
import AlertContext from 'components/utilities/alertContext'
import { useHistory } from 'react-router-dom'
// import './dataGrid.css'


const items = [
    { id: 1, name: 'Өргөдлийн маягтыг харах', icon: 'search' },
    { id: 2, name: 'Өргөдлийн маягтыг засах', icon: 'edit' },
    { id: 3, name: 'Өргөдлийн маягтыг устгах', icon: 'trash' },
    { id: 4, name: 'Үнэлгээний хорооны гишүүд томилох', icon: 'user' },
]

export default function EditDropdown(props) {
    const AlertCtx = useContext(AlertContext)

    const handleItemClick = (e) => {
        const projectId = props.data.data.project?.id
        const project = props.data.data.project

        switch (e.itemData.id) {
            case items[0].id:
                projectId ? props.setPreviewModal({ open: true, id: projectId })
                    : AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Энэ ААН нь өргөдлийн маягт үүсгээгүй байна.' })
                break
            case items[1].id:
                projectId ? props.handleEditProject(props.data.data.project?.id)
                    : AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Энэ ААН нь өргөдлийн маягт үүсгээгүй байна.' })
                break
            case items[2].id:
                break
            case items[3].id:
                projectId ? props.setEvaluatorsModal({ open: true, project: project })
                    : AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Энэ ААН нь өргөдлийн маягт үүсгээгүй байна.' })
                break
            default:
                break
        }
    }

    const history = useHistory()

    const handleButtonClick = () => {
        history.push(`progress/${props.data.data.userId}`)
    }

    console.log('component rerendered ********')

    return (
        <DropDownButton
            splitButton={true}
            useSelectMode={false}
            text="Явцыг харах"
            elementAttr={{ id: 'dropdown-button' }}
            dropDownOptions={{ width: '270px' }}
            items={items}
            displayExpr="name"
            keyExpr="id"
            onButtonClick={handleButtonClick}
            onItemClick={handleItemClick}
            width={110}
        />
    )
}