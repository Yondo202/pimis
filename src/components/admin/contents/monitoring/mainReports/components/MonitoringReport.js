import React, { useState } from 'react'
import { ReportContainer, ButtonStyle2 } from "components/misc/CustomStyle"
import CkEditor from 'components/misc/CkEditor'

const MonitoringReport = ({ title, code }) => {
    const [ errTxt, setErrTxt ] = useState(false);
    const [ data, setData ] = useState('');
    const [ dataEng, setDataEng ] = useState('');

    const clickHandle = () =>{

    }

    return (
        <>
            {/* {modal? <ContentParser data={data} titleSm={`${title}`} titleBig={modalPar?`VI. Маркетингийн стратеги`:``} />: */}
            <ReportContainer>
                {code!==0?
                <>
                    <div className="EditorParent">
                        <CkEditor data={data} title={title} lang="mn" setData={setData} />
                        <CkEditor data={dataEng} title={title} lang="en" setData={setDataEng} />
                    </div>
                    <ButtonStyle2 >
                        <div className="errTxt">{errTxt&&`Утга оруулна уу`}</div>
                        <button onClick={clickHandle}  className="myBtn">Хадгалах</button>
                    </ButtonStyle2>
                </>
                :<div className="Reporthome">
                    <h6> Улирлаа сонгох </h6>
                </div>
                }
                
            </ReportContainer>
            {/* } */}
        </>
    )
}

export default MonitoringReport;