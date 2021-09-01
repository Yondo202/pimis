import React, { useState, useContext } from 'react';
import styled from "styled-components";
import { CustomModal, InputStyle } from "components/misc/CustomStyle";
import axios from 'axiosbase';
import UserContext from "context/UserContext";
import NumberFormat from "react-number-format";
import { VscSave } from "react-icons/vsc";
import Select from 'react-select';

const Add = ({ setModal, SD, setCond, years, country }) => {
    const { alertText } = useContext(UserContext);
    const [ cName, setName ] = useState('');
    const [ err, setErr ] = useState(false);
    // const [ Premium, setPremium ] = useState('');
    const [ selected, setSelected ] = useState({});

    const CloseHandle = () =>{
        setName('contentParent2');
        setTimeout(() => {
            setModal(false);
        }, 370)
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(`.gettInpps`); let arr = Array.from(inp); let final = {};

        arr.forEach(el=>{
            if(el.name=== "product_name" || el.name=== "hs_code"){
                final[el.name] = el.value;
            }else{
                if(el.value!==''){
                    final[el.name] = parseFloat(el.value.slice(0, -1).replace(/,/g, ''));
                }else{
                    final[el.name] = 0;
                }
            }
        });

        if(!selected.id){
            setErr(true); setTimeout(_=> setErr(false), 4000);
        }else{
            final["countryId"] = selected.id;

            

        }

        // axios.post(`insurances/indemnity`, {...final, insuranceId:SD.id }).then(_=>{
        //     alertText('green','Амжилттай',true );
        //     setName('contentParent2');
        //     setTimeout(() => {
        //         setModal(false);
        //     }, 370)
        //     setCond(prev=>!prev);
        // }).catch(()=>{
        //     alertText('orange','Хадаглахад алдаа гарлаа',true );
        // })

    }

    const handleSelect=(val)=>{

        console.log(`val`, val);
        setSelected(val);
    }

    return (
        <CustomModal>
            <div className={`contentParent ${cName}`} style={{width:"40rem"}}>
                <div className="head">
                    <div className="title">Add Export Data</div>
                    <div onClick={CloseHandle} className="close">✖</div>
                </div>

                <form onSubmit={SubmitHandle}>
                    <div className="content">

                        <InputsParent2 first={true}>
                            <InputStyle >
                                <div className="label">Product name<span className="reds">*</span></div>
                                <input type="text" name='product_name' className="gettInpps" required />
                            </InputStyle> 

                            <InputStyle >
                                <div className="label">Countries <span className="reds">*</span></div>
                                <div style={{width:`100%`}} className="SelectPar">
                                    <Select
                                        options={country}
                                        value={selected.id?selected:false}
                                        // isClearable
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        getOptionValue={option => `${option.id}`}
                                        onChange={handleSelect}
                                        placeholder={'Countries'}
                                        getOptionLabel={option => `${option.description_mon}`}
                                    />
                                </div>
                            </InputStyle>
                        </InputsParent2>

                        <InputsParent2>
                            <InputStyle >
                                <div className="label">HS code<span className="reds">*</span></div>
                                <input type="text" name='hs_code' className="gettInpps" required />
                            </InputStyle> 
                            <InputStyle />
                        </InputsParent2>

                        <InsureType contents="Years -> Amount">

                            <InputsParent>
                                {years.map((el,ind)=>{
                                    return(
                                    <InputStyle key={ind} className="itemss">
                                        <div style={{fontWeight:`500`}} className="label">{el}</div>
                                        <NumberFormat
                                             placeholder={`0 ₮`} 
                                            // value={rate}
                                            //  onChange={e=>setRate(e.target.value.slice(0, -1).replace(/,/g, ''))}
                                            style={{textAlign:`right`, paddingRight:`7px`}} thousandSeparator={true} suffix={' ₮'}
                                            name={el}
                                            className="gettInpps"
                                        />
                                    </InputStyle>
                                    )
                                })}
                                <InputStyle className="itemss"/>
                            </InputsParent>
                                
                        </InsureType>
                            
                        <div className="modalbtnPar">
                            <div style={{opacity:`${err?`1`:`0`}`}} className="errText"><span className="red">* </span>Улсаа сонгоно уу...</div>
                            <button type="submit" className="modalbtn"><VscSave /> Хадгалах</button>
                        </div>
                    </div>
                </form>
                
            </div>
        </CustomModal>
    )
}

export default Add


const InputsParent = styled.div`
    display:flex;
    gap:15px;
    justify-content:space-between;
    flex-wrap:wrap;
    width:100%;
    .itemss{
        width:29%;
    }
`
const InputsParent2 = styled.div`
    display:flex;
    gap:35px;
    justify-content:space-between;
`

const InsureType = styled.div`
    margin-top:15px;
    padding:30px 15px;
    border:1px solid #b5b8c8;
    border-radius:5px;
    position:relative;
    &:after{
        content:"${props=>props.contents}";
        top:-8px;
        left:10px;
        position:absolute;
        background-color:#fff;
        padding:0px 10px;
    }
`