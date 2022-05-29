import React,{useState,useEffect} from 'react'

import "../App.css"

export const Timer = ({start,endpoint}) => {
    const [timer, settimer] = useState(start)
    //return use for cleaning
   useEffect(() => {
    
     let id=setInterval(()=>{
        
      
           
         settimer((timer)=>{
            if(timer<endpoint){
             return timer+1}
             else{
                 settimer(endpoint)
                 return
             }})
             
       
    
     },1000)
    
     return () => {
       clearInterval(id)
     }
   }, [])
   
  return (
    <div className='App'>
    <h1>Count Down : {timer}</h1>
    </div>
  )
}
