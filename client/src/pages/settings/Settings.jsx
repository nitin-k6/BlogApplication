import { useContext, useState } from "react";
import Sidebar from "../../sidebar/Sidebar";
import "./settings.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Settings() {
    const [file, setFile] = useState(null);
    const [username, setUsername]= useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false)
    const {user,dispatch } = useContext(Context)
    const PF = "http://localhost:3000/images/"


    const handleSubmit  = async(e) =>{
        e.preventDefault();
        dispatch({type: "UPDATE_START"})
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };
        if(file){
          const data = new  FormData();
          const filename  = Date.now() + file.name;
          data.append("name", filename);
          data.append("file", file);
          updatedUser.profilePic = filename;
          try{
          await axios.post("http://localhost:3000/upload" , data);
          }catch(err){
      
          }
        }try{
        //  await axios.put("http://localhost:3000/users/" + user._id, updatedUser);
      const res = await axios.put(`http://localhost:3000/users/${user._id}`, updatedUser);
      setSuccess(true);
      dispatch({type: "UPDATE_SUCCESS", payload: res.data})
        }catch(err){
            dispatch({type: "UPDATE_FAILURE"})
        }
      
      };

  return (
    <div className="settings">
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Your account</span>
                <span className="settingsDeleteTitle">Delete account</span>
            
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
                <label >Profile Picture</label>
                <div className="settingsProfileP">
                    <img  className="settingsImg" src= {file ? URL.createObjectURL(file) : PF+ user.profilePic} alt="" />
                    <label htmlFor="fileInput">
                    <i className=" settingsProfilePIcon fa-solid fa-circle-user"></i>
                
                    </label>
                <input
                 type="file" 
                  id="fileInput"
                   style={{display:"none"}}
                   onChange={(e)=> setFile(e.target.files[0])}
                   />
                </div>
                <label >Username</label>
                <input type="text"  placeholder={user.username} onChange={e=>setUsername(e.target.value)}/>
                <label >Email</label>
                <input type="email"  placeholder={user.email} onChange={e=>setEmail(e.target.value)}/>
                    <label >Password</label>
                    <input type="password" onChange={e=>setPassword(e.target.value)}/>
                    <button className="settingsUpdate" type="submit">
                    Update
                    </button>
                    {success && <span style={{color:"green", textAlign: "center", marginTop:"20px"}}>Profile has been updated!</span>}
            </form>
        </div>
        <Sidebar/>
    </div>
  )
}







