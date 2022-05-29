import axios from 'axios'
import React,{useState,useEffect} from 'react'

export const TodoAchhat = () => {
    const [data,setData]=useState([])

    useEffect(() => {
        loaduserData()
     
       
     }, [])
     const loaduserData=async()=>{
         let data=await axios.get(`http://localhost:8080/todos`)
         console.log(data)
    
    
    
    }










  return (
    <div>
   
    



    </div>
  )
}
