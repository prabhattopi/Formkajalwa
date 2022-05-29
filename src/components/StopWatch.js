import React,{useRef, useState} from 'react'
import "../App.css"
export const StopWatch = () => {
//    const [timer, settimer] = useState(null)
   const timer=useRef(null)
   //uses of useref id very usefull in rerender
   const [watch,setWatch]=useState(0)
   const start=()=>{
       if(!timer.current){
           let id=setInterval(()=>{
               setWatch((prev)=>prev+1)
           },100)
           timer.current=id
       }


   }
   const pause=()=>{
       clearInterval(timer.current)
     timer.current=null
   }
   const reset=()=>{
       clearInterval(timer.current)
       setWatch(0)
       timer.current=null
   }

  return (
    <div className='App'><h1>StopWatch</h1>
    <h1>{watch}</h1>
    <div>
    <button onClick={start}>Start</button>
    <button onClick={pause}>Pause</button>
    <button onClick={reset}>Reset</button>
    </div>
    
    </div>
  )
}
