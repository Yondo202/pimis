import React, { useEffect, useState } from 'react'
import axios from 'axiosbase'
import { motion } from "framer-motion";
import { Container } from "./CustomTheme"
import { RiAddLine, RiEdit2Line } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import { RiBillLine } from "react-icons/ri"
import AddModal from "./AddModal"
import AccessToken from "context/accessToken"
import EditModal from "./EditModal"
import DeleteModal from "./DeleteModal"
import Indemnity from "./IndemnityAdd"
import { NumberComma } from "./NumberComma"

const Insurance = () => {
    const [ ListData, setListData ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const [ showAddModal, showSetAddModal ] = useState(false);
    const [ showEditModal, showSetEditModal ] = useState(false);
    const [ showDeleteModal, showSetDeleteModal ] = useState(false);
    const [ showIndemnity, setShowIndemnity ] = useState(false);

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

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            {showAddModal?<AddModal setAddCond={setAddCond} setCond={setCond} companyInfo={users} setModal={showSetAddModal} />:null}
            {showEditModal?<EditModal SD={selected} setAddCond={setAddCond} setCond={setCond} companyInfo={users} setModal={showSetEditModal} />:null}
            {showDeleteModal?<DeleteModal SD={selected} setCond={setCond} setModal={showSetDeleteModal} />:null}
            {showIndemnity?<Indemnity SD={selected} setCond={setCond} setModal={setShowIndemnity} />:null}

            <Container>
                <div className="Title">Company list</div>

                {/* <div className="listHead">
                    <div className="Inputs">
                        <select  className="roleFilter">
                            <option value="all" selected>- Бүгд -</option>
                        </select>
                    </div>
                    <div className="AddBtn">
                        <IoMdAdd className="addSvg" />Нэмэх
                    </div>
                </div> */}

                <div className="customTable">

                    <div className="headPar">
                        {/* <div className="title"></div> */}
                        <div onClick={()=>showSetAddModal(true)} className="addBtn"><RiAddLine /><span>Нэмэх</span></div>
                        <div className="additions">
                            <div onClick={HandleIndeminty} className="addBtn"><RiBillLine /><span>Нөхөн төлбөр</span></div>
                            <div onClick={EditHandle} className="addBtn"><RiEdit2Line /><span>Засах</span></div>
                            <div onClick={DeleteHandle} className="addBtn"><VscError /><span>Устгах</span></div>
                        </div>
                    </div>

                    <table>
                        <tbody>
                            <tr>
                                <th>Register number</th>
                                <th>Company name</th>
                                {/* <th>ESM</th> */}

                                <th>Issued</th>
                                <th>Expiration</th>
                                 

                                {/* <th>Policy number</th> */}
                                <th>Insurance type</th>

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