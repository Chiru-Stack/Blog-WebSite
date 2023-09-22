const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose=require("mongoose");

const homeStartingContent = "Welcome to Daily Journal, your go-to destination for expert insights, inspiration, and information on a wide range of topics. Our mission is to empower and enrich your life through thought-provoking articles, in-depth guides, and captivating stories. Whether you're a seasoned enthusiast or just starting your journey, our dedicated team of writers and experts curate content that caters to all levels of expertise. Explore a world of knowledge, uncover hidden gems, and stay up-to-date with the latest trends. Join us in the pursuit of knowledge and discovery, and let's embark on this exciting journey together.";
const aboutContent = "Welcome to Daily Journal, where words come to life and ideas flourish. We are a passionate team of writers, creators, and explorers dedicated to sharing our love for knowledge, creativity, and inspiration with the world.";
const contactContent = "While we primarily operate online, we occasionally host events or workshops. Keep an eye on our website and social media for updates on any upcoming in-person opportunities. We appreciate your interest in Daily Journal and look forward to connecting with you. Thank you for being a part of our community! Feel free to adapt this Contact Us page to include your specific contact information, social media links, and any other details that are relevant to your blog";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/blogDB");
const postschema=new mongoose.Schema({
  title:String,
  content:String
});
const Post=mongoose.model("post",postschema);

app.get("/", function(req, res){
  Post.find({})
  .then((found)=>{
    res.render("home", {
      startingContent: homeStartingContent,
      posts: found
      });
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save();
  res.redirect("/");
});

app.get("/posts/:postid", function(req, res){
  const rpostid = req.params.postid;
  Post.findOne({_id: rpostid})
    .then((post)=>{
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
