import React, { useState, useContext } from 'react'
import{  CustomFileUpload } from "components/misc/CustomStyle";
import UserContext from "context/UserContext"
// import edpAxios, { edpurl } from "global/edpAxios"
import { RiImageAddFill } from "react-icons/ri"
import axios, {FrontUrl} from 'axiosbase'
import AccessToken from 'context/accessToken'

const FileUploadLogo = ( { selectLogo, setSelectLogo, stamp }) => {
    const ctx = useContext(UserContext);

    const onClickHandler = (e) => {
        if(e.target.files.length!==0){
            let file = e.target.files[0];
            const data = new FormData();
            data.append("file", file );
            data.append("desc", "edplan-upload" );
            axios.post(`attach-files`, data, { headers: { 'Authorization': AccessToken(), 'Content-Type': 'multipart/form-data',
            }}).then(res=>{
                console.log(`res`, res);
                setSelectLogo(res.data.data);
            }).catch(_=>ctx.alertText('orange','Алдаа гарлаа (хавсаргах)',true ));
        }
    };

    return (
        <>
            <CustomFileUpload>
                    <div className="contentPar contentPar2">
                        {selectLogo.fileUrl&&<div className="imgPar imgPar2 imgPar3">
                            {stamp?<img className="img" src={selectLogo.fileUrl}/>:<img className="img" src={`${FrontUrl + selectLogo.fileUrl?.replace("public", "")}`}/>}
                        </div>}

                        {!selectLogo.fileUrl&&<div className="inputSector">
                            <label className="inputStyle" htmlFor="file-upload">
                                <RiImageAddFill />
                            </label>
                            <input id="file-upload" type="file" accept=".gif,.jpg,.jpeg,.png" name="file-input" onChange={onClickHandler} />
                        </div>}
                    </div>
            </CustomFileUpload>
        </>
    )
}

export default FileUploadLogo