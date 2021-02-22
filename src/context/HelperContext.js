import React,{useEffect, useState} from "react";
import axios from "../axiosbase";

const HelperContext = React.createContext();
const initialStyle ={tableOne: "0%", tableTwo: "100%",tableThree: "200%", tableFour: "300%", tableFive: "400%", tableSix: "500%", tableheight: 150,}
const initialSee = { tableOneData : {}, tableTwoData: {}, tableThree : {}, tableFour : {} }

export const HelpStore = (props) =>{
    const [ tableSee, setTableSee ] = useState(initialSee);
    const [ tableId, setTableId ] = useState(null);
    const [ GlobalStyle, setGlobalStyle ] = useState(initialStyle);
    const [ alert, setAlert ] = useState({ color:'yellow', text: 'null',cond: false });

    useEffect(()=>{
      if(!tableId){ let localId = localStorage.getItem("tableId"); setTableId(localId); }
    },[])

    const TableControl = (valueOne)=>{ setTableSee({tableOneData: valueOne}); }
    const TableIdControl = (tableId) => { setTableId(tableId);}

    const StyleComp = (valueOne,valueTwo, valueThree,valueFour,valueFive,valueSix) =>{
        if(valueOne === "0%"){
          setGlobalStyle({  tableOne: valueOne,tableTwo: valueTwo,  tableThree: valueThree, tableFour : valueFour, tableFive : valueFive, tableSix : valueSix,tableheight: 230});
        }else if(valueTwo === "0%"){
          setGlobalStyle({ tableOne: valueOne,tableTwo: valueTwo,  tableThree: valueThree, tableFour : valueFour, tableFive : valueFive, tableSix : valueSix,tableheight: 450 });
        }else if(valueThree === "0%"){
          setGlobalStyle({tableOne: valueOne,tableTwo: valueTwo,  tableThree: valueThree, tableFour : valueFour, tableFive : valueFive, tableSix : valueSix, tableheight: 300 });
        }else if(valueFour === "0%"){
          setGlobalStyle({ tableOne: valueOne,tableTwo: valueTwo,  tableThree: valueThree, tableFour : valueFour, tableFive : valueFive, tableSix : valueSix, tableheight: 400 });
        }else if(valueFive === "0%"){
          setGlobalStyle({ tableOne: valueOne,tableTwo: valueTwo,  tableThree: valueThree, tableFour : valueFour, tableFive : valueFive, tableSix : valueSix, tableheight: 500 });
        }else if(valueFive === "0%"){
          setGlobalStyle({ tableOne: valueOne,tableTwo: valueTwo,  tableThree: valueThree, tableFour : valueFour, tableFive : valueFive, tableSix : valueSix, tableheight: 500 });
        }else{
          setGlobalStyle({tableOne: valueOne,tableTwo: valueTwo,  tableThree: valueThree, tableFour : valueFour, tableFive : valueFive, tableSix : valueSix, tableheight: 250 });
        }
      }

    const alertText = ( color, text, cond ) =>{   setAlert({ color:color, text:text, cond:cond });  setTimeout(()=>{ setAlert({ cond:false }); },[4000]); }

    console.log(tableId, " ********* global table Id");

    return (
       <HelperContext.Provider
        value = {{
             tableSee,
             TableControl,
             TableIdControl,
             tableId,
             StyleComp,
             GlobalStyle,
             alertText,
             alert
        }}
        >
       {props.children}    
       </HelperContext.Provider> 

    )
}

export default HelperContext;