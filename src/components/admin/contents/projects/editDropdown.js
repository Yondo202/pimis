import { DropDownButton } from 'devextreme-react'
import React, { useContext } from 'react'
import AlertContext from 'components/utilities/alertContext'


const items = ['Өргөдлийн маягтыг харах', 'Өргөдлийн маягтыг засах', 'Өргөдлийн маягтыг устгах', 'Үнэлгээний хорооны гишүүд томилох']

export default function EditDropdown(props) {
    const AlertCtx = useContext(AlertContext)

    const handleItemClick = (e) => {
        const projectId = props.data.data.project?.id

        switch (e.itemData) {
            case items[0]:
                projectId ? props.setPreviewModal({ open: true, id: projectId })
                    : AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Энэ ААН нь өргөдлийн маягт үүсгээгүй байна.' })
                break
            case items[1]:
                projectId ? props.handleEditProject(props.data.data.project?.id)
                    : AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Энэ ААН нь өргөдлийн маягт үүсгээгүй байна.' })
                break
            case items[2]:
                break
            case items[3]:
                break
            default:
                break
        }
    }

    return (
        <DropDownButton
            text="Үйлдэл"
            icon="edit"
            dropDownOptions={{}}
            items={items}
            onItemClick={handleItemClick}
            width={200}
        />
    )
}