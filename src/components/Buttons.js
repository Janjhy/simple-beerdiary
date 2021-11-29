import React from 'react';
import './Button.css';

//Interface to
const Buttons = (props) => {
  let {login, logout, user} = props;
  return (
      <div>
    {
      user
          ? <button className="Custom-Button" onClick={logout}>Logout</button>
          : <button className="Custom-Button" onClick={login}>Login</button>
    }
  </div>)

}

export default Buttons;
