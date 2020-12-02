import React from 'react';
import styled from 'styled-components'
import FormThree from './FormThree';






function FormTwo(props) {
  
    const [opacity, setOpacity] = React.useState("0");
    const [childStyle, setChildStyle] = React.useState('0');
    const [procent, setProcent] = React.useState('0');

  const clickHandles = (e) =>{
    e.preventDefault();
                let rs = document.querySelectorAll(".inpTest3");
                console.log(rs, "dada"); 
                let arr = Array.from(rs);
                let finalOne = {};
                arr.map(element=>{
                if(element.checked === true){
                    // console.log(element, "my checked element");
                    let field = element.name;
                    let value = element.value;
                    console.log(element.value.length, "its my final2 2 2 dad ad ada ");
                    finalOne[field] = value
                }
            });
            // console.log(finalOne, "its my final2 2 2 ");
            let keys = Object.keys(finalOne);
            console.log(keys.length, "this is my length")

            const Procent = keys.length * 100 / 13;
            const FinalProcent = Math.round(Procent);
            console.log(FinalProcent, "% myProcent");


            if(keys.length < 13){
              setOpacity("1");
              setChildStyle("0");
              setProcent(FinalProcent);
            }else{
              setOpacity("0");
              setChildStyle("1");
            }
      
  }

    return (
        <Component2 style={{transform:`scale(${props.SoloStyle})`}}>
        {/* <Components > */}
            <div className="rowHeader">2. Та дараах төрлийн үйл ажиллагаа, бизнес эрхэлдэг үү?</div>
            <div className="formTwoParent ">
              <div className="headerPar">
                <div className="row" >
                  <div className="col-md-8 col-sm-8 col-6"> Шалгуур </div>
                  <div className="col-md-2 col-sm-2 col-3"> Тийм </div>
                  <div className="col-md-2 col-sm-2 col-3">Үгүй </div>
                </div>
              </div>
              {tableData.map((el,i)=>{
                return(
                  <div className="headerParchild" key={i}>
                  <div className="row" >
                    <div className="col-md-1 col-sm-1 col-1">{`${el.Fieldcount}`}</div>
                    <div className="col-md-7 col-sm-7 col-5">{el.name}</div>
                    <div className="col-md-2 col-sm-2 col-3"><input className="getinput inpTest3" type="radio" name={`two${el.Fieldcount}`} value="Тийм"/></div>
                    <div className="col-md-2 col-sm-2 col-3"><input className="getinput inpTest3" type="radio" name={`two${el.Fieldcount}`} value="Үгүй"/></div>
                  </div>
                </div>
                )
              })}
              <div className="buttonPar">
              <div style={{opacity:`${opacity}`}} className="errtext">Таны асуулга {procent}% байна..</div>
               <div style={{opacity:`${opacity}`}} className="errtext">Та гүйцэд бөгөлнө үү...</div>
               <button onClick={clickHandles} className="TestButton">NEXT</button>
              </div>
            </div>
            <FormThree childStyle={childStyle} />

        </Component2>
    )
}

export default FormTwo




const Component2 = styled.div`
    transition: all 0.5s ease-out;
      border-radius:8px;
      
      
      font-family: "Roboto", "Sans-serif";
      .rowHeader{
        background-color:white;
        padding: 24px 26px;
        font-size:1.2rem;
        // border-bottom:1px solid rgba(63, 81, 181,0.5);
        color:black;
      }
   
    .formTwoParent{
      background-color:white;

        margin-bottom:16px;
        font-size:16px;
        border:1px solid rgba(63, 81, 181,0.8);
        border-bottom:1px solid rgba(63, 81, 181,1);
        .buttonPar{
          margin:10px 10px;
          display:flex;
          flex-direction:row;
          align-items:center;
          justify-content:space-between;
            .errtext{
              font-weght:500;
              font-size:20px;
              transition:all 0.4s ease;
              color:rgba(255,0,0.6);
            }
          .TestButton{
            border-style:none;
            border:1px solid rgba(63, 81, 181,0.5);
            width:30%;
            padding:5px 0px;
            border-radius:6px;
            color:rgba(63, 81, 181);
            background-color:rgba(63, 81, 181,0.1);
            cursor:pointer;
            font-size:18px;
            &:hover{
              box-shadow:1px 1px 8px -2px;
            }
          }
        }
        
        .headerPar{
          background-color: rgba(63, 81, 181,0.8);
          color:white;
          text-align:center;
          border-bottom:1px solid rgba(0,0,0,0.4);
          font-size:18px;
         
          .col-md-8,.col-md-6{
            padding-top: 10px;
            padding-bottom: 16px;
          }
          .col-md-2,.col-md-3{
            padding-top: 10px;
            padding-bottom: 18px;
            border-left:1px solid rgba(0,0,0,0.4);
          }
        }

        .headerParchild{
          background-color: rgba(63, 81, 181,0.1);
          text-align:center;
          border-bottom:1px solid rgba(0,0,0,0.4);
          font-size:16px;
          .col-md-1{
            font-weight:500;
            text-align:center;
            border-right:1px solid rgba(0,0,0,0.4);
            padding-top: 10px;
            padding-bottom: 10px;
          }
          .col-md-7, .col-md-6{
            text-align:start;
            padding-top: 8px;
            padding-bottom: 8px;
          }
          .col-md-2, .col-md-3{
            display:flex;
            align-items:center;
            justify-content:center;
            // padding-top: 10px;
            // padding-bottom: 10px;
            border-left:1px solid rgba(0,0,0,0.4);
            input{
              cursor:pointer;
              height:24px;
              width:24px;
            }
          }
        }

    }

  @media only screen and (max-width:768px){
    .formTwoParent{
      .headerPar{
        font-size:14px;
      }
      .headerParchild{
        font-size:13px;
      }
    }
  }
    

   
        
`


const tableData = [
  { name: "Цэрэг армийн ямар нэг зэвсэг",
    Fieldcount:"1"},
  { name: "Зэрлэг амьтан, ургамлын ховордсон төрөл зүйлийг олон улсын хэмжээнд худалдаалах тухай конвенц (CITES)-ийн хүрээнд хориглодог ан амьтан, ургамлын худалдаа",
    Fieldcount:"2"},
  {name: "Байгаль, хүрээлэн буй орчинд генийн өөрчлөлтөд орсон организмуудыг гаргах",
    Fieldcount:"3"},
  {name: "Хориглосон пестицид, хербицидийн үйлдвэрлэл, нийлүүлэлт, худалдаа",
    Fieldcount:"4"},
  { name: "Далай тэнгист тороор загас барих",
    Fieldcount:"5" },
  { name: "Цацраг идэвхт бүтээгдэхүүнүүд",
    Fieldcount:"6" },
  { name: "Аюултай хог хаягдлын хадгалалт, боловсруулалт, зайлуулалт",
    Fieldcount:"7" },
  {  name: "Хлорфторт нүүрстөрөгчид, галлон болон Монреалийн протоколын хүрээнд зохицуулагддаг бусад бодисууд агуулсан тоног төхөөрөмж, хэрэгслийн үйлдвэрлэл",
    Fieldcount:"8" },
  { name: "Олон хлорт бефенилиудын үзүүлэх нөлөө 0.005 %-аас хэтэрсэн агууламж бүхий цахилгаан хэрэгсэл, тоног төхөөрөмжийн үйлдвэрлэл",
    Fieldcount:"9"},
  {  name: "Шөрмөсөн чулуу агуулсан бүтээгдэхүүний үйлдвэрлэл",
    Fieldcount:"10" },
  { name: "Цөмийн реакторууд, тэдгээрийн хэсгүүд",
    Fieldcount:"11"  },
  {  name: "Тамхи (үйлдвэрлэлийн бус ба үйлдвэрлэлийн); Тамхины хатаасан навч боловсруулах машин",
    Fieldcount:"12" },
  {  name: "Уул уурхайн салбарт",
    Fieldcount:"13" },
];