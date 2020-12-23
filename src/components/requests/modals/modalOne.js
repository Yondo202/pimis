

import React, {useContext} from 'react'
import HelperContext from '../../../context/HelperContext'

function ModalOne() {
    const HelpContext = useContext(HelperContext);
    console.log(HelpContext.tableSee.tableOneData, "1 this my helper global context");
    return (
        <>
            <h1>dadadada</h1>
        </>
    )
}

export default ModalOne
