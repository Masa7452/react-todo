import React from "react"

export const InputTodo = (props) => {
    const {todoText, onChange, onClick} = props;
    return (
      <>
        <label className="float-left">To Do</label>
          <div className="input-group mb-3 w-50">
            <input 
              type="text"
              className="form-control"
              placeholder="write a task"
              value= {todoText}
              onChange={onChange}
            />
        </div>
      </>
    )
}