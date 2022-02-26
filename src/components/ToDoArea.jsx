import Button from 'react-bootstrap/Button';
import React from "react";

export const ToDoArea = (props) => {
    const {todos, onClickDelete} = props;
    console.log(todos)
    return (
      <div>
        {todos.map((row, index) => {
            return (
              <div key={index} className="card w-50 my-1">
                <div className="card-body">
                    <h4 className="card-title">{row.title}</h4>
                    <p>{row.description}</p>
                    <div className="text-end">
                      <Button onClick={() => onClickDelete(row.id)} variant="secondary">Delete</Button>
                    </div>
                </div>
              </div>
            )
        })}
      </div>
    )
}