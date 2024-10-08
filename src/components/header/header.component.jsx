import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './header.component.styles.scss'
import { auth } from "../../firebase/firebase.utils";

const Header = ({ currentUser }) => {
    return (
      <div className="header">
        <div className="logo">
          <Link to="/">Task Tracker</Link>
        </div>
        <div className="auth-buttons">
          {currentUser ? (
            <div className="auth-button" onClick={() => auth.signOut()}>
              Sign Out
            </div>
          ) : (
            <>
              <Link to="/signin" className="auth-button">
                Sign In
              </Link>
              <Link to="/signup" className="auth-button">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    );
  };

const mapStateToProps = state => ({
  currentUser: state.user.currentUser 
})
  
  export default connect(mapStateToProps)(Header);