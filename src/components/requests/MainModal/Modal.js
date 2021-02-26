import React, {useRef, useEffect, useCallback, useState } from 'react';
import { useHistory } from "react-router-dom"
import {useSpring, animated} from 'react-spring';
import {VscFilePdf} from 'react-icons/vsc';
import styled from 'styled-components'
import ModalFour from '../modals/modalFour';
import ModalOne from '../modals/modalOne'
import ModalThree from '../modals/modalThree';
import ModalTwo from '../modals/modalTwo';
import {ColorRgb} from '../../theme'

import { useReactToPrint } from "react-to-print";

export const Modal = ({ showModal,setShowModal, initialData, param }) => {
    // const HelpContext = useContext(HelperContext);
    const history = useHistory();
    const [ DataOne, setDataOne ] = useState([]);
    const modalRef = useRef();
    const animation = useSpring({
        config:{
            duration:250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateX(0%)` : `translateX(-100%)`
    });

    const closeModal = e =>{
       if(modalRef.current === e.target){
         setShowModal(false);
       }
    }
    
    const keyPress = useCallback(e=>{
        if(e.key === 'Escape' && showModal){
            setShowModal(false);
        }
    },[setShowModal, showModal]);
    
    useEffect( async ()=>{
        document.addEventListener('keydown', keyPress);
        await setDataOne(initialData);
        return () => document.removeEventListener('keydown', keyPress)
    },[keyPress]);

    console.log(DataOne, "### data 11");

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    const backHanlde = () =>{
        history.push(`/progress/${param}`);
    }

    console.log(DataOne, " Modal Data ");

    return(
        <>
            {showModal ?
              (<Background style={param!=="user"?{left:"270px",paddingRight:"160px",justifyContent:"center"} :{left:"0"} } ref={modalRef} onClick={param!=="user"?backHanlde:closeModal}>
                  <animated.div style={animation} >
                      <div className="modalPar container">
                          <div className="closeParent">
                              <button className="print"  onClick={handlePrint}><VscFilePdf />  Хэвлэх болон Pdf - ээр татах</button>
                              {param!=="user"? <button className="esc" onClick={backHanlde} > Буцах </button> :<button className="esc" onClick={()=> setShowModal(prev => !prev)} > X </button> }
                          </div>
                          
                          <div ref={componentRef}>
                            <ModalOne  DataOne={DataOne.ppsRequest1Details} />
                            <ModalTwo Data2={DataOne.ppsRequest2Details} />
                            <ModalThree Data2={DataOne.ppsRequest3Details} />
                            <ModalFour Data2={DataOne.ppsRequest4Details} />
                          </div>

                      </div>
                  </animated.div>
              </Background>)
             : null}
        </>
    )
}
// https://www.youtube.com/watch?v=d3aI1Dt0Z50

const Background = styled.div`
    font-size:13px;
    width: 100%;
    height: 100%;
    top:0;
    right:0;
    bottom:0;
    background: rgba(0,0,0,0.5);
    position:fixed;
    display:flex;
    justify-content:end;
    align-items:center;
    z-index:1000;
    .modalPar{
        overflow-x:scroll;
        background-color:white;
        // width:794px;
        width:1000px;
        height:100vh;
        padding:20px 20px;
        .PdfParent{
          padding-top:50px;
        }
        .closeParent{
            width:100%;
            display:flex;
            flex-direction:row;
            align-items:center;
            justify-content:space-between;
            padding: 0px 100px 0px 64px;
            button{
                padding:5px 10px;
                border-style:none;
                cursor:pointer;
                box-shadow:1px 1px 6px -2px rgb(${ColorRgb});
            }
            .esc{
            }
            .print{
              font-weight:500;
              color:black;
              // background-color:rgb(${ColorRgb});
              // background-color:#008CBA;
              width:80%;
              display:flex;
              align-items:center;
              justify-content:center;
              border:1px #008CBA;
              border-style: dashed;
              transition:all 0.4s ease;
              &:hover{
                background-color:#009CBA;
              }
              svg{
                margin-right:18px;
                font-size:24px;
              }
            }
        }
    }
`



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