import React from 'react'
import styled from 'styled-components'


const LangSwitch = ({ language, handleChange } ) => {
    return (
        <LangSwitchStyle>
            {language==="en"?<div><img src="/us.png" /></div>:<div><img src="/mn.png" /></div>}
            <select value={language} onChange={handleChange}>
                <option value="en"> English</option>
                <option value="mn"> Монгол</option>
            </select>
        </LangSwitchStyle>
    )
}

export default LangSwitch



export const LangSwitchStyle = styled.div`
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
