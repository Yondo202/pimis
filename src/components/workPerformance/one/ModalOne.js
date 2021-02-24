import React, {useState} from 'react'
import {InputStyle} from '../../theme'
import {MdAddCircle} from 'react-icons/md';
import Modal from 'react-awesome-modal';
import SignatureCanvas from 'react-signature-canvas'
import {FaPenNib} from 'react-icons/fa'


function ModalOne() {
    const userInitial = [{ids: 0,  url: null, visible: false, sigCanvas:{}}];
    const [ userInfo, setUserInfo ] = useState(userInitial);
   
    const openModal=(id)=> {
        let final = [];
        userInfo.map((el,i)=>{ if((i+1) === id){ let addImg = {}; addImg["ids"] = 1; addImg["url"] = el.sigCanvas.url; addImg["visible"] = true; final.push(addImg);}else{ final.push(el); }});
          setUserInfo( final );
    }

    const closeModal=(id)=> {
        let final = [];
         userInfo.map((el,i)=>{ if((i+1) === id){ let addImg = {}; addImg["ids"] = 1; addImg["url"] = el.sigCanvas.url; addImg["visible"]= false; final.push(addImg); }else{ final.push(el); }});
        setUserInfo( final );
    }

    const clear = (id) =>{ 
         let final = [];
         userInfo.map((el,i)=>{   if((i+1) === id){let addImg = {};  addImg["ids"] = 1; addImg["url"] = el.sigCanvas.clear(); addImg["visible"]= true;  final.push(addImg); }else{ final.push(el); } });
         setUserInfo( final );
    }

    const trim = (id) =>{
        let final = [];
        userInfo.map((el,i)=>{ if((i+1) === id){  let addImg = {};  addImg["ids"] = 1; addImg["url"] = el.sigCanvas.getTrimmedCanvas().toDataURL('image/png'); addImg["visible"] = false; final.push(addImg); }else{ final.push(el); } });
        setUserInfo( final );
     };

    const AddHandleUser = ()=>{ const list = userInfo.concat( {ids: 1, url: null, visible: false, sigCanvas:{} }); setUserInfo(list); }



    return (
        <div className="rowItems">
                <div className="row">
                    <div className="col-md-3 col-3"><div className="LeftHead">Хянасан: </div> </div>
                    <div className="col-md-9 col-9">
                        <div className="RightHead">
                            <div className="addInfoPar">
                                {userInfo.map((el,i)=>{
                                    return(
                                        <div className="userInfPar" key={i}>
                                            <div className="name">Нэр: А. Хашцэцэг</div>
                                            <div>Албан тушаал: Төслийн зохицуулагч</div>
                                            <div className="infItemPar">
                                                    <div className="DatePar">
                                                        <span>Огноо: </span><InputStyle className="themeStyle" > <input placeholder="example@example.com..." type="date" max='3000-12-31' /><div className="line" /></InputStyle>
                                                    </div>
                                                    <div className="drowPar">
                                                    <div>Гарын үсэг:</div> <div className="SignBtn" onClick={()=>openModal(i+1)} ><FaPenNib /><span>Зурах</span></div>
                                                        {el.url ? <img className="SingatureImg"  src={el.url}/> : null}
                                                            <Modal visible={el.visible}  width="620" height="380"effect="fadeInDown" onClickAway={closeModal}>
                                                                <div className="modalPar">
                                                                    <div className="Canvass">
                                                                        <SignatureCanvas className='sigCanvas' penColor='green' ref={(ref) => { el.sigCanvas = ref }} canvasProps={{width: 620, height: 310, className: 'sigCanvas'}} />
                                                                    </div>
                                                                    <div className="BtnPar">
                                                                        <button onClick={()=>clear(i + 1)}>Цэвэрлэх</button>
                                                                        <button onClick={()=>trim(i + 1)}>Хадгалах</button>
                                                                        <button onClick={()=>closeModal(i + 1)}>X</button>
                                                                    </div>
                                                                </div>
                                                            </Modal>
                                                    </div>
                                            </div>
                                    </div>
                                    )
                                })}
                                    <div onClick={AddHandleUser} className="addBtn"><MdAddCircle /></div>
                            </div>
                            <div className="remark"><span className="title">Жич:</span>ТХН-н хяналт-шинжилгээ, үнэлгээний мэргэжилтэнд Түншлэлийн хөтөлбөрийн хэрэгжилтийн явцыг зөвхөн тайлагнах бөгөөд тус мэргэжилтэн нь дээр дурдсан гүйцэтгэх ажлуудын чанарын тухайд аливаа хариуцлага хүлээхгүйгээс гадна төлбөрийг хойшлуулж болохгүй.</div>
                        </div>

                    </div>
                </div>
            </div>
    )
}

export default ModalOne
