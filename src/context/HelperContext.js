import React,{useState} from "react";
import axios from "../axiosbase";


const HelperContext = React.createContext();

const initialSee = { tableOneData : {}, tableTwoData: {}, tableThree : {}, tableFour : {} }

export const HelpStore = (props) =>{

    const [ tableSee, setTableSee ] = useState(initialSee);
    
    const TableControl = (valueOne)=>{
        setTableSee({tableOneData: valueOne});
    }

    return (
       <HelperContext.Provider
        value = {{
             tableSee,
             TableControl
        }}
        >
       {props.children}    
       </HelperContext.Provider> 

    )
}

export default HelperContext;