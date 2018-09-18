import React from 'react';
import classnames from "classnames";

const TextFieldGroup = (props) => {
	const {name, placeholder, value, label, error, info, type, onChange, disabled} = props;

  return (
    <div className="form-group">
      <input
      	name={name}
      	type={type} 
      	value={value}
      	onChange={onChange}
      	placeholder={placeholder}
      	disabled={disabled}
      	className={classnames("form-control form-control-lg", {
      		"is-invalid": error
      	})}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.defaultProps = {
	type: "text"
}

export default TextFieldGroup;