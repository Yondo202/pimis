import React from "react";
import styled from "styled-components";
import FromOne from "../components/FormOne";

function MainForm() {
          const handleClick = (e) =>{
            e.preventDefault();
            let rs = document.querySelectorAll(".getinput");
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
          console.log(finalOne, "its my final");


          // console.log(e.target.value, "nananadad");
        }
 
  return (
    <Component className="container"  >
      <div className="headPar">
        <span className="headText">
          Түншлэлийн хөтөлбөрт хамрагдах боломжтой эсэхээ энэ асуулгаар шалгаж
          үзнэ үү
        </span>
      </div>
      <form onSubmit={handleClick}>
       <FromOne />
       <button type="submit">click me</button>
      </form>
    </Component>
  );
}

export default MainForm;

const Component = styled.div`
  font-family: "Roboto", "Sans-serif";
  // text-align:center;
  position:relative;
  margin-top:80px;
  z-index:1;
  .headPar {
    text-align: center;
    background-color: white;
    font-size: 24px;
    padding:10px 20%;
    margin-bottom:16px;
    border-radius:8px;
    border-top:5px solid #3f51b5;
    // border-bottom:5px solid #3f51b5;
    .headText{
    }
  }
  @media only screen and (max-width:786px){
    .headPar{
      padding:10px 3%;
      font-size: 19px;
    }
  }
`;
