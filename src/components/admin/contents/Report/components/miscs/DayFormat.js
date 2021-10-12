
export const DayFormat = (pickDay)=> {
    const month = (pickDay.getMonth()+1); 
    const day = pickDay.getDate();
    const Currentdate = pickDay.getFullYear() + '-' + (month.toString().length ===1?'0'+month : month) + '-' + (day.toString().length ===1?'0'+day : day);

    return Currentdate
}
