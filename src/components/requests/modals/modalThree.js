import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {fontFamily, textColor, ColorRgb, } from '../../theme';
import {CgPushChevronUp, CgPushChevronDown} from 'react-icons/cg'


function ModalThree(props) {
    const [ DataOne, setDataOne ] = useState([]);
    const [ margin, setMargin ] = useState(0);
    useEffect(()=>{ if(props.Data2){ setDataOne(props.Data2); }else{ setDataOne(tableData); }},[props.Data2]);

    const clickHandle = (el) =>{  if(el==="add"){ setMargin(prev => prev + 10); }else{  if(margin < 0){  setMargin(prev =>prev);  }else{ setMargin(prev => prev - 10);  }  }}

    return (
        <TableTwo style={{marginBottom:margin}} >
            <h6>3. Үйлдвэрлэгчийн байгаль орчин, нийгмийн удирдлагын гүйцэтгэлийн талаарх мэдээллийн товчоон *</h6>
            <div className="table container">
                <div style={{borderBottom:`1px solid rgba(0,0,0,0.4)`}} className="Header row">
                        <div className="col-md-12 col-sm-12 col-12"><div className="question">Торгууль / Шийтгэл / Санал гомдлууд </div></div>
                </div>
                <div  className="Header row">
                        <div className="col-md-3 col-sm-3 col-3"><div className="question">Огноо :</div></div>
                        <div style={{borderLeft:`1px solid rgba(0,0,0,0.3)`}} className="col-md-3 col-sm-3 col-3"><div className="question">Асуудлын мөн чанар </div></div>
                        <div style={{textAlign:"center",borderLeft:`1px solid rgba(0,0,0,0.3)`}} className="col-md-3 col-sm-3 col-3"><div className="question">Авсан ба авах арга хэмжээ (огноо тус бүрээр)</div>  </div>
                        <div className="col-md-3 col-sm-3 col-3" style={{borderLeft:`1px solid rgba(0,0,0,0.3)`}}><div className="question">Санал</div></div>
                </div>

                {props.na3!==1? DataOne.map((el,i)=>{
                    return(
                        <div key={i} className="items row">

                                <div style={{borderBottom:`1px solid rgba(0,0,0,0.2)`,backgroundColor:`rgba(63,255,181,0.2)`}} className="col-md-3 col-sm-3 col-3"><div className="question">{el.pdate}</div></div>
                                <div style={{borderLeft:`1px solid rgba(0,0,0,0.2)`,borderBottom:`1px solid rgba(0,0,0,0.2)`,backgroundColor:`rgba(63,255,181,0.2)`}} className="col-md-3 col-sm-3 col-3"><div className="question">{el.issue}</div></div>
                                <div style={{textAlign:"center",borderLeft:`1px solid rgba(0,0,0,0.2)`,borderBottom:`1px solid rgba(0,0,0,0.2)`,backgroundColor:`rgba(63,255,181,0.2)`}} className="col-md-3 col-sm-3 col-3">
                                <div className="question">{el.stepdate}</div>
                                </div>
                                <div className="col-md-3 col-sm-3 col-3" style={{borderLeft:`1px solid rgba(0,0,0,0.2)`,borderBottom:`1px solid rgba(0,0,0,0.2)`,backgroundColor:`rgba(63,255,181,0.2)`}}><div className="question">{el.vote}</div></div>

                        </div>
                    )
                }):<div className="items row"><div style={{backgroundColor:`rgba(63,255,181,0.2)`}} className="col-md-12 col-sm-12 col-12"><div className="question A1">Торгууль шийтгэл байхгүй.</div></div> </div>  }
            </div>

            <div className="MarginBtn"> {margin>0?<CgPushChevronUp onClick={()=>clickHandle("remove")} />:<div></div>} <CgPushChevronDown onClick={()=>clickHandle("add")} /></div>
        </TableTwo>
    )
}

export default ModalThree

const TableTwo  = styled.div`
    transition:all 0.2s ease;
    padding: 50px 20px 0px 20px;
    color:rgb(${textColor});
    font-family:${fontFamily};
    .table{
        margin-top:10px;
        border:1px solid rgba(0,0,0,0.2);
        .Header{
            background-color:rgba(${ColorRgb},0.8);
            color:white;
            .question{
                padding-top:6px;
                padding-bottom:6px;
                display:flex;
                justify-content:center;
                align-items:center;
                height:100%;
            }
        }
        .items{
            .question{
                padding-top:6px;
                padding-bottom:6px;
                display:flex;
                justify-content:center;
                align-items:center;
                height:100%;
            }
            .A1{
                font-weight:500;
                font-size:15px;
            }
        }
    }
    @media print{
        padding: 50px 10px 50px 5px;
        .MarginBtn{
            display:none;
        }
    } 
`

const tableData = [
    { items: "Үйлдвэрийн үйл ажиллагаа  (зөвшөөрөл, тусгай зөвшөөрөл гм)", list:[]},
    {items: "Байгаль орчны үнэлгээ ", list:[]},
    {items: "Усан хангамж",list:[]},
    {items: "Хаягдал ус гаргах",list:["Хотын","Үйлдвэрийн","Бусад"]},
    {items: "Хаягдал зайлуулалт",list:["Аюултай бус (жишээ нь: цаас, сав боодол, мод, хуванцар гм) ","Аюултай"]},
    {items: "Аюултай материалын хадгалалт, ашиглалт  (будаг, уусгагч, түлш, бусад шатамхай бодис материал гм)",list:[]},
    {items: "Гал түймрээс сэргийлэх",list:[]},
    {items: "Эрүүл мэнд, аюулгүй ажиллагаа",list:[]},
    {items: "Хүүхдийн хөдөлмөр эрхлэлт",list:[]},
  ];