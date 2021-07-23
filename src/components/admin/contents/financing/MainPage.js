import React,{useEffect, useState} from 'react'
import styled,{ keyframes } from 'styled-components'
import { IoMdAdd } from 'react-icons/io'
import axios from '../../../../axiosbase'
import { motion } from "framer-motion";
import AddModal from "./AddModal"



function MainPage() {
    const [ update, setUpdate ] = useState(false);
    const [ khansh, setKhansh ] = useState(null);
    const [ filter, setFilter ] = useState("all")
    const [ targetElement, setTargetElement ] = useState({});
    const [ usersData, setUsersData ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);
    const [ showModal2, setShowModal2 ] = useState(false);
    const [ showModal3, setShowModal3 ] = useState(false);

    const ModalOpen = () => {  setShowModal(prev => !prev); }
    const ModalOpen2 = (el) => { setTargetElement(el); setShowModal2(prev => !prev); }
    const ModalOpen3 = (el) => { setTargetElement(el); setShowModal3(prev => !prev); }

    useEffect( async()=>{
        FetchKhansh();
        const usersData = await axios.get(`users?role=other`);
        let final = [];
        usersData.data.data.map((el,i)=>{ Role.map(elem=>{ if(el.role === elem.value){ el["code"] = elem.title; } }); final.push(el);  })
        setUsersData(final);
    },[update]);

    const FetchKhansh = async () =>{
        const data = await axios.get("https://monxansh.appspot.com/xansh.json?currency=USD");
        setKhansh(data?.data);
    }

    const filterHanlde = (event) =>{ setFilter(event.target.value); }

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Users>
            {showModal&&<AddModal setUpdate={setUpdate} showModal={showModal} setShowModal={setShowModal} />} 
            {/* <DeleteModal setUpdate={setUpdate} showModal={showModal2} setShowModal={setShowModal2} parent={targetElement} /> */}
            {/* <EditModal setUpdate={setUpdate} showModal={showModal3} setShowModal={setShowModal3} parent={targetElement} parentEdit={setTargetElement} /> */}
            <div className="Title">Санхүүжилт</div>
                <div className="listHead">
                    <div className="Inputs">
                        {/* <div className="searchInp">
                            <input placeholder="Хайх..." typ="text" />
                            <VscSearch className="searchIcon" />
                        </div> */}
                        <select onChange={filterHanlde} className="roleFilter">
                            <option value="all" selected>- Бүгд -</option>
                            {Role.map((el,i)=>{  return( <option value={el.value} >{el.title}</option>  )  })}
                        </select>
                    </div>
                    <div onClick={ModalOpen} className="AddBtn">
                        <IoMdAdd className="addSvg" />Нэмэх
                    </div>
                </div>

                <div className="listContPar">
                    <div className="usersHead">
                        <div className="row">
                            <div className="col-md-4"><div className="itemsA">Компаний нэр</div></div>
                            <div className="col-md-3"><div className="items">Олгогдсон санхүүжилт $</div></div>
                            <div className="col-md-3"><div className="items">Олгогдсон санхүүжилт ₮</div></div>
                            <div className="col-md-2"><div className="items B2">Үйлдэл</div></div>
                        </div>
                    </div>

                    <div  className="bodyCont">
                        <div className="row">
                            <div className="col-md-4"><div className="NamePar">
                                {/* <img src="/user1.svg" alt="src" />  */}
                                    <div className="textPar"><h5 className="name">Хулан ХХК</h5><div className="email">Барилга</div> </div>
                                </div>
                            </div>

                            <div className="col-md-3"><div className="items">25,000 $</div></div>
                            <div className="col-md-3"><div className="items">350,000 ₮</div></div>
                            <div className="col-md-2"><div className="items">
                                <div onClick={()=>ModalOpen3("el")} className="edit"><img src="/edit.svg" /></div> 
                                {/* <div onClick={()=>ModalOpen2(el)} className="delete"><img src="/delete.svg" /></div> */}
                            </div></div>
                        </div>
                    </div>
                </div>
        </Users>
        </motion.div>
        
    )
}

export default MainPage

const Animate = keyframes`
    0% { opacity:0; }
    100% { opacity:1; }
`


const Users = styled.div`
    font-family: ${props=>props.theme.fontFamily1} !important;
    font-size:14px;
    color:#2c2945;
    .Title{
        font-weight:500;
        font-size:20px;
        margin-bottom:10px;
        padding-bottom:10px;
    }
    .listContPar{
        border-radius:6px;
        border:1px solid rgba(0,0,0,0.2);
        background-color:white;
        .bodyCont{
            animation: ${Animate} ease 0.5s;
            padding:12px 0px;
            border-bottom:1px solid rgba(0,0,0,0.1);
            .items{
                height:100%;
                align-items:center;
                display:flex;
                .edit{
                    display:flex;
                    justify-content:center;
                    width:100%;
                    cursor:pointer;
                    margin-right:25px;
                }
                .delete{
                    cursor:pointer;
                }
                img{
                    width:15px;
                }
            }
            
            .NamePar{
                display:flex;
                padding-left:15px;
                align-items:center;
                img{
                    margin-right:30px;
                    width:25px;
                }
                .textPar{
                    .name{
                        font-weight:500;
                        cursor:pointer;
                        font-size:14px;
                    }
                    .email{
                        font-size:13px;
                        opacity:0.9;
                    }
                }
            }
        }
        .Example{
            opacity:0.4;
        }
        .usersHead{
            font-size:14px;
            border-bottom:1px solid rgba(0,0,0,0.1);
            font-weight:500;
            padding:10px 0px;
            .itemsA{
                padding-left:15px;
            }
            .items{
            }
            .B2{
                width:100%;
                display:flex;
                justify-content:center;
                padding-right:15px;
            }
        }
    }
    .listHead{
        display:flex;
        aling-items:center;
        justify-content:space-between;
        margin-bottom:12px;
        .Inputs{
            display:flex;
            font-size:14px;
            .searchInp{
                position:relative;
                font-size:14px;
                display:flex;
                align-items:center;
                margin-right:15px;
                input{
                    border:1px solid rgba(0,0,0,0.1);
                    border-radius:4px;
                    padding:5px 15px;
                }
                .searchIcon{
                    position:absolute;
                    right:5px;
                }
            }
            .roleFilter{
                border:1px solid rgba(0,0,0,0.1);
                border-radius:4px;
                padding:0px 10px;
                padding-right:20px;
            }   
        }
        .AddBtn{
            font-size:14px;
            cursor:pointer;
            display:flex;
            align-items:center;
            color:white;
            background-color:#5a5278;
            position:relative;
            overflow: hidden;
            padding:5px 20px;
            border-radius:4px;
            // font-weight:500;
            .addSvg{
                font-size:15px;
                margin-right:5px;
            }
            &:after{
                content: "";
                background: white;
                display: block;
                position: absolute;
                padding-top: 300%;
                padding-left: 350%;
                margin-left: -20px!important;
                margin-top: -120%;
                opacity: 0;
                transition: all 0.8s
            }
            &:active:after {
                padding: 0;
                margin: 0;
                opacity: 1;
                transition: 0s
            }
        }
    }
    @media only screen and (max-width:768px){
        .listHead{
            flex-direction:column;
            .Inputs{
                margin:10px 0px;
                flex-direction:column;
            }
        }
    }
`

const Role = [
    // {  title:"Холбоотой Яамд", value:"holbootoi_yamd",  },
    // {  title:"Төслийн Захирал", value:"tosliin_zahiral", },
    // {  title:"Төслийн зохицуулагч", value:"tosliin_zohitsuulagch",  },
    // {  title:"Ахлах БХШ", value:"ahlah_bhsh",  },
    // {  title:"БХЗ", value:"bh_zovloh",  },
    // {  title:"ҮДД-ын зөвлөх", value:"vdd_zovloh",  },
    // {  title:"Хуулийн зөвлөх", value:"huuliin_zowloh",  },
    // {  title:"Санхүү", value:"sanhuu",  },
    // {  title:"Худалдаан авах ажиллагаа", value:"hudaldanavah_ajillagaa",  },
    // {  title:"Сургалт зохион байгуулагч", value:"trainer",  },
    // {  title:"Үнэлгээний хорооны гишүүн", value:"member",  },
    // {  title:"Мониторинг", value:"monitoring",  },
    // {  title:"edp - админ", value:"edpadmin",  }
]

// style={{backgroundColor: i % 2 === 0 || el.i === 0 ? `rgba(0,0,0,.04)` : `white`}}