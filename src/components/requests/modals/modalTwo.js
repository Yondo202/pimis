import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {fontFamily, textColor, ColorRgb, } from '../../theme';


function ModalTwo(props) {
    console.log(props.Data2, "** 22 data")

    const [ DataOne, setDataOne ] = useState([]);
    useEffect(()=>{
        // setDataOne(props.DataOne);
        const finalData = []
            tableData.map((el,i)=>{
                props.Data2.map((elem,index)=>{ if (i  === index){ el["name"] = elem.name; el["fileurl"] = elem.fileurl; el["getDate"] = elem.getDate ; el["recentDate"] = elem.recentDate} });
                finalData.push(el);
            });
        setDataOne(finalData);
    },[]);

    console.log(DataOne, " my data oneeeee"); 

    return (
        <TableTwo >
            <h6>2. Баталгаа/зөвшөөрөл/тусгай зөвшөөрлийн үнэлгээ *</h6>
            <div className="table container">
                <div  className="Header row">
                        <div className="col-md-3 col-sm-3 col-3"><div className="question">Асуудлууд</div></div>
                        <div style={{borderLeft:`1px solid rgba(0,0,0,0.3)`}} className="col-md-3 col-sm-3 col-3"><div className="question">(Зөвшөөрөл, тусгай зөвшөөрөл, албан бичиг гэх мэт) ба батладаг эрх бүхий байгууллага</div></div>
                        <div style={{textAlign:"center",borderLeft:`1px solid rgba(0,0,0,0.3)`}} className="col-md-4 col-sm-4 col-4">Баталсан огноо
                            <div style={{marginTop:13, borderTop:`1px solid rgba(0,0,0,0.3)`}} className="row">
                                <div className="col-md-6 col-sm-6 col-6">Хүлээн авсан</div>
                                <div style={{borderLeft:`1px solid rgba(0,0,0,0.3)`}}  className="col-md-6 col-sm-6 col-6">Шинэчил сэн</div>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-2 col-2" style={{borderLeft:`1px solid rgba(0,0,0,0.3)`}}><div className="question">Батлагдсан баримт бичгүүд /хавсаргасан</div></div>
                </div>

                {DataOne.map((el,i)=>{
                    return(
                        <div key={i} className="items row">
                                <div style={{borderBottom:`1px solid rgba(0,0,0,0.2)`,backgroundColor:` rgba(63,81,181,0.1)`}} className="col-md-3 col-sm-3 col-3"><div className="question">{el.items}</div></div>

                                <div style={{borderLeft:`1px solid rgba(0,0,0,0.2)`,borderBottom:`1px solid rgba(0,0,0,0.2)`,backgroundColor:`rgba(63,255,181,0.2)`}} className="col-md-3 col-sm-3 col-3"><div className="question">{el.name}</div></div>
                                <div style={{textAlign:"center",borderLeft:`1px solid rgba(0,0,0,0.2)`,borderBottom:`1px solid rgba(0,0,0,0.2)`,backgroundColor:`rgba(63,255,181,0.2)`}} className="col-md-4 col-sm-4 col-4">
                                    <div style={{height:`100%`}} className="row">
                                        <div className="col-md-6 col-sm-6 col-6"><div className="question">{el.getDate}</div> </div>
                                        <div style={{borderLeft:`1px solid rgba(0,0,0,0.2)`, }}  className="col-md-6 col-sm-6 col-6"><div className="question">{el.recentDate}</div></div>
                                    </div>
                                </div>
                                <div className="col-md-2 col-sm-2 col-2" style={{ overflow:`hidden`,borderLeft:`1px solid rgba(0,0,0,0.2)`,borderBottom:`1px solid rgba(0,0,0,0.2)`,backgroundColor:`rgba(63,255,181,0.2)`}}><div style={{ justifyContent:`start`}} className="question">{el.fileurl? el.fileurl: <span>Хавсаргаагүй</span>}</div></div>
                        </div>
                    )
                })}
            </div>
          

           
            
        </TableTwo>
    )
}

export default ModalTwo

const TableTwo  = styled.div`
    // margin-top:40px;
    color:rgb(${textColor});
    font-family:${fontFamily};
    padding: 50px 100px 50px 64px;
    .table{
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