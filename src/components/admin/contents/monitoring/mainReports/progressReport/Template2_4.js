import React from 'react'
import styled from 'styled-components'

const Template2_4 = () => {
    return (
        <Container className="page_break first_body">
            <div  className="comp_title">SUB-COMPONENT 2.4: COVID-19 RESPONSE GRANT TO SUPPORT SMES </div>

            <div className="page_break table_parent">
                <table>
                    <tbody>
                        {firstTable.map((el,ind)=>{
                            return(
                                <tr key={ind}>
                                    <td className="blue_back">{el.field}</td>
                                    <td>{el.text}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            
            <div className="mass_text">
                {massText.map((el,ind)=>{
                    return(
                        <div key={ind} className="page_break contents">
                            <span className="sm_title">{el?.title??``}</span>
                            {el.body}
                        </div>
                    )
                })}
            </div>

            <div className="page_break table_parent">
                <table className="normal">
                    <tbody >
                        <tr ><td className="center bold" colSpan="4">PROJECT INPUTS</td></tr>
                        <tr >
                            <td rowSpan="3" className="wrap">2.3. COVID-19 response grant to support SMEs</td>
                            <td colSpan="3" className="center bold" >Disbursed Amount, thous.USD</td>
                        </tr>
                        <tr >
                            <td className="center bold" >Disbursement till 2020 end </td>
                            <td className="center bold" >Disbursement in June 30, 2021</td>
                            <td className="center bold" >Total disbursement </td>
                        </tr>
                        <tr >
                            <td className="right">1,500.00</td>
                            <td className="right">0.00</td>
                            <td className="right">1,500.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div className="page_break table_parent">
                <table className="normal">
                    <tbody>
                        <tr><td className="center bold">PROJECT OUTPUTS</td></tr>
                        <tr className="white">
                            <td className="white">
                                <div className="content_body">
                                {massTableInside.map((el,ind)=>{
                                    return(
                                        <div key={ind} className="content_ins">
                                            <div className="long_title">{el.longTitle}</div>
                                            <ul className={`list_par ${el.style==='dot'?`list_style`:``}`}>
                                                {el.lists?.map((item,ind)=>{
                                                    return(
                                                        <li key={ind} className="items">{item.texts}</li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    )
                                })}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </Container>
    )
}

export default Template2_4

const Container = styled.div`
    margin-bottom:180px;
    font-size:12px;
    color:#000000;
    .page_break{
        page-break-inside: avoid !important;
    }
    .comp_title{
        font-weight:600;
        font-size:13px;
        color:#c00000 !important;
        border-bottom:1px solid rgba(0,0,0,0.8);
        padding-bottom:4px;
        margin-bottom:30px;
    }
    .mass_text{
        .contents{
            text-align: justify;
            .sm_title{
                font-weight:500;
            }
            margin-bottom:18px;
        }
    }
    .table_parent{
        margin-bottom:30px;
        table{
            font-size:12px !important;
            margin-bottom:5px;
            width:100%;
            border-collapse: collapse;
            td{
                .content_body{
                    .content_ins{
                        text-align: justify;
                        margin-bottom:20px;
                        .list_par{
                            padding-left:50px;
                            .items{
                                padding:5px 0px;
                            }
                        }
                        .list_style{
                            list-style: inside;
                            list-style-position: outside;
                        }
                        .long_title{
                            margin-bottom:18px;
                        }
                    }
                }
            }
            td, th{
                padding:4px 8px;
                border:1px dotted rgba(0,0,0,.6);
            }
            .blue_back{
                background-color:#dbe5f1;
            }
            .center{
                text-align:center;
            }
            .hide{
                color:#fff;
            }
            .wrap{
                white-space: nowrap;
            }
            .bold{
                font-weight:600;
            }
            .right{
                text-align:right;
            }
        }
        .normal{
            td, th{
                background-color:#dbe5f1;
                border:1px solid rgba(0,0,0,.6);
            }
            .white{
                background-color:#fff;
            }
        }
    }
`


const firstTable = [
    { field:'Component:', text:'2. Export competitivness and market access enhancement' },
    { field:'Sub-component:', text:'2.4. COVID-19 response grant to support SMEs' },
    { field:'Implementing agency:', text:'PIU' },
    { field:'Reporting period:', text:'March 02, 2020 – June 30, 2021' },
    { field:'Budget amount:', text:'USD 1,500,000.00' },
]

const massText = [
    { title:'Objective: ', body:"This financial support for enterprises to cope with the effects of the KOVID-19 pandemic will be part of the government's Unemployment Insurance Fund support in response to the effects of the pandemic." },
    { title:'Overview: ', body:" The global outbreak of KOVID-19 is having a profound effect on the economies, businesses and livelihoods of countries. In this context, a number of studies have been conducted around the world, and some studies also have been conducted in Mongolia to determine the impact of the epidemic. For example, in March 2020, the Mongolian National Chamber of Commerce and Industry conducted a study on the economic and business impact of the COVID-19 epidemic, which covered more than 1,100 businesses. Of the businesses surveyed, 89.5% said the epidemic had had a moderate or significant impact on business operations, while only 2.2% said it had not. About half of those surveyed reported a 30 percent or more decline in sales. Furthermore, the payment of loans, social security contributions and rents are among the main difficulties. " },
    { body:"Parliament Resolution No. 21 of April 9, 2020 “On a package of measures to protect citizens' health and income, save jobs and stimulate the economy during the outbreak of coronavirus infection / COVID-19 /” stated to provide MNT 200.0 thousand per month from the Unemployment Fund, between April 01-July 01, 2020, for insured persons of business entities that have retained their jobs despite the fact that their sales revenue has decreased by more than 50 percent due to the pandemic in the field of income protection. " },
    { body:"In this context, the Project has agreed to provide $ 1.5 million in financial and budgetary support to the Unemployment Insurance Fund or to contribute to the Unemployment Insurance Fund. Subsequently, the necessary evidence and data contained in the Project Implementation Manual were collected in close cooperation with the Ministry of Labor and Social Welfare, the Social Insurance General Office, and GTA, and submitted to the World Bank and the World Bank office in Ulaanbaatar for review. As a result, the financial support was approved to be reimbursed to the Unemployment Insurance Fund, which was fully transferred to the fund on December 24, 2020. During the 3 months specified in the regulation, the Unemployment Insurance Fund provided MNT 43,600,200,000 to 218,001 insured employees in duplicate numbers from 7,264 enterprises that met the capital city and local criteria. The USD 1.5 million provided by the Project represents approximately 9.81% of the total support. In addition, 8,026 insured employees of 332 non-mining SMEs registered in Bayanzurkh and Khan-Uul districts were covered by this fund." },
]


const massTableInside = [
    { longTitle: 'As this Project financial support is part of the Unemployment Insurance Fund announced by the government in response to the pandemic, the Ministry of Labor and Social Welfare and SIGO have implemented the following legal regulations:', style:'dot', lists: [ 
        { texts:'Resolution No. 21 of the State Great Hural “On a package of measures to protect the health and income of citizens, save jobs and stimulate the economy during the outbreak of coronavirus (COVID-19)” /April 09, 2020/,'  },
        { texts:'Law on exemption from social insurance premiums and support from the unemployment insurance fund /April 09, 2020/,'  },
        { texts:'Government Resolution No. 140 “Procedure to be followed in implementing the law on exemption from social insurance premiums and support from the unemployment insurance fund” /2020.04.17/'  },
    ] },

    { longTitle: 'However, the Ministry of Food, Agriculture and Light Industry and the PIU of EDT have no role in this organization. In the Project Implementation Manual, it is provided that the PIU shall contribute USD 1.5 million in one-time compensation to the support program based solely on actual expenditure reports prepared by SIGO. In addition, after repeated discussions with the World Bank and the Ministry of Labor and Social Welfare, the Ministry of Labor and Social Welfare agreed to submit the following reports and information to the EDC PIU upon completion of the support program, which is also included in the PIM:', style:'dot', lists: [ 
        { texts:'Official consolidated report on the implementation of the support program;'  },
        { texts:'Information for the PIU on beneficiaries who are supported by the Project.'  },
        { texts:'Copies of current accounts submitted by enterprises to SIGO to prove that the financial support provided by the Fund has been transferred to the current accounts of the insured employees.'  },
    ] },

    { longTitle: 'With regard to the need to prepare information specifically for PIUs related to the beneficiaries supported by the Project, EDT aims to support non-mining SMEs. In this context, non-mining SMEs were required to be screened for USD 1.5 million from all enterprises supported by the Unemployment Insurance Fund. ',  style:'number',lists: [ 
        { texts:'1) Agriculture, forestry, fishing, hunting,' },
        { texts:'2) Manufacturing,' },
        { texts:'3) Construction,' },
        { texts:'4) Wholesale and retail trade; car and motorcycle maintenance,' },
        { texts:'5) Transportation and warehousing activities,' },
        { texts:'6) Hotels, apartments, accommodation and catering services,' },
        { texts:'7) Information, communication,' },
        { texts:'8) Financial and insurance activities,' },
        { texts:'9) Real estate activities,' },
        { texts:'10) Management and support activities' },
    ] },


    { longTitle: 'Furthermore, after screening non-mining enterprises in this category, it became necessary to distinguish them from SMEs. However, the Ministry of Labor and Social Welfare and SIGO cooperated with the GASI and GTA in compiling a list of eligible enterprises in accordance with the above laws and regulations. Therefore, it was not possible to provide information on the sales revenue of enterprises. Thus, the Project cooperated with the GTA to obtain the 2019 sales revenue data of the screened non-mining enterprises.',  },
    { longTitle: "As a result of close cooperation with the Ministry of Labor and Social Welfare, SIGO and GIA, the PIU collected the necessary evidence and data and submitted it to the World Bank and the World Bank's Ulaanbaatar office for review. Subsequently, the State Secretary of the Ministry of Food, Agriculture and Light Industry sent a request to the World Bank to reimburse the Unemployment Insurance Fund, and the support was transferred to the Fund on December 24, 2020. ",  },
]