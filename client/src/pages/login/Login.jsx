import { useContext } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useRef } from "react";
import axios from "axios";

export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
   const {dispatch, isFetching}  = useContext(Context) // {user}

  const handleSubmit =async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"})
    try{
     const res = await axios.post("http://localhost:3000/login", {
      username: userRef.current.value,
      password: passwordRef.current.value,
     })
     dispatch({type:"LOGIN_SUCCESS", payload: res.data})
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"})
    }
  }
// console.log(user);
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
        
        <form className="formLogin" onSubmit={handleSubmit}>   {/* React.js login system*/}
        <label className="emailLogin">Username</label>   {/*  Earlier it was email */}
        <input
         type="text"
           className="loginInput" 
           placeholder="Enter your username...." //Earlier it was email
          ref={userRef}
           />  
        <label className="passLogin" >Password</label>
        <input type="password"
         className="loginInput"
          placeholder="Enter your password..."
         ref={passwordRef}
          />
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
        </form>
        <button className="registerLogin">
          <Link to="/register" style={{textDecoration:"none", color:"inherit"}}>Register</Link>
        </button>
        </div>
  )
}
