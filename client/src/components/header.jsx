import React from 'react';
import SignUp from './signup.jsx';
import Login from './login.jsx';
import User from './user.jsx';
//direct child of App


const Header = function(props) {
  return (
    <header id="header" className="container row fullw bg-main">
      <div id="leaderboard-header">
      <button onClick={props.changeView('leaderboard')}>Leader board</button>
      </div>
      <div id="logo">
        <img src="BrandonStinks.png" alt="BrandonStinks" height="90px" width="180px" />
      </div> 
        { !!props.user.username
          ? <div className="container row" id="user"><User user={props.user} logout={props.logout} view={props.view} changeView={props.changeView} /></div>
          : <div className="container row" id="user"><SignUp setUsername={props.updateUser} /> <Login setUsername={props.updateUser} /></div> } 
    </header>
  );
}

export default Header;