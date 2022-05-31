import React,{useState} from 'react'
import './Structure.css'

export const FormList = ({todo,getto}) => {

  // const [preview, setPreview] = useState(null)
  // const reader=new FileReader()
  // reader.readAsDataURL(todo.resume)
  // reader.onload=()=>{
  //   setPreview(reader.result)
  // }
  return (
   <tr>
       <td> <img src={todo.resume} alt="" /></td>
       <td className="Name">{todo.username}</td>
       <td className="age">{todo.age}</td>
       <td className="adress">{todo.address}</td>
       <td>{todo.salary}</td>
       <td>{todo.department}</td>
         {todo. maratialStatus?<td>Double</td>:<td>Single</td>}
         <td><button onClick={()=>getto(todo.id)}>Delete</button></td>
     
   </tr>
  )
}
