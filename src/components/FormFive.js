import React from 'react';
import styled from 'styled-components'
import FormSix from './FormSix'


function FormFive(props) {

    return (
        <Component2 style={{transform:`scale(${props.SoloStyle})`}}>
        {/* <Components > */}
            <div className="rowHeader">5. Өр, зээлийн асуудал</div>
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
                    <div className="col-md-2 col-sm-2 col-3"><input className="getinput" type="radio" name={`five${el.Fieldcount}`} value="Тийм"/></div>
                    <div className="col-md-2 col-sm-2 col-3"><input className="getinput" type="radio" name={`five${el.Fieldcount}`} value="Үгүй"/></div>
                  </div>
                </div>
                )
              })}

            </div>
              <FormSix />
        </Component2>
    )
}

export default FormFive




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
  { name: "12 сараас дээш хугацаатай Татварын ерөнхий газраас татвар төлөлт болон татварын өртэй юу?",
    Fieldcount:"1"},
  {name: "12 сараас дээш хугацаатай Нийгмийн даатгалын газраас нийгмийн даатгалын өртэй юу? ",
    Fieldcount:"2"},
  {name: "Монгол банкны чанаргүй зээлийн мэдээллийн санд муу ангиллын зээлийн түүхтэй юу?",
    Fieldcount:"3"}
];