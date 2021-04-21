import React from 'react'


function add_business_days(days) {
    var today = new Date();
    var now = new Date();
    var dayOfTheWeek = now.getDay();

    var calendarDays = days;
    var deliveryDay = dayOfTheWeek + days;

    if (deliveryDay >= 6) {
      //deduct this-week days
      days -= 6 - dayOfTheWeek;
      //count this coming weekend
       calendarDays += 2;
      //how many whole weeks?
       var deliveryWeeks = Math.floor(days / 5);
      //two days per weekend per week
      calendarDays += deliveryWeeks * 2;
    }

    now.setTime(now.getTime() + calendarDays * 24 * 60 * 60 * 1000);

    return now;
}




function getDaysArray(start, end) {
    // let datess = endss.setDate(endss.getDate()+3);

    for( var arr = [], dt=new Date(start); dt<=end;  dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt))
    }

    let arrMy = []

    let final = []

    let test = start.setDate(start.getDate()+2);
    arrMy.push(test);


    console.log(`myArr`, arrMy);

    arr.map((el,i)=>{
        arrMy.map(elem=>{
            if( new Date(el)  !== new Date(elem) ){
                final.push(el);
            }
        })
    });



    return final;
};



const Test = () =>{
    React.useEffect(()=>{
        const AfterDay = add_business_days(9);


        const final = getDaysArray(new Date(), AfterDay);

        console.log(`final`, final);
    },[])

    return(
        <div>
            <h1>alallalal</h1>
        </div>
    )
}

export default Test