export const NumberComma = (el) => {
    if(el){
        const arr = [el]
        let commas 
        if(arr.includes('.')){
            commas = parseFloat(el).toFixed(2)
        }else{
            commas = parseFloat(el);
        }
        let final = commas.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return final
    }else{
        return ''
    }
}

export const NumberComma2 = (el) => {
    if(el){
        const num = el;
        var commas = num.toLocaleString("en-US");
        var commas = parseFloat(commas)
        return commas
    }else{
        return 0
    }
}