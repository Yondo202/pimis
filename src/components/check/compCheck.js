import React,{useState, useContext,useEffect} from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'
import { fontFamily, textColor, ColorRgb, Color,fontSize } from '../theme';
import {AiOutlineSend} from 'react-icons/ai'
import {CgDanger} from 'react-icons/cg'
import UserContext from '../../context/UserContext'
import HelperContext from '../../context/HelperContext'
import axios from '../../axiosbase'

function CompCheck() {
    const ctx = useContext(HelperContext);
    const history = useHistory();
    const [ initialData, setInitialData ] = useState(allData);
    const [opacity, setOpacity] = useState("0");
    const [opacity2, setOpacity2] = useState("0");
    const [procent, setProcent] = useState('0');
    const [ UserToken, setUserToken ] = useState(null);
    const [ finalTextScale, setFinalTextScale] = useState('0');
    const [FinalErrorText, setFinalErrorText] = useState("");
    const StyleContext = useContext(UserContext);

    useEffect(async()=>{
      let storageToken = localStorage.getItem("edp_loggedUser", []);
      setUserToken(storageToken);
      const data =  await axios.get(`criterias`,{ headers: { Authorization:`bearer ${storageToken}` } });
      let keys = Object.keys(data.data.data);
     
      if(keys.length > 0){
        let filterArr = []
        let value = Object.values(data.data.data);
        keys.map((el,i)=>{
          let obj1 = {}; value.map((elem,ind)=>{  if(i===ind){ obj1["keys"] = el;  obj1["values"] = elem; }}); filterArr.push(obj1);
        });
        console.log('filterArr', filterArr);

        // allData.map((el,i)=>{
        //     el.items.map((elem,ind)=>{

        //         if(el.group`${ind + 1}` === ){

        //         }
        //     })
        // });

        // setInitialData(data.data.data); 
        console.log("^^data irseee");
      }else{ console.log("^^data alga") }


    },[]);


    console.log(initialData, " state data");
    const clickHandles = (e) =>{
              let rs2 = document.querySelectorAll(".inpTest333");
              let arr2 = Array.from(rs2);
              let soloObject2 = {}
              const cond = {};

              arr2.map((element,i)=>{ 
                  if(element.checked === true){
                    let field = element.name; let value = element.value;  let id = element.id; soloObject2[id + field] = value;
                  }
                  if( element.checked === true && element.id + element.name !== "a6" && element.id + element.name !== "a7" && element.value !== "false"){
                    let field = element.name; let value = element.value;  let id = element.id; cond[id + field] = value;
                  }

              });

              let finalCond = Object.keys(cond);
              let keys = Object.keys(soloObject2);
              console.log(keys.length, " my urt");
              const Procent = keys.length * 100 / 25;
              const FinalProcent = Math.round(Procent);

              if(keys.length < 25){
                setOpacity("1");
                setProcent(FinalProcent);
              }else if(finalCond.length < 23){
                setOpacity("0");
                setFinalErrorText("Өргөдөл гаргах боломжгүй бөгөөд цааш дамжлагад тэнцэхгүй байна.");
                setOpacity2("1");
              }else{
                setOpacity("0");
                setOpacity2("0");
                setFinalTextScale("0");
                alert("gg");
                // history.push('/');
                // scroll.scrollTo(0);
                axios.post(`criterias`, soloObject2, {headers:{ Authorization:`bearer ${UserToken}` } }).then(res=>{
                  console.log(res, "ress"); ctx.alertText('green, Амжилттай', true);
                }).catch(err=>console.log(err));
              }
      }

    return (
        <Component1 className="container" >
            <div className="boxShadow">
                <div className="rowHeader">Шалгуур хангалтыг тулгах хуудас <span className="tseg">*</span></div>
                {initialData.map((el,i)=>{
                    return(
                        <div key={i} className="formTwoParent ">
                          <div className="headerPar">
                              <div className="row" >
                              <div className="head1 col-md-10 col-sm-8 col-8">{el.title}</div>
                              <div className="head2 col-md-1 col-sm-2 col-2">Тийм</div>
                              <div className="head2 col-md-1 col-sm-2 col-2">Үгүй</div>
                              </div>
                          </div>
                          {el.items.map((elem, ind)=>{
                              return(
                              <div className="headerParchild" key={ind}>
                                  <div className="row" >
                                  <div className="number col-md-1 col-sm-1 col-1">{`${ind + 1}`}</div>
                                  <div className="texts col-md-9 col-sm-7 col-7">{elem.name}</div>
                                  <div className="radios col-md-1 col-sm-2 col-2"><input  className={`getinput22 inpTest333`} type="radio" name={el.group + (ind + 1)} value="true"/></div>
                                  <div className="radios col-md-1 col-sm-2 col-2"><input className={`getinput22 inpTest333`} type="radio" name={el.group + (ind + 1)} value="false"/></div>
                              </div>
                              </div>
                              )
                          })}
                    </div>)})}

                    <div className="FinalBtn">
                        <div style={{opacity:`${opacity}`}} className="errtext">Таны асуулга {procent}% байна..</div>
                        <div style={{opacity:`${opacity}`}} className="errtext">Та гүйцэд бөгөлнө үү...</div>
                    </div>

                    <div className="buttonPar">
                        <div style={{opacity:`${opacity2}`}} className="errtext"><CgDanger /> {FinalErrorText}</div>
                        <button onClick={clickHandles} className="SubmitButton" type="button">Цааш <div className="flexchild"><AiOutlineSend/><AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></button>
                    </div>
            </div>
        </Component1>
    )
}

export default CompCheck



const Component1 = styled.div`
    margin-top:40px;
    color:rgba(${textColor},0.9);
    transition: all 0.5s ease-out;
    font-family: ${fontFamily};
      .boxShadow{
        box-shadow:1px 1px 18px -5px;
        border-radius:6px;
        margin-bottom:80px;
          .rowHeader{
            border-radius:6px 6px 0px 0px;
            background-color:white;
            padding: 24px 26px;
            font-size:1.2rem;
            // border-bottom:1px solid rgba(63, 81, 181,0.5);
            color:black;
            .tseg{
              color:red;
            }
          }
        .formTwoParent{
            border-radius:0px 0px 6px 6px;
            background-color:white;
            // padding-bottom:16px;
            // margin-bottom:100px;
            font-size:${fontSize};
           
            
            .headerPar{
              background-color: rgba(0, 51, 102,0.9);
              color:white;
              text-align:center;
              border-bottom:1px solid rgba(0,0,0,0.4);
              font-size:14px;
             
              .head1{
                padding-top: 10px;
                padding-bottom: 16px;
              }
              .head2{
                padding-bottom: 18px;
                border-left:1px solid rgba(0,0,0,0.4);
                padding:0px 0px;
                padding-top: 10px;
              }
            }
            .headerParchild{
              background-color: rgba(63, 81, 181,0.1);
              text-align:center;
              border-bottom:1px solid rgba(0,0,0,0.4);
              .number{
                font-weight:500;
                text-align:center;
                border-right:1px solid rgba(0,0,0,0.4);
                padding-top: 10px;
                padding-bottom: 10px;
              }
              .texts{
                text-align:start;
                padding-top: 8px;
                padding-bottom: 8px;
              }
              .radios{
                display:flex;
                align-items:center;
                justify-content:center;
                border-left:1px solid rgba(0,0,0,0.4);
                padding:0px 0px;
                input{
                  cursor:pointer;
                  height:24px;
                  width:24px;
                  transition:all 0.4s ease;
                  border-radius:50% !important;
                  opacity: 0.8;
                  ::-webkit-datetime-edit { 
                    font-size: 1.4rem;
                }
                  &:checked{
                    opacity: 1;
                    -webkit-transform: scale(1.25);
                    transform: scale(1.25);
                    // box-shadow: 1px 1px 5px -2px;
                    border-radius:50% !important;
                  }
                }
              }
            }
        }
        .FinalBtn{
          margin:10px 10px;
          display:flex;
          flex-direction:row;
          align-items:center;
          justify-content:space-around;
          .errtext{
            

            transition:all 0.4s ease;
            text-align:center;
            background-color: #f6c343;
            border-radius:5px;
            font-size:15px !important;
            font-weight:400;
            color:black !important;
            line-height:34px;
            padding:0px 20px;
            
          }
        }

        .buttonPar{
        //   margin:10px 0px;
          display:flex;
          flex-direction:row;
          align-items:center;
          justify-content:space-between;
          padding:30px 30px;
            .errtext{
              display:flex;
              color:black;
              align-items:center;
              transition:all 0.4s ease;
              text-align:center;
              background-color: #f6c343;
              border-radius:5px;
              font-size:16px !important;
              font-weight:500;
              line-height:34px;
              padding:6px 20px;
              svg{
                color:red;
                margin-right:10px;
                font-size:25px;
              }
            }

            .SubmitButton{
                margin:10px 0px;
                margin-bottom:10px;
                border-style:none;
                border-radius:6px;
                cursor:pointer;
                padding:5px 0px;
                color:white;
                background-color:${Color};
                font-size:18px;
                text-align:center;
                transition:all 0.3s ease;
                display:flex;
                align-items:center;
                justify-content:space-around;
                border:1px solid rgba(63, 81, 181,0.5);
                width:30%;
                border-radius:6px;
                .hide{
                  transition:all 0.3s ease;
                  transform:scale(0);
                  font-size:22px;
                }
                .hide1{
                  transition:all 0.7s ease;
                  transform:scale(0);
                  font-size:26px;
                }
                &:hover{
                  box-shadow:1px 1px 15px -2px black;
                  .hide{
                    transition:all 0.3s ease;
                    transform:scale(1);
                  }
                  .hide1{
                    transition:all 0.7s ease;
                    transform:scale(1);
                  }
                }
                .flexchild{
                  display:flex;
                  align-items:center;
                  justify-content:space-around;
                }
            }
        }
      }

  @media only screen and (max-width:768px){
    .boxShadow{
        .formTwoParent{
            font-size:13px;
            .buttonPar{
                flex-direction: column;
                .errtext {
                    font-size:15px;
                    width:100%;
                }
                .SubmitButton{
                    width:100%;
                }
            }
            .headerPar{
                font-size:14px;
            }
            .headerParchild{
                font-size:13px;
            }
            .UserRequestPar{
                padding: 15px 15px;
                .inputPar{
                  .modalPar{
                    .BtnPar{
                      width:100%;
                      justify-content: center;
                      button{
                        margin-right:18px;
                      }
                    }
                  }
                    .NextChild{
                        flex-direction: column;
                        .next{ width:100%;}
                    }
                    .SingatureImg{
                        width:100%;
                    }
                }
            }
        }
        }
    }
`

const allData = [

    { 
       group: "a",
       title: "Үндсэн шалгуур хангалт",
       items: [
           {  name: "100 хувь хувийн ААН мөн эсэх"},
           {  name: "2 жилийн турш тогтмол үйл ажиллагаа явуулсныг батлах санхүүгийн тайлантай эсэх"},
           {  name: "Уул уурхайн салбарт ажилладаггүй эсэх"},
           {  name: "Ре-экспортын худалдаа эрхэлдэггүй эсэх"},
           {  name: "Түүхий эд экспортлогч бус эсэх /хэрэв жилийн 100 мянган ам.доллараас дээш экспорт хийдэг бөгөөд энэ ойрын хугацаанд боловсруулсан бүтээгдэхүүний экспорт хийхээр зорьж буй бол тийм гэж дугуйлна уу/"},
           {  name: "*Сүүлийн хоёр жил тус бүр 50 мянгаас 50 сая ам.доллартай тэнцэх нийт борлуулалтын орлоготой ажилласан эсэх "},
           {  name: "*Сүүлийн 2 жил тус бүр НДШ төлдөг бүтэн цагийн ажилчдын тоо 10-250 хооронд байсан эсэх"},
       ]
   }, 
   {
       group: "b",
       title: "Өр төлбөрийн шалгуур хангалт",
       items: [
           {  name: "12 сараас дээш хугацааны нийгмийн даатгалын өргүй бөгөөд нотлох тодорхойлолттой эсэх"},
           {  name: "12 сараас дээш хугацааны татварын өргүй бөгөөд нотлох тодорхойлолттой эсэх"},
           {  name: "Монголбанкны муу ангиллын зээлгүй бөгөөд нотлох тодорхойлолттой эсэх"},
       ]
   }, 
   { 
       group: "c",
       title: "Аж ахуйн нэгжийн хувь эзэмшигч нь улс төрийн нөлөө бүхий дараах этгээдүүд болон тэдний гэр бүлийн гишүүн биш эсэх",
       items: [
           {  name: "Ерөнхийлөгч"},
           {  name: "Ерөнхий сайд"},
           {  name: "УИХ-н гишүүн"},
           {  name: "Үндсэн хуулийн цэцийн гишүүд"},
           {  name: "Дээд шүүхийн шүүгчид"},
           {  name: "Улсын прокурор"},
           {  name: "Аймаг, нийслэлийн засаг дарга"},
           {  name: "Сайд, Төрийн нарийн бичгийн дарга"},
           {  name: "Яам, хэрэгжүүлэгч агентлагуудын захирал, дарга нар"},
           {  name: "Төрийн өмчит компаниудын захирал, дарга нар"},
       ]
   }, 
   { 
       group: "d",
       title: "Экспорт хөгжлийн төлөвлөгөөгөө бэлтгэсэн эсэх",
       items: [
           {  name: "Экспортын чиглэлээр санхүүжилт хүсч, хийхээр төлөвлөсөн ажил нь гэрээ шалгаруулалт хийгдэж, гэрээ зурагдсанаас хойш 9 сарын дотор хэрэгжиж дуусах боломжтой эсэх"},
           {  name: "Экспортыг дэмжих төслөөс хүсч буй дэмжлэгтэй тэнцүү дүнгээр санхүүжилт гаргах боломжтой бөгөөд бэлэн эсэх"},
           {  name: "Экспортыг дэмжих төслөөс хүсч буй дэмжлэгээр өмнө гарсан зардлыг санхүүжүүлэхгүй эсэх"},
           {  name: "Экспортыг дэмжих төслөөс хүсч буй дэмжлэгээр зөвхөн зөвшөөрөгдсөн үйл ажиллагааг санхүүжүүлэх эсэх"},
       ]
   }, 
   { 
       group: "f",
       title: "Бусадтай туршлага, мэдээллээ хуваалцах боломжтой эсэх",
       items: [
           {  name: "Ирэх нэг жилийн хугацаанд Экспортыг дэмжих төслөөс зохион байгуулах арга хэмжээнд хамтарч, бусад экспортлогчид болон шинээр экспортлохоор зорьж буй аж ахуйн нэгжүүдийг бэлтгэх сургалт, мэдээлэл хуваалцах ажлилд өөрийн байгууллагын туршлага, мэдлэгээ хуваалцаж, идэвхитэй оролцох эсэх"},
       ]
   }, 
]


