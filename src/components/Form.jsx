

import axios from 'axios'
import React,{useState,useEffect, useRef} from 'react'
import { FormList } from './FormList'
import './th.css'

import styles from './Form.module.css'





export const Form = () => {
    const [limit, setLimit] = useState(5)
    const [page,setPage]=useState(1)
    const [totalCount,setTotalCount]=useState(0)
    const [form, setForm] = useState({
        username:'',
        address:"",
         salary:"",
        age:0,
        maratialStatus:false,
        maratialStatus2:false,
        department:"",
        resume:""
    })
    const [todos, setTodos] = useState([])

    useEffect(() => {
        
        Tbho();
        
       },[page,limit])
   
 const Tbho=async()=>{
  let r=await axios.get(`http://localhost:8080/todos?_page=${page}&_limit=${limit}`)
  setTodos(r.data)
  setTotalCount(Number(r.headers["x-total-count"]))
  
 }



    const ref=useRef();
    const passRef=useRef()
    const HandleonChange=(e)=>{
       
        let {type,name,value,checked,files}=e.target;
        // console.log(files[0])
        if(type==="checkbox"){
            setForm({
                ...form,
                [name]:checked,
            })
        }
        else if(type=="file"){
       
            setForm({
                ...form,
                [name]:files[0].name
            })
           
        }
        else{
            setForm({
                ...form,
                [name]:value,
            })
        }
        
         
      
    }
    useEffect(() => {
    //   console.log(form)
    
    
     
    }, [form])
    

    const HandleonSubit=async(e)=>{
        e.preventDefault()
      
      await axios.post(`http://localhost:8080/todos`,{
      
            username:form.username,
        address:form.address,
        salary:form.salary,
        age:form.age,
        maratialStatus:form.maratialStatus,
        maratialStatus:form.maratialStatus2,
        department:form.department,
        resume:form.resume
      
      })
      let r=await axios.get(`http://localhost:8080/todos?_page=${page}&_limit=${limit}`)
       setTodos(r.data)
       setTotalCount(Number(r.headers["x-total-count"]))
    //    console.log(form.resume);
    //    let url=`https://api.imgur.com/3/image`
    //    const formData=new FormData()
    //    formData.append("resume",form.resume,form.resume.name)
    //    console.log(form.resume)
    //    console.log(form.resume.name)
    //    let res=await axios.post(url,formData)
    //     console.log(res)


    

    
     

       
        if(!form.username){ref.current.focus()}
        else if(!form.password){passRef.current.focus()}
        
    }
    
    
    const getto=async (id)=>{
        let r=await axios.delete(`http://localhost:8080/todos/${id}?_page=${page}&_limit=${limit}`)
        Tbho()
    

      
      }




  return (
    <div>
         <button disabled={page <=1} onClick={
         ()=>{
        
             setPage(page-1);
         
         }
       }>{' '} {"<"}{' '}</button>
       <select name="" id="" onChange={(e)=>setLimit(Number(e.target.value))}>
         <option value="5">5</option>
         <option value="2">2</option>
         <option value="10">10</option>
       </select>
       <button disabled={totalCount<page*limit} onClick={()=>setPage(page+1)}>{">"}</button>
     <h1>FORM</h1>
        <form onSubmit={ HandleonSubit}>
            <div>
                <label >Name:</label>
                <input type="text" ref={ref} placeholder='Enter Your Name..' name="username" value={form.username} onChange={HandleonChange}/>
            </div>
            <div>
                <label >Address</label>
                <input type="text" placeholder='Enter Your Address' name="address" value={form.address} onChange={HandleonChange}/>
            </div>
            <div>
                <label >Salary:</label>
                <input  type="number" placeholder='Enter Your Salary' name="salary"  value={form.salary} onChange={HandleonChange}/>
            </div>
            <div>
                <label >Age</label>
                <input type="number" placeholder='Enter Your Age' name="age" value={form.age} onChange={HandleonChange} />
            </div>

            {/* <div>
                <label >Gender</label>
            <select name="selectGender"value={form.selectgender}
                onChange={HandleonChange}>
                    {form.selectgender || <option value=''></option>}
                    <option value="male">Male</option>
                    <option value="female">Female</option>
              
            </select>
             </div> */}
            <div>
                <label htmlFor="">Department</label>
                <select name="department" id="" value={form.department} onChange={HandleonChange}>
                {form.selectgender || <option value=''></option>}
                    <option value="ComputerScience">Computer Sceince</option>
                    <option value="backend">Backend Developer</option>
                    <option value="Frontend">FrontEnd Developer</option>
                  
                </select>
            </div>
           
            <div>
               <label>Maratial Status</label>
                <input type="checkbox" checked={form.maratialStatus} name="maratialStatus" value={form.maratialStatus} onChange={HandleonChange} />
                <label >Single</label>
                <input type="checkbox" checked={form.maratialStatus2} name="maratialStatus2" value={form.maratialStatus2} onChange={HandleonChange} />
                <label >Double</label>
            </div>
          

            {/* <div>
               
                <input type="radio" value="Female" name="gender"  onChange={HandleonChange} />
                <label >Female</label>
            </div>
            <div>
               
               <input type="radio" value="Male" name="gender"  onChange={HandleonChange} />
               <label >Male</label>
           </div> */}
            <div>
               
            <label >User Resume::</label>
               
               <input type="file" accept='image/png ,image/jpg , pdf'  name="resume" checked={form.resume} onChange={HandleonChange} />
             
           </div>
            <button type='submit'>Submit</button>
        </form>
       {/* <Structure/> */}
       <table>
           
               <thead>
               <tr>
                  <th>Image</th>
                   <th>Name</th>
                   <th>Age</th>
                   <th>Address</th>
                   <th>Salary</th>
                   <th>Department</th>
                   <th>Maratial Staus</th>
                   <th>Delete</th>
               </tr>

               </thead>
           
               {
                   todos.map(e=>{

                       return (
                        <tbody>
                           <FormList todo={e} getto={getto}/>
                           </tbody>
                       )
                   })
               }
          
       </table>
    </div>
  )
}
