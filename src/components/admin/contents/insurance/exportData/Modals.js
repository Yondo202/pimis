import React, { useState, useContext, useEffect } from 'react';
import styled from "styled-components";
import { CustomModal, InputStyle } from "components/misc/CustomStyle";
import NumberFormat from "react-number-format";
import axios from 'axiosbase';
import AccessToken from "context/accessToken";
import UserContext from "context/UserContext";
import { VscSave } from "react-icons/vsc";
import Select from 'react-select';
import { TiDeleteOutline } from "react-icons/ti"

const Modals = ({ setModal, SD, setCond, years, country, handle, selectedEx, setSelectedEx }) => {
    const { alertText } = useContext(UserContext);
    const [ cName, setName ] = useState('');
    const [ err, setErr ] = useState(false);
    const [ selected, setSelected ] = useState({});

    const CloseHandle = () =>{
        setName('contentParent2');
        setTimeout(() => {
            setModal(false);
        }, 370)
    }

    useEffect(()=>{
        if(handle!=="add"){
            let obj ={}
            country.forEach(item=>{
                if(item.id===selectedEx.countryId) obj = item
            })
            setSelected(obj);
        }
    },[])

    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(`.gettInpps`); let arr = Array.from(inp); let final = {};

        arr.forEach(el=>{
            if(el.name=== "product_name" || el.name=== "hs_code"){
                final[el.name] = el.value;
            }else{
                if(el.value!==''){
                    final[`e${el.name}`] = parseFloat(el.value.slice(0, -1).replace(/,/g, ''));
                }else{
                    final[`e${el.name}`] = 0;
                }
            }
        });

        if(!selected.id){
            setErr(true); setTimeout(_=> setErr(false), 4000);
        }else{
            final["countryId"] = selected.id;
            final["userId"] = SD?.user_id;
            if(handle==="add"){
                axios.post(`export-data`, final,{ headers: {Authorization: AccessToken()} }).then(_=>{
                    alertText('green','Амжилттай',true );
                    setName('contentParent2');
                    setTimeout(() => {
                        setModal(false);
                    }, 370)
                    setCond(prev=>!prev);
                }).catch(()=>{
                    alertText('orange','Хадаглахад алдаа гарлаа',true );
                })
            }else if(handle==="edit"){
                axios.put(`export-data/${selectedEx.id}`, final, { headers: {Authorization: AccessToken()} }).then(res=>{
                    alertText('green','Амжилттай',true );
                    setSelectedEx(res.data.data);
                    setName('contentParent2');
                    setTimeout(() => {
                        setModal(false);
                    }, 370)
                    setCond(prev=>!prev);
                }).catch(()=>{
                    alertText('orange','Хадаглахад алдаа гарлаа',true );
                })
            }else{
                axios.delete(`export-data/${selectedEx.id}`, { headers: {Authorization: AccessToken()} }).then(_=>{
                    alertText('green','Амжилттай',true );
                    setName('contentParent2');
                    setTimeout(() => {
                        setModal(false);
                    }, 370)
                    setCond(prev=>!prev);
                }).catch(()=>{
                    alertText('orange','Хадаглахад алдаа гарлаа',true );
                })
            }
        }
    }

    const handleSelect=(val)=>{
        setSelected(val);
    }

    return (
        <CustomModal>
            <div className={`contentParent ${cName}`} style={{width:"40rem"}}>
                <div className="head">
                    <div className="title">{handle} Export Data</div>
                    <div onClick={CloseHandle} className="close">✖</div>
                </div>

                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        {handle!=="delete"?<>
                            <InputsParent2 first={true}>
                                <InputStyle >
                                    <div className="label">Product name<span className="reds">*</span></div>
                                    <input defaultValue={handle!=='add'?selectedEx?.product_name:``} type="text" name='product_name' className="gettInpps" required />
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
                                    <input defaultValue={handle!=='add'?selectedEx?.hs_code:``} type="text" name='hs_code' className="gettInpps" required />
                                </InputStyle> 
                                <InputStyle />
                            </InputsParent2>
                        </>
                        :<InputsParent2 style={{opacity:`0.8`}} first={true}>
                                <InputStyle >
                                    <div className="label">Product name<span className="reds">*</span></div>
                                    <h6>{selectedEx?.product_name}</h6>
                                </InputStyle> 
                                <InputStyle >
                                    <div className="label">Countries <span className="reds">*</span></div>
                                    <h6>{selected?.description_mon}</h6>
                                </InputStyle>
                            </InputsParent2>
                        }
                        

                        {handle!=="delete"&&<InsureType contents="Years -> Amount">
                            <InputsParent>
                                {years.map((el,ind)=>{
                                    return(
                                    <InputStyle key={ind} className="itemss">
                                        <div style={{fontWeight:`500`}} className="label">{el}</div>
                                        <NumberFormat
                                            defaultValue={handle!=='add'?selectedEx[`e${el}`]:``}
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

                            </InputsParent>
                        </InsureType>}
                            
                        <div className="modalbtnPar">
                            <div style={{opacity:`${err?`1`:`0`}`}} className="errText"><span className="red">* </span>Улсаа сонгоно уу...</div>
                            {handle==="delete"?<button type="submit" className="modalbtn"><TiDeleteOutline /> Устгах </button>
                            :<button type="submit" className="modalbtn"><VscSave /> Хадгалах </button>}
                        </div>
                    </div>
                </form>
                
            </div>
        </CustomModal>
    )
}

export default Modals


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