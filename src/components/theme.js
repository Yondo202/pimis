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
        padding:5px 0px;
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
        width:40%;
        border-radius:6px;
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