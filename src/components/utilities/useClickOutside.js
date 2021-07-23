import { useEffect } from 'react'

export default function useClickOutside(refsArray, open, callback) {
   function handleClick(e) {
      if (open && refsArray.every(ref => !ref.current.contains(e.target))) {
         callback()
      }
   }

   useEffect(() => {
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
   })
}
