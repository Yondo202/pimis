import React,{useEffect} from 'react';
import styled from 'styled-components'
import axios from'axios';
import User from "./User";

function FormSix() {

  const [dataFinal, setData] = React.useState({});
  const [dataDetal, setDataDetal] = React.useState([]);

  useEffect(async () => {
    const result = await axios.get( 'http://192.168.88.78:3000/api/questions?page=2&pageSize=3' );
    const Data1 = result.data.data.docs[2]
    setData(Data1);
    setDataDetal(Data1.questiondetails);
  },[]);
    return (
        <Component3 >
            <div className="formOneParent">
                <div className="headerPar"  >6. {dataFinal.description}<span className="tseg">*</span></div>
              {dataDetal.map(el=>{
                return(
                  <div className="radioPar">
                    <input className="getinput inpTest2" tabIndex={dataFinal.code}  type="radio" name="s6ix" value={el.id}/>
                    <label >{el.description}</label>
                 </div>
                )
              })}
            </div>
           <User />
        </Component3>
    )
}

export default FormSix

const Component3 = styled.div`
    font-size: 16px;
    font-family: "Roboto", "Sans-serif";
    .formOneParent{
      background-color:white;
      border-radius:8px;
      margin-bottom:16px;
      padding:24px 26px;
      .TestButton{
        border-style:none;
        border:1px solid rgba(63, 81, 181,0.5);
        width:50%;
        padding:5px 0px;
        border-radius:6px;
        color:rgba(63, 81, 181);
        background-color:rgba(63, 81, 181,0.1);
        cursor:pointer;
        font-size:18px;
        &:hover{
          box-shadow:1px 1px 8px -2px;
        }
      }

      .MuiFormLabel-root{
        padding-bottom:6px;
        font-size:1.2rem;
        border-bottom:1px solid rgba(63, 81, 181,0.5);
        color:black;
      }
      .headerPar{
        padding-bottom:6px;
        font-size:1.1rem;
        border-bottom:1px solid rgba(63, 81, 181,0.5);
        color:black;
        .tseg{
          color:red;
        }
      }
      .errText{
        transition: all 0.4s ease; 
      }
      .radioPar{
        display:flex;
        flex-direction:row;
        align-items:center;
        padding:10px 0px;
        label{
          margin-left:15px;
          color:rgba(0,0,0,0.8);
          margin-bottom:0px
        }
        input{
          cursor:pointer;
          width:16px;
          height:16px;
        }
      }
    }
   
`