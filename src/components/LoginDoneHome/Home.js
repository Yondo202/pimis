import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { ColorRgb } from '../theme'
import axios, { edplan } from 'axiosbase';
import AccessToken from 'context/accessToken'
import ActiveComp from './ActiveComp'
// import InitialComp from './initialComp'
import useQuery from 'components/utilities/useQueryLocation'
import { useHistory } from 'react-router-dom';
// import Start from "components/LoginDoneHome/Start"

function Home() {
    const userId = useQuery().get('userId')
    const projectId = useQuery().get('projectId');
    const [infData, setInfData] = useState(null);
    const [ edPlan, setEdPlan ] = useState(0);
    const [ edPlanFinal, setEdPlanFinal ] = useState(false);
    const [projects, setProjects] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
        if (userId) {
            Go();
        } else {
            GoUser();
        }
    }, []);

    const Go = () => {
         axios.get(`pps-infos/registered-companies`, {
            headers: { Authorization: AccessToken() },
            params: projectId ? { userId: userId, projectId: projectId } : { userId: userId },
        }).then((res) => {
            if (res.data.data[0]) { setInfData(res.data.data[0]) }
        })
        GetEdPlan(userId);
    }

    const GoUser = () => {
        let userID = localStorage.getItem("userId");
        axios.get(`pps-infos/registered-companies?userId=${userID}`, {
            headers: { Authorization: AccessToken() }
        }).then((res) => {
            if (res.data.data.length!==0) {
                const projects = res.data.data ?? []
                const lastIndex = (projects ?? ['']).length - 1
                setProjects(projects)
                setSelectedIndex(lastIndex)
                const projectId = projects[lastIndex].project?.id
                setInfData(projects[lastIndex])
                projectId && history.push({
                    pathname: '/',
                    search: `?projectId=${projectId}`
                })
            } 
        })
        GetEdPlan(userID);
    }

    const GetEdPlan = (userIDs)=>{
        edplan.get(`totals?idd=${userIDs}`).then(res=>{
            if(res.data.length!==0){
                const keys = Object.keys(res.data[0]);
                setEdPlan(parseInt(((keys.length-7) * 100)/24));
                setEdPlanFinal(res.data[0]?.firstpage===true)
            }
        })
    }

    const history = useHistory()

    const handleSelect = (index) => {
        setSelectedIndex(index)
        const projectId = projects[index].project.id
        history.push({
            pathname: '/',
            search: `?projectId=${projectId}`
        })
        setInfData(projects[index])
    }

    const DeleteCriteria = () =>{
        axios.delete(`criterias/${userId}`, { headers: { Authorization: AccessToken() } }).then(_=>{
            history.goBack();
        })
    }


    return (
        <HomeComponent style={userId ? { maxWidth: "2000px" } : { maxWidth: "1160px" }} className={`container`}>
            {
                // !infCond ? 
                infData?.criteria === 1
                    ?
                    <FinalTextParent>
                        <h3 className="text">
                            ???????? ?????????????????? ?????????????? ?????????? ?????????????????????? ?????????????????? ???????????? ?????????????? ???????????????????? ?????????????????? ???????????? ???????????????? ???? ?????????? ?????????????? ???????????????????? ?????????????????? ??????????.
                        </h3>
                        {userId&&<div className="delete">
                            <div className="buttons" onClick={DeleteCriteria} >????????????</div> 
                        </div>}
                    </FinalTextParent>
                   
                    : <div
                    //  className={homeC?"":`Hiding`}
                    >
                        <div className="headerPar">
                            {userId
                                ? <div className="header row">
                                    <div className="col-md-4"><div className="headItems"><span className="text"><span className="titlee">???????????????????????? ??????:</span>{infData?.companyname}</span> </div></div>
                                    <div className="col-md-4"><div className="headItems"><span className="text"><span className="titlee">?????????????? ??????:</span>{infData?.project?.project_name}</span>  </div></div>
                                    <div className="col-md-4"><div className="headItems"><span className="text"><span className="titlee">???????????????????????? ??????????????:</span>{infData?.companyregister}</span> </div></div>
                                </div>
                                : <div className="header row">
                                    <div className="col-md-4"><div className="headItems"><span className="text">1. ?????????????????? ????????????????</span> </div></div>
                                    <div className="col-md-4"><div className="headItems"><span className="text">2. ??????????????, ?????????????? ???????????? ??????</span> </div></div>
                                    <div className="col-md-4"><div className="headItems"><span className="text">3. ??????????, ??????????????????, ????????????????????</span></div></div>
                                </div>
                            }
                            {!userId &&
                                <div className="otherHead row">
                                    {/* tosol heregjuuleh negjiin unelgee */}
                                    <div className="col-md-4">
                                        <div className="headItems">
                                            <span className="text">1-?? ??????</span><span className="text">2-?? ??????</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="headItems">
                                            <span className="text">?????????? ?????????????????????? ?????????????? ??????????????</span><span className="text"> ???????????? ???????????????????????????? ???????????? ???????????? ??????????????</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        {projects?.length > 1
                                            ? <div className="tw-grid tw-grid-cols-1 tw-gap-y-1 tw-place-items-start">
                                                <div className="tw-font-medium">
                                                    ???????????????????? ?????????? ?????????????????? ?????????????????? ?????????? ????????????:
                                                </div>
                                                <select className="focus:tw-outline-none tw-bg-transparent tw-pr-1 tw-font-medium" value={selectedIndex} onChange={e => handleSelect(e.target.value)}>
                                                    {projects.map((project, i) =>
                                                        <option className="tw-p-2 tw-font-normal" value={i} key={i}>
                                                            {project.project?.project_number} ({project.project?.project_type_name})
                                                        </option>
                                                    )}
                                                </select>
                                            </div>
                                            : <div className="">
                                                <div className="headItems">
                                                    <span className="text">???????????????????? ??????????</span>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                        {/* {infData === null ? <InitialComp prew={userId} /> : <ActiveComp prew={userId} data={infData} />} */}
                        <ActiveComp userId={userId} data={infData} edPlan={edPlan} edPlanFinal={edPlanFinal} />
                    </div>
                // :<Start userId={userId} />
            }
        </HomeComponent>
    )
}

export default Home

const FinalTextParent = styled.div`
    margin-top:50px;
    .delete{
        margin-top:30px;
        display:flex;
        justify-content:end;
        .buttons{
            font-weight:500;
            font-size:13px;
            border-radius:6px;
            cursor:pointer;
            padding:6px 30px;
            border:1px solid rgba #fff;
            color:#fff;
            background-color:#dc3545;
            &:hover{
               opacity:0.9;
            }
        }
    }
`

const animate2 = keyframes`
    0% { margin-top:-15px; opacity:0; }
    100% { margin-top:0px; opacity:1;  }
`
const animate3 = keyframes`
    0% { transform:scale(0); opacity:0; }
    60% { transform:scale(0.56); opacity:0; }
    100% { transform:scale(1); opacity:1;  }
`
const animate4 = keyframes`
    0% { height:0%; }
    100% { height:100%; }
`
const animate5 = keyframes`
    0% { height:0vh; }
    100% { height:6vh; }
`
const HomeComponent = styled.div`
    max-width:1160px;
    text-align:center;
    font-size:13px;
    a{
        text-decoration:none;
    }
    .itemsCol{
        border-right:1px solid rgba(0,0,0,0.3);
        border-right-style:dashed;
        .itemsPar{
            height:70vh;
            width:100%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:space-between;
            margin-top:30px;
            .mains{
                width:100%;
                display:flex;
                flex-direction:column;
                align-items:center;
                .items{
                    animation: ${animate2} 1.2s ease;
                    width:93%;
                    border-radius:4px;
                    padding:7px 7px;
                    border:1px solid rgba(0,0,0,0.2);
                    color:rgba(0,0,0,0.5);
                    position:relative;
                    &::before{
                        content:"-";
                        position:absolute;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        z-index:1;
                        bottom:-7px;
                        right:-1%;
                        border:1px solid #C1C1C1;
                        background-color:white;
                        color:#C1C1C1;
                        width:18px;
                        height:18px;
                        border-radius:50%;
                    }
                }
                .itemsActive{
                    // margin-top:-10px;
                    font-weight:500;
                    width:93%;
                    border-radius:4px;
                    padding:7px 7px;
                    // border:1px solid rgba(0,0,0,0.6);
                    color:rgba(0,0,0,1);
                    position:relative;
                    background-color:#89E673;
                    animation: ${animate2} 1.2s ease;
                    &::before{
                        content:"???";
                        position:absolute;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        z-index:1;
                        bottom:-7px;
                        right:-1%;
                        border:1px solid green;
                        background-color:white;
                        color:green;
                        width:18px;
                        height:18px;
                        border-radius:50%;
                    }
                }
                .itemsNotApproved{
                    border:1px solid rgba(255,0,0,0.6);
                    &::before{
                        border:1px solid rgba(255,0,0,0.6);
                    }
                }
                .itemsNotWait{
                    border:1px solid rgba(0,255,0,0.6);
                        &::before{
                            border:1px solid rgba(0,255,0,0.6);
                        }
                }
                .line{
                    position:relative;
                    animation: ${animate5} 1s ease;
                    height:4em;
                    width:1.2px;
                    background-color:#C1C1C1;
                    &::after{
                        content:"";
                        bottom:-2px;
                        left:-480%;
                        position:absolute;
                        height:12px;
                        width:12px;
                        background-color:#C1C1C1;
                        clip-path: polygon(53% 31%, 100% 0, 50% 100%, 0 0);
                    }
                }
                .line2{
                    background-color:#535352;
                    &::after{
                        background-color:#535352;
                    }
                }
            }
            .lineFull{
                position:relative;
                animation: ${animate4} 1s ease;
                height:80%;
                width:1.2px;
                background-color:#C1C1C1;
                &::after{
                    content:"";
                    bottom:-2px;
                    left:-480%;
                    position:absolute;
                    height:12px;
                    width:12px;
                    background-color:#C1C1C1;
                    clip-path: polygon(53% 31%, 100% 0, 50% 100%, 0 0);
                }
            }
            .lineFull2{
                background-color:#535352;
                &::after{
                    background-color:#535352;
                }
            }
            .resultDesable{
                height:92px;
                display:flex;
                width:93%;
                border-radius:4px;
                padding:7px 7px;
                border:1px solid rgba(0,0,0,0.2);
                color:rgba(0,0,0,0.5);
                position:relative;
                animation: ${animate3} 1.2s ease;
                &::before{
                    content:"-";
                    position:absolute;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    z-index:1;
                    top:-9px;
                    right:5%;
                    border:1px solid #C1C1C1;
                    background-color:white;
                    color:#C1C1C1;
                    width:18px;
                    height:18px;
                    border-radius:50%;
                }
            }
            .resultActive{
                height:92px;
                display:flex;
                width:93%;
                border-radius:4px;
                padding:7px 7px;
                border:1px solid rgba(0,0,0,0.2);
                color:black;
                position:relative;
                background-color:#89E673;
                font-weight:500;
                background-color:#89E673;
                animation: ${animate3} 1.2s ease;
                &::before{
                    content:"???";
                    position:absolute;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    z-index:1;
                    top:-9px;
                    right:5%;
                    border:1px solid green;
                    background-color:white;
                    color:green;
                    width:18px;
                    height:18px;
                    border-radius:50%;
                }
            }
            .resultWaiting{
                height:92px;
                display:flex;
                width:93%;
                border-radius:4px;
                padding:7px 7px;
                border:1px solid rgba(255,0,0,1);
                color:black;
                position:relative;
                background-color:#F7FF48;
                &::before{
                    content:"X";
                    position:absolute;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    z-index:1;
                    top:-9px;
                    right:5%;
                    border:1px solid #F8FF5D;
                    background-color:white;
                    color:black;
                    width:18px;
                    height:18px;
                    border-radius:50%;
                }
            }
            .arrHelp{
                position:relative;
            }
            .arrHelpActive{
                &::after{
                    content:"";
                    position:absolute;
                    z-index:1;
                    top:-46px;
                    left:-22px;
                    height:45px;
                    width:96px;
                    border-right:1px solid #535352; 
                    border-top:1px solid #535352;
                    border-left:1px solid #535352;
                    border-radius: 90px 90px 0 0;
                }
                .helpArr{
                    z-index:333;
                    top:-12px;
                    left:67px;
                    position:absolute;
                    height:12px;
                    width:12px;
                    background-color:#535352;
                    clip-path: polygon(53% 31%, 100% 0, 50% 100%, 0 0)
                }
            }
        }
    }
    .ActiveCol{
        &:before{
            content:"";
            right:0;
            top:4%;
            width:1px;
            height:96%;
            background-color:#535352;
            position:absolute;
            
        }
    }
    .itemsColA{
        &::before{
            display:none;
        }
        .resultDesable{
            &::after{
                display:none;
            }
        }
    }
    .headerPar{
        margin-top:1px;
        .header{
            background-color: rgba(${ColorRgb},1);
            .headItems{
                display:flex;
                align-items:center;
                justify-content:center;
                // height:70px;
                padding-bottom:10px;
                padding-top: 10px;
                padding-right:15px;
                padding-left:15px;
                .text{
                    border-radius:6px;
                    font-weight:500;
                    text-align:center;
                    width:100%;
                    background-color:rgba(255,255,102,0.9);
                    padding:4px 8px;
                    .titlee{
                        font-weight:400;
                        margin-right:15px;
                    }
                }
            }
            .headItems2{
                display:flex;
                align-items:center;
                justify-content:center;
                padding:15px 0px;
                .text2{
                    border-radius:6px;
                    font-weight:500;
                    text-align:center;
                    width:70%;
                    background-color:rgba(255,255,102,0.9);
                    padding:4px 8px;
                }
            }
        }
        .otherHead{
            padding:3px 0px;
            font-size:12px;
            border-bottom:1px solid rgba(0,0,0,.2);
            border-style:dashed;
            display:flex;
            align-items:center;
            .headItems{
               margin-right:-15px;
               display:flex;
               align-items:center;
               justify-content:space-between;
                span{
                    height:100%;
                    padding-right:15px;
                    border-right:1px solid rgba(0,0,0,0.1);
                    width:48%;
                    font-weight:500;
                    font-size:13px;
                }
            }
        }
    }
    @media only screen and (max-width:786px){
        .itemsCol{
            .itemsPar{
                .resultDesable{
                    &::after{
                        display:none;
                    }
                }
                .arrHelp{
                    &::after{
                        display:none;
                    }
                }
            } 
        } 
    }
    .Hiding{
        transition:all 0.4s ease;
        transform:scale(0.8);
        opacity:0;
    }    
`
