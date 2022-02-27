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
    console.log(todoList);
    setToDos(todoList)
  }

  async function createTodo() {
    try {
      if (formState.name == "" || formState.description == ""){
        alert("タイトルとToDoを両方入力してください。");
        return;
      }
      if(todos.length === 5){
        alert("登録できるToDoは5つまでです。");
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