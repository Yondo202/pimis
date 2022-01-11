import React from 'react'
import styled from 'styled-components'

const ProgressReport = () => {

    return (
        <Container className="first_body">
            <div className="page_face page_break">
                <div className="head_image">
                    <div className="image"><img src="/edp_logo2.png" alt="edp_logo" /></div>
                    <div className="image"><img src="/edp_logo3.gif" alt="edp_logo2" /></div>
                </div>
                <div className="content_row">
                    <div className="col1">
                        <div className="red_title">EXPORT DEVELOPMENT PROJECT (P147438)</div>
                        <div className="text1">IDA CREDIT NUMBER 5879-MNIN THE AMOUNT OF SDR 14.3 MILLION(US$ 20.0 MILLION EQUIVALENT)</div>
                    </div>
                    <div className="col2">
                        <div className="main_logo"><img src="/edp_logo3.png" alt="edp_logo2" /></div>
                        <div className="texts">
                            <div className="text1">Report No:</div>
                            <div className="text1">EDP/PR/….</div>
                        </div>
                    </div>
                </div>
                <div className="content_row2">
                    <div className="texts">SEMI-ANNUAL PROGRESS REPORT </div>
                    <div className="texts">AS OF JUNE 30, 2021</div>
                </div>
                <div className="content_row3">
                    <div className="col11">
                        This report has been prepared with the collaboration and input of all EDP implementing agency and components, its consolidation and formatting was done by the PIU and overall report has been cleared with the EDP Project Director.
                    </div>
                    <div className="col22">
                        2021.08.10
                    </div>
                </div>
            </div>

            <div className="paginate_list page_break">
                <div className="title_top">PROJECT COMPONENTS</div>
                <div className="lists_parent">
                    {PaginateList.map((el,ind)=>{
                        return(
                            <div key={ind} className="items">
                                <div className={`item_text ${el.bold?`bold`:``}`}>{el.text}</div>
                                <div className="paginate_text">{el.page_num}</div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="report_progress_list page_break">
                <div className="title_top">CONTENT OF THE PROGRESS REPORT</div>

                <ol className="list_parent">
                    {ProgressList.map((el,ind)=>{
                        return(
                            <li key={ind} className="items">
                                <div className="main_text"><span className="number">{ind+1}.</span>  {el.text}</div>
                                {el.child?.map((elem,index)=>{
                                    return(
                                        <div key={index} className="child">
                                            <span className="number">{ind+1}.{index + 1}</span> {elem.texts}

                                            {elem.subChild?.map((item,i)=>{
                                                return(
                                                    <div className="child child2">
                                                        <span className="number">{ind+1}.{index + 1}.{i+1}</span> {item.texts}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </li>
                        )
                    })}
                </ol>
            </div>

            <div className="currency_parent page_break">
                <div className="head_sector">
                    <div className="titles bottom">CURRENCY EQUIVALENTS</div>
                    <div className="titles">(Exchange Rate Effective: June 30, 2021)</div>
                    <div className="titles bottom">Source: The World Bank Client Connection Website</div>
                    <div className="titles">Currency Unit=Tugriks</div>
                    <div className="titles">2,848,68 MNT = US$1.00</div>
                    <div className="titles bottom">1.00US$ = SDR 0.7128</div>
                    <div className="titles">FISCAL YEAR</div>
                    <div className="titles bottom">[January 1 – December 31]</div>
                </div>
                <div className="lists_parent">
                    {WordExplain.map((el,ind)=>{
                        return(
                            <div key={ind} className="list_item">
                                <div className="first">{el.text}</div>
                                <div className="last">{el.description}</div>
                            </div>
                        )
                    })}

                </div>
            </div>

            <TableParent className="page_break">
                    <table>
                        <tbody>
                            <tr>
                                <td rowSpan="2">Project and Component Leaders</td>
                                <td >Recipient Leaders</td>
                                <td className="wrap">World Bank Task Team Leaders</td>
                            </tr>
                            <tr>
                                <td > Project Director – O.Onon, Head of the Trade, Food Production and Service Division, MOFALI </td>
                                <td className="wrap">Task Team Leader – Ms. Ulle Lohmus </td>
                            </tr>
                            <tr className="bold wrap row_line"><td colSpan="3" className="line">Component 1. Development of a new line of export finance products</td></tr>
                            <tr>
                                <td >Comp 1 Financial, technical, and institutional development support to the Mongolian National Reinsurance Joint Stock Company (Mongolian Re) in building a new line of export finance products.</td>
                                <td > B.Bat-Erdene, Director of Export Insurance Department of Mongolian Re </td>
                                <td className="wrap">Task Team Leader – Ms. Ulle Lohmus </td>
                            </tr>
                            <tr className="bold wrap row_line"><td colSpan="3" className="line">Component 2. Export competitiveness and market access enhancement</td></tr>

                            <tr>
                                <td >Comp 2.1 Training and export policy and capacity enhancement</td>
                                <td rowSpan="4"> B.Dulguun, Coordinator of the PIU </td>
                                <td rowSpan="4" className="wrap">Task Team Leader – Ms. Ulle Lohmus </td>
                            </tr>
                            <tr>
                                <td >Comp 2.2 International market competitiveness enhancement</td>
                            </tr>
                            <tr>
                                <td >Comp 2.3 Productive Partnership Scheme</td>
                            </tr>
                            <tr>
                                <td >Comp 2.4 COVID-19 response grant to support SMEs</td>
                            </tr>

                            <tr>
                                <td className="bold">Component 3. Strengthening certification services and quality management</td>
                                <td >B.Dulguun, Coordinator of the PIU </td>
                                <td >Task Team Leader – Ms. Ulle Lohmus</td>
                            </tr>

                            <tr>
                                <td className="bold">Component 4. Project Implementation Support </td>
                                <td >B.Dulguun, Coordinator of the PIU</td>
                                <td >Task Team Leader – Ms. Ulle Lohmus</td>
                            </tr>

                            
                        </tbody>
                    </table>
            </TableParent>
            
            <TableParent className="page_break">
                <div className="tableTitle"><span className="number">1.</span><span className="text">Basic Information</span> </div>
                <table>
                    <tbody>
                        <tr> <td>Country: Mongolia</td><td>Project Name: Export Development Project</td></tr>
                        <tr> <td>Project ID: P147438</td><td>Credit Reference Number: 5879-MN</td></tr>
                        <tr> <td>Lending Instrument: Credit</td><td>Recipient: Mongolia  </td></tr>
                        <tr> <td>Total adjusted commitment for period:  4,786.806.42 US Dollar (as of June 30, 2021)</td><td>Disbursed amount: 3,866,320.00 US Dollar(as of June 30, 2021)</td></tr>
                        <tr>
                            <td colSpan="2">
                                <div className="Text">Implementing Agencies at MoFALI: </div>
                                <ul>
                                    <li>Mongolian Reinsurance Joint Stock Company, Export Insurance Department</li>
                                    <li>Project Implementing Unit under the Ministry of Food, Agriculture and Light Industry</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </TableParent>


            <TableParent className="page_break">
                <div className="tableTitle"><span className="number">2.</span><span className="text">Key Dates </span> (all fields are entered by the system)</div>
                <table>
                    <tbody>
                        <tr> 
                            <th>Process</th>
                            <th>Date</th>
                            <th>Process</th>
                            <th>Original Date</th>
                            <th>Revised/Actual Date(s)</th>
                        </tr>
                        <tr> 
                            <td>Concept review:</td>
                            <td>February 12, 2014</td>
                            <td>Effectiveness:</td>
                            <td>December 22, 2016</td>
                            <td></td>
                        </tr>
                        <tr> 
                            <td>Appraisal:</td>
                            <td>June 14, 2016</td>
                            <td>Restructuring(s):</td>
                            <td>September 07, 2020</td>
                            <td></td>
                        </tr>
                        <tr> 
                            <td>Appraisal:</td>
                            <td>July 7, 2016</td>
                            <td>Mid-term Review:</td>
                            <td>June 07-11, 2021</td>
                            <td></td>
                        </tr>
                        <tr> 
                            <td></td>
                            <td></td>
                            <td>Closing:</td>
                            <td>December 31, 2023</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </TableParent>

            <TableParent className="page_break">
                <div className="tableTitle"><span className="number">3.</span><span className="text">Sector and Theme Codes</span> (measured at midterm and end of Project) </div>
                <table className="unq">
                    <tbody>
                        <tr className="null"><td></td><td></td><td></td></tr>
                        <tr><td colSpan="3" className="bold">Sector Code (as % of total Bank financing)</td></tr>
                        <tr className="null"><td></td><td></td><td></td></tr>
                        <tr className="null"><td></td><td></td><td></td></tr>
                        <tr><td></td><td className="padding_none bold">Original Priority</td><td className="padding_none bold">Actual Priority</td></tr>
                        <tr><td colSpan="3" className="bold">Theme Code (Primary/Secondary)</td></tr>
                        <tr className="null"><td></td><td></td><td></td></tr>
                        <tr className="null"><td></td><td></td><td></td></tr>
                        <tr className="null"><td></td><td></td><td></td></tr>
                    </tbody>
                </table>
            </TableParent>
            
            <TableParent className="page_break">
                <div className="tableTitle"><span className="number">4.</span><span className="text">Project Context, Development Objectives and Design </span> </div>
                {DesignText.map((el,ind)=>{
                    return(
                        <><div style={{textAlign: `justify`}} key={ind} > {el.text}</div><br /></>
                    )
                })}
            </TableParent>

            <TableParent className="page_break">
                <div className="tableTitle"><span className="number">5.</span><span className="text">Original Project Development Objectives (PDO) and Key Indicators:</span> </div>
                <div className="bordered">The development objective of the Project is to support Mongolian small and medium size firms in the non-mining sectors to strengthen their export capabilities and expand access to export markets.</div>
                <div className="tableTitle tableTitle2"><span className="text">The original key performance indicators are by the Closing Date:</span> </div>

                <TableParent className="grey">
                    <table>
                        <tbody>
                            <tr className="center">
                                <th  colSpan="2">PDO level results Indicators</th>
                                <th >Baseline (2016)</th>
                                <th >Target value</th>
                            </tr>
                            {ProjectData.map((el,ind)=>{
                                return(
                                    <tr key={ind}>
                                        <td>{el.one}</td>
                                        <td>{el.two}</td>
                                        <td className="center">{el.three}</td>
                                        <td className="center">{el.four}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </TableParent>
                
            </TableParent>

            <TableParent className="page_break">
                <div className="tableTitle"><span className="number">6.</span><span className="text">Main Beneficiaries </span> (original and revised; briefly describe the “the primary target group” identified in the PAD and as captured in the PDO, as well as any other individuals and organizations expected to benefit from the Project):</div>
                <div>The primary beneficiaries of the Project will include existing or future exporting SMEs in the non-mining sectors. Beneficiaries will also include the Mongolian Re and its Export Insurance Department, and private insurance companies and other financial institutions which will develop capacity to provide export credit insurance products to the Mongolian SMEs. The public sector and non-government organizations (NGOs) will also benefit as they improve their capacity in providing export support and promotion services to SMEs. </div>
            </TableParent>

            <TableParent className="page_break">
                <div className="tableTitle"><span className="number">7.</span><span className="text">Original components (as approved):</span> </div>
                <table>
                    <tbody>
                        <tr>
                            <th className="wrap">Comp #</th>
                            <th>Component names</th>
                            <th>Sub-Components</th>
                        </tr>
                        <tr>
                            <td className="center">1</td>
                            <td colSpan="2" className="bold">Component 1. Development of a new line of export finance products</td>
                        </tr>
                        <tr>
                            <td  className="center" rowSpan="4">2</td>
                            <td rowSpan="4">Component 2. Export competitiveness and market access enhancement</td>
                            <td className="wrap">Sub-Comp 2.1 Training and export policy and capacity enhancement</td>
                        </tr>
                        <tr> <td className="wrap">Sub-Comp 2.2 International market competitiveness enhancement</td></tr>
                        <tr> <td className="wrap">Sub-Comp 2.3 Productive Partnership Scheme</td></tr>
                        <tr> <td className="wrap">Sub-Comp 2.4 COVID-19 response grant to support SMEs</td> </tr>
                        <tr>
                            <td className="center">3</td>
                            <td colSpan="2" className="bold">Component 3. Strengthening certification services and quality management</td>
                        </tr>
                        <tr>
                            <td className="center">4</td>
                            <td colSpan="2" className="bold">Component 4. Project Implementation Support </td>
                        </tr>
                    </tbody>
                </table>
                <div>The Project had Components 1.1, 1.2; 2.1, 2.2 and 3; after being transferred from the Ministry of Finance to the Ministry of MOFALI and restructured, it has Changed to 4 components and sub-components 1; 2.1, 2.2, 2.3, 2.4; 3 and 4;. as shown in the table above. </div>
            </TableParent>
        </Container>
    )
}

export default ProgressReport

const TableParent = styled.div`
    margin-bottom:180px;
    font-size:12px;
    .bordered{
        padding:5px 10px;
        border:1px solid rgba(0,0,0,0.8);
    }
    .tableTitle{
        padding:25px 0px;
        padding-left:30px;
        font-size:13px;
        .number{
            margin-right:10px;
            font-weight:500;
        }
        .text{
            font-weight:500;
        }
    }
    .tableTitle2{
        padding-left:0px;
    }
    table{
        font-size:12px !important;
        margin-bottom:5px;
        width:100%;
        border-collapse: collapse;
        td, th{
            padding:5px 8px;
            border:1px solid rgba(0,0,0,.6);
            ul{
                margin-left:19px;
                li{
                    list-style-type: upper-roman;
                }
            }
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
        .row_line{
            border:1px solid rgba(0,0,0,.6);
            .line{
                padding:5px 10px;
            }
        }
        .Text{
            text-decoration:underline;
        }
        .padding_none{
            padding:4px 10px;
        }
        .null{
            td{
                padding:12px 0px;
            }
        }
    }
    .unq{
        td{
            &:first-child{
                width:60%;
            }
        }
    }
    .grey{
        table{
            background-color:#c0c0c0;
        }
    }
`


const Container = styled.div`
    .page_break{
        page-break-inside: avoid !important;
    }
    .currency_parent{
        margin-bottom:180px;
        padding:1rem 5rem;
        .lists_parent{
            font-size:13.5px;
            .list_item{
                padding-bottom:5px;
                display:flex;
                .first{
                    width:25%;
                }
            }
        }
        .head_sector{
            text-align:center;
            .titles{
                font-weight:500;
            }
            .bottom{
                margin-bottom:21px;
            }
        }
    }

    .report_progress_list{
        padding:0rem 3rem;
        margin-bottom:180px;
        .list_parent{
            .items{
                padding:5px 0px;
                .main_text{
                    font-weight:500;
                    
                }
                .child{
                    padding:3.5px 0px;
                    padding-left:22px;
                    &:last-child{
                        margin-bottom:20px;
                    }
                }
                .child2{
                    &:last-child{
                        margin-bottom:0px;
                    }
                }
                .number{
                    margin-right:7px;
                }
            }
        }
    }
    .paginate_list{
        font-size:13px;
        margin-bottom:180px;
        .lists_parent{
            .items{
                display:flex;
                justify-content:space-between;
                padding:5px 0px;
                .item_text{
                    max-width:80%;
                    text-overflow: ellipsis; 
                    overflow: hidden; 
                    white-space: nowrap;
                }
                .bold{
                    font-weight:600;
                }
            }
        }
    }
    .title_top{
        text-align:center;
        color:${props=>props.theme.Color};
        margin-bottom:35px;
        font-weight:600;
        font-size:12px;
    }
    @media (max-width:1100px){
        width:100%;
    }
    .page_face{
        margin-bottom:400px;
        
        .head_image{
            display:flex;
            justify-content:space-between;
            .image{
                width:40%;
                img{
                    width:100%;
                    height:auto;
                }
            }
            margin-bottom:100px;
        }
        .content_row{
            display:flex;
            .text1{
                color:${props=>props.theme.Color};
                font-weight:600;
                font-size:14px;
            }
            .col1{
                text-align:center;
                padding:1rem 6rem;
                padding-bottom:2rem;
                width:68%;
                border-right:2px solid grey;
                height:16rem;
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                .red_title{
                    color:red;
                    font-weight:600;
                    font-size:11px;
                }
                
            }
            .col2{
                width:32%;
                padding:20px 10px;
                min-height:100%;
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                .main_logo{
                    img{
                        width:100%;
                        height:auto;
                        object-fit:contain;
                    }
                }
                .texts{
                    padding-left:10px;
                }
            }
            
        }
        .content_row3{
            border-bottom:2px solid grey;
            display:flex;
            color:${props=>props.theme.Color};
            .col11{
                width:68%;
                border-right:2px solid grey;
                padding:15px 10px; 
                font-style:italic;
            }
            .col22{
                width:32%;
                min-height:100%;
                display:flex;
                justify-content:center;
                align-items:center;
            }
        }
        .content_row2{
            background-color:${props=>props.theme.Color};
            border-top:2px solid grey;
            border-bottom:2px solid grey;
            display:flex;
            padding:14px 0px;
            justify-content:space-evenly;
            .texts{
                color:#fff;
                font-size:11px;
                font-weight:500;
            }
        }
    }
`

const PaginateList = [
    { text: 'COMPONENT 1. DEVELOPMENT OF A NEW LINE OF EXPORT FINANCE PRODUCTS', page_num:'8', bold:true },
    { text: 'COMPONENT 2. EXPORT COMPETITIVENESS AND MARKET ACCESS ENHANCEMENT', page_num:'10', bold:true },
    { text: 'SUB-COMPONENT 2.1: INTERNATIONAL MARKET COMPETITIVENESS ENHANCEMENT', page_num:'10', bold:false },
    { text: 'SUB-COMPONENT 2.2: INTERNATIONAL MARKET COMPETITIVENESS ENHANCEMENT', page_num:'18', bold:false },
    { text: 'SUB-COMPONENT 2.3: PARTNERSHIP PROGRAM SCHEME', page_num:'21', bold:false },
    { text: 'SUB-COMPONENT 2.4: COVID-19 RESPONSE GRANT TO SUPPORT SMES', page_num:'23', bold:false },
    { text: 'COMPONENT 3: STRENGTHENING CERTIFICATION SERVICE AND QUALITY MANAGEMENT', page_num:'25', bold:true },
    { text: 'COMPONENT 4. PROJECT IMPLEMENTATION SUPPORT', page_num:'29', bold:true },
    { text: 'ANNEX 1. Project Costs and Financing by Component (in thous.US$ equivalent)', page_num:'38', bold:false },
    { text: 'ANNEX 2. Foundation of the Project Steering Committee', page_num:'39', bold:false },
    { text: 'ANNEX 3. Results framework', page_num:'67', bold:false },
    { text: 'ANNEX 4. Environmental and social management framework implementation', page_num:'72', bold:false },
]

const ProgressList = [
    { text:'Basic information',  },
    { text:'Key Dates',  },
    { text:'Sector and Theme Codes',  },
    { text:'Project Context, Development Objectives and Design ',  },
    { text:'Original Project Development Objectives (PDO) and Key Indicators [as approved]:',  },
    { text:'Main Beneficiaries',  },
    { text:'Original Components (as approved)',  },
    { text:'Key Factors Affecting Implementation and Outcomes', child: [
         { texts: 'Implementation: (Project inputs/Activities, Project Outputs, Project Outcomes)' } ,
         { texts: 'Monitoring and Evaluation' } ,
         { texts: 'Safeguard and Fiduciary Compliance (focusing on issues and their resolution, as applicable)' } ,
        ] },

    { text:'Assessment of Outcomes (to be reported on an annual basis)', child: [ 
        { texts: 'Relevance of Objectives, Design and implementation'  },
        { texts: 'Achievement of Project Development Objectives (including brief discussion of casual linkages between outputs and outcomes, with details on outputs)'  },
        { texts: 'Overarching themes, other outcomes and impacts (if any, where not previously covered or to amplify discussion above):' , subChild: [ 
            { texts:'Poverty Impacts, Social Development and other' },
            { texts:'Institutional Change /Strengthening (particularly with reference to impacts on longer–term capacity and institutional development)' },
            { texts:'Other Unintended Outcomes and Impacts (positive and negative)' },
        ] },
     ]  }, 

    { text:'Lessons Learned (both Project specific and of wide general application)',  },
    { text:'Comments on issues Raised by implementing agencies',  },
]

const WordExplain = [
    { text:'Mongolian RE', description: 'Mongolian Reinsurance Joint Stock Company' },
    { text:'BDS', description: 'Business Development Specialist' },
    { text:'EBRD', description: 'European Bank for Reconstruction and Development' },
    { text:'EDP', description: 'Export Development Project' },
    { text:'ESMF', description: 'Environment and Social Management Framework' },
    { text:'EU', description: 'European Union' },
    { text:'FA', description: 'Financing Agreement' },
    { text:'GOM', description: 'Government of Mongolia' },
    { text:'HDRTC', description: 'Human Development Research and Training center' },
    { text:'IDA', description: 'International Development Association' },
    { text:'ISO', description: 'International Standardization Organization' },
    { text:'LGF', description: 'Loan Guarantee Fund' },
    { text:'MOFA', description: 'Ministry of Foreign Affairs' },
    { text:'MCGA', description: 'Mongolian Customs General Administration' },
    { text:'MGA', description: 'Matching Grant Agreement' },
    { text:'MGF', description: 'Matching Grant Facility' },
    { text:'MGIM', description: 'Matching Grant Implementation Manual' },
    { text:'MNCCI', description: 'Mongolian National Chamber of Commerce and Industry' },
    { text:'MOF', description: 'Ministry of Finance' },
    { text:'NGO', description: 'Non-Governmental Organization' },
    { text:'NSO', description: 'National Statistics Office' },
    { text:'PAD', description: 'Project Appraisal Document' },
    { text:'PDO', description: 'Project Development Objective' },
    { text:'PIM', description: 'Project Implementation Manual' },
    { text:'PIMIS', description: 'Project Implementation Monitoring Information System' },
    { text:'PIU', description: 'Project Implementing Unit' },
    { text:'PSC', description: 'Project Steering Committee' },
    { text:'RC', description: 'Results chain' },
    { text:'RF', description: 'Results Framework' },
    { text:'TOR', description: 'Terms of Reference' },
    { text:'UIF', description: 'Unemployment Insurance Fund' },
]


const DesignText = [
    {text: 'This Project will support the Government of Mongolia in achieving a more diversified export base through the provision of enhanced public sector support to the building of non-mining export sector. Export growth will be a key driver of overall economic growth, stability and poverty reduction. The Project will support easier and broader access for SMEs to export finance, knowhow, data, and competitiveness enhancement tools. '},
    { text: 'The development objective of the Project is to support Mongolian SMEs in the non-mining sectors to strengthen their export capabilities, expand access to export markets and to provide relief support for the COVID-19 recovery.' },
    { text: 'In order to achieve the PDO, the Project will provide a range of support services to the Mongolian SMEs in the non-mining sectors that are already exporting or are planning export activities. Such support services include: (i) access to export credit insurance products, to be facilitated by the Export Insurance Department of the Mongolian Re; (ii) basic training on foreign trade, and customized training on exporting specific type of goods, or exporting to specific markets, as well as policy support and other customized support; (iii) financial support under Productive Partnership Scheme to cover part of the SME’s expenses towards raising their internaztional competitiveness; iv) access to better certification services and quality management; and v) funding the Unemployment Insurance Fund contributions for eligible employees of the Beneficiaries. ' },
]

const ProjectData = [
    { one: 'Export volume', two:'Increase in export volume (by price) by the Project beneficiaries', three:'0', four:'25%' },
    { one: 'Enhancement of exporting potential', two:'Number of firms that obtain internationally-recognized quality certification following support from the Project (cumulative, disaggregated by the number of firms owned by women)', three:'0', four:'25' },
    { one: 'New exporting firms', two:'Number of firms that start exporting following participation in Project activities  (cumulative, disaggregated by the number of firms owned by women) ', three:'0', four:'30' },
    { one: 'Export credit insurance products', two:'Number of export credit insurance products developed by Mongolian Re', three:'0', four:'1' },
    { one: 'Export diversification', two:'Number of new export destinations for the Project beneficiaries', three:'0', four:'20' },
    { one: 'COVID-19 support', two:'Total unemployment insurance contribution payments made to non-mining SMEs /amount USD/', three:'0', four:'1.5ml' },
]