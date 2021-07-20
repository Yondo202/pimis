import styled from "styled-components"
export const CustomFileUpload = styled.div`
    margin-top:10px;
    // padding:15px 0px;
    .title{
        font-size:14px;
        font-weight:500;
        padding-bottom:8px;
        margin-bottom:8px;
        border-bottom:1px solid rgba(0,0,0,0.2);
    }
    .contentPar{
        // padding:10px 0px;
        display:flex;
        align-items:center;
        justify-content:end;
        gap:15px;
        flex-wrap: wrap;
        .imgPar{
            overflow:hidden;
            position:relative;
            border-radius:5px;
            box-shadow:1px 1px 10px -4px;
            width:90px;
            height:90px;
            &:hover{
                .Addition{
                    top:0px;
                }
            }
            .Addition{
                transition:all 0.3s ease;
                position:absolute;
                top:-100%;
                left:0;
                width:100%;
                height:100%;
                z-index:3;
                background-color:rgba(0,0,0,0.5);
                display:flex;
                align-items:center;
                justify-content:center;
                gap:15px;
                svg{
                    padding:2px;
                    transition:all 0.1s ease;
                    border-radius:8px;
                    font-size:30px;
                    color:#fff;
                }
                .delete{
                    &:hover{
                        background-color:#fff;
                        color:black;
                    }
                    cursor:pointer;
                }
                .see{
                    &:hover{
                        background-color:#fff;
                        color:black;
                    }
                    cursor:pointer;
                }
            }
            img{
                cursor:pointer;
                top:0;
                left:0;
                position:absolute;
                width:100%;
                height:100%;
                object-fit:cover;
            }
        }
        .imgPar2{
            width:150px;
            height:100%;
            box-shadow:none;
            .Addition{
                top:-100%;
            }
            .img{
                position:relative;
                width:100%;
                height:auto;
                object-fit:contain;
            }
        }
        
        .inputSector{
            .inputStyle{
                transition:all 0.3s ease;
                margin-bottom:0px;
                cursor:pointer;
                padding:10px;
                height:70px;
                width:70px;
                display:flex;
                border:2px solid rgba(${props=>props.theme.textColor},0.4);
                border-style:dashed;
                align-items:center;
                justify-content:center;
                svg{
                    transition:all 0.3s ease;
                    height:100%;
                    width:100%;
                    color:rgba(${props=>props.theme.textColor},0.4);
                    // font-size:24px;
                }
                &:hover{
                    border:2px solid rgba(${props=>props.theme.textColor});
                    border-style:dashed;
                    svg{
                        color:rgba(${props=>props.theme.textColor});
                    }
                }
            }
            .inputStyle2{
                svg{
                    height:60%;
                    width:60%;
                }
            }
            input[type="file"]{
                display:none;
            }
        }
    }
    .contentPar2{
        margin-bottom:30px;
        align-items:start;
        justify-content:start;
    }
    contentPar3{
        align-items:start;
        justify-content:start;
    }

    @media print{
        margin-bottom:30px;
        .contentPar{
            .imgPar{
                width:220px;
                height:220px;
                .img{
                    object-fit:cover;
                }
            }
            .imgPar2{
                width:300px;
                height:100%;
                box-shadow:none;
                .Addition{
                    top:-100%;
                }
                .img{
                    position:relative;
                    width:100%;
                    height:auto;
                    object-fit:contain;
                }
            }
        }
        
    }
`

