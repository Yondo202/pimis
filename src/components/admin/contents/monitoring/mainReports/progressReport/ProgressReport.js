import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { ButtonStyle2 } from "components/misc/CustomStyle"
import PrintSector from "components/admin/contents/monitoring/mainReports/progressReport/PrintSector"

const ProgressReport = () => {
    const [ compSwitch, setCompSwitch ] = useState(1)
    const [ selected, setSelected ] = useState({});
    const [ errText, setErrText ] = useState('');

    const SwitchHandle = () =>{
        if(!selected?.id){
            setErrText('Жилээ сонгоно уу')
            setTimeout(() => setErrText(''), 3000)
        }else{
            setCompSwitch(2)
        }
    }

    return (
        compSwitch===1?<Container className="container-fluid">
            <div className="TitlePar">
                <div className="Title">Явцын үнэлгээний тайлан</div>
                {selected?.id?<><span className="arrow">→</span>
                    <span className="datePick">
                    {selected?.year!==''?selected.year:`....`} оны
                </span></>:null}
            </div>

            <div className="ReporthomePar">
                <div className="Reporthome">
                    <div className="SelectParent">
                        <div className="titleBig">Оруулсан тайлан харах</div>
                        <div className="selectItem">
                            <div className="title"> Жил сонгох</div>
                            <Select
                                value={selected?.id?selected:false}
                                isClearable 
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                options={yearsData}
                                getOptionValue={option => `${option.id}`}
                                onChange={e=>setSelected(e)}
                                placeholder={'Жил...'}
                                getOptionLabel={option => `${option.year}`}
                            />
                        </div>
                    </div>
                    <ButtonStyle2 className="buttons" >
                        {<div className="errTxt">{`${errText}`}</div>}
                        <button  onClick={SwitchHandle} className="myBtn">Цааш → </button>
                    </ButtonStyle2>
                </div>
            </div>
            
        </Container>:<PrintSector selected={selected} setCompSwitch={setCompSwitch} />
    )
}

export default ProgressReport


const Container = styled.div`
    width:100%;
    background-color: #fff;
    padding:25px 40px;
    border-radius:0px 5px 5px 5px;
    box-shadow: -5px 5px 12px -12px black;
    font-size:12px;
    .editor_par{
        .errTxt{
            display:flex;
            justify-content:flex-end;
            .text{
                transition: all 0.4s ease;
                text-align: end;
                background-color: #f6c343;
                border-radius: 5px;
                font-size: 13px !important;
                font-weight: 400;
                color: black !important;
                line-height: 34px;
                padding: 0px 20px;
                margin-top:10px;
            }
            
        }
        .button_par{
            display:flex;
            justify-content:space-between;
        }
    }
    .ReporthomePar{
        display:flex;
        justify-content:start;
        gap:40px;
        .Reporthome{
            padding-right:40px;
            border-right:1px solid rgba(0,0,0,0.1);
            width:300px;
            min-width:300px;
            .SelectParent{
                display:flex;
                flex-direction:column;
                gap:20px;
                margin-bottom:20px;
                .titleBig{
                    font-size:14px;
                    font-weight:500;
                    margin-bottom:10px;
                    border-bottom:1px solid rgba(0,0,0,0.1);
                    padding-bottom:10px;
                }
                .selectItem{
                    width:100%;
                    // min-width:100px;
                    .title{
                        font-size:12px;
                        margin-bottom:15px;
                    }
                }
            }
            .buttons{
                padding: 20px 0px;
                flex-direction:column;
                align-items:end;
                font-size:12px;
                .errTxt{
                    font-size:12px !important;
                    margin-bottom:10px;
                }
            }
            
        }
    }
    .TitlePar{
        display:flex;
        align-items:center;
        gap:10px;
        margin-bottom: 30px;
        // justify-content:space-between;
        .Title{
            font-weight: 500;
            font-size: 20px;
            .arrow{
                margin-right:12px;
                margin-left:12px;
            }
            .datePick{
                // margin-left:15px;
                font-weight:400;
                font-size:14px;
            }
        }
    }
`

const yearsData = [
    { id:1, year:"2016"},
    { id:3, year:"2017"},
    { id:4, year:"2018"},
    { id:5, year:"2019"},
    { id:6, year:"2020"},
    { id:7, year:"2021"},
    { id:8, year:"2022"},
    { id:9, year:"2023"},
    { id:10, year:"2024"},
    { id:11, year:"2025"},
    { id:12, year:"2026"},
    { id:13, year:"2027"},
    { id:14, year:"2028"},
    { id:15, year:"2029"},
    { id:16, year:"2030"},
]