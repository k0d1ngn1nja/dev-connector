import React from 'react';
import classnames from "classnames";

const TextAreaField = (props) => {
	const {name, placeholder, value, error, info, onChange} = props;

  return (
    <div className="form-group">
      <textarea
      	name={name} 
      	value={value}
      	onChange={onChange}
      	placeholder={placeholder}
      	className={classnames("form-control form-control-lg", {
      		"is-invalid": error
      	})}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TextAreaField;