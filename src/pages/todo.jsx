import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import axios from "axios";
import TodoItem from "../component/TodoItem";
import { axiosInstance } from "../configs/api";

function TodoPage() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("")

  const inputHandler = (event) => {
      const { value } = event.target

      setInputValue(value)
  }

  const fetchTodo = async () => {
    try {
      const res = await axiosInstance.get("/todos");

      setTodo(res.data.result);
    } catch (err) {
      console.log(err?.data?.message || err.message);
    }
  };

  const addTodoItem = async () => {
    const newData = {
        action: inputValue,
        isDone: false,
    }

    axiosInstance.post("/todos", newData)
    .then(() =>{
        fetchTodo()
    })
  }

  const toggleTodoStatus = (id) => {
      const dataToFind = todo.find((val) => {
          return val.id === id
      })

      axiosInstance.patch(`/todos/${id}`, {
          isDone: !dataToFind.isDone,
      })
      .then(() => {
          fetchTodo()
      })
  }

  const deleteTodoItem = async (id) => {
     await axiosInstance.delete(`/todos/${id}`)
     fetchTodo()
  }

  const renderTodoList = () => {
    return todo.map((val) => {
      return (
        <TodoItem
          date={val.date}
          action={val.action}
          isDone={val.isDone}
          deleteItem={() => deleteTodoItem(val.id)}
          toggleStatus={() => toggleTodoStatus(val.id)}
        />
      );
    });
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <div className="container">
      <div className="row my-3">
        <div className="offset-3 col-5">
          <Input name="todoInput" onChange={inputHandler}/>
          {/* <Input name="dateInput" type="date" onChange={inputHandler}/> */}
        </div>
        <div className="col-2">
          <Button color="success" onClick={addTodoItem}>Add Todo</Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3">
         {renderTodoList()}
        </div>
      </div>
    </div>
  );
}

export default TodoPage;