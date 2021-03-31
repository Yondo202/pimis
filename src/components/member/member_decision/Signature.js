import React,{useState} from 'react'
import Modal from 'react-awesome-modal';
import SignatureCanvas from 'react-signature-canvas'
import {FaPenNib} from 'react-icons/fa'
import styled from 'styled-components'
import { ColorRgb, textColor} from 'components/theme'

function Signature(props) {
    const [visible, setVisible] = useState(false);
    let [sigCanvas, setSigCanvas] = useState({});
    let [trimmedDataURL, setTrimmedDataURL] = useState(null);

    const openModal=()=> { setVisible(true); }
    const closeModal=()=> { setVisible(false);}
    const clear = () => sigCanvas.clear();
    const trim = () =>{ setTrimmedDataURL(sigCanvas.getTrimmedCanvas().toDataURL('image/png')); props.setImgData(sigCanvas.getTrimmedCanvas().toDataURL('image/png')); closeModal();};

    return (
        <SignaturePar className="rowItems">
            <div className="row">
                <div className="col-md-3 col-sm-3 col-12"><div style={{marginBottom:15, fontWeight:500}} className="LeftHead">Баталгаат гарын үсэг: </div> </div>
                <div className="col-md-9 col-sm-9 col-12">
                    <div className="RightHead">
                        <div className="addInfoPar">
                            <div className="userInfPar">
                                <div className="infItemPar">
                                        <div className="drowPar">
                                            <div className="SignBtn" onClick={()=>openModal()} ><FaPenNib /><span>{!props.url? `Зурах`: `Засах` }</span></div>
                                            {props.url? <img className="SingatureImg" src={props.url}/>  :  trimmedDataURL ? <img className="SingatureImg"  src={trimmedDataURL}/> : null}  
                                            {/* {trimmedDataURL ? <img className="SingatureImg"  src={trimmedDataURL}/> : null} */}
                                                <Modal visible={visible} width="620" height="380" effect="fadeInDown" onClickAway={closeModal}>
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
    </SignaturePar>
    )
}

export default Signature

const SignaturePar = styled.div`
    margin-top:20px;
    .addInfoPar{
        position:relative;
        .addBtn{
            width:22px;
            height:22px;
            cursor:pointer;
            background-color:white;
            border-radius:50%;
            color:#228B22;
            font-size:22px;
            position:absolute;
            left: 99.5%;
            bottom:-8px;
            transition:transform 0.3s ease;
            &:hover{
                transform:scale(1.15);
            }
        }
        .userInfPar{
            margin-bottom:35px;
            .infItemPar{
                display:flex;
                align-items:start;
                flex-direction:column;
                .drowPar{
                    display:flex;
                    align-items:start;
                    .SignBtn{
                        margin-right:30px;
                        padding:5px 25px;
                        cursor:pointer;
                        display:flex;
                        align-items:center;
                        border:1px solid rgba(0,0,0,0.4);
                        svg{
                            margin-right:10px;
                        }
                        span{
                        font-weight:500;
                        }
                        &:hover{
                            background-color:rgba(0,0,0,.2);
                        }
                    }
                    .SingatureImg{
                        border:1px solid rgba(${ColorRgb},0.3);
                        width:260px;
                        height:130px;
                        object-fit:contain;
                    }
                    .modalPar{
                        text-align:center;
                        .Canvass{
                            border:1px solid rgba(${ColorRgb},0.5);
                        }
                        .BtnPar{
                        padding:0px 10px;
                        margin:20px 0px;
                        display:flex;
                        flex-direction:row;
                        align-items:center;
                        justify-content:space-between;
                        button{
                            font-weight:500;
                            color:rgba(${textColor},0.9);
                            cursor:pointer;
                            border-style:none;
                            border-radius:4px;
                            padding:6px 14px;
                            background-color:white;
                            box-shadow:1px 1px 8px -2px;
                        }
                        }
                    }
                }
                .DatePar{
                    padding:5px 0px;
                    display:flex;
                    align-items:center;
                    input{ margin-left:10px; }
                    span{
                        margin-right:10px;
                    }
                }
            }
        }
    }
    @media only screen and (max-width:786px){
        .addInfoPar{
            .userInfPar{

                .infItemPar{
                    
                    .drowPar{
                        flex-direction:column;
                        .SignBtn{
                            margin-bottom:15px;
                        }
                        .SingatureImg{
                            max-width:500px;
                            width:100%;
                        }
                    }
                }
            }
        }
       
    }
`
