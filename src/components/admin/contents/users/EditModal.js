import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { textColor, ButtonStyle } from '../../../theme'
import { useSpring, animated } from 'react-spring';
import axios from '../../../../axiosbase'
import UserContext from '../../../../context/UserContext'

export const EditModal = ({ showModal, setShowModal, setUpdate, parent, parentEdit, trainers }) => {
    const ctx = useContext(UserContext);
    const [per, setPer] = useState(Role);
    const [errText, setErrText] = useState("0");
    const [btnSpin, setBtnSpin] = useState(false);
    const [trainerId, setTrainerId] = useState(null)

    useEffect(() => {
        const final = [];
        Role.forEach(el => { if (el.value === parent.role) { el["code"] = true; } else { el["code"] = false; } final.push(el); })
        setPer(final);
        if (parent.trainerOrganizationId !== null && parent.trainerOrganizationId !== undefined) { setTrainerId(parent.trainerOrganizationId) }
    }, [showModal]);

    const animation = useSpring({
        config: { duration: 330 },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(10%)` : `translateY(30%)`
    });


    const clickHandle = (e) => {
        setBtnSpin(true);
        e.preventDefault();
        let getInp = document.querySelectorAll('.getMainInp22'); let cond = [];
        let arr = Array.from(getInp); const final = {}; arr.forEach(el => { final[el.name] = el.value; if (el.value !== "") { cond.push(el.name); } });
        let getInp2 = document.querySelectorAll('.getRoles');
        let arr2 = Array.from(getInp2); arr2.forEach(el => { if (el.checked === true) { final[el.name] = el.value; cond.push(el.name); } });

        if (parent.role === "edpuser") {
            let permission = []; let smObj = {};
            let getInp3 = document.querySelectorAll('.getPermission');
            let arr3 = Array.from(getInp3); arr3.forEach(el => {
                if (el.checked === true) { smObj[el.value] = true } else { smObj[el.value] = false }
            });
            permission.push(smObj); final["permission"] = permission
        } else { final["permission"] = null }
        if (final.role === 'trainer') {
            final.trainerOrganizationId = trainerId ?? null
        }


        if (cond.length < 6) {
            setBtnSpin(false);
            setErrText("1");
        } else if (final.role === 'trainer' && final.trainerOrganizationId === null) {
            setBtnSpin(false);
            setErrText("1");
        } else {
            setErrText("0");
            axios.put(`users/${parent.id}`, final).then(res => {
                console.log(res, "^ ress"); setUpdate(prev => !prev); ctx.alertText("green", "Амжилттай", true); setBtnSpin(false); setShowModal(prev => !prev);
            }).catch(error => { console.error(error, "^err"); ctx.alertText("orange", "Алдаа гарлаа", true); setBtnSpin(false); });
        }
        console.log(final, "^final");
    }

    const roleHandle = (event) => {
        const final = []
        Role.forEach(el => { if (el.value === event.target.value) { el["code"] = true; } else { el["code"] = false; } final.push(el); })
        setPer(final);
    }

    const editHandle = (event) => {
        let finall = {}; finall["role"] = parent.role; finall["permission"] = parent.permission; finall["id"] = parent.id; finall[""] = event.target.value; parentEdit(parent["finall"] = finall);
    }

    return (
        <>
            {/* ref={modalRef} onClick={closeModal} */}
            {showModal ? <Background >
                <animated.div style={animation} >
                    <div className="modalPar container">
                        <div className="closeParent">
                            <div className="title">Хэрэглэгч үүсгэх</div>
                            <button className="esc" onClick={() => setShowModal(prev => !prev)} > X </button>
                        </div>
                        <form onSubmit={clickHandle}>
                            <div className="InputPar">
                                <div className="rowss">
                                    <div className="inputItem">
                                        <span className="title">Овог ( mn ):</span>
                                        <input onChange={editHandle} value={parent.lastname} name="lastname" className="getMainInp22 form-control" type="text" />
                                    </div>
                                    <div className="inputItem">
                                        <span className="title">Нэр ( mn ):</span>
                                        <input onChange={editHandle} value={parent.firstname} name="firstname" className="getMainInp22 form-control" type="text" />
                                    </div>
                                </div>

                                <div className="rowss">
                                    <div className="inputItem">
                                        <span className="title">Овог ( eng ):</span>
                                        <input onChange={editHandle} value={parent.lastname_eng} name="lastname_eng" className="getMainInp22 form-control" type="text" />
                                    </div>
                                    <div className="inputItem">
                                        <span className="title">Нэр ( eng ):</span>
                                        <input onChange={editHandle} value={parent.firstname_eng} name="firstname_eng" className="getMainInp22 form-control" type="text" />
                                    </div>
                                </div>

                                <div className="rowss">
                                    <div className="inputItem">
                                        <span className="title">Email :</span>
                                        <input onChange={editHandle} value={parent.email} name="email" className="getMainInp22 form-control" type="email" />
                                    </div>
                                    <div className="inputItem">
                                        <span className="title">Утасны дугаар :</span>
                                        <input onChange={editHandle} value={parent.phone} name="phone" className="getMainInp22 form-control" type="number" />
                                    </div>
                                </div>
                                <div style={{ paddingBottom: 20, borderBottom: `1px solid rgba(0,0,0,0.08)` }} className="rowss">
                                    <div className="inputItem">
                                        <span className="title">Нэвтрэх нэр :</span>
                                        <input onChange={editHandle} value={parent.name} name="name" className="getMainInp22 form-control" type="text" />
                                    </div>
                                </div>
                            </div>

                            <div className="otherPar">
                                <div className="HeadCheck">
                                    {per.map((el, i) => {
                                        return (
                                            <div key={i} className="title"> <input onChange={roleHandle} checked={el.code} className="getRoles" name="role" type="radio" value={el.value} /> <span>{el.title}</span></div>
                                        )
                                    })}
                                </div>

                                {parent.role === "edpuser" && (<div className="edpUsers">
                                    <div className="items"><input checked={parent.permission !== null ? parent.permission[0].pps : null} value="pps" name="permission" className="getPermission" type="checkbox" /> <span>Түншлэлийн хөтөлбөр</span></div>
                                    <div className="items"><input checked={parent.permission !== null ? parent.permission[0].training : null} value="training" name="permission" className="getPermission" type="checkbox" /> <span>Сургалт</span></div>
                                    <div className="items"><input checked={parent.permission !== null ? parent.permission[0].insurance : null} value="insurance" name="permission" className="getPermission" type="checkbox" /> <span>Даатгал</span></div>
                                </div>)}

                                {per.find(obj => obj.code === true)?.value === "trainer" && (
                                    <div className="edpUsers">
                                        <div className="title">
                                            Сургалт зохион байгуулагч байгууллагууд:
                                        </div>
                                        <select className="trainer" value={trainerId ?? 'none'} onChange={e => setTrainerId(+e.target.value)}>
                                            <option value="none" disabled>- Сонгох -</option>
                                            {trainers.map(trainer =>
                                                <option value={trainer.id} key={trainer.id}>
                                                    {trainer.organization_name}
                                                </option>
                                            )}
                                        </select>
                                    </div>)}
                            </div>

                            <div className="BtnPar">
                                <span style={{ opacity: errText }} className="errTxt">Гүйцэд бөгөлнө үү...</span>
                                <ButtonStyle type="submit" style={!btnSpin ? {} : { padding: `0px 15px` }} className="finalBtn"> {!btnSpin ? 'Хадгалах' : <img src="/gif1.gif" alt="gif" />} </ButtonStyle>
                            </div>
                        </form>
                    </div>
                </animated.div>
            </Background> : null}
        </>
    )
}

const Background = styled.div`
    overflow-y:scroll;
    font-size:13px;
    width: 100%;
    // height: 100%;
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
        .otherPar{
            display:flex;
            align-items:start;
            justify-content:space-between;
            .HeadCheck{
                // height:170px;
                // overflow-y:scroll;
                font-size:14px;
                display:flex;
                flex-direction:column;
                width:50%;
                margin-bottom:15px;
                padding-left:10px;
                .title{
                    padding:5px 0px;
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
            .edpUsers{
                width:50%;
                padding:10px 15px;
                margin-bottom:10px;
                margin-left:10px;
                .title{
                    font-size:12.5px;
                    opacity:0.9;
                    font-weight:500;
                }
                .trainer{
                    padding:5px 8px;
                    border:1px solid rgba(0,0,0,0.3);
                    border-radius:4px;
                    margin-top: 8px;
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

const Role = [
    { title: "Холбоотой Яамд", value: "holbootoi_yamd", },
    // { title: "Төслийн Захирал", value: "tosliin_zahiral", },
    { title: "Төслийн зохицуулагч", value: "tosliin_zohitsuulagch", },
    { title: "Ахлах БХШ", value: "ahlah_bhsh", },
    { title: "БХЗ", value: "bh_zovloh", },
    { title: "ҮДД-ын зөвлөх", value: "vdd_zovloh", },
    { title: "Хуулийн зөвлөх", value: "huuliin_zowloh", },
    { title: "Санхүү", value: "sanhuu", },
    { title: "Худалдаан авах ажиллагаа", value: "hudaldanavah_ajillagaa", },
    { title: "Сургалт зохион байгуулагч", value: "trainer", },
    { title: "Үнэлгээний хорооны гишүүн", value: "member", },
    { title: "Мониторинг", value: "monitoring", },
    { title: "edp - админ", value: "edpadmin", }
]
