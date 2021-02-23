import { DropDownButton } from 'devextreme-react'
import React, { useContext } from 'react'
import AlertContext from 'components/utilities/alertContext'


const items = ['Засах', 'Үнэлгээний хорооны гишүүд томилох', 'Устгах']

export default function EditDropdown(props) {
    const AlertCtx = useContext(AlertContext)

    const handleItemClick = (e) => {
        switch (e.itemData) {
            case items[0]:
                props.data.data.project?.id ?
                    props.handleEditProject(props.data.data.project?.id) :
                    AlertCtx.setAlert({ open: true, variant: 'normal', msg: 'Энэ ААН нь өргөдлийн маягт үүсгээгүй байна.' })
                break
            case items[1]:
                break
            case items[2]:
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
        />
    )
}