import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { ButtonStyle2 } from "components/misc/CustomStyle"
import CkEditor from 'components/misc/CkEditor';

const InsuranceMonitoring = () => {
    const [ selected, setSelected ] = useState({});
    const [ dataEng, setDataEng ] = useState('');
    const [ errText, setErrText ] = useState('')

    return (
        <Container className="container-fluid">
            <div className="TitlePar">
                <div className="Title">Явцын үнэлгээний тайлан</div>
            </div>
            
            <div className="ReporthomePar">
                <div className="Reporthome">
                    <div className="SelectParent">
                        <div className="titleBig">Шинээр тайлан оруулах</div>
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
                        <button  className="myBtn">Цааш → </button>
                    </ButtonStyle2>
                </div>
            </div>
            {/* <div className="editor_par">
                <CkEditor data={dataEng} title={'Явцын үнэлгээний тайлан'} lang="en" setData={setDataEng} />
                <div className="button_par">
                    <ButtonStyle2 className="buttons" ><button className="myBtn">←  Буцах </button></ButtonStyle2>
                    <ButtonStyle2 className="buttons" ><button className="myBtn">Хадгалах</button></ButtonStyle2>
                </div>
            </div> */}
        </Container>
    )
}

export default InsuranceMonitoring


const Container = styled.div`
    width:100%;
    background-color: #fff;
    padding:25px 40px;
    border-radius:0px 5px 5px 5px;
    box-shadow: -5px 5px 12px -12px black;
    font-size:12px;
    .editor_par{
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
        align-items:start;
        justify-content:space-between;
        .Title{
            font-weight: 500;
            font-size: 20px;
            margin-bottom: 30px;
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