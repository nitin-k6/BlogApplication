const express = require('express');
const cors = require('cors');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const router =require('express').Router();
 const User =    require('./models/User');
 const Post =    require('./models/Post');
 const Category= require('./models/Category');
 
 const multer = require('multer');
const Register = require('./models/User');
const Login =    require('./models/User')
require("dotenv").config() // haven't used dotenv.config()
const bcrypt = require('bcrypt');
const path = require('path');

app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/images", express.static(path.join(__dirname,"/images")));
const corsOptions = {
  origin: 'http://localhost:3001',
  // other options...
};

app.use(cors(corsOptions));


const mongo_url = "mongodb+srv://nitinkumar67:nitinkumar67@cluster0.99nqtfb.mongodb.net/?retryWrites=true&w=majority";
async function connect(){
    try{
        await mongoose.connect(mongo_url)
        // await mongoose.connect(process.env.mongo_url) // not able to use it so no point of keeping mongo_url in .env file
        console.log("Connected to MongoDB");
    } catch(error){
        console.log(error);
    }
}

connect();



// app.listen(5000, ()=>{  // WITHOUT ENV 
//     console.log("Port is running ");
// });   


app.listen(process.env.PORT, ()=>{
    console.log("Port is running at", process.env.PORT);
});


// app.use("/api/auth", authRoute);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});





  /*-------- We created rest api to fetch data from the request or from the user.*/
  //This is for taking the data from the user
/*app.use('/register',(req, res)=>{  // can use app.post
    console.log(req.body)        
    res.send(req.body)
})*/

//Now for saving data we get from the request or client to the database //Fetching and Saving
//Registration
 app.use('/register', async(req, res)=>{  // can use app.post
     try{
        const salt= await bcrypt.genSalt(10);
        const hasedPass= await bcrypt.hash(req.body.password, salt)
      const register = await Register.create({
        username: req.body.username,
        email: req.body.email,
         password:hasedPass,                  // password:req.body.password
      });
      res.status(200).send(register);
     }catch(error){
      console.log(error.message);
      res.status(500).json({message: error.message})
     }
  })

//login
    app.post('/login' , async (req,res) =>{
    try {
        const user = await Register.findOne({username: req.body.username});
        if(!user){
            return res.status(400).json("wrong credentials")
        }
        const validated = await bcrypt.compare(req.body.password, user.password);
        if(!validated){
            return res.status(400).json("wrong credentials");
        }
        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);
    }
});


//update user
app.put('/users/:id', async  (req, res) =>{
    try{
      const {id}=req.params;
      const user = await User.findByIdAndUpdate(id, req.body)
      if(!user){
          return res.status(404).json({message:`cannot find user ${id}`})
    }
    res.status(200).json(user);
    }
    catch(error){
      res.status(500).json({message: error.message});
    }
       
  })

  
//   mongoose.set("strictQuery",false);

//delete user
  app.delete('/users/:id', async (req, res) =>{
    try{
        const {id} = req.params;
        const user= await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: `cannot find user with ${id}`})
        }
        res.status(200).json(user);
    }
    catch(error){
      res.status(500).json({message: error.message});
    }
  })



  //get user
  app.get('/userss/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

/*<-----------------------------------POST---------------------------------------------------------------------------->*/


// creating data 
app.post('/posts',  async(req, res)=>{   // after read operation it was changed to /posts. Earlier it was /post
  // console.log(req.body);
  // res.send(req.body);
  try{
 const post = await Post.create(req.body);
 res.status(200).json(post);
  } catch(error){
      console.log(error.message);
      res.status(500).json({message: error.message});
  }
})

/*<------------read op(fetching or getting all the data from the database)-------------------*/

// app.get('/posts', async(req, res) => {
//   try{
//   const posts = await Post.find({});
//   res.status(200).json(posts);
//   }catch(error){
//     res.status(500).json({message: error.message});
//   }
// })

/*<------------read op(fetching or getting the data from the database)-------------------  by id*/
 
app.get('/posts/:id', async (req, res) => {
  try {
     const { id } = req.params;
     const post = await Post.findById(id);
     
     if (!post) {
        return res.status(404).json({ message: 'Post not found' });
     }
     
     res.status(200).json(post);
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
});








  /*----- Update data (edit data)-------- */
  app.put('/posts/:id' , async(req, res) => {
    try{
        const { id } = req.params;
        const post = await Post.findByIdAndUpdate(id, req.body);

      if(!post){
        return res.status(404).json({message: `cannot find any product with Id ${id}`});
      }
      const updatedPost = await Post.findById(id);
      res.status(200).json(updatedPost);

    }catch(error){
      res.status(500).json({message: error.message})
    }
  });

// /*----- Delete data -----------------*/

app.delete('/posts/:id' , async(req, res) =>{
  try{
      const { id } = req.params;
      const post = await Post.findByIdAndDelete(id);

      if(!post){
        return res.status(400).json({message: `cannot find any product with Id ${id}`});
      }
      res.status(200).json(post);

  }catch(error){ 
     res.status(500).json({message: error.message})
  }
});


/*************/
/*<------------read op(fetching or getting the data from the database)-------------------  based on a condition*/

/**Node.js Request query */
// app.get("/", async (req, res) => {
//   const username = req.query.user;
//   const catName = req.query.cat;
//   try {
//     let posts;
//     if (username) {
//       posts = await Post.find({ username });
//     } else if (catName) {
//       posts = await Post.find({
//         categories: { 
//           $in: [catName],
//         },
//       });
//     } else {
//       posts = await Post.find();
//     }
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


app.get('/posts', async (req, res) => {
  const username = req.query.user;
  const postId = req.query.postId || req.params.postId; // Include req.params.postId for direct URL

  try {
    let posts;

    if (postId) {
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.status(200).json(post);
    }

    if (username) {
      posts = await Post.find({ username });
    } else {
      posts = await Post.find();
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});






/*******************categories */



app.post("/categories", async (req, res) => {
  try {
    const newCat = new Category(req.body);
    const savedCat = await newCat.save();
    res.status(201).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});



app.get("/categories", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});


/***********Node.js Upload file Rest api */



  module.exports= router;




