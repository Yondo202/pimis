import React, { useState, useContext, useEffect } from 'react'
import UserCtx from "context/UserContext"
import { ButtonStyle2 } from "components/misc/CustomStyle"
import CkEditor from 'components/misc/CkEditor';
import axios from 'axiosbase'
import { UserNameModal } from "components/admin/contents/monitoring/mainReports/components/ReportComp"

const Editor = ({ selected, setCompSwitch, title, where_type}) => {
    const { loadFunc, alertText } = useContext(UserCtx);
    const [ nameModal, setNameModal ] = useState(false);

    const [ dataEng, setDataEng ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ DataId, setDataId ] = useState(null);

    const [ errText, setErrText ] = useState('');

    useEffect(()=>{
        fetchOne()
    },[])

    const fetchOne = async() =>{
        const res = await axios.get(`main-report?reporttype=2&year=${selected?.year}&from_where=${where_type}`)

        console.log(`res`, res)
        setDataId(res?.data?.data?.id)
        setDataEng(res?.data?.data?.body_en)
        setUserName(res?.data?.data?.user_name)
    }

    const clickHandle = async () =>{
        if(dataEng===''||!dataEng){
            setErrText('Мэдээллээ оруулна уу'); setTimeout(() => setErrText(''), 3000);
        }else{
            const data = { 
                from_where: where_type,
                reporttype:2,
                year: parseInt(selected?.year),
                body_en: dataEng,
                user_name:userName,
                childcode: 0
                // childcode: detail?.code, == from_where ( энэ тохиолдолд )
            }

            if(userName === ''||!userName){
                setNameModal(true)
            }else{
                loadFunc(true);

                console.log(`data`, data)

                try{
                    // let res
                    if(DataId){
                        await axios.put(`main-report/${DataId}`, data)
                    }else{
                        await axios.post(`main-report`, data)
                    }
                    alertText('green',"Амжилттай",true)
                    setTimeout(() => setCompSwitch(1), 3000)
                    // setCompSwitch(1)
                }catch{
                    alertText('orange',"Алдаа гарлаа",true)
                }finally{
                    loadFunc(false);
                }
            }
        }
    }


    return (
        <>
            {nameModal?<UserNameModal userName={userName} setUserName={setUserName} setNameModal={setNameModal} />:null}
            <div className="editor_par">
                <CkEditor data={dataEng} title={title} lang="en" setData={setDataEng} />

                {<div className="errTxt"><div className="text">{`${errText}`}</div></div>}
                <div className="button_par buttons">
                    <ButtonStyle2 onClick={_=>setCompSwitch(1)} className="buttons" ><button className="myBtn">←  Буцах </button></ButtonStyle2>
                    <ButtonStyle2 onClick={clickHandle} className="buttons" ><button className="myBtn">Хадгалах</button></ButtonStyle2>
                </div>
            </div> 
        </>
    )
}

export default Editor
