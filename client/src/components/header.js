import React from "react";
import {
    BrowserRouter as Router,
    Link
  } from 'react-router-dom';

 const Header = ({ auth }) => {

  var renderContent = () => {
    switch (Boolean(auth)) {
      case null:
        return;
      case false:
        return (
        <ul key={0} className="right">
          <li key={1}>
            <a className="pulse" href="/auth/google">Login</a>
          </li>
        </ul>
        );
      default:
        return [
        <ul key={0} className="right">
            <li key={1}>
                <a href="/posts">Posts</a>
            </li>
            {/* <li key={1}>
                <a href="/promos">Promos</a>
            </li> */}
            <li key={2}>
                <a>Hello {auth.name.givenName} !</a>
            </li>
            <li key={3}>
                <a href="/api/logout">Logout</a>
            </li>
        </ul>
        ];
    }
  }

  return (
    <header className="App-header">
      <nav>
        <Router>
          <div className="nav-wrapper">
              <div className="row">
                <div className="col s4">
                <Link
                  to={auth ? "/" : "/"}
                  className="left-align left brand-logo"
                  >
                  Welcome to VuePress
                </Link>
                </div>
                <div className="col s8">                
                  {renderContent()}
                </div>
              </div>
          </div>
        </Router>
      </nav>
    </header>
  );
};
export default Header;
