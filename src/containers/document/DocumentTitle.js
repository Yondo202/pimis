import {useEffect} from 'react'

function DocumentTitle(titles) {
   useEffect(()=>{
    document.title = titles
   },[titles]);
}

export default DocumentTitle
