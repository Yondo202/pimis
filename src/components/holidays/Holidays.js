import React, { useState } from 'react'
import styled, { keyframes } from "styled-components"
import 'react-calendar/dist/Calendar.css';
import 'moment/locale/mn';
import axios from "axiosbase"
import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';


const disabledDays = { daysOfWeek: [0, 6],};

const Holidays = () => {
    const [ reRender, setreRender ] = React.useState(false);
    const [ selectedDay, setSelectedDays ] = React.useState([]);
    const [ RenderDays, setRenderDays ] = React.useState([]);

    React.useEffect(()=>{
        fetchDate();
    },[reRender])

    const fetchDate = async () =>{
       const date = await axios.get("holidays");
       setRenderDays(date.data.data);
       let final = [];
       date.data.data.map(el=>final.push(new Date(el.days)))
       setSelectedDays(final);
    }

 const handleDayClick =(day, modifiers = {}) => {
        if(!modifiers.disabled){
             const selectedDays = selectedDay.concat();
            if (modifiers.selected) {
                const selectedIndex = selectedDays.findIndex(selectedDay =>
                  DateUtils.isSameDay(selectedDay, day)
                );
                selectedDays.splice(selectedIndex, 1);
                const formated =`${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`
                axios.delete(`holidays/${formated}`).then(res=>{
                  setSelectedDays(selectedDays); setreRender(prev=>!prev);
                })
              } else {
                selectedDays.push(day);
                 axios.post("holidays", { days: day}).then(res=>{
                       setSelectedDays(selectedDays); setreRender(prev=>!prev);
                  })
            }
        }
    }

    

    return (
        <Container>
            <div className="bigTitle">
                Амралтын өдөрүүд сонгох
            </div>

        <div className="contentPar">
            <DayPicker
                selectedDays={selectedDay}
                disabledDays={disabledDays}
                onDayClick={handleDayClick}
                todayButton="Өнөөдөр"
                localeUtils={MomentLocaleUtils}
                locale="mn"
            />
            <div className="daysList">
                <div className="Title">Сонгогдсон өдөрүүд</div>
                <ul>
                    {RenderDays.map((el,i)=>{
                        return(
                            <li>{el.days}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
            
        

        </Container>
    )
}

export default Holidays

const animateBig = keyframes`
    0% { transform:translateY(60px); opacity:0; }
    100% { transform:translateY(0px); opacity:1; }
`

const animationList = keyframes`
    0% { opacity:0; transform:scale(0); color:black; }
    50% { opacity:0.8; transform:scale(1.4); color:green; }
    100% { opacity:1; transform:scale(1); color:black; }
`

const Container = styled.div`
    .bigTitle{
        font-weight: 500;
        font-size: 20px;
        padding-bottom:10px;
        margin-bottom: 15px;
        border-bottom:1px solid rgba(0,0,0,0.2);
    }
    .contentPar{
        animation: ${animateBig} 0.9s ease;
        width:100%;
        justify-content:start;
        display:flex;
        
        .DayPicker{
            font-size: 0.9rem;
            box-shadow:1px 1px 16px -8px;
            border-radius:6px;
            .DayPicker-wrapper{
                .DayPicker-Months{
                    .DayPicker-Month{
                        width:23rem;
                        height:19rem;
                    }
                }
                .DayPicker-Footer{
                    text-align:center;
                }
            }
            
        }
        .daysList{
            margin-left:60px;
            .Title{
                margin-bottom:18px;
                font-weight:500;
                font-size:16px;
            }
            ul{
                li{
                    animation: ${animationList} 0.6s ease;
                    padding:3px 0px;
                    font-size:14px;
                    list-style: inside;
                }
            }
        }
    }

    
   
`
