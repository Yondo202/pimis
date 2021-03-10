import React,{useState} from 'react'
import Modal from 'react-awesome-modal';
import SignatureCanvas from 'react-signature-canvas'
import {FaPenNib} from 'react-icons/fa'

function Signature(props) {
    const [visible, setVisible] = useState(false);
    let [sigCanvas, setSigCanvas] = useState({});
    let [trimmedDataURL, setTrimmedDataURL] = useState(null);

    const openModal=()=> { setVisible(true); }
    const closeModal=()=> { setVisible(false);}
    const clear = () => sigCanvas.clear();
    const trim = () =>{ setTrimmedDataURL(sigCanvas.getTrimmedCanvas().toDataURL('image/png')); props.setImgData(sigCanvas.getTrimmedCanvas().toDataURL('image/png')); closeModal();};
    
    return (
        <div className="rowItems">
            <div className="row">
                <div className="col-md-2 col-2"><div className="LeftHead">Гарын үсэг: </div> </div>
                <div className="col-md-10 col-10">
                    <div className="RightHead">
                        <div className="addInfoPar">
                            <div className="userInfPar">
                                <div className="infItemPar">
                                        <div className="drowPar">
                                            <div className="SignBtn" onClick={()=>openModal()} ><FaPenNib /><span>Зурах</span></div>
                                            {trimmedDataURL ? <img className="SingatureImg"  src={trimmedDataURL}/> : null}
                                                <Modal visible={visible}  width="620" height="380"effect="fadeInDown" onClickAway={closeModal}>
                                                    <div className="modalPar">
                                                        <div className="Canvass">
                                                            <SignatureCanvas className='sigCanvas' penColor='blue' ref={(ref) => { sigCanvas = ref }} canvasProps={{width: 620, height: 310, className: 'sigCanvas'}} />
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

export default Signature
