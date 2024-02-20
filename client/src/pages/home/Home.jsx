import React, { useEffect, useState } from "react";
import Header from "../../header/Header"
import Posts from "../../posts/Posts"
import Sidebar from "../../sidebar/Sidebar"
import "./home.css"
import axios from "axios";
import { useLocation } from "react-router-dom";


export default function Home() {

const location = useLocation();  // using query in axios(to search anything like ?user=vcxzxcv from Node.js request query i.e to get data based on a specific condition)
console.log(location);
/*instead of writing above we are gonna take the search property*/
// const { search } = useLocation();


// axios.get('http://localhost:3000/posts')  // This works too 
//   .then(response => {                 // For getting the posts
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });


const { search } = useLocation();
const[posts,setPosts] = useState([]);

useEffect(() => {
  console.log('Search:', search);
  const fetchPosts = async () => {
    try {
      const res =  await axios.get("http://localhost:3000/posts/" + search)
      setPosts(res.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  fetchPosts();
}, [search]);


  

 
  return (
    <>
    <Header/>
    <div className="home">
    <Posts posts = {posts} />
    <Sidebar/>


        </div>
      </>

  )
}
