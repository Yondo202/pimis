import React from 'react';
import styled from 'styled-components'
import FormTwo from './FormTwo';




function FormOne() {
  const [childStyle, setChildStyle] = React.useState('0');
  
  const [resTextstyle, setResTextstyle] = React.useState('black');
  const [responseText, setResponseText] = React.useState("D");
  const [responseTextscale, setResponseTextscale] = React.useState("0");

  

  const clickHandle = (e) =>{
    e.preventDefault();
            let rs = document.querySelectorAll(".inpTest");
            let arr = Array.from(rs);
            let finalOne = {};
            arr.map(element=>{
              if(element.checked === true){
                // console.log(element, "my checked element");
                let field = element.name;
                let value = element.value;
                finalOne[field] = value
              }
          });
          console.log(finalOne.one, "its my final2 2 2 ");
          if(finalOne.one === "Монгол улсад бүртгэлгүй" ){
            setResponseText("Түншлэлийн хөтөлбөрт хамрагдах боломжгүй байна...")
            setResponseTextscale("1");
            setResTextstyle("red");
            setChildStyle("0");
          }else if(finalOne.one === undefined){
            setResponseText("Та хариултаас сонголтоо хийнэ үү...")
            setResponseTextscale("1");
            setResTextstyle("red");
            setChildStyle("0");
          } else{
            setChildStyle("1");
            setResponseText("d");
            setResponseTextscale("0");
            setResTextstyle("black");
          }
  }

    return (
        <Component >
          <div className="formOneParent">

            <div className="headerPar" style={{color:`${resTextstyle}`}} >1. Та монгол улсад бүртгэлтэй аль төрлийн бизнес эрхэлдэг вэ?</div>
              <div className="radioPar">
                <input className="getinput inpTest" type="radio" name="one" value="ХХК, ХК, ГХО-тай"/>
                <label >ХХК, ХК, ГХО-тай</label>
              </div>
              <div className="radioPar">
                <input className="getinput inpTest" type="radio" name="one" value="ТӨК" />
                <label >ТӨК</label>
              </div>
              <div className="radioPar">
                <input className="getinput inpTest" type="radio" name="one" value="Судалгаа, шинжилгээний хүрээлэн, Их, Дээд Сургууль, академик байгууллага" />
                <label >Судалгаа, шинжилгээний хүрээлэн, Их, Дээд Сургууль, академик байгууллага</label>
              </div>
              <div className="radioPar">
                <input className="getinput inpTest" type="radio" name="one" value="Хоршоолол, нөхөрлөл" />
                <label >Хоршоолол, нөхөрлөл</label>
              </div>
              <div className="radioPar">
                <input className="getinput inpTest" type="radio" name="one" value="Монгол улсад бүртгэлгүй" />
                <label >Монгол улсад бүртгэлгүй</label>
              </div>
              <div className="errText" style={{transform:`scale(${responseTextscale})`, color:`red` }} >{responseText}</div>
            <button onClick={clickHandle} className="TestButton">Шалгах</button>
          </div>
            <FormTwo SoloStyle={childStyle} />
        </Component>
    )
}

export default FormOne

const Component = styled.div`
    font-size: 18px;
    font-family: "Roboto", "Sans-serif";
    .formOneParent{
      background-color:white;
      border-radius:8px;
      margin-bottom:16px;
      padding:24px 26px;
      .TestButton{
        border-style:none;
        border:1px solid rgba(63, 81, 181,0.5);
        width:50%;
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

      .MuiFormLabel-root{
        padding-bottom:6px;
        font-size:1.2rem;
        border-bottom:1px solid rgba(63, 81, 181,0.5);
        color:black;
      }
      .headerPar{
        padding-bottom:6px;
        font-size:1.2rem;
        border-bottom:1px solid rgba(63, 81, 181,0.5);
        color:black;
      }
      .errText{
        transition: all 0.4s ease; 
      }
      .radioPar{
        display:flex;
        flex-direction:row;
        align-items:center;
        padding:10px 0px;
        label{
          margin-left:15px;
          color:rgba(0,0,0,0.8);
          margin-bottom:0px
        }
        input{
          cursor:pointer;
          width:16px;
          height:16px;
        }
      }


    }
   
`