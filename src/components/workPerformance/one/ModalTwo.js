import React,{useState} from 'react'
import Modal from 'react-awesome-modal';
import SignatureCanvas from 'react-signature-canvas'
import {FaPenNib} from 'react-icons/fa'
import {InputStyle} from '../../theme'


function ModalTwo() {
    const [visible, setVisible] = useState(false);
    const userInitial = { url: null, sigCanvas:{}, date:""};
    const [ userInfo, setUserInfo ] = useState(userInitial);
    let [sigCanvas, setSigCanvas] = useState({});

    const openModal=()=> {
        let get =  document.getElementById(`getInpTwo`);
        if(!get.value){ get.focus(); }else{ setVisible(true); }
    }
    const closeModal=()=> { setVisible(false);}
    const clear = () =>{ sigCanvas.clear(); setUserInfo(userInitial) }
    const trim = () =>{ 
        setSigCanvas(sigCanvas.getTrimmedCanvas().toDataURL('image/png'));
        let final = {}; let get =  document.getElementById(`getInpTwo`);  final[get.name] = get.value;
        final["url"] = sigCanvas.getTrimmedCanvas().toDataURL('image/png');
        setUserInfo(final); closeModal();
    };

    return (
        <div className="rowItems">
            <div className="row">
                <div className="col-md-3 col-3"><div className="LeftHead">Бэлтгэсэн: </div> </div>
                <div className="col-md-9 col-9">
                    <div className="RightHead">
                        <div className="addInfoPar">
                            <div style={{borderBottom:`none`}} className="userInfPar">
                                <div className="name">Нэр:  /Хариуцсан хүний нэр/ </div>
                                <div>Албан тушаал: (Түншлэлийн хөтөлбөрөөс дэмжлэг хүртэгч байгууллага) </div>
                                <div className="infItemPar">
                                        <div className="DatePar">
                                            <span>Огноо: </span><InputStyle className="themeStyle" > <input id="getInpTwo" name="date" placeholder="example@example.com..." type="date" max='3000-12-31' /><div className="line" /></InputStyle>
                                        </div>
                                        <div className="drowPar">
                                        <div>Гарын үсэг:</div> <div className="SignBtn" onClick={()=>openModal()} ><FaPenNib /><span>Зурах</span></div>
                                            {userInfo.url ? <img className="SingatureImg"  src={userInfo.url}/> : null}
                                                <Modal visible={visible}  width="620" height="380"effect="fadeInDown" onClickAway={closeModal}>
                                                    <div className="modalPar">
                                                        <div className="Canvass">
                                                            <SignatureCanvas className='sigCanvas' penColor='green' ref={(ref) => { sigCanvas = ref }} canvasProps={{width: 620, height: 310, className: 'sigCanvas'}} />
                                                        </div>
                                                        <div className="BtnPar">
                                                            <button onClick={clear}>Цэвэрлэх</button>
                                                            <button onClick={()=>trim()}>Хадгалах</button>
                                                            <button onClick={closeModal}>X</button>
                                                        </div>
                                                    </div>
                                                </Modal>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalTwo
