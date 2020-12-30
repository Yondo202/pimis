import React,{useState} from "react";
import axios from "../axiosbase";


const HelperContext = React.createContext();

const initialSee = { tableOneData : {}, tableTwoData: {}, tableThree : {}, tableFour : {} }

export const HelpStore = (props) =>{

    const [ tableSee, setTableSee ] = useState(initialSee);
    const [ tableId, setTableId ] = useState(null);
    
    const TableControl = (valueOne)=>{
        setTableSee({tableOneData: valueOne});
    }
    const TableIdControl = (tableId) => {
        console.log(tableId, " $$ global tableID $$");
        setTableId(tableId);
    }

    return (
       <HelperContext.Provider
        value = {{
             tableSee,
             TableControl,
             TableIdControl,
             tableId
        }}
        >
       {props.children}    
       </HelperContext.Provider> 

    )
}

export default HelperContext;