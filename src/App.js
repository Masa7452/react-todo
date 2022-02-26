import './App.css';
import Button from 'react-bootstrap/Button';
import {InputDescription} from "./components/InputDescription";
import { API, Auth } from 'aws-amplify';
import React, { useState, useEffect } from "react";
import { ToDoArea } from './components/ToDoArea';
import { InputTitle } from './components/InputTitle';
import { listTodos } from './graphql/queries';
import { withAuthenticator, AmplifySignOut  } from '@aws-amplify/ui-react'
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from './graphql/mutations';

const initialFormState = { title: '', description: '' }

function App() {
  const [todos, setToDos] = useState([]);
  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    fetchTodos();
  }, []);

  const setInput = (key, value) => {
    setFormState({...formState, [key]:value})
  }

  async function fetchTodos() {
    const apiData = await API.graphql({ query: listTodos });
    const todoList = apiData.data.listTodos.items
    setToDos(todoList)
  }

  async function createTodo() {
    try {
      if (formState.name == "" || formState.description == ""){
        alert("タイトルとToDoを両方入力してください。");
        return;
      }
      if(todos.length === 5){
        alert("登録できるToDoは5つまでです。増やしすぎは良くないよ！");
        return;
      }
      const newTodo = { ...formState}
      setFormState(initialFormState)
      await API.graphql({ query: createTodoMutation, variables: { input: newTodo } });

      // 保存したデータを再取得し、表示
      const apiData = await API.graphql({ query: listTodos });
      const todoList = apiData.data.listTodos.items
      setToDos(todoList)
    } catch (err) {
    }
  }

  async function deleteTodo(id) {
    try {
      const newTodos = todos.filter(todo => todo.id !== id);
      setToDos(newTodos)
      await API.graphql({ query: deleteTodoMutation, variables: { input: { id } }});
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  function signOut() {
    console.log("通過");
    Auth.signOut()
    window.location.reload()
  }

  /*　過去作成分

  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onChangeTitle = (event) => {
    setTitle(event.target.value);

  }

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
    // const newToDo = {}
    const newToDoList = [...todos, newToDo];
    setToDos(newToDoList);
  }
  const onClickDelete = (toDoNum) => {
    const newToDos = [...todos];
    newToDos.splice(toDoNum, 1);
    setToDos(newToDos);

  }

  */

  return (
    <div className="container mt-5">
      <InputTitle
        title={formState.title}
        onChange={event => setInput("title", event.target.value)}
      />
      <InputDescription
        description={formState.description}
        onChange={event => setInput("description", event.target.value)}
      />
      <div className="w-50 text-end my-3 mr-3">
        <Button onClick={createTodo} variant="primary">Create</Button>
      </div>
      <ToDoArea
        todos={todos}
        onClickDelete={deleteTodo}
      />
      <div className="w-50 text-start my-3">
        <AmplifySignOut />
      </div>
      
    </div>
  );
}

export default withAuthenticator(App);