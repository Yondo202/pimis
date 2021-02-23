import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {fontFamily, textColor, ColorRgb, } from '../../theme';


function ModalFour(props) {

    const [ DataOne, setDataOne ] = useState([]);
    useEffect(()=>{
      if(props.Data2){
        setDataOne(props.DataOne);
        const finalData = []
            tableData.map((el,i)=>{
                props.Data2.map((elem,index)=>{ if (i + 1 === elem.rownum){ el["rowvalue"] = elem.rowvalue;} });
                finalData.push(el);
            });
        setDataOne(finalData);
      }else{
        setDataOne(tableData);
      }
        

    },[props.Data2]);

    console.log(DataOne, " my data foureee oneeeee"); 

    return (
        <TableTwo >
            <h6>4. Байгаль орчин, нийгмийн ерөнхий үнэлгээний маягт *</h6>
            <div className="table container">
                <div  className="Header row">
                        <div className="col-md-5 col-sm-5 col-5"><div className="question">Асуудлууд</div></div>
                        <div style={{textAlign:"center",borderLeft:`1px solid rgba(0,0,0,0.3)`}} className="col-md-2 col-sm-2 col-2">
                          <div className="question">Хариулт</div>
                        </div>
                        <div style={{borderLeft:`1px solid rgba(0,0,0,0.3)`}} className="col-md-2 col-sm-2 col-2"><div className="question">(Зөвшөөрөл, тусгай зөвшөөрөл, албан бичиг гэх мэт) ба батладаг эрх бүхий байгууллага</div></div>
                        <div className="col-md-3 col-sm-3 col-3" style={{borderLeft:`1px solid rgba(0,0,0,0.3)`}}><div className="question">Батлагдсан баримт бичгүүд /хавсаргасан</div></div>
                </div>

                {DataOne.map((el,i)=>{
                    return(
                        <div key={i} className="items row">
                                <div style={{borderBottom:`1px solid rgba(0,0,0,0.2)`,backgroundColor:` rgba(63,81,181,0.1)`}} className="col-md-5 col-sm-5 col-5"><div className="question">{el.name}</div></div>
                                <div style={{textAlign:"center",borderLeft:`1px solid rgba(0,0,0,0.2)`,borderBottom:`1px solid rgba(0,0,0,0.2)`,backgroundColor:`rgba(63,255,181,0.2)`}} className="col-md-2 col-sm-2 col-2">
                                <div className="question">{el.rowvalue === true? <span className="hariult">Тийм</span>: el.rowvalue === false? <span className="hariult">Үгүй</span>: <span className="hariult">хоосон</span>}</div>
                                </div>
                                <div style={{borderLeft:`1px solid rgba(0,0,0,0.2)`,borderBottom:`1px solid rgba(0,0,0,0.2)`,backgroundColor:` rgba(63,81,181,0.1)`}} className="col-md-2 col-sm-2 col-2"><div className="question">{el.nameTwo}</div></div>
                                <div className="col-md-3 col-sm-3 col-3" style={{borderLeft:`1px solid rgba(0,0,0,0.2)`,borderBottom:`1px solid rgba(0,0,0,0.2)`,backgroundColor:` rgba(63,81,181,0.1)`}}><div className="question">{el.nameThree}</div></div>
                        </div>
                    )
                })}
            </div>
          

           
            
        </TableTwo>
    )
}

export default ModalFour

const TableTwo  = styled.div`
    padding: 50px 100px 50px 64px;
    color:rgb(${textColor});
    font-family:${fontFamily};
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
            .hariult{
                font-weight:500;
            }
            }
        }
    }
    
`

// const tableData = [
//     { items: "Үйлдвэрийн үйл ажиллагаа  (зөвшөөрөл, тусгай зөвшөөрөл гм)", list:[]},
//     {items: "Байгаль орчны үнэлгээ ", list:[]},
//     {items: "Усан хангамж",list:[]},
//     {items: "Хаягдал ус гаргах",list:["Хотын","Үйлдвэрийн","Бусад"]},
//     {items: "Хаягдал зайлуулалт",list:["Аюултай бус (жишээ нь: цаас, сав боодол, мод, хуванцар гм) ","Аюултай"]},
//     {items: "Аюултай материалын хадгалалт, ашиглалт  (будаг, уусгагч, түлш, бусад шатамхай бодис материал гм)",list:[]},
//     {items: "Гал түймрээс сэргийлэх",list:[]},
//     {items: "Эрүүл мэнд, аюулгүй ажиллагаа",list:[]},
//     {items: "Хүүхдийн хөдөлмөр эрхлэлт",list:[]},
//   ];


  const tableData = [
    { name: "Дэд төслөөс байгаль орчин, нийгэмд эмзэг , олон янзын ба урьд өмнө байгаагүй ноцтой  сөрөг нөлөө үзүүлэхээр байгаа эсэх? Товч тодорхойлолт өгнө үү",
       nameTwo:"ҮАБ 4.01 Байгаль орчны үнэлгээ “A” ангилал",
      nameThree:"Байгаль орчин, нийгмийн  нөлөөллийн үнэлгээ  (БОННҮ)"},
  
    { name: "Нөлөөлөл үйл ажиллагаа явуулж буй газар эсвэл байгууламжийн гадна тусахаар байгаа эсэх, байгаль орчинд үзүүлэх сөрөг нөлөө нь нөхөн сэргээгдэхгүй байх эсэх? Товч тодорхойлолт өгнө үү:",
       nameTwo:"ҮАБ 4.01 Байгаль орчны үнэлгээ “A” ангилал",
      nameThree:"БОННҮ "},
  
    { name: "Төлөвлөж байгаа төсөл нь байгаль орчинд багахан эсвэл ямар ч сөрөг нөлөө үзүүлэхгүй байх эсэх? Товч үндэслэл тайлбар өгнө үү:",
       nameTwo:"OP 4.01 Байгаль орчны үнэлгээ “C” ангилал  ",
      nameThree:"Ерөнхий үнэлгээнээс өөр үйл ажиллагаа шаардлагагүй  "},
  
    { name: "Дэд төслийн байгаль орчин, нийгмийн нөлөөлөл бага байх, зөвхөн үйл ажиллагаа хэрэгжиж байгаа газарт тусах; эсвэл тухайн нөлөөлөл нь бага ч эргэн нөхөн сэргээгдэхгүй байх эсэх? Товч үндэслэл тайлбар өгнө үү:	",
       nameTwo:"OP 4.01 Байгаль орчны үнэлгээ “B” ангилал  ",
      nameThree:"БОННҮ эсвэл  Байгаль орчин, нийгмийн менежментийн төлөвлөгөө (БОНМТ) "},
  
    { name: "Төсөл нь соёлын биет нөөцөд сөрөг нөлөө үзүүлэх эсэх? Товч үндэслэл тайлбар өгнө үү:",
       nameTwo:"OP 4.11  Соёлын биет нөөц  ",
      nameThree:"БОННҮ-д авч үзсэн байх (Соёлын биет нөөцийн   менежментийн төлөвлөгөөг    оруулсан БОННҮ    ба/эсвэл төслийн явцад илрүүлсэн  биет олдворуудтай холбоотой журам)"},
  
    { name: "Төслийн үйл ажиллагаа гол чухал бус байгалийн амьдрах орчныг өөрчлөх эсвэл доройтуулах эсэх? Товч үндэслэл тайлбар өгнө үү: ",
       nameTwo:"OP 4.04 Байгалийн амьдрах орчин ",
      nameThree:"БОННҮ-д авч үзсэн байх  "},
  
    { name: "Төслийн үйл ажиллагаа нь гол чухал байгалийн амьдрах орчныг өөрчлөх эсвэл доройтуулах эсэх?  ",
       nameTwo:"OP 4.04 Байгалийн амьдрах орчин ",
      nameThree:"Авч үзэх боломжгүй "},
  
    { name: "Дэд төсөл нь шинээр далан барих эсвэл баригдсан ба барихаар төлөвлөж буй даланг ашиглах эсэх?   ",
       nameTwo:"OP 4.37 Далангийн аюулгүй байдал  ",
      nameThree:"Далангийн аюулгүй байдлыг хангах төлөвлөгөө "},
  
    { name: "Төсөл нь ямар нэг пестицид худалдаа хийх эсэх (төслөөр шууд эсвэл зээл олгох, хамтран санхүүжүүлэх замаар шууд бус хэлбэрээр эсвэл төрийн хамтрагч байгууллагын санхүүжилтээр дамжуулан), эсвэл пестицидийн худалдаа хийх төлөвлөгөөгүй ч хөнөөлт шавжийн менежментэд хор нөлөө үзүүлж болох эсэх?  ",
      nameTwo:"OP4.09 Хөнөөлт шавьжны менежмент ",
      nameThree:"БОННҮ-д авч үзсэн байх (Хөнөөлт шавьжны менежментийн төлөвлөгөө) "},
  
    { name: "Дэд төсөл нь албадан газар чөлөөлүүлэх, өмч хөрөнгийг алдагдуулах эсвэл орлого, амьжиргааны эх үүсвэрийг алдагдуулахад хүргэх эсэх? Товч үндэслэл тайлбар өгнө үү: ",
      nameTwo:"OP 4.12 Албадан нүүлгэн шилжүүлэлт ",
      nameThree:"Нүүлгэн шилжүүлэлт  (НШ)- ийн хураангуй төлөвлөгөө/ НШ-ийн төлөвлөгөө (Журмын талаарх  дэлгэрэнгүйг  Хавсралт C-ээс харна уу). "},
  
    { name: "Дэд төсөл хэрэгжих газарт цөөнхийн бүлэг амьдардаг ба төслийн үйл ажиллагаа тэдэнд сөрөг эсвэл эерэг нөлөө үзүүлэх эсэх? Товч үндэслэл тайлбар өгнө үү:  ",
      nameTwo:"ҮАБ 4.10 Уугуул иргэд  ",
      nameThree:"Нутгийн цөөнхи бүлэгт чиглэсэн  хөгжлийн төлөвлөгөө /Уугуул иргэдэд чиглэсэн төлөвлөгөө (Журмын талаарх дэлгэрэнгүйг Хавсралт B-ээс харна уу).  "},
  
    { name: "Төсөл нь ойтой холбоотой үйл ажиллагаа явуулснаар ойн эрүүл мэнд, чанарт нөлөөлөх эсвэл нутгийн иргэдийн эрх, сайн сайхан, бие даасан байдалд нөлөөлөх эсэх; эсвэл байгалийн ба таримал ойн менежмент, хамгаалал, ашиглалтыг өөрчлөхийг зорьж байгаа эсэх? Товч үндэслэл тайлбар өгнө үү: ",
      nameTwo:"ҮАБ4.36 Ойн аж ахуй ",
      nameThree:"БОННҮ-д авч үзсэн байх  "},
  
    { name: "Төсөл нь байгалийн гол чухал ой ба бусад амьдрах орчныг өөрчлөн хувиргах ба доройтуулах нөлөө үзүүлэх эсэх?   ",
      nameTwo:"OP4.36   Ойн аж ахуй ",
      nameThree:"Авч үзэх боломжгүй "},
  
    { name: "Дэд төсөл, түүнтэй холбоотой асуудал ба үйл ажиллагаанд хоёр ба түүнээс дээш тооны улс орнуудын хооронд ямар нэг газар нутгийн маргаан байгаа эсэх?  ",
      nameTwo:"ҮАБ 7.60 Маргаантай газруудад хэрэгжих төслүүд ",
      nameThree:"Тухайн улс орны төр засгийн газартай тохиролцох  "},
  
    { name: "Дэд төсөл, түүнтэй холбоотой асуудал ба үйл ажиллагаа, тэдгээрийн нарийвчилсан дизайн, инженерийн судалгаа нь олон улсын усан зам ашиглах, бохирдол үүсгэх, эсвэл тухайн замд байрлах эсэх?  ",
      nameTwo:"ҮАБ7.50 Олон улсын усан замын төслүүд  ",
      nameThree:"Мэдэгдэх, зарлах (эсвэл тухайн нөхцөлд авч үзэх зүйл) "},
  ];