import React, { useState,useContext } from 'react'
import styled from 'styled-components'
import { textColor, ColorRgb } from '../../theme';
import {GoCalendar} from 'react-icons/go'
import {VscAccount,VscFoldDown,VscCloudUpload,VscCloudDownload,VscChecklist,VscOpenPreview} from 'react-icons/vsc'
import {IoIosAddCircleOutline} from 'react-icons/io'
import UserContext from '../../../context/UserContext'

function TableSixDetails2() {
    const StyleContext  = useContext(UserContext);
    const initialList = [{id: 1}];
    const [ addItem, setAddItem ] = useState(initialList);
    const AddHandle = ()=>{
        const list = addItem.concat( {id: 1});
        setAddItem(list);
    }
    return (
        <Component3Detail>
            {addItem.map((el,i)=>{
                return(
                    <div id={i}  className="GetItemAdd666 DetailPar" key={i}>
                    <div className="Title"> {i + 1} . ҮЙЛ АЖИЛЛАГААНЫ ҮЕ ШАТ :</div>
                    <div className="formOneParent">
                        <div className="inputPar">
                            <div className="inpChild">
                                <div className="labels"><span>Ямар өгөгдөхүүнийг хэмжих	:</span> </div>
                                <div className="name"> <VscOpenPreview />
                                    <div className="form__group">
                                        <input type="text" className={`APSA${i + 1} userInp LoginInpName form__field`} placeholder="Аж ахуйн нэр" name="messure" required />
                                        <label for="name" className=" form__label">Ямар өгөгдөхүүнийг хэмжих</label>
                                    </div>
                                </div>
                            </div>

                            <div className="inpChild">
                                <div className="labels"><span>Хаана өгөгдөхүүнийг хэмжих :</span> </div>
                                <div className="name"> <VscChecklist />
                                    <div className="form__group">
                                        <input type="input" className={`APSA${i + 1} userInp LoginInpName form__field`} placeholder="Аж ахуйн нэр" name="where_messure" required />
                                        <label for="name" className=" form__label">Хаана өгөгдөхүүнийг хэмжих</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="inputPar">
                            <div className="inpChild">
                                <div className="labels"><span>өгөгдөхүүнд мониторинг хийх (ашиглах тоног төхөөрөмж)	 :</span> </div>
                                <div className="name"> <VscCloudDownload />
                                    <div className="form__group">
                                        <input type="input" className={`APSA${i + 1} userInp LoginInpName form__field`} placeholder="Аж ахуйн нэр" name="monitoring" required />
                                        <label for="name" className=" form__label">Хэрхэн</label>
                                    </div>
                                </div>
                            </div>

                            <div className="inpChild">
                                <div className="labels"><span>Мониторингийн давтамж буюу үргэлжлэх байдал :</span> </div>
                                <div className="name"> <VscCloudUpload />
                                    <div className="form__group">
                                        <input type="input" className={`APSA${i + 1} userInp LoginInpName form__field`} placeholder="Аж ахуйн нэр" name="monitor_duration" required />
                                        <label for="name" className=" form__label">Хэзээ</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{borderStyle:"none"}} className="formOneParent">
                        <div className="inputPar">
                            <div className="inpChild">
                                <div className="labels"><span>Тоног төхөөрөмжийн зардал буюу гүйцэтгэгчийн төлбөр :</span> </div>
                                <div className="name"> <VscFoldDown />
                                    <div className="form__group">
                                        <input type="number" className={`APSA${i + 1} userInp LoginInpName form__field`} placeholder="Аж ахуйн нэр" name="cost" required />
                                        <label for="name" className=" form__label">Мониторингийн зардал </label>
                                    </div>
                                </div>
                            </div>

                            <div className="inpChild">
                                <div className="labels"><span>Хариуцах эзэн :</span> </div>
                                <div className="name"> <VscAccount />
                                    <div className="form__group">
                                        <input type="input" className={`APSA${i + 1} userInp LoginInpName form__field`} placeholder="Аж ахуйн нэр" name="hostname" required />
                                        <label for="name" className=" form__label">Хариуцах эзэн</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="inputPar">
                            <div className="inpChild">
                                <div className="labels"><span>Эхлэх хугацаа :</span> </div>
                                <div className="name"> <GoCalendar />
                                    <div className="form__group">
                                        <input type="date" max='3000-12-31' className={`APSA${i + 1} userInp LoginInpName form__field`} placeholder="Аж ахуйн нэр" name="stepdate" required />
                                        <label for="name"  className=" form__label">Он-сар-өдөр</label>
                                    </div>
                                </div>
                            </div>

                            <div className="inpChild">
                                <div className="labels"><span>Дуусах хугацаа :</span> </div>
                                <div className="name"> <GoCalendar />
                                    <div className="form__group">
                                        <input type="date" max='3000-12-31'  className={`APSA${i + 1} userInp LoginInpName form__field`} placeholder="Аж ахуйн нэр" name="vote" required />
                                        <label for="name" className=" form__label">Он-сар-өдөр</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
                )
            })}
            
            <div className="AddItemBtn">
                <IoIosAddCircleOutline onClick={AddHandle} />
            </div>

            {/* <button >hahahaha</button> */}


        </Component3Detail>
    )
}

export default TableSixDetails2

const Component3Detail = styled.div`
    background-color:white;
    border-radius:6px;
    padding:15px 40px;
    transition:all 0.5s ease; 
    .rowHeader{
        border-radius:6px 6px 0px 0px;
        background-color:white;
        padding-bottom:20px;
        padding-top:10px;
        font-size:1.2rem;
        border-bottom:1px solid rgba(63, 81, 181,0.5);
        color:black;
        .tseg{
          color:red;
        }
      }
    .AddItemBtn{
        text-align:end;
        padding:10px 10px;
        svg{
            border-radius:50%;
            cursor:pointer;
            font-size:34px;
            box-shadow:1px 1px 10px -3px;
            transition:all 0.4s ease;
            &:hover{
                box-shadow:1px 1px 14px -3px;
            }
        }
    }
    .DetailPar{
        background-color:white;
        margin-top:40px;
        transition:all 0.5s ease; 
        .Title{
            font-size:16px;  
            font-weight:500;
            margin-bottom:10px;
        }
        .description{
            margin-bottom:20px;
        }
        .formOneParent{
            border-top:1px solid rgba(${ColorRgb},0.4);
            border-radius:8px;
            flex-direction:column;
            align-items:flex;
            justify-content:center;
            .inputPar{
                display:flex;
                flex-direction:row;
                align-items:flex;
                justify-content:space-between;
                padding-top:0px;
                .inpChild{
                    margin:12px 0px;
                    display:flex;
                    flex-direction:column;
                    width:44%;
                    .labels{
                        display:flex;
                        flex-direction:row;
                        justify-content:space-between;
                        font-size:14px;
                        span{
                            color:rgba(${textColor},.9);
                            font-weight:500;
                        }
                       
                    }
                     .name{
                     display:flex;
                     flex-direction:row;
                     align-items:flex-end;
                     justify-content:flex-end;
                     width:100%;
                     svg{
                       color:rgba(${ColorRgb},0.7);
                       font-size:28px;
                       margin-right:15px;
                       margin-bottom:5px;
                     }
                     .form__group{
                      position:relative;
                      padding: 15px 0 0;
                      margin-top: 0px;
                      width: 100%;
                         .form__field{
                             font-family: inherit;
                             width: 100%;
                             border: 0;
                             border-radius:6px;
                             border-bottom: 1px solid rgba(${ColorRgb},0.2);
                             border-right: 1px solid rgba(${ColorRgb},0.2);
                             border-left: 1px solid rgba(${ColorRgb},0.2);
                             border-top: 1px solid rgba(${ColorRgb},0.2);
                             outline: 0;
                             font-size: 1rem;
                             color: black;
                             padding: 7px 0;
                             padding-left:10px;
                             font-size: 0.9rem;
                             background: transparent;
                             transition: border-color 0.2s;
                             transition:all 0.3s ease;
                             position: relative;
                             z-index: 1;
                             &::placeholder {
                               color: transparent;
                             }
                             &:placeholder-shown ~ .form__label {
                               font-size: 0.9rem;
                               cursor: text;
                               top: 24px;
                             }
                         }
                        
                         .form__label {
                             position: absolute;
                             top: 0;
                             display: block;
                             transition: 0.2s;
                             font-size: 0rem;
                             color: gray;
                             z-index: 0;
                             padding:0px 10px;
                             // background-color:black;
                           }
                           
                           .form__field{
                               &:focus {
                                 ~ .form__label {
                                   position: absolute;
                                   top: 0;
                                   display: block;
                                   transition: 0.3s;
                                   font-size: 0.8rem;
                                   color: #11998e;
                                   font-weight:400;    
                                 }
                                 border-right:none;
                                 border-left:none;
                                 border-top:none;
                                 padding-bottom: 7px;
                                 font-weight: 400;
                                 border-width: 1px;
                                 border-image: linear-gradient(to right, #11998e, #38ef7d);
                                 border-image-slice: 1;
                               }
                           }
                           /* reset input */
                           .form__field{
                             &:required,&:invalid { box-shadow:none; }
                           }
                     }
                     
                   }
                }
             }
        }

       
      
    }
    @media only screen and (max-width:786px){
        padding: 15px 15px;
        .DetailPar{
            .formOneParent{
                .inputPar{
                    flex-direction: column;
                    justify-content: center;
                    .inpChild{
                        width:100%;
                    }
                }
            }
        }
    }


`