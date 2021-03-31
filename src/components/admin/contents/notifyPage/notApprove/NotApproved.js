import React, {useRef,useEffect, useState  } from 'react'
import styled,{ keyframes } from 'styled-components'
import { useReactToPrint } from "react-to-print";
import {VscFilePdf} from 'react-icons/vsc';
import Content from './Content'
import axios from 'axiosbase';
import AuthToken from 'context/accessToken'


function NotApproved({projectId }) {
  const [ data, setData ] = useState();
  const [ edpInfo ,setEdpInfo ] = useState({});

  const componentRef = useRef();
    useEffect(()=>{
      axios.get(`pps-infos/registered-companies?projectId=${projectId}`, { headers: { Authorization: AuthToken() } }).then(res=>{
        if(res.data.data.length){ setData(res.data.data[0]) }
      }).catch(err=> console.log(`err`, err));

      axios.get(`edp-info`,{ headers: { Authorization: AuthToken() } }).then(res=>{
        if(res.data.data?.id){ setEdpInfo(res.data.data);   }
      }).catch(err=>console.log(`err`, err));
    },[])

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    
      return (
          <MainContainter className="container">
              <div className="containt">
                  <div className="parent" ref={componentRef}>
                      <Content edpInfo={edpInfo} data={data} projectId={projectId} />
                  </div>
                  <button className="print"  onClick={handlePrint}><VscFilePdf />  Хэвлэх болон Pdf - ээр татах</button>
              </div >
          </MainContainter>
        )
  }
export default NotApproved

const animate = keyframes`
  0% { transform:translateY(100px); opacity:0; }
  60% { transform:translateY(-30px);opacity:0.8; }
  100% { transform:translateY(0px); opacity:1; }
`


const MainContainter = styled.div`
      padding-bottom:20px;
      animation: ${animate} 0.8s ease;
      .containt{
        display:flex;
        flex-direction:column;
        align-items:center;
        position:relative;
        .parent{
          display:flex;
          flex-direction:column;
          align-items:center;
        }
        .btn{
            transition:all 0.4s ease;
            margin:10px 0px;
            max-width:850px;
            width:100%;
        }
        .print{
              max-width:850px;
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
        @media print {
          .btn-primary{
            display:none;
          }
        }
      }
`


