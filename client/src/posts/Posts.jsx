import Post from "../post/Post";
import "./posts.css";

export default function Posts({posts}) {
  return (
    <div className="posts">
      {/* {posts.map((p)=>(  // Same thing as below
           <Post  />
      ))} */}
      
        {posts.map((p) => (
          <Post key={p.id} post={p} /> // It is working
          ))}

{/* {posts.map((p, index) => (
  <Post key={index} post={p} />   //If your posts don't have unique IDs, you might need to find another unique property or use the index as a last resort:
))} */}



        {/* <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/> */}
         
        </div>
  );
}
