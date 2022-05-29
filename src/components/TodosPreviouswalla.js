import React, { useState, useEffect } from "react";

export const TodosPreviouswalla = () => {
  //Url Is wrong then its throw some error
  const [newTodo, setNewTodo] = useState("")
  const [todos, setTodos] = useState([]);

  const saveInfo=()=>{
      //Call this api to store information in json
      fetch("http://localhost:8080/todos",{
          method:"POST",
          headers:{
              "content-type":"application/json"
          },
          body:JSON.stringify({
            value:newTodo,
              isCompleted:false,
          }),
      })
      .then(r=>r.json())
      .then((data)=>{
          setTodos([...todos,data])
          setNewTodo("")
      })
  }

  useEffect(() => {
    fetch("http://localhost:8080/todos")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setTodos(data);
      });
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      <div>
      <div><input value={newTodo} onChange={({target})=>setNewTodo(target.value)} type="text" />
      <button onClick={saveInfo}>+</button>
      </div>
      {todos.map(e=>(<div key={e.id}>{e.value}</div>))}
      </div>
    </div>
  );
};
