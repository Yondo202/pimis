import styled from 'styled-components'
export const Color = "#036";
export const ColorRgb = "0, 51, 102";
export const textColor = "0, 18, 41";
export const fontSize = '13px'
export const fontSize2 = '15px'
export const fontSizeMobile = '13px'
export const fontSizeMobile2 = '15px'
export const fontFamily2 = "'Montserrat', sans-serif";
export const fontFamily = "'Roboto', sans-serif";

export const PrevBtn = styled.div`
    margin:10px 0px;
    margin-bottom:10px;
    border-style:none;
    border-radius:6px;
    cursor:pointer;
    padding:5px 0px;
    color:white;
    background-color:${Color};
    font-size:16px;
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

export const NextBtn = styled.div`
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
        font-size:26px;
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
        z-index:2020;  
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
            font-family:"'Roboto', sans-serif";
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
`


