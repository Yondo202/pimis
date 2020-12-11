import React from 'react'

function PasswordIndicator({validity: {minChar,number,specialChar}}) {
    return (
        <div className="passIndPar">
            <ul>
                <PasswordStrengthIndicatorItem isValid={minChar} text="Нийт үсгийн тоо 8аас дээш" />
                <PasswordStrengthIndicatorItem isValid={number} text="Доод тал нь 1 ширхэг тоо байх" />
                <PasswordStrengthIndicatorItem isValid={specialChar} text="Доод тал нь 1 ширхэг тэмдэгт байх" />
            </ul>
        </div>
    )
}

const PasswordStrengthIndicatorItem = ({isValid, text})=>{
    const hightlightClass = isValid ? "text-success" : isValid !== null ? "text-danger" : ""
        return <li className={hightlightClass} >{text}</li>
}

export default PasswordIndicator
