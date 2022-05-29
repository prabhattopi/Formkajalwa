
import React,{useEffect,useState } from "react";
import axios from 'axios';
import '../App.css';
import { getAllByRole } from "@testing-library/react";

export const Todo = () => {
     // console.log(1)
  //useEffect has two parameters callbackfunction and dependencies
  //unmounting Cleanup the code cleanup is must thing used
    const [page,setPage]=useState(1)
    const[todos,setTodos]=useState([])
    const [totalCount,setTotalCount]=useState(0)
    const [limit, setLimit] = useState(2)
    
       useEffect(() => {
        
        getTodo();
        
       },[page,limit])
      
       const getTodo=async ()=>{
        let r=await axios.get(`http://localhost:8080/todos?_page=${page}&_limit=${limit}`)
       setTodos(r.data)
       setTotalCount(Number(r.headers["x-total-count"]))
      
      }
         const getto=async (id)=>{
           let r=await axios.delete(`http://localhost:8080/todos/${id}?_page=${page}&_limit=${limit}`)
           getTodo()
       

         
         }
    
         

   
 

  



       return (
        <div className="App">
        <button disabled={page <=1} onClick={
         ()=>{
        
             setPage(page-1);
         
         }
       }>{' '} {"<"}{' '}</button>
       <select name="" id="" onChange={(e)=>setLimit(Number(e.target.value))}>
         <option value="2">2</option>
         <option value="5">5</option>
         <option value="10">10</option>
       </select>
       <button disabled={totalCount<page*limit} onClick={()=>setPage(page+1)}>{">"}</button>
       {todos.map((todo)=>{
         return (
         <div key={todo.id}>
           {todo.id} {`:`} {todo.value}
           <button onClick={()=>getto(todo.id)}>Delete</button>
         </div>
         )
       })}
      
      </div>
    );
}
