import styled, { keyframes } from "styled-components"

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

const bigAnimation = keyframes`
    0% { opacity:0; transform:translateY(-12px); }
    100% { opacity:1; transform:translateY(0px); }
`

const rowAnimation = keyframes`
    0% { opacity:0; transform:translateY(-12px); }
    100% { opacity:1; transform:translateY(0px); }
`

export const LangSwitch = styled.div`
    display:flex;
    align-items:center;
    gap:8px;
    select{
        border:1px solid rgba(0,0,0,0.3);
        border-radius:3px;
    }
    img{
        width:22px;
    }
` 

export const Container = styled.div`
    page-break-inside: avoid;
    animation: ${bigAnimation} 0.6s ease;
    width:100%;
    background-color: #fff;
    padding:40px 15px;
    padding-bottom:${props=>props.scroll?`10px`:`40`};
    border-radius:0px 5px 5px 5px;
    box-shadow: -5px 5px 12px -12px black;
    color:rgba(0,0,0,0.9) !important;
    @media only screen and (max-width:768px){
        // overflow-x:scroll;
    }
    @media only screen and (max-width:1400px){
        // overflow-x:scroll;
        // padding:30px 60px;
    }
    .smTitles{
        font-weight:500;
        font-size:14px;
    }
    .TitlePar{
        display:flex;
        justify-content:space-between;
    }
    .Title{
        font-weight:500;
        font-size:20px;
        margin-bottom:10px;
    }
    .opacity{
        opacity:0.4;
    }
    .customTable{
        // width:100%;
        margin-top:20px;
        .headPar{
            width:100%;
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-bottom:15px;
            .title{
                font-size:14px;
            }
            .additions{
                display:flex;
                gap:30px;
            }
            .addBtn{
                cursor:pointer;
                padding:5px 10px;
                background-color: #fff;
                border-color: #ddd;
                color: #505050;
                border-radius: 4px;
                border-width: 1px;
                border-style: solid;
                display:flex;
                align-items:center;
                font-size:13px;
                svg{
                    margin-right:8px;
                    font-size:17px;
                }
                &:hover{
                    background-color:#ddd;
                }
            }
            .addBtn2{
                font-size:13px;
                svg{
                    margin-right:5px;
                    font-size:18px;
                }
            }
        }
        table{
            width:100%;
            border-collapse: collapse;
            th{
                text-align:center;
                background-color:#E7E9EB;
                min-width:${props=>props.scroll?`150px`:``};
            }
            td, th{
                &:first-child{
                    text-align:center;
                }
                padding:8px 8px;
                border:1px solid rgba(0,0,0,.3);
            }
            td{
                padding:12px 10px;
                max-width:${props=>props.scroll?`140px`:``};
                animation: ${rowAnimation} 0.5s ease;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                // &:last-child{
                //     padding:8px 0px;
                // }
            }
            .filterCountry{
                text-align:left !important;
                padding:5px 10px;
                padding-top:28px;
                font-weight:bold;
                color:rgba(0, 138, 200, 0.7);
                border-left:1px solid rgba(0,0,0,0.15);
                border-right:1px solid rgba(0,0,0,0);
            }
            .cusorItems{
                transition:all 0.2s ease;
                cursor:pointer;
                &:hover{
                    background-color:#eaecf1ab;
                }
            }
            .Selected{
                td{
                    border:1px solid rgba(0,0,0,0.4);
                    border-top:1px solid rgba(0,0,0,0.4);
                }
                position:relative;
                transition:all 0.2s ease;
                background-color:#d8dce6;
                &:hover{
                    background-color:#d8dce6;
                }
                &:after{
                    content:"???";
                    position:absolute;
                    z-index:2;
                    color:green;
                    width:22px;
                    height:22px;
                    top:50%;
                    left:2px;
                    transform:translate(0%, -50%);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:14px;
                    border-radius:50%;
                    // border:1px solid red;
                    background:rgba(255,255,255,1);
                    box-shadow:0px 0px 10px -6px;
                }
            }
            .left{
                text-align:left;
            }
            .right{
                text-align:right;
            }
            .bold{
                font-weight:bold;
            }
            .blue{
                color:rgb(0, 0, 128);
            }
            .grey{
                background-color: #f6f8fa;
            }
            .center{
                text-align:center;
                th{
                    text-align:center;
                }
            }
            .ghost{
                opacity:0.5;
                border:1px solid rgba(0,0,0,0.056);
                td{
                    border:1px solid rgba(0,0,0,0.16);
                }
            }
            .editDeletePar{
                // padding:5px 0px;
                display: flex;
                justify-content:space-evenly;
                align-items:center;
                .smBtn{
                    cursor:pointer;
                    padding:5px;
                    background-color: #fff;
                    border-color: #ddd;
                    color: #333;
                    border-radius: 4px;
                    border-width: 1px;
                    border-style: solid;
                    display:flex;
                    align-items:center;
                    svg{
                        font-size:17px;
                    }
                    &:hover{
                        background-color:#ddd;
                    }
                }
            }
        }
        T
    }
    .Tuniq{
        table{
            th{
                text-align:center;
            }
            td, th{
                &:first-child{
                    padding-left:20px;
                    text-align:left;
                }
                // padding:8px 8px;
                padding-left:12px;
            }
        }
    }
    .T3{
        width:100%;
    }
    .T2{
        margin-bottom:45px;
        th{
            font-weight:400;
        }
        .parent{
            font-weight:500;
        }
        .child{ 
            color: rgba(0, 18, 41, 0.8);
            .title{
               text-align:center;
            }
        }
    }
    .T5{
        table{
          font-size:12px;
            td{
                padding:10px 10px;
            }
        }
    }
    .T4{
        table{
            font-size:11.5px;
            td{
                padding: 5px 7px;
            }
            .filterCountryRow{
                border-right:1px solid rgba(0,0,0,0.2);
                .filterCountry{
                    padding-top:20px;
                }
            }
            .Selected{
                &:after{
                    content:"???";
                    position:absolute;
                    width:18px;
                    height:18px;
                    top:50%;
                    left:-10px;
                    transform:translate(0%, -50%);
                }
            }
        }
    }
    .T6{
        .headPar{
            .addBtn{
                font-weight:500;
                padding:5px 20px;
                svg{
                    font-size:20px;
                }
            }
        }
        table{
            tbody{
                tr{
                    th, td{
                        max-width:150px;
                        border:1px solid rgba(0,0,0,0.25);
                    }
                    td{
                        text-overflow: unset;
                        white-space: unset;
                        overflow: visible;
                    }
                    .left{
                        min-width:430px;
                        text-align:left;
                        padding: 6px 10px;
                    }
                    .number{
                        width:10px !important;
                    }
                   
                }
                .smHead{
                    border-left:1px solid rgba(0,0,0,0.2);
                    border-right:1px solid rgba(0,0,0,0.2);
                    td{
                        text-align:left !important;
                        font-weight:bold;
                        padding:14px 18px;
                        font-size:13px;
                    }
                }
            }
        }
    }
    .pageRender{
       page-break-inside: avoid;
       margin-bottom:30px;
        width:100%;
        .bigTitle{
            font-size:20px;
            margin-bottom:10px;
            text-align:center;
        }
        .headPar{
            justify-content:center;
            .title{
                margin-bottom:5px;
                font-size:16px;
                color:rgb(60,60,60);
            }
            .addBtn{
                display:none;
            } 
        }
        table{
            th, td{
                &:last-child{
                    display:none;
                }
                padding:10px;
            }
        }
        @media print{
            table{
                th{
                    font-weight:400 !important;
                }
                font-size:15px !important;
            }
        }
    }
`

export const InputStyle = styled.div`
        transition:all 0.3s ease;
        position:relative;
        display:flex;
        flex-direction:column;
        align-items:start;
        justify-content:flex-end;
        overflow:hidden;
        width:100%;
        margin-bottom:20px;
        .label{
            opacity:0.9;
            margin-bottom:8px;
            .reds{
                color:red;
            }
        }
        .selects{
            width:100%;
            display:flex;
            align-items:center;
            justify-content:start;
            gap:22px;
            .child{
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                font-size:11px;
                label{
                    font-weight:600;
                }
                input{
                    cursor:pointer;
                    width:18px;
                    height:18px;
                }
            }
            
         
        }
        input{
            box-shadow:1px 1px 13px -8px #21659f;
            border-radius: 4px;
            align-self:flex-end;
            width:100%;
            border:1px solid rgba(0,0,0,0.2);
            padding:6px 0px;
            padding-left:5px;
            transition:all 0.3s ease;
            &:hover{
                border:1px solid rgba(33, 101, 159, 0.4);
            }
            &:focus{
                border:1px solid #21659f;
                outline-width: 0;
            }
        }
        .RedPar{
            border-bottom:1px solid red;
        }
        .SelectPar{
            width:100%;
            position:relative;
            display:flex;
            gap:8px;
            .css-2b097c-container{
                width:100%;
            }
            .smBtn{
                width:37px;
                height:100%;
                cursor:pointer;
                padding:5px;
                background-color: #fff;
                border-color: #ddd;
                color: #333;
                border-radius: 4px;
                border-width: 1px;
                border-style: solid;
                display:flex;
                align-items:center;
                justify-content:center;
                svg{
                    font-size:17.5px;
                }
                &:hover{
                    background-color:#ddd;
                }
            }
        }
        select{
            cursor:pointer;
            color:rgba(0,0,0,1);
            font-size:12px;
            transition:all 0.3s ease;
            -webkit-appearance: none;
            -moz-appearance: none;
            -ms-appearance: none;
            appearance: none;
            width:100%;
            border-radius: 4px;
            align-self:flex-end;
            border:1px solid rgba(0,0,0,0.2);
            padding:6px 0px;
            padding-left:5px;
            transition:all 0.3s ease;
            option[value=""][disabled] {
                display: none;
            }
            option{
                padding:8px 0px;
                color:rgba(0,0,0,0.8);;
            }
            &:hover{
                border:1px solid rgba(33, 101, 159, 0.4);
            }
            &:focus{
                border:1px solid #21659f;
                outline-width: 0;
            }
            &:focus ~ .SelectArr{ 
                // background-color:rgba(0,0,0,0.1);
                svg{
                    transform: rotate(90deg);
                }
            }
            &::-ms-expand{
                display: none;
            }
            & > option[value=""][disabled] {
                color: red;
            }
        }
        .SelectArr{
            transition:all 0.3s ease;
            position:absolute;
            top:2px;
            right:2px;
            background-color:white;
            height:90%;
            width:24px;
            display:flex;
            align-items:center;
            justify-content:center;
            border-radius:2px;
            z-index:1;
            svg{
                transition:all 0.3s ease;
                font-size:18px;
                color:rgba(0,0,0,0.8);
            }
        }
        
        textarea{
            min-height:100px;
            border-radius: 4px;
            align-self:flex-end;
            width:100%;
            border:1px solid rgba(0,0,0,0.2);
            // padding:5px 5px;
            padding:8px 0px;
            padding-left:5px;
            transition:all 0.3s ease;
            &:hover{
                border:1px solid rgba(33, 101, 159, 0.3);
            }
            &:focus{ 
                outline-width: 0;
                border:1px solid #21659f;
            }
        }
        .red{
            border:1px solid rgba(255,0,0,0.8);
        }
        .cash{
            padding-right:10px;
            text-align:right;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
            background: transparent;
            bottom: 0;
            color: transparent;
            cursor: pointer;
            height: auto;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            width: auto;
        }
        // input[type="number"]{
        //     text-align:right;
        //     padding-right:10px;
        // }
`

const ModalAnimate = keyframes`
    0%{ opacity:0; transform:scale(0); }
    100%{ opacity:1; transform:scale(1); }
`
const ModalAnimate2 = keyframes`
    0%{ opacity:1; transform:scale(1); }
    100%{ opacity:0; transform:scale(0); }
`

export const CustomModal = styled.div`
    z-index:10;
    position:fixed;
    width:100%;
    height:100%;
    left:0;
    top:0;
    transform: translate(0px, 0px);
    background-color: rgba(0,0,0,.5);
    display:flex;
    align-items:start;
    justify-content:center;
    padding-top:6rem;
    overflow-y:scroll;
    .contentParent{
        animation:${ModalAnimate} 0.4s ease;
        border-radius:6px;
        background-color:white;
        border:1px solid rgba(0,0,0,0.1);
        box-shadow:1px 1px 18px -10px;
        position:relative;
        .head{
            color:#000;
            padding:10px 20px;
            margin-bottom:10px;
            display:flex;
            align-items:center;
            justify-content:space-between;
            font-size:20px;
            border-bottom:1px solid rgba(0,0,0,0.1);
            position:relative;
            .close{
                top:-15px;
                right:-15px;
                position:absolute;
                transition:all 0.15s ease;
                width:30px;
                height:30px;
                display:flex;
                align-items:center;
                justify-content:center;
                border-radius:50%;
                cursor:pointer;
                padding:10px;
                font-size:16px;
                background: #fff;
                opacity:1;
                &:hover{
                    background-color:#666;
                    color:#fff;
                }
            }
        }
        .content{
            padding:10px 40px;
            .modalbtnPar{
                display:flex;
                width:100%;
                justify-content:space-between;
                padding:20px 0px;
                .errText{
                    padding:8px;
                    border-radius:5px;
                    color:#000;
                    background-color:rgb(255, 204, 204);
                    .red{
                        font-weight:500;
                        color:red;
                    }
                }
                .modalbtn{
                    cursor:pointer;
                    padding:3px 10px;
                    background-color: #fff;
                    border-color: rgba(0,0,0,.5);
                    color: #333;
                    border-radius: 4px;
                    border-width: 1px;
                    border-style: solid;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    gap:10px;
                    width:20%;
                    &:hover{
                        background-color:#ddd;
                    }
                    svg{
                        font-size:18px;
                    }
                }
            }
            .TableHead{
                display:flex;
                justify-content:space-between;
                align-items:center;
                padding-left:30px;
                margin-bottom:15px;
                &:first-child{
                    padding-left:0px;
                    margin-bottom:30px;
                    border-bottom:1px solid rgba(0,0,0,0.1);
                }
                
                .title{
                    width:20%;
                    font-weight:500;
                }
                .inputt{
                    width:22%;
                }
            }
        }
    }
    .contentParentPdf{
        .head{
            padding:8px 20px;
            margin-bottom:5px;
            .close{
                top:8px;
                right:8px;
            }
        }
    }
    .contentParent2{
        animation:${ModalAnimate2} 0.4s ease;
    }
    
`
export const HeaderTwo = styled.div`
    font-size:13px;
    margin-top:10px;
    margin-bottom:100px;
    max-wdth:100%;
    position:relative;
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
        .PrintButton{
            cursor: pointer;
            padding: 5px 40px;
            background-color: rgb(255, 255, 255);
            border-color: rgb(221, 221, 221);
            color: rgb(51, 51, 51);
            border-radius: 4px;
            border-width: 1px;
            border-style: solid;
            display: flex;
            align-items: center;
            font-weight:500;
            &:hover{
                background-color: rgb(0, 0, 0, 0.1);
            }
            svg{
                margin-right: 15px;
                font-size: 20px;
            }
            .text{
                font-weight: 500;
                font-size: 14px;
            }
        }
    }
    
    .smMenuPar{
        display:flex;
        flex-wrap:wrap;
        gap:5px;
        width:100%;
        max-wdth:100%;
        // overflow-x:scroll;
        .itemsPar{
            // max-width:300px;
            font-size:12px;
            text-decoration:none;
            border-style:none;
            font-weight:450;
            cursor:pointer;
            background-color:#e4e6eb;
            margin-right:5px;
            padding:10px 24px;
            border-radius: 5px 5px 0px 0px;
            outline: none;
            color: rgba(${props=>props.theme.textColor},0.4);
            display:flex;
            text-align:left;
            svg{
                font-size:17px;
            }
            span{

            }
        }
        .itemsPar22{
            border-style:none;
            color: rgba(${props=>props.theme.textColor},1);
            background-color:#fff;
            outline: none;
            box-shadow:-4px -5px 13px -11px black;
        }
        .Active{
            border-top:2px solid #337ab7;
            position:relative;
        }
        .dd{
            margin-left:0px;
            border-left:1px solid rgba(0,0,0,0);
        }
    }
    @media only screen and (max-width:768px){
        .smMenuPar{
            flex-direction:column;
        }
    }
`
export const ButtonStyle2 = styled.div`
        padding:30px 0px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        .errTxt{
            transition:all 0.4s ease;
            text-align:center;
            background-color: #f6c343;
            border-radius:5px;
            font-size:15px !important;
            font-weight:400;
            color:black !important;
            line-height:34px;
            padding:0px 20px;
        }
        .myBtn{
            border-radius:5px;
            padding:8px 40px;
            // background-color:#0A6599;
            background-color:#337ab7;
            border-style:none;
            color:white;
            font-weight:500;
            transition:all 0.2s ease;
            outline: none !important;
            
            img{
                width:20px;
            }
            &:hover{
                background-color:rgba(0, 51, 102,0.9);
                box-shadow:1px 1px 6px -2px black;
                outline: none;
            }
            &[disabled]{
                opacity:0.7;
                &:hover{
                    box-shadow:1px 1px 10px -2px white;
                    background-color:#0A6599;
                }
            }
        }
`

const bigAnimation2 = keyframes`
    0% { opacity:0; transform:translateY(-12px); }
    100% { opacity:1; transform:translateY(0px); }
`

export const ReportContainer = styled.div`

    page-break-inside: avoid;
    animation: ${bigAnimation2} 0.6s ease;
    width:100%;
    background-color: #fff;
    padding:25px 40px;
    border-radius:0px 5px 5px 5px;
    box-shadow: -5px 5px 12px -12px black;
    font-size:12px;
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
   
    .EditorParent{
        width:100%;
        display:flex;
        justify-content:space-between;
        gap:30px;
    }
    .pageRender{
       page-break-inside: avoid;
       margin-bottom:30px;
        width:100%;
        .bigTitle{
            font-size:20px;
            margin-bottom:10px;
            text-align:center;
        }
        .headPar{
            justify-content:center;
            .title{
                margin-bottom:5px;
                font-size:16px;
                color:rgb(60,60,60);
            }
            .addBtn{
                display:none;
            } 
        }
        table{
            th, td{
                &:last-child{
                    display:none;
                }
                padding:10px;
            }
            .showing{
                display:table-cell !important;
            }
        }
        @media print{
            table{
                th{
                    font-weight:400 !important;
                }
                font-size:15px !important;
            }
        }
    }
    .LastRotate{
        // margin-top:1200px;
        page-break-inside: avoid;
        // transform:rotate(-90deg);
        // transform-origin: top left;
    }
`