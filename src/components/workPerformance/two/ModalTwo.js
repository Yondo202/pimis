import React,{useState} from 'react'
import Modal from 'react-awesome-modal';
import SignatureCanvas from 'react-signature-canvas'
import {FaPenNib} from 'react-icons/fa'
import {InputStyle} from '../../theme'




function ModalTwo() {
    const [visible, setVisible] = useState(false);
    let [sigCanvas, setSigCanvas] = useState({});
    let [trimmedDataURL, setTrimmedDataURL] = useState(null);

    const openModal=()=> { setVisible(true); }
    const closeModal=()=> { setVisible(false);}
    const clear = () => sigCanvas.clear();
    const trim = () =>{ setTrimmedDataURL(sigCanvas.getTrimmedCanvas().toDataURL('image/png')); closeModal();};

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
                                            <span>Огноо: </span><InputStyle className="themeStyle" > <input placeholder="example@example.com..." type="date" max='3000-12-31' /><div className="line" /></InputStyle>
                                        </div>
                                        <div className="drowPar">
                                        <div>Гарын үсэг:</div> <div className="SignBtn" onClick={()=>openModal()} ><FaPenNib /><span>Зурах</span></div>
                                            {trimmedDataURL ? <img className="SingatureImg"  src={trimmedDataURL}/> : null}
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
