import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style_signin.scss";
import Auth from "../../assets/auth.png";
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from "../../firebase";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handlesubmit = (e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
    }
  return (
    <div className="container_signin">
      <div className="left_box">
        <img src={Auth} alt="" />
      </div>
      <div className="right_box">
        <div className="login_box">
            <div className="img_box">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="img"/>
            </div>
            <div className="main_input_box">
              <form onSubmit={handlesubmit} className="form">
                <div className="input_box">
                  <input type="text" id="name" onChange={(e) => setEmail(e.target.value)} required placeholder="Phone number, username, or email"></input>
                  <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required placeholder="Password"></input>
                </div>
                
                <button className="btn" type="submit" name="submit">
                  Log in
                </button>
              </form>
            </div>
          </div>
          <div className="logout_box">
            <p className="text">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
      </div>


      
    </div>
  );
};

export default Login;
