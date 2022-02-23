import Button from 'react-bootstrap/Button';
import React, { useState } from "react";



export const ToDoArea = (props) => {
    const {id, key, title, description, onClickDelete} = props;
        return (
            <div className="card w-50 my-1">
              <div className="card-body">
                  <h5 className="card-title">タイトル：{title}</h5>
                  <p>{description}</p>
                  <div className="text-end">
                    <Button onClick={() => onClickDelete(key, id)} variant="success">Delete</Button>
                  </div>
              </div>
            </div>
        )
}