import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");
    const [activeEdit,setActiveEdit] = useState(false);
    const [editTodo,setEditTodo] = useState('');
    const [activeIndex,setActiveIndex] = useState(0);
    const [newId, setNewId] = useState(0);

    function handleInputChange(e) {
      setTodo(e.target.value);
    }

    function handleFormSubmit(e) {
      e.preventDefault();
      if(todo !== '') {
        setTodos([...todos,{text: todo, status: "incomplete", id:newId}])
        setNewId(newId +1)
        setTodo('')
      }
    }

    function handleEditSubmit(e){
      e.preventDefault();
      if(editTodo !== '') {
        setTodos(todos.map((todo, index)=>{
          if(index === activeIndex){
            return {text: editTodo, status: todo.status}
          }
          return todo
        }))
        setActiveEdit(false)
      }
    }

    function handleEditInputChange(e) {
      setEditTodo(e.target.value);
    }

    function changeStatus(e, index) {
      let newTodos = [...todos];
      newTodos[index] = {text: newTodos[index].text, status: e.target.value};
      setTodos(newTodos)
    }

    function handleEdit (todo,index) {
      setEditTodo(todo)
      setActiveEdit(true)
      setActiveIndex(index)
    }


    function handleDelete (index) {
      setTodos(todos.filter((_todo,indexTodos) => {
        return indexTodos !== index
      }))
    }

    useEffect(() => {
      console.log(todos)
    }, [todos])
    
  
    return (
    <div className="App">
        <h1>Todo List</h1>

        {!activeEdit &&
        <form onSubmit={handleFormSubmit}>
            <input name='todo' type='text' placeholder='Todoを入力' value={todo} onChange={handleInputChange} style={{margin: "2px"}} />
            <input name='submit' type='submit' value='追加' />
        </form>
        }
        {activeEdit &&
        <form onSubmit={handleEditSubmit}>
        <input name='editTodo' type='text' value={editTodo} onChange={handleEditInputChange} />
        <input name='submitEdit' type='submit' value='更新' />
        </form>
        }

    <ul className='todo-list'>
        {todos.map((todo,index) => (
            <li key={todo.id}><span className='todo-text'>{todo.text}</span>
            <select name="status" value={todo.status} onChange={(event) => changeStatus(event,index)}>
              <option value="incomplete">未着手</option>
              <option value="now">着手</option>
              <option value="completed">完了</option>
            </select>
            <button onClick={() => handleEdit(todo.text,index)}>編集</button>
            <button onClick={() => handleDelete(index)}>削除</button>
            </li>
        ))}
    </ul>
    </div>
  );
}
