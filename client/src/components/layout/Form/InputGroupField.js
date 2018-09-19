import React from 'react';
import classnames from "classnames";

const InputGroupField = (props) => {
	const {name, placeholder, value, error, onChange, icon} = props;

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon}></i>
        </span>
      </div>
      <input
      	name={name} 
      	value={value}
      	onChange={onChange}
      	placeholder={placeholder}
      	className={classnames("form-control form-control-lg", {
      		"is-invalid": error
      	})}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroupField.defaultProps = {
  type: "text"
}

export default InputGroupField;