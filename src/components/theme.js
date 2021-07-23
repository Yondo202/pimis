import styled, { keyframes } from 'styled-components'
export const Color = "#036";
export const ColorRgb = "0, 51, 102";
export const textColor = "0, 18, 41";
export const textColorHex = "#001229";
export const fontSize = '13px'
export const fontSize2 = '15px'
export const fontSizeMobile = '13px'
export const fontSizeMobile2 = '15px'
export const fontFamily2 = "'Montserrat', sans-serif";
// export const fontFamily = "'Rubik', sans-serif";
export const fontFamily = "'Roboto', sans-serif";

export const PrevBtn = styled.div`
    margin:10px 0px;
    margin-bottom:10px;
    border-style:none;
    border-radius:6px;
    cursor:pointer;
    padding:8px 0px;
    color:white;
    background-color:${Color};
    font-size:14px;
    text-align:center;
    transition:all 0.3s ease;
    display:flex;
    align-items:center;
    justify-content:space-around;
    border:1px solid rgba(63, 81, 181,0.5);
    width:30%;
    border-radius:5px;
    &:hover{
      box-shadow:1px 1px 15px -2px black;
     .flexchild{
        transform: rotate(180deg);
     }
    }
    .flexchild{
        transition:all 0.3s ease;
        transform: rotate(0deg);
        display:flex;
        align-items:center;
        justify-content:space-around;
    }
`

export const NextBtn2 = styled.div`
    width:40%;
    button{
        position:relative;
        font-family: inherit;       
        padding:8px 0px;
        margin:10px 0px;
        margin-bottom:10px;
        border-style:none;
        border-radius:6px;
        cursor:pointer;
        padding:5px 0px;
        color:white;
        background-color:${Color};
        font-size:14px;
        text-align:center;
        transition:all 0.3s ease;
        display:flex;
        align-items:center;
        justify-content:space-around;
        border:1px solid rgba(63, 81, 181,0.5);
        width:100%;
        border-radius:6px;
        overflow:hidden;
        &:after{
            content: "";
            background: rgba(255,255,255,.2);
            display: block;
            border-radius:50%;
            position: absolute;
            transition: all 0.5s ease;
            opacity: 0;
            left:0%;
            top:0%;
            -webkit-transform: scale(1.5);
            transform: scale(1.5);
            height:100%;
            width:100%;
          }
          &:active:after{
            opacity: 1;
            transition: 0s;
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        img{
            width:30px;
            height:30px;
        }
        .hide{
            transition:all 0.3s ease;
            transform:scale(0);
            font-size:22px;
        }
        .hide1{
            transition:all 0.7s ease;
            transform:scale(0);
            font-size:23px;
        }
        &:hover{
            box-shadow:1px 1px 15px -2px black;
            .hide{
                transition:all 0.3s ease;
                transform:scale(1);
            }
            .hide1{
                transition:all 0.7s ease;
                transform:scale(1);
            }
        }
        .flexchild{
            display:flex;
            align-items:center;
            justify-content:space-around;
        }
    }
`

export const NextBtn = styled.button`
        outline: none;
        border: none;
        position:relative;
        font-family: inherit;       
        padding:8px 0px;
        margin:10px 0px;
        margin-bottom:10px;
        border-style:none;
        border-radius:6px;
        cursor:pointer;
        padding:5px 0px;
        color:white;
        background-color:${Color};
        font-size:14px;
        text-align:center;
        transition:all 0.3s ease;
        display:flex;
        align-items:center;
        justify-content:space-around;
        border:1px solid rgba(63, 81, 181,0.5);
        width:40%;
        border-radius:6px;
        overflow:hidden;
        &:after{
            content: "";
            background: rgba(255,255,255,.2);
            display: block;
            border-radius:50%;
            position: absolute;
            transition: all 0.5s ease;
            opacity: 0;
            left:0%;
            top:0%;
            -webkit-transform: scale(1.5);
            transform: scale(1.5);
            height:100%;
            width:100%;
          }
          &:active:after{
            opacity: 1;
            transition: 0s;
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        img{
            width:30px;
            height:30px;
        }
        .hide{
            transition:all 0.3s ease;
            transform:scale(0);
            font-size:22px;
        }
        .hide1{
            transition:all 0.7s ease;
            transform:scale(0);
            font-size:23px;
        }
        &:hover{
            box-shadow:1px 1px 15px -2px black;
            .hide{
                transition:all 0.3s ease;
                transform:scale(1);
            }
            .hide1{
                transition:all 0.7s ease;
                transform:scale(1);
            }
        }
        .flexchild{
            display:flex;
            align-items:center;
            justify-content:space-around;
        }
`

export const ButtonStyle = styled.button`
        border-radius:5px;
        padding:8px 40px;
        // background-color:rgba(${ColorRgb});
        background-color:#5a5278;
        border-style:none;
        color:white;
        font-weight:500;
        transition:all 0.2s ease;
        outline: none !important;
        img{
            width:35px;
        }
        &:hover{
            background-color:rgba(${ColorRgb},0.9);
            box-shadow:1px 1px 10px -2px black;
            outline: none;
        }
`

export const AlertStyle = styled.div`
        z-index:10002;
        transition:all 0.5s ease;
        position:fixed;
        // height:80px;
        bottom:100px;
        left:2%;
        display:flex;
        align-items:center;
        border:1px solid rgba(0,0,0,0.2);
        // border-left:4px solid green;
        background-color:white;
        padding:10px 40px; 
        font-weight:400;
        color:black;
        border-radius:6px;
        font-size:17px;
        opacity:1;
        font-weight:600;
        .true{
            margin-right:14px;
            font-size:24px;
            // color:green;
        }
`

export const InputStyle = styled.div`
            /* font-family:"'Roboto', sans-serif"; */
            // width:100%;
            font-size:13px;
            transition:all 0.3s ease;
            position:relative;
            display:flex;
            align-items:end;
            input{
                align-self:flex-end;
                width:100%;
                border-bottom:1px solid rgba(0,0,0,0.2);
                // padding-bottom:5px;
                // padding-left:5px;
                padding:7px 0px;
                padding-left:5px;
                transition:all 0.3s ease;
                &:focus{ 
                    outline-width: 0;
                }
                &:focus ~ .line {
                    width:100%;
                    left:0;
                }
            }
            .RedPar{
                border-bottom:1px solid red;
            }
            input[type="checkbox"]{
                border:1px solid red;
                &:after{
                    content: "";
                    background: white;
                    display: block;
                    border-radius:50%;
                    position: absolute;
                    // transition: transform 1s ease;
                    transition: all 0.8s ease;
                    opacity: 0;
                    left:0%;
                    top:0%;
                    -webkit-transform: scale(2);
                    transform: scale(2);
                    height:24px;
                    width:24px !important;
                  }
                  &:active:after{
                    opacity: 1;
                    transition: 0s;
                    -webkit-transform: scale(0);
                    transform: scale(0);
                }
            }
            textarea{
                align-self:flex-end;
                width:100%;
                border-bottom:1px solid rgba(0,0,0,0.2);
                // padding:5px 5px;
                padding-bottom:5px;
                padding-left:5px;
                transition:all 0.3s ease;
                &:focus{ 
                    outline-width: 0;
                }
                &:focus ~ .line {
                    width:100%;
                    left:0;
                }
            }
            .line{
                transition:all 0.3s ease;
                position:absolute;
                bottom:0;
                left:50%;
                width:0px;
                height:2px;
                background-color:black;
                z-index:2;
            }
            .red{
                border-bottom:1px solid rgba(255,0,0,0.8);
            }

            /* .fileStyle[type="file"]{
                height: 0;
                overflow: hidden;
                width: 0;
            }
            .fileStyleLabel{
                font-size:13px;
                background: #f15d22;
                background: #008CBA;
                border: none;
                border-radius: 4px;
                color: #fff;
                cursor: pointer;
                display: inline-block;
                font-family: 'Roboto', sans-serif;
                font-weight: 500;
                // margin-bottom: 1rem;
                outline: none;
                padding: 0.3rem 40px;
                position: relative;
                transition: all 0.3s;
                vertical-align: middle;
                &:hover{
                    background:#00ace6;
                }
            } */
          
`
const animateDate = keyframes`
    0% { transform:translateY(30px); opacity:0; }
    100% { transform:translateY(0px); opacity:1;}
`

export const ReportTop = styled.div`
        width:100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin:15px 0px;
        flex-direction:row;
      
        .PdfExcelBtns{
            display:flex;
            .dx-button{
                margin-left:10px;
            }
        }
       .datePicker{
           display:flex;
           align-items:center;
           .from, .to {
                input{
                    text-align:center;
                    padding:8px 0px;
                    box-shadow:1px 1px 9px -7px;
                    border-radius:6px;
                    font-weight:500;
                }
                .DayPickerInput-OverlayWrapper{
                    animation: ${animateDate} 0.6s ease;
                    z-index:2;
                }
            }
            .red{
                input{
                    border:1px solid red;

                }
            }
           svg{
               margin:0px 10px;
               font-size:18px;
           }
           .FilterDateBtn{
               cursor: pointer;
               margin-left:8px;
               background-color:#201DD9;
               text-align:center;
               padding:5px 5px;
               box-shadow:1px 1px 9px -7px;
               border-radius:50%;
               font-weight:500;
               svg{
                    margin:0px 0px;
                    color:white;
               }
               &:hover{
                background-color:#504EDF;
               }
           }
           .reject{
               background-color:#E45252;
               &:hover{
                  background-color:#E78484;
               }
           }
       }

    @media only screen and (max-width:1300px){
        align-items:start;
        flex-direction:column;
        .datePicker{
            margin-bottom:15px;
        }
    }
`