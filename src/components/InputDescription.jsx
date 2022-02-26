import React from "react"

export const InputDescription= (props) => {
    const {description, onChange} = props;
    return (
      <>
        <label className="float-left">Description</label>
          <div className="input-group mb-3 w-50">
            <input 
              type="text"
              className="form-control"
              placeholder="write a description"
              value= {description}
              onChange={onChange}
            />
        </div>
      </>
    )
}