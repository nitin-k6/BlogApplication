import { useEffect, useState } from "react";
import "./sidebar.css";
import axios from "axios";
import {Link} from "react-router-dom"

export default function Sidebar() {
  // fetching all categories
  const [cats, setCats] =useState([]);

  useEffect(()=>{
   const getCats = async ()=>{
    const res =await axios.get("http://localhost:3000/categories")
    setCats(res.data)
   }
   getCats();
  },[])
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img  className= "image1" src="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <p>
            Over the past few years, I’ve moved away from following primarily recipe blogs to spending my time enjoying other types of lifestyle blogs, and it has been awesome.
            </p>
      </div>
                <div className="sidebarItem">
                    <span className="sidebarTitle">CATEGORIES</span>
                    <ul className="sidebarList">
                      {cats.map((c) =>(
                      <Link to={`/?cat=${c.name}`} className="link">
                      <li className="sidebarListItem">{c.name}</li>
                      </Link>
                        
                      ))}
                      
                 </ul>
                </div>
                <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                <i class="sidebarIcon fa-brands fa-instagram"></i>
                 <i className="sidebarIcon fa-brands fa-twitter"></i>
                <i class="sidebarIcon fa-brands fa-pinterest"></i>
                </div>
        
                </div>
    </div>
  )
}
