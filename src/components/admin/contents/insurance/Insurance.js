import React, { useEffect, useState } from 'react'
import axios from 'axiosbase'
import { motion } from "framer-motion";
import { Container, LangSwitch } from "components/misc/CustomStyle"
import { RiAddLine, RiEdit2Line } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import { RiBillLine } from "react-icons/ri"
import AddModal from "./AddModal"
import AccessToken from "context/accessToken"
import EditModal from "./EditModal"
import DeleteModal from "./DeleteModal"
import Indemnity from "./IndemnityAdd"
import { NumberComma } from "./NumberComma";
import ExportData from "./exportData/ExportData";
import { useTranslation } from 'react-i18next';

const Insurance = () => {
    const [t, i18n] = useTranslation();
    const [ ListData, setListData ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const [ showAddModal, showSetAddModal ] = useState(false);
    const [ showEditModal, showSetEditModal ] = useState(false);
    const [ showDeleteModal, showSetDeleteModal ] = useState(false);
    const [ showIndemnity, setShowIndemnity ] = useState(false);
    const [ showExportData, setShowExportData ] = useState(false);

    const [ cond, setCond ] = useState(false);
    const [ addCond, setAddCond ] = useState(false);
    const [ selected, setSelected ] = useState({});

    useEffect(()=>{
        axios.get(`users`, { headers: {Authorization: AccessToken()} }).then(res=>{
            setUsers(res.data.data.filter(item=>item.role==="user"));
        })
    },[addCond])

    useEffect(()=>{
        void async function FetchData(){

           const Data = await axios.get(`insurances/insurance`);
           let final = [];
           if(Data.data.data.length!==0){
                Data.data.data.forEach(item=>{
                    let obj = {};
                    users.forEach(elem=>{
                        if(item.user_id===elem.id){
                            obj['companyname'] = elem.companyname;
                            obj['companyregister'] = elem.companyregister;
                            final.push({...item, ...obj});
                        }
                    })
                    if(item.id===selected.id){
                        setSelected(item);
                    }
                })
           }
           setListData(final);
        }();
    },[cond, users])

    const selectRowHandle = (el) =>{
        setSelected(el);
    }

    const EditHandle = () =>{
        if(selected.id){
            showSetEditModal(true);
        }
    }

    const DeleteHandle = () =>{
        if(selected.id){
            showSetDeleteModal(true);
        }
    }

    const HandleIndeminty = () =>{
        if(selected.id){
            setShowIndemnity(true);
        }
    }

    const ExportDataHandle = () =>{
        if(selected.id){
            setShowExportData(true);
        }
    }
    
    const handleChange = event => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            {showAddModal?<AddModal setAddCond={setAddCond} setCond={setCond} companyInfo={users} setModal={showSetAddModal} />:null}
            {showEditModal?<EditModal SD={selected} setAddCond={setAddCond} setCond={setCond} companyInfo={users} setModal={showSetEditModal} />:null}
            {showDeleteModal?<DeleteModal SD={selected} setCond={setCond} setModal={showSetDeleteModal} />:null}
            {showIndemnity?<Indemnity SD={selected} setCond={setCond} setModal={setShowIndemnity} />:null}

            {showExportData?<ExportData
                // setCond={setCond}
                setModal={setShowExportData}
                // userId={selected?.user_id} 
                SD={selected}
            />:null}


            <Container>
                <div className="TitlePar">
                    <div className="Title">{t('title')}</div>
                    <LangSwitch>
                        <select onChange={handleChange}>
                            <option value="en">English</option>
                            <option value="mn">Монгол</option>
                        </select>
                    </LangSwitch>
                </div>

                <div className="customTable">
                    <div className="headPar">
                        {/* <div className="title"></div> */}
                        <div onClick={()=>showSetAddModal(true)} className="addBtn"><RiAddLine /><span>Нэмэх</span></div>
                        <div className={`additions ${selected.id?``:`opacity`}`}>
                            <div onClick={ExportDataHandle} className="addBtn"><RiAddLine /><span>Export Data</span></div>
                            <div onClick={HandleIndeminty} className="addBtn"><RiBillLine /><span>Нөхөн төлбөр</span></div>
                            <div onClick={EditHandle} className="addBtn"><RiEdit2Line /><span>Засах</span></div>
                            <div onClick={DeleteHandle} className="addBtn"><VscError /><span>Устгах</span></div>
                        </div>
                    </div>

                    <table>
                        <tbody>
                            <tr>
                                <th>{t('Register number')}</th>
                                <th>{t('Company name')}</th>
                                {/* <th>ESM</th> */}

                                <th>{t('Issued')}</th>
                                <th>{t('Expiration')}</th>

                                {/* <th>Policy number</th> */}
                                <th>{t('Insurance type')}</th>

                                <th>Sum insured (USD)</th>
                                <th>Sum insured (MNT)</th>


                                <th>Premium (USD)</th>
                                <th>Premium (MNT)</th>


                                {/* <th >Үйлдэл</th> */}
                            </tr>
                            {ListData.map((el,ind)=>{
                                return(
                                    <tr onClick={()=>selectRowHandle(el)} key={ind} className={`cusorItems ${selected.id===el.id?`Selected`:``}`}>
                                        <td>{el.companyregister}</td>
                                        <td>{el.companyname}</td>
                                        {/* <td className="center">{el.esm}</td> */}

                                        <td>{el.issued_date}</td>
                                        <td>{el.expiration_date}</td>

                                        {/* <td>4/7/2018</td>
                                        <td>10/4/2018</td> */}
                                        
                                        {/* <td>00008</td> */}
                                        <td>{el.insurance_type}</td>

                                        <td style={{fontWeight:`500`}} className="right">{NumberComma(el.sum_insurance)} $</td>
                                        <td className="right">{NumberComma(el.sum_insurance_mnt)} ₮</td>

                                        <td style={{fontWeight:`500`}} className="right">{NumberComma(el.premium)} $</td>
                                        <td className="right">{NumberComma(el.premium_mnt)} ₮</td>
                                        {/* <td className="editDelete">
                                            <div className="editDeletePar">
                                                <div className="smBtn"><MdZoomOutMap /></div>
                                                <div className="smBtn"><RiEdit2Line /></div>
                                                <div  className="smBtn"><VscError /></div>
                                            </div>
                                        </td> */}
                                    </tr>
                                )
                            })}

                            
                        </tbody>
                    </table>
                </div>
            </Container>
        </motion.div>
    )
}

export default Insurance
// export default (translate("translations")(Insurance))



// export default withTranslation()(Insurance);