import './App.css';
import Button from 'react-bootstrap/Button';
import {InputTodo} from "./components/InputToDo";
import React, { useState } from "react";
import { ToDoArea } from './components/ToDoArea';
import { InputTitle } from './components/InputTitle';


function App() {
  const [todoText, setTodoText] = useState("");
  const [title, setTitle] = useState("");
  const [todos, setToDos] = useState([
      {"title":"React学習", "content":"Udey第1章完了"}
      , {"title":"運動", "content":"会社まで走って通勤"}
    ]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onChangeTitle = (event) => setTitle(event.target.value);

  const onChangeCreate = () => {
    if(todoText == "" || title == ""){
      alert("タイトルとToDoを両方入力してください。");
      return ;
    }
    if(todos.length === 5){
      alert("登録できるToDoは5つまでです。増やしすぎは良くないよ！");
      return;
    }
    const newToDo = {"title":title, "content":todoText}
    console.log(todoText)
    // const newToDo = {}
    const newToDoList = [...todos, newToDo];
    setToDos(newToDoList);
  }
  const onClickDelete = (toDoNum) => {
    const newToDos = [...todos];
    newToDos.splice(toDoNum, 1);
    setToDos(newToDos);

  }

  return (
    <div className="container mt-5">
      <InputTitle
        title={title}
        onChange={onChangeTitle}
        onClick={onChangeCreate}
      />
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onChangeCreate}
      />
      <div className="w-50 text-end my-3">
        <Button onClick={onChangeCreate} variant="primary">Create</Button>
      </div>
      {todos.map((row, index) => {
        return (
          <ToDoArea
            key={index}
            title={row.title}
            content={row.content}
            toDoNum={index}
            onClickDelete={onClickDelete}
          />
        )
        
      })}
    </div>
  );
}

export default App;
