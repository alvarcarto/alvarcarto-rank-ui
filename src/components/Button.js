import React from 'react';

const Button = (props) => <button onClick={props.onClick} className="Button">
  {props.children}
</button>

export default Button;
