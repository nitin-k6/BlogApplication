import "./post.css";
import {Link} from "react-router-dom";


export default function Post({post}) {
    const PF = "http://localhost:3000/images/";
  return (
    <div className="post">
         {post.photo &&(  // After using this method the images gone away because yet not uploaded(left no space for image block either)
        <img  className="blogImage"
            src ={PF + post.photo}
        //   src="./images/blogimage2.jpg" 
          alt="" />
         )}
        <div className="postInfo">
            <div className="postCategories">
                {/* <span className="postCat">Life</span>  */}

                {post.categories.map((c =>(
                <span className="postCat">{c.name}</span>

                )))}
            </div>
            <Link to = {`/post/${post._id}` }className="link"> {/*react-router-dom using dynamic link*/}
            <span className="postTitle">{post.title}</span>  

            </Link>
            <hr />
            <span className="postTime">{new Date(post.createdAt).toDateString()}</span>
        </div>
            <p className="postDescription">{post.desc}</p>

        </div>
  )
}

