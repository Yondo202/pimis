import styled, { keyframes } from "styled-components"
const bigAnimation = keyframes`
    0% { opacity:0; transform:translateY(-12px); }
    100% { opacity:1; transform:translateY(0px); }
`

const rowAnimation = keyframes`
    0% { opacity:0; transform:translateY(-12px); }
    100% { opacity:1; transform:translateY(0px); }
`


export const Container = styled.div`
    page-break-inside: avoid;
    animation: ${bigAnimation} 0.6s ease;
    width:100%;
    background-color: #fff;
    padding:40px 15px;
    border-radius:0px 5px 5px 5px;
    box-shadow: -5px 5px 12px -12px black;
    @media only screen and (max-width:768px){
        padding:40px 15px;
    }
    @media only screen and (max-width:1400px){
        padding:30px 60px;
    }

    .Title{
        font-weight:500;
        font-size:20px;
        margin-bottom:10px;
    }
    .customTable{
        width:100%;
        margin-top:20px;
        .headPar{
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-bottom:15px;
            .title{
                font-size:14px;
            }
            .addBtn{
                cursor:pointer;
                padding:5px 10px;
                background-color: #fff;
                border-color: #ddd;
                color: #333;
                border-radius: 4px;
                border-width: 1px;
                border-style: solid;
                display:flex;
                align-items:center;
                svg{
                    margin-right:3px;
                    font-size:20px;
                }
                &:hover{
                    background-color:#ddd;
                }
            }
        }
        
        table{
            width:100%;
            border-collapse: collapse;
            th{
                text-align:center;
                background-color:#E7E9EB;
            }
            td, th{
                &:first-child{
                    text-align:center;
                }
                padding:8px;
                border:1px solid rgba(0,0,0,.3);
            }
            td{
                animation: ${rowAnimation} 0.5s ease;
                // &:last-child{
                //     padding:8px 0px;
                // }
            }
            .left{
                text-align:left;
            }
            .right{
                text-align:right;
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
                        font-size:17.5px;
                    }
                    &:hover{
                        background-color:#ddd;
                    }
                }
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
        overflow:hidden;
        width:100%;
        margin-bottom:15px;
        .label{
            opacity:0.9;
            margin-bottom:8px;
            .reds{
                color:red;
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
        select{
            color:rgba(0,0,0,0.75);
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
            option {
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
                background-color:rgba(0,0,0,0.1);
                svg{
                    transform: rotate(180deg);
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
            top:2%;
            right:0.5%;
            background-color:white;
            height:95%;
            width:24px;
            display:flex;
            align-items:center;
            justify-content:center;
            border-radius:2px;
            z-index:1;
            svg{
                transition:all 0.3s ease;
                font-size:13px;
                color:rgba(0,0,0,0.8);
            }
        }
        
        textarea{
            border-radius: 4px;
            align-self:flex-end;
            width:100%;
            border:1px solid rgba(0,0,0,0.2);
            // padding:5px 5px;
            padding-bottom:5px;
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
    z-index:1000;
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
            color:#333333;
            padding:10px 20px;
            display:flex;
            align-items:center;
            justify-content:space-between;
            font-size:20px;
            border-bottom:1px solid rgba(0,0,0,0.1);
            margin-bottom:10px;
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
                justify-content:flex-end;
                padding:10px 0px;
                .modalbtn{
                    cursor:pointer;
                    padding:5px 10px;
                    background-color: #fff;
                    border-color: #ddd;
                    color: #333;
                    border-radius: 4px;
                    border-width: 1px;
                    border-style: solid;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    width:20%;
                    &:hover{
                        background-color:#ddd;
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
    .contentParent2{
        animation:${ModalAnimate2} 0.4s ease;
    }
    
`