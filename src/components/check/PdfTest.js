import React, { useMemo , useEffect, useState} from 'react';
import MyDocument from './PdfContent';
import styled from 'styled-components';
import { PDFViewer, PDFDownloadLink  } from '@react-pdf/renderer';
import AccessToken from '../../context/accessToken'
import axios from 'axiosbase'

const PdfTest = () => {
  const [ fontwait, setFontWait ] = useState(false);
  const [ wait, setWait ] = useState(false);
  useEffect(async()=>{
    const localId = localStorage.getItem(false);
    console.log('localId', localId)
    const data =  await axios.get(`criterias?userId=${localId}}`,{ headers: { Authorization:AccessToken() } });
    console.log(data, " my data");

    setTimeout(()=>{
      setWait(true);
    },1000)
    setTimeout(()=>{
      setFontWait(true);
    },3000)
  },[]);

  return(
      <div className="container">
      <PDFstyle className="Nanana">
            <PDFViewer style={{ height: '90vh', width:`100%` }} >
                    <MyDocument data={wait}  />
              </PDFViewer>
      </PDFstyle>

     {/* {wait && <PDFDownloadLink document={<MyDocument data={fontwait} />}>
        {({ blob, url, loading, error }) => {
            if (loading) return <Loader />;
              return 'Download Invoice';
          }}
      </PDFDownloadLink>}  */}


      <PDFDownloadLink document={<MyDocument data={fontwait} />} fileName="somename.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
     </PDFDownloadLink>

    </div>
   
  )
}
export default PdfTest;

const PDFstyle = styled.div`
  iframe{
    width: 100%;
    height: 80vh;
  }
`

const Loader = () =>{
 return <h1>lalalalalla</h1>
}