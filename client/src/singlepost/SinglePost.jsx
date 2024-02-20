import { useLocation } from "react-router";
import "./singlepost.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";


export default function SinglePost() {
  const PF = "http://localhost:3000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  //Fetching single post using axios
  const location = useLocation(); // This is for fetching singlepost data inside title
  // console.log(location) // This will give object  in the console
  // console.log(location.pathname.split("/")[2])  // this will give id
  // Now using id we get in the console we are gonna fetch the data
  const path = location.pathname.split("/")[2];
  // useEffect(()=>{ // We say whenever user path changes fire this useEffect
  //   const getPost = async () =>{
  //     const res = await axios.get("/http://localhost:3000/posts/"+path)
  //     console.log(res.data)
  //   }
  //   getPost()
  // },[path])
  const [post, setPost] = useState({});
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/posts/${path}`);
        console.log(res.data);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };
    getPost();
  }, [path]);


  
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/posts/${post._id}`, {
        data: { username: user.username },
      });
      // window.location.replace("/");  we can also this instead of below
      setUpdateMode(false);
    } catch (err) {
      // Handle error
      console.error("Error deleting post:", err);
    }
  };
  
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/posts/${post._id}`, {
        username: user.username,
         title,
          desc ,
      });
      window.location.reload();
    } catch (err) {
      // Handle error
      console.error("Error deleting post:", err);
    }
  };
  



  return (
    <div className="singlepost">
      <div className="singlepostwrapper">
        {post.photo && (
          <img src={ PF + post.photo} 
          alt="" 
          className="singlepostImg" />
        )}
        {/* <img src="./images/blogimage2.jpg" alt="" className="singlepostImg" /> */}
        {
          updateMode ? (<
            input type="text" 
             value={title} 
              className="singlepostTitleInput" 
              autoFocus
              onChange={(e)=>setTitle(e.target.value)}
              /> )    : (
            <h1 className="singlepostTitle">
            {title}
            {post.username === user?.username &&
            
            <div className="singlepostEdit">
            <i className=" singlepostIcon fa-regular fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
            <i class="singlepostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
          </div>
            }
          </h1>
          )
        }
        
      <div className="singlepostInfo">
        <span className="singlepostAuthor">
        Author:
          <Link to={`/?user=${post.username}`} className="link">
          <b>{post.username}</b>
          </Link>
       
        </span>
        <span className="singlepostDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      
         {updateMode ? (
          <textarea className="singlepostDescriptionInput"
           value={desc}
            onChange={(e)=>setDesc(e.target.value)}/>
         ): (
      <p className="singlepostDescription">{desc}</p> 
      )}
      {updateMode && (
        <button className="singlePostButton" onClick={handleUpdate}>Update</button>

      )}
    </div>
  </div>
  );
}
