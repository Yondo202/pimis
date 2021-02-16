import React,{useRef, useState, useContext, useEffect }  from 'react'
import styled from 'styled-components'
import {textColor, ButtonStyle} from '../../../theme'
import {useSpring, animated} from 'react-spring';
import axios from '../../../../axiosbase'
import UserContext from '../../../../context/UserContext'

export const EditModal = ({ showModal,setShowModal,setUpdate, parent,parentEdit}) => {
    const modalRef = useRef();
    const ctx = useContext(UserContext);
    const [ per, setPer ] = useState(parent.role);
    const [ errText, setErrText ] = useState("0");
    const [ btnSpin, setBtnSpin  ] = useState(false);

    const animation = useSpring({
        config:{duration:330  },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(10%)` : `translateY(30%)`  
    });
    const closeModal = e =>{ if(modalRef.current === e.target){ setShowModal(false); } }

    const clickHandle = (e) =>{
        setBtnSpin(true);
        e.preventDefault();
        let getInp = document.querySelectorAll('.getMainInp22'); let cond = [];
        let arr = Array.from(getInp); const final = {}; arr.map(el => {  final[el.name] = el.value;  if(el.value!==""){ cond.push(el.name); } } );
        let getInp2 = document.querySelectorAll('.getRoles');
        let arr2 = Array.from(getInp2); arr2.map(el => {  if(el.checked === true){ final[el.name] = el.value; cond.push(el.name);  } });
        let permission = [];
        if(per==="edpuser"){
            let getInp3 = document.querySelectorAll('.getPermission');
            let arr3 = Array.from(getInp3); arr3.map(el => {  if(el.checked === true){ permission.push(el.value) } });final["permission"] = permission
        }

        console.log(cond.length, " my cond");
        if(cond.length < 6){
            setBtnSpin(false);
            setErrText("1");
        }else{
            setErrText("0");
            axios.put(`users/${parent.id}`,final).then(res=>{
                console.log(res, "^ ress");  setUpdate(prev=>!prev); ctx.alertText("green", "Амжилттай", true ); setBtnSpin(false); setShowModal(prev=>!prev); 
            }).catch(error=>{console.error(error,"^err"); ctx.alertText("orange", "Алдаа гарлаа", true );setBtnSpin(false);});
        }
         console.log(JSON.stringify(final) , "^final");
    }

    const roleHandle = (event)=>{ 
        setPer(event.target.value);
        let finall = {}; finall["role"] = event.target.value; finall["id"] = parent.id; parentEdit(parent["finall"] = finall);
     }

    const editHandle = (event) =>{
        let finall = {}; finall["role"] = parent.role; finall["id"] = parent.id; finall[""] = event.target.value;  parentEdit(parent["finall"] = finall);
    }

    return(
        <>
                     {/* ref={modalRef} onClick={closeModal} */}
            {showModal ? <Background ref={modalRef} onClick={closeModal} >
                <animated.div  style={animation} >
                    <div className="modalPar container">
                        <div className="closeParent">
                            <div className="title">Хэрэглэгч үүсгэх</div>
                            <button className="esc" onClick={()=> setShowModal(prev => !prev)} > X </button>
                        </div>
                        <form onSubmit={clickHandle}>
                                <div className="InputPar">
                                    <div className="rowss">
                                        <div className="inputItem">
                                                <span className="title">Овог:</span>
                                                <input onChange={editHandle} value={parent.firstname} name="firstname" className="getMainInp22 form-control" type="text" />
                                        </div>
                                        <div className="inputItem">
                                                <span className="title">Нэр :</span>
                                                <input onChange={editHandle}  value={parent.lastname} name="lastname" className="getMainInp22 form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="rowss">
                                        <div className="inputItem">
                                                <span className="title">Email :</span>
                                                <input onChange={editHandle}  value={parent.email} name="email" className="getMainInp22 form-control" type="email" />
                                        </div>
                                        <div className="inputItem">
                                                <span className="title">Утасны дугаар :</span>
                                                <input onChange={editHandle}  value={parent.phone} name="phone" className="getMainInp22 form-control" type="number" />
                                        </div>
                                    </div>
                                    <div style={{ paddingBottom:20, borderBottom:`1px solid rgba(0,0,0,0.08)`}} className="rowss">
                                        <div className="inputItem">
                                                <span className="title">Нэвтрэх нэр :</span>
                                                <input onChange={editHandle}  value={parent.name} name="name" className="getMainInp22 form-control" type="text" />
                                        </div>
                                    </div>
                                </div>

                                <div className="HeadCheck"> 
                                    <div className="title"> <input onChange={roleHandle} checked={parent.role === "edpuser" ? true: false} className="getRoles" value="edpuser" name="role" type="radio" /> <span>edp user</span></div>  
                                    <div className="title"> <input onChange={roleHandle} checked={parent.role === "trainer" ? true: false}  className="getRoles" value="trainer" name="role" type="radio" /> <span>Сургалт зохион байгуулагч</span></div>  
                                    <div className="title"> <input onChange={roleHandle} checked={parent.role === "edpadmin" ? true: false}  className="getRoles" value="edpadmin" name="role" type="radio" /> <span>edp admin</span></div>  
                                </div>
                            
                                {parent.role==="edpuser"&&(<div className="edpUsers">
                                    <div className="items"><input value="pps" name="permission" className="getPermission" type="checkbox" /> <span>Түншлэлийн хөтөлбөр</span></div>
                                    <div className="items"><input value="training" name="permission" className="getPermission" type="checkbox" /> <span>Сургалт</span></div>
                                    <div className="items"><input value="insurance" name="permission" className="getPermission" type="checkbox" /> <span>Даатгал</span></div>
                                </div>)}
                                
                                {parent.role==="trainer"&&(<div className="edpUsers">
                                    <select className="trainer">
                                        <option selected disabled>- Сонго -</option>
                                        <option>Сургалт 2</option>
                                        <option>Сургалт 3</option>
                                        <option>Сургалт 4</option>
                                    </select>
                                </div>)}
                                        

                                <div className="BtnPar">
                                    <span style={{opacity:errText}} className="errTxt">Гүйцэд бөгөлнө үү...</span>
                                    <ButtonStyle type="submit" style={!btnSpin? {}: {padding:`0px 15px`}} className="finalBtn"> {!btnSpin? 'Хадгалах' : <img src="/gif1.gif" alt="gif" />} </ButtonStyle>
                                </div>
                        </form>

                

                       



                        

                    </div>
                </animated.div>
            </Background>: null}
        </>
    )
}

const Background = styled.div`
    font-size:13px;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: rgba(0,0,0,0.5);
    position:fixed;
    display:flex;
    justify-content:center;
    align-items:start;
    z-index:2000;
    color:rgba(${textColor});
    textarea{
        min-height: calc(3.5em + 2.75rem + 2px);
    }
    .modalPar{
        background-color:white;
        width:650px;
        padding:20px 35px;
        .edpUsers{
            padding:10px 15px;
            border:1px solid rgba(0,0,0,0.15);
            margin-bottom:10px;
            .trainer{
                padding:4px 20px;
                border:1px solid rgba(0,0,0,0.3);
                border-radius:4px;
            }
            .items{
                display:flex;
                align-items:center;
                padding:5px 0px;
                input{
                    transition:all 0.1s ease;
                    cursor:pointer;
                    height:15px;
                    width:15px;
                    &:checked{
                        -webkit-transform: scale(1.2);
                        transform: scale(1.2);
                    }
                }
                span{
                    margin-left:10px;
                }
            }
           
        }
        .HeadCheck{
            font-size:14px;
            display:flex;
            justify-content:space-between;
            width:100%;
            margin-bottom:15px;
            .title{
                display:flex;
                align-items:center;
                input{
                    cursor:pointer;
                    width:17px;
                    height:17px;
                    transition:all 0.1s ease;
                    &:checked{
                        opacity: 1;
                        -webkit-transform: scale(1.2);
                        transform: scale(1.2);
                        border-radius:50% !important;
                    }
                }
                span{
                    margin-left:5px;
                }
            }
        }
        .BtnPar{
                display:flex;
                justify-content:space-between;
                align-items:center;
                .errTxt{
                    transition:all 0.4s ease;
                    text-align:center;
                    background-color: #f6c343;
                    border-radius:5px;
                    font-size:14px !important;
                    font-weight:400;
                    color:black !important;
                    line-height:34px;
                    padding:0px 20px;
                }
        }
        .InputPar{
            margin-top:5px;
            .rowss{
                display:flex;
                align-items:center;
                justify-content:space-between;
                margin-bottom: 12px;
                .inputItem{
                    width:44%;
                    .title{
                        font-size:12.5px;
                        opacity:0.9;
                        font-weight:500;
                    }
                    .form-control{
                        font-size:13.3px;
                        background-color:rgba(0,0,0,0.05);
                        margin-top:6px;
                    }
                }
            }
        }
        .closeParent{
            display:flex;
            align-items:center;
            justify-content:space-between;
            border-bottom:1px solid rgba(0,0,0,0.2);
            padding-bottom:5px;
            .title{
                font-size:14px;
                font-weight:500;
            }
            .esc{
                font-size:17px;
                padding:1px 12px;
                border-style:none;
                cursor:pointer;
            }
        }
    }
    @media (max-width:860px){
        modalPar{
            width:90vw;
        }
    }
`