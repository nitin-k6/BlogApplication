// import TopBar from "./topbar/TopBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import  TopBar from "./topbar/TopBar";
import Register from "./pages/login/register/Register";
import { BrowserRouter as Router,Switch,Link ,Routes,Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
 // when we do rafc we use {About} instead .In rfc we use About



function App() {
// const user = false; It was psuedo user
const {user} = useContext(Context);
  return (
    //  <>
    // <TopBar/>
    // {/* <Home/> 
    //   <Single/> 
    //   <Write/>
    //   <Settings/> 
    //   <Login/> */}
    //  <Register/>
    // </>


   
  <Router> 
    <TopBar />
        <Routes>
          <Route exact path="/" element={user ?<Home/>: <Register/>} />
          <Route path="/register" element={user ? <Home/> :<Register/>} />
          <Route path="/login" element={user ? <Home/> :<Login/>} />
          <Route path="/write" element={user ? <Write/> : <Register/>} />
          <Route path="/settings" element={user ? <Settings/> : <Register/>} />
          <Route path="/post/:postId" element={<Single/>} />

          
      

        </Routes>
    </Router>

  )   
}

export default App;
