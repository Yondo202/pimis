import React, { useEffect, useState, useContext } from 'react';
import { CustomModal, InputStyle } from "components/misc/CustomStyle";
import styled from "styled-components";
import { MdAdd } from "react-icons/md";
import { RiAddLine } from "react-icons/ri";
import { IoMdArrowDropright } from "react-icons/io";
import NumberFormat from "react-number-format";
import axios from 'axiosbase';
import UserContext from "context/UserContext";
import Select from 'react-select';
import { VscSave } from "react-icons/vsc";

const AddModal = ({ companyInfo, setModal, setCond, setAddCond }) => {
    const { alertText } = useContext(UserContext);
    const [ cName, setName ] = useState('');
    const [ rate, setRate ] = useState('');
    const [ SumInsured, setSumInsured ] = useState('');
    const [ Premium, setPremium ] = useState('');

    const [ addCompany, setAddCompany ] = useState(false);
    const [ selected, setSelected ] = useState({});

    const CloseHandle = () =>{
        setName('contentParent2');
        setTimeout(() => {
            setModal(false);
        }, 370)
    }

    const SubmitHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(`.gettInpp`); let arr = Array.from(inp); let final = {}
        arr.forEach(el=>{
            if(el.name=== "rate" || el.name=== "premium"|| el.name==="sum_insurance" || el.name=== "premium_mnt" || el.name==="sum_insurance_mnt"){
                if(el.value!==''){
                    final[el.name] = parseFloat(el.value.slice(0, -1).replace(/,/g, ''));
                }else{
                    final[el.name] = 0;
                }
            }else{
                final[el.name] = el.value;
            }
        });

        if(!selected?.id){
            alertText('orange','Байгууллагаа сонгоно уу...',true );
        }else{
            axios.post(`insurances/insurance`, {...final, user_id: selected.id }).then(_=>{
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

    const handleSelect=(val)=>{
        setSelected(val);
    }

    return (
        <CustomModal>
            {addCompany?<UserAddModal setAddCond={setAddCond} setAddCompany={setAddCompany} />:null}
            <div className={`contentParent ${cName}`} style={{width:"40rem"}}>
                <div className="head">
                    <div className="title">Add Insurance data</div>
                    <div onClick={CloseHandle} className="close">✖</div>
                </div>

                <form onSubmit={SubmitHandle}>
                    <div className="content">
                        <InputsParent>
                            <InputStyle >
                                <div className="label">Registration number <span className="reds">*</span></div>
                                <div className="SelectPar">
                                    {/* {addCompany.switch? <input autoFocus type="number" name='companyregister' className="gettInpp" required/>
                                    :<select name='companyregister' className="gettInpp" onChange={e=>setCompSelectReg(e.target.value)} value={compSelectReg} required>
                                        <option selected disabled></option>
                                        {companyInfo?.map((el,ind)=>{
                                            return(
                                                <option value={el.companyregister} key={ind}>{el.companyregister}</option>
                                            )  
                                        })}
                                    </select>} */}

                                    <Select
                                        value={selected.id?selected:false}
                                        // isClearable 
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        options={companyInfo}
                                        // value={selected.companyregister}
                                        getOptionValue={option => `${option.id}`}
                                        onChange={handleSelect}
                                        placeholder={'Register'}
                                        // isOptionSelected={`${selected.companyregister}`}
                                        getOptionLabel={option => `${option.companyregister}`}
                                    />

                                    {/* <div className="SelectArr" style={addCompany.switch?{opacity:`0`}:{opacity:`1`}} ><IoMdArrowDropright /></div> */}

                                    <div onClick={()=>setAddCompany(true)} className="smBtn"><MdAdd /></div>

                                    {/* {addCompany.switch?
                                    <div onClick={()=>setAddCompany({switch:false})} className="smBtn"><FiMinus /></div>
                                    :<div onClick={()=>setAddCompany({switch:true})} className="smBtn"><MdAdd /></div>} */}
                                </div>
                            </InputStyle>

                            <InputStyle >
                                <div className="label">Company name <span className="reds">*</span></div>
                                <div style={{width:`100%`}} className="SelectPar">
                                    <Select
                                        options={companyInfo}
                                        value={selected.id?selected:false}
                                        // isClearable
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        getOptionValue={option => `${option.id}`}
                                        onChange={handleSelect}
                                        placeholder={'Company name'}
                                        getOptionLabel={option => `${option.companyname}`}
                                    />
                                </div>
                            </InputStyle>


                        </InputsParent>

                        <InputsParent>
                            <InputStyle >
                                <div className="label">Issued date <span className="reds">*</span></div>
                                <input type="date" name='issued_date' className="gettInpp" required />
                            </InputStyle> 

                            <InputStyle >
                                <div className="label">Expiration date <span className="reds">*</span></div>
                                <input type="date" name='expiration_date' className="gettInpp" required />
                            </InputStyle>
                        </InputsParent>

                        <InsureType contents="Contact information">
                                <InputsParent>
                                        <InputStyle >
                                            <div className="label">Insurance type <span className="reds">*</span></div>
                                            {/* <input type="text" name="desc" className="gettInp" required /> */}
                                            <div className="SelectPar">
                                                <select name='insurance_type' className="gettInpp" required>
                                                    <option selected disabled></option>
                                                    <option value="Working capital cover">Working capital cover</option>
                                                    <option value="Supplier credit insurance" >Supplier credit insurance</option>
                                                    <option value="Buyer credit insurance">Buyer credit insurance</option>
                                                </select>

                                                <div className="SelectArr" ><IoMdArrowDropright /></div>
                                                {/* <div style={{opacity:`0`}} className="smBtn"><MdAdd /></div> */}
                                            </div>
                                        </InputStyle>
                                        <InputStyle ></InputStyle>
                                </InputsParent>
                                
                                {/* <div /> */}

                                <InputsParent>
                                    <InputStyle >
                                        <div className="label">Contract number</div>
                                        <input type="number" name="contract_number" className="gettInpp" />
                                    </InputStyle> 

                                    <InputStyle >
                                        <div style={{fontWeight:`500`}} className="label">Rate</div>
                                        <NumberFormat  placeholder={`0 ₮`} value={rate} onChange={e=>setRate(e.target.value.slice(0, -1).replace(/,/g, ''))} style={{textAlign:`right`, paddingRight:`7px`}} thousandSeparator={true} suffix={' ₮'} name="rate" className="gettInpp" />
                                    </InputStyle>
                                </InputsParent>

                                <InputsParent>
                                    <InputStyle >
                                        <div style={{fontWeight:`500`}} className="label">Sum Insured</div>
                                        <NumberFormat  placeholder={`0 $`} value={SumInsured} onChange={e=>setSumInsured(e.target.value.slice(0, -1).replace(/,/g, ''))} style={{textAlign:`right`, paddingRight:`7px`}} thousandSeparator={true} suffix={' $'} name="sum_insurance" className="gettInpp" />
                                    </InputStyle>

                                    <InputStyle >
                                        <div className="label"/>
                                        <NumberFormat disabled placeholder={`0 ₮`} value={SumInsured!==''?SumInsured*rate:''} style={{textAlign:`right`, paddingRight:`7px`}} name="sum_insurance_mnt" className="gettInpp" thousandSeparator={true} suffix={' ₮'} />
                                    </InputStyle>
                                </InputsParent>

                                <InputsParent>
                                    <InputStyle >
                                        <div style={{fontWeight:`500`}} className="label">Premium</div>
                                        <NumberFormat placeholder={`0 $`} value={Premium} onChange={e=>setPremium(e.target.value.slice(0, -1).replace(/,/g, ''))} style={{textAlign:`right`, paddingRight:`7px`}} thousandSeparator={true} suffix={' $'} name="premium" className="gettInpp" />
                                    </InputStyle>

                                    <InputStyle >
                                        <div className="label"/>
                                        <NumberFormat disabled placeholder={`0 ₮`} value={Premium!==''?Premium*rate:''} style={{textAlign:`right`, paddingRight:`7px`}}  name="premium_mnt" className="gettInpp" thousandSeparator={true} suffix={' ₮'} />
                                    </InputStyle>
                                </InputsParent>
                                
                        </InsureType>
                            
                        <div className="modalbtnPar">
                            <div style={{opacity:`0`}} className="errText"><span className="red">* </span> Тэмдэглэгээтэй хэсгийг заавал бөглөнө үү...</div>
                            <button type="submit" className="modalbtn"> <VscSave /> Хадгалах</button>
                        </div>
                    </div>
                </form>
                
            </div>
        </CustomModal>
    )
}

export default AddModal

const InputsParent = styled.div`
    display:flex;
    gap:35px;
`
const InsureType = styled.div`
    margin-top:15px;
    padding:20px 15px;
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

const UserAddModal = ({setAddCompany, setAddCond}) => {
    const [ cName, setName ] = useState('');
    const { alertText } = useContext(UserContext);
    const [ sectors, setSectors ] = useState([]);
    
    useEffect(()=>{
        void async function Fetch(){
           let sector = await axios.get(`business-sector`);
           setSectors(sector.data.data);
        }()
    },[])

    const CloseHandle = () =>{
        setName('contentParent2');
        setTimeout(() => {
            setAddCompany(false);
        }, 370)
    }

    const HandleChange = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll(`.gettInps`); let arr = Array.from(inp); let final = {}
        arr.forEach(el=>{
            final[el.name] = el.value;
        });

        axios.post(`users`, final).then(_=>{
            alertText('green','Амжилттай',true );
            setAddCond(prev=>!prev);
            setName('contentParent2');
            setTimeout(() => {
                setAddCompany(false);
            }, 370)
        }).catch(_=>alertText('orange', "Алдаа гарлаа", true));
    }

    return (
        <CustomModal style={{paddingTop:`4rem`}}>
            <div className={`contentParent ${cName}`} style={{width:"40.5rem"}}>

                <div className="head">
                    <div className="title">Шинээр байгууллага нэмэх</div>
                    <div onClick={CloseHandle} className="close">✖</div>
                </div>
                <form onSubmit={HandleChange}>
                    <div className="content">
                        <InputsParent>
                            <InputStyle >
                                <div className="label">Company name <span className="reds">*</span></div>
                                <input type="text" name="companyname" className="gettInps" required />
                            </InputStyle> 

                            <InputStyle >
                                <div className="label">Registration number <span className="reds">*</span></div>
                                <input type="number" name="companyregister" className="gettInps" required />
                            </InputStyle>
                        </InputsParent>

                        <InputsParent>
                            <InputStyle >
                                <div className="label">Email address </div>
                                <input type="email" name="email" className="gettInps" />
                            </InputStyle> 

                            <InputStyle >
                                <div className="label">Telephone number </div>
                                <input type="number" name="phone" className="gettInps" />
                            </InputStyle>
                        </InputsParent>

                        <InputsParent>
                            <InputStyle >
                                <div className="label">Business sector<span className="reds">*</span></div>
                                {/* <input type="text" name="desc" className="gettInp" required /> */}
                                <div className="SelectPar">
                                    <select name='business_sectorId' className="gettInps" required>
                                        <option selected disabled></option>
                                        {sectors.map((el,ind)=>{
                                            return(
                                                <option key={ind} value={el.id}>{el.bdescription_mon}</option>
                                            )
                                        })}
                                    </select>
                                    <div className="SelectArr" ><IoMdArrowDropright /></div>
                                </div>
                            </InputStyle>

                            <InputStyle >
                                {/* <div className="label">ESM </div>
                                <div className="SelectPar">
                                    <select name='insurance_type' className="gettInpp" required>
                                        <option selected disabled></option>
                                        <option value="A">A</option>
                                        <option value="B" >B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="F">F</option>
                                    </select>
                                    <div className="SelectArr" ><IoMdArrowDropright /></div>
                                </div> */}
                            </InputStyle>
                        </InputsParent>

                        <InsureType contents="Contact information">
                            <InputsParent>
                                <InputStyle >
                                    <div className="label">Name</div>
                                    <input type="text" name="name" className="gettInps" required />
                                </InputStyle> 

                                <InputStyle >
                                    <div className="label">Position</div>
                                    <input type="text" name="position" className="gettInps" required />
                                </InputStyle> 
                            </InputsParent>

                            <InputsParent>
                                <InputStyle >
                                    <div className="label">Address location </div>
                                    {/* <input type="text" name="desc" className="gettInp" required /> */}
                                    <div className="SelectPar">
                                        <select name='location' className="gettInpps" required>
                                            <option selected disabled></option>
                                            {Location.map((el,ind)=><option value={el} key={ind}>{el}</option>)}
                                        </select>

                                        <div className="SelectArr" ><IoMdArrowDropright /></div>
                                    </div>
                                </InputStyle>
                                <InputStyle ></InputStyle>
                            </InputsParent>

                            <InputsParent>
                                <InputStyle >
                                    <div className="label">Address detail </div>
                                    <textarea name="location_detail" placeholder="Address detail" className="gettInps" required />
                                </InputStyle>
                            </InputsParent>
                        </InsureType>

                        <div className="modalbtnPar">
                            <div style={{opacity:`0`}} className="errText"><span className="red">* </span> Тэмдэглэгээтэй хэсгийг заавал бөглөнө үү...</div>
                            <button type="submit" className="modalbtn"> <RiAddLine /> Нэмэх</button>
                        </div>
                    </div>
                </form>

            </div>
        </CustomModal>
    )
}

const Location = [
    'Улаанбаатар',
    'Архангай',
    'Баян-Өлгий',
    'Баянхонгор',
    'Булган',
    'Говь-Алтай',
    'Говьсүмбэр',
    'Дархан-Уул',
    'Дорноговь',
    'Дорнод',
    'Дундговь',
    'Завхан',
    'Орхон',
    'Өвөрхангай',
    'Өмнөговь',
    'Сүхбаатар',
    'Сэлэнгэ',
    'Төв',
    'Увс',
    'Ховд',
    'Хөвсгөл',
    'Хэнтий',
]
