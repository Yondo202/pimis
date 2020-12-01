import React from "react";
import styled from "styled-components";
import FromOne from "../components/FormOne";

function MainForm() {
  return (
    <Component className="container">
      <div className="headPar">
        <span className="headText">
          Түншлэлийн хөтөлбөрт хамрагдах боломжтой эсэхээ энэ асуулгаар шалгаж
          үзнэ үү
        </span>
      </div>

      
      <FromOne />
    </Component>
  );
}

export default MainForm;

const Component = styled.div`
  font-family: "Roboto", "Sans-serif";
  // text-align:center;
  .headPar {
    text-align: center;
    background-color: white;
    font-size: 24px;
    padding:10px 20%;
    margin-bottom:10px;
    border-radius:8px;
    border-top:5px solid #3f51b5;
    // border-bottom:5px solid #3f51b5;
    .headText{
    }
  }
`;
