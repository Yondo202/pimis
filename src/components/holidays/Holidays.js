import React, { useState } from 'react'
import styled from "styled-components"
import 'react-calendar/dist/Calendar.css';
import 'moment/locale/mn';
import axios from "axiosbase"
import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';


const Holidays = () => {
    const [ reRender, setreRender ] = React.useState(false);
    const [ selectedDay, setSelectedDays ] = React.useState([]);
    const [ RenderDays, setRenderDays ] = React.useState([]);


    React.useEffect(()=>{
        fetchDate();
        console.log("----------------");
    },[reRender])

    const fetchDate = async () =>{
       const date = await axios.get("holidays");
       setRenderDays(date.data.data);
       let final = [];
       date.data.data.map(el=>final.push(new Date(el.days)))
       setSelectedDays(final);
    }

 const handleDayClick =(day, { selected }) => {
        const selectedDays = selectedDay.concat();
        if (selected) {
          const selectedIndex = selectedDays.findIndex(selectedDay =>
            DateUtils.isSameDay(selectedDay, day)
          );
          selectedDays.splice(selectedIndex, 1);
          console.log(`day`, new Date(day));
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
        // setSelectedDays(selectedDays);
    }

    return (
        <Container>
            <DayPicker
                selectedDays={selectedDay}
                onDayClick={handleDayClick}
                todayButton="Өнөөдөр"
                localeUtils={MomentLocaleUtils}
                locale="mn"
            />


        <div className="Title">Сонгогдсон өдөрүүд</div>
        <ul>
            {RenderDays.map((el,i)=>{
                return(
                    <li>{el.days}</li>
                )
            })}
        </ul>

        </Container>
    )
}

export default Holidays

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    .Title{
        margin-bottom:18px;
        font-weight:500;
        font-size:16px;
    }
 
    ul{
        li{
            list-style: inside;
        }
    }
`
