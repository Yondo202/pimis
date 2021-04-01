import React, {useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useReactToPrint } from "react-to-print";
import {VscFilePdf} from 'react-icons/vsc';
import Content from './Content'
import axios from 'axiosbase';
import AuthToken from 'context/accessToken'

function AssistApprove({projectId, approve, setNotifyShow}) {
  const [ edpInfo ,setEdpInfo ] = useState({});
  const [ Signature, setSignature ] = useState(null);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    useEffect(()=>{
      axios.get(`edp-info`,{ headers: { Authorization: AuthToken() } }).then(res=>{
        if(res.data.data?.id){ setEdpInfo(res.data.data); }
      }).catch(err=>console.log(`err`, err));
      axios.get(`users?role=tosliin_zohitsuulagch`,{ headers: { Authorization: AuthToken() } }).then(res=>{
        if(res.data.data.length){ setSignature(res.data.data[0]) }
      }).catch(err=>console.log(`err`, err));
    },[])

      return (
            <MainContainter>
                <div className="parent" ref={componentRef}>
                     <Content setNotifyShow={setNotifyShow} Signature={Signature} projectId={projectId} edpInfo={edpInfo} approve={approve} />
                </div>
                <button className="print"  onClick={handlePrint}><VscFilePdf />  Хэвлэх болон Pdf - ээр татах</button>
            </MainContainter>
        )
  }
  export default AssistApprove


const MainContainter = styled.div`
    .btn{
        margin:10px 0px;
        max-width:700px;
        width:100%;
    }
    .print{
        max-width:700px;
        width:100%;
        font-weight:500;
        color:black;
        display:flex;
        align-items:center;
        justify-content:center;
        border:1px #008CBA;
        border-style: dashed;
        transition:all 0.4s ease;
        font-size:14px;
        padding:3px 0px;
        &:hover{
          background-color:#009CBA;
        }
        svg{
          margin-right:18px;
          font-size:18px;
        }
      }
}
`


