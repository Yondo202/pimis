import React from 'react';
import styled from 'styled-components'




function FormSix() {
  const [childStyle, setChildStyle] = React.useState('0');

  const [resTextstyle, setResTextstyle] = React.useState('black');
  const [responseText, setResponseText] = React.useState("D");
  const [responseTextscale, setResponseTextscale] = React.useState("0");

  const [resTextstyle2, setResTextstyle2] = React.useState('black');
  const [responseText2, setResponseText2] = React.useState("D");
  const [responseTextscale2, setResponseTextscale2] = React.useState("0");
  
  const clickHandle = (e) =>{
    e.preventDefault();
                let rs = document.querySelectorAll(".inpTest2");
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
          if(finalOne.three === undefined){
                setChildStyle("0");
                setResponseText("Та хариултаас сонголтоо хийнэ үү...")
                setResponseTextscale("1");
                setResTextstyle("red");
            }else if(finalOne.four === undefined ){
                setChildStyle("0");
                setResponseText2("Та хариултаас сонголтоо хийнэ үү...")
                setResponseTextscale2("1");
                setResTextstyle2("red");
            }
             else{
                setChildStyle("1");
                setResponseText("d");
                setResponseTextscale("0");
                setResTextstyle("black");
                setResponseText2("d");
                setResponseTextscale2("0");
                setResTextstyle2("black");
            }
  }

    return (
        <Component3 >
            <div className="formOneParent">
                <div className="headerPar"  style={{color:`${resTextstyle}`}}>6. Танай аж ахуйн нэгжийн хувь нийлүүлэгчдийн бүрэлдэхүүнд Улс төрийн нөлөө бүхий албан тушаалтан болон тэдгээрийн гэр бүлийн хүмүүс байдаг эсэх?</div>
                <div className="radioPar">
                    <input className="getinput inpTest2" type="radio" name="six" value="Тийм"/>
                    <label >Тийм</label>
                </div>
                <div className="radioPar">
                    <input className="getinput inpTest2" type="radio" name="six" value="Үгүй" />
                    <label >Үгүй</label>
                </div>
            </div>
        </Component3>
    )
}

export default FormSix

const Component3 = styled.div`
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
        font-size:1.1rem;
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