import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import { fontFamily, textColor, ColorRgb } from '../../theme';
import {CgPushChevronUp, CgPushChevronDown} from 'react-icons/cg'



function ModalOne(props) {
    const [ DataOne, setDataOne ] = useState([]);
    const [ margin, setMargin ] = useState(0);
    useEffect(()=>{
        if(props.DataOne){
            const finalData = [];
            dataOne.map((el,i)=>{ props.DataOne.map(elem=>{ if(i + 1 === elem.rownum){ el["rvalue"] = elem.rvalue; el["rownum"] = elem.rownum } }); finalData.push(el); });
            setDataOne(finalData);
        }else{ setDataOne(dataOne); }
    },[props.DataOne]);

    const clickHandle = (el) =>{  if(el==="add"){ setMargin(prev => prev + 10); }else{  if(margin < 0){  setMargin(prev =>prev);  }else{ setMargin(prev => prev - 10);  }  }}

    return (
        <TableOne style={{marginBottom:margin}} >
            <h6>1. Үйлдвэрлэгч нь дараах үйл ажиллагааг эрхэлдэг ба явуулдаг эсэх? *</h6>
            <div className="table container">
                <div  className="Header row">
                    <div className="col-md-10 col-sm-10 col-10"><div className="question">Шалгуур</div></div>
                    <div style={{borderLeft:`1px solid rgba(0,0,0,0.2)`}} className="col-md-2 col-sm-2 col-2">
                        <div className="answer">Хариулт</div>
                    </div>
                </div>
                {DataOne.map((el,i)=>{
                    return(
                        <div className="items row">
                            <div style={{borderBottom:`1px solid rgba(0,0,0,0.2)`}} className="col-md-10 col-sm-10 col-10">
                                <div className="question22">
                                    <span className="Num">{el.rownum}</span>
                                        {el.name}
                                </div>
                            </div>
                            <div style={{borderLeft:`1px solid rgba(0,0,0,0.2)`,borderBottom:`1px solid rgba(0,0,0,0.3)`,backgroundColor:`rgba(63,255,181,0.2)`}}  className="col-md-2 col-sm-2 col-2">
                                <div className="answer">
                                    {el.rvalue === "true" ? <span>Тийм</span> : null}
                                    {el.rvalue === "unconcern" ? <span>Хамаарахгүй</span> : null}
                                    {el.rvalue === "false" ? <span>Үгүй</span> : null}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="MarginBtn"> {margin>0?<CgPushChevronUp onClick={()=>clickHandle("remove")} />:<div></div>} <CgPushChevronDown onClick={()=>clickHandle("add")} /></div>
        </TableOne> 
    )
}

export default ModalOne

const TableOne = styled.div`
    transition:all 0.2s ease;
    padding: 50px 100px 50px 64px;
    font-family:${fontFamily};
    color:rgb(${textColor});
    
    .table{
        border:1px solid rgba(0,0,0,0.2);
        .Header{
            background-color:rgba(${ColorRgb},0.8);
            color:white;
            text-align:center;
            padding-top:6px;
            padding-bottom:6px;
        }
        .items{
            background-color: rgba(63,81,181,0.1);
            .question22{
                height:100%;
                display:flex;
                align-items:center;
                .Num{
                    margin-right:10px;
                    padding-right:10px;
                    height:100%;
                    border-right:1px solid rgba(0,0,0,0.2);
                }
            }
            .question{
                padding:5px 0px;
            }
            .answer{
                font-weight:500;
                height:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:5px 0px;
            }
        }
    }
    @media print{
        .MarginBtn{
            display:none;
        }
    } 
`


const dataOne = [
    { name: "Цэрэг армийн ямар нэг зэвсэг" },
    { name: "Зэрлэг амьтан, ургамлын ховордсон төрөл зүйлийг олон улсын хэмжээнд худалдаалах тухай конвенц (CITES)-ийн хүрээнд хориглодог ан амьтан, ургамлын худалдаа" },
    { name: "Байгаль, хүрээлэн буй орчинд генийн өөрчлөлтөд орсон организмуудыг гаргах" },
    { name: "Хориглосон пестицид, хербицидийн үйлдвэрлэл, нийлүүлэлт, худалдаа" },
    { name: "Далай тэнгист тороор загас барих" },
    { name: "Цацраг идэвхт бүтээгдэхүүнүүд" },
    { name: "Аюултай хог хаягдлын хадгалалт, боловсруулалт, зайлуулалт" },
    { name: "Хлорфторт нүүрстөрөгчид, галлон болон Монреалийн протоколын хүрээнд зохицуулагддаг бусад бодисууд агуулсан тоног төхөөрөмж, хэрэгслийн үйлдвэрлэл" },
    { name: "Олон хлорт бефенилиудын үзүүлэх нөлөө 0.005 %-аас хэтэрсэн агууламж бүхий цахилгаан хэрэгсэл, тоног төхөөрөмжийн үйлдвэрлэл" },
    { name: "Шөрмөсөн чулуу агуулсан бүтээгдэхүүний үйлдвэрлэл" },
    { name: "Цөмийн реакторууд, тэдгээрийн хэсгүүд" },
    { name: "Тамхи (үйлдвэрлэлийн бус ба үйлдвэрлэлийн); Тамхины хатаасан навч боловсруулах машин" },
];
