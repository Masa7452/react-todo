import React from "react"

export const InputTitle = (props) => {
    const {title, onChange, onClick} = props;
    return (
      <>
       <label className="float-left">Title</label>
        <div className="input-group mb-3 w-50">
          <input 
            type="text"
            className="form-control"
            placeholder="write a title"
            value= {title}
            onChange={onChange}
          />
        </div>
      </>
       
    )
}