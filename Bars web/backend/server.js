const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

/* ===============================
ADD MOVIE (UPDATED)
=============================== */

app.post("/movies",(req,res)=>{

const {
title,
poster,
genre,
description,
trailer,
rating,
type,
is_theatre,
ott_platform
} = req.body;

const sql = `
INSERT INTO movies
(title,poster,genre,description,trailer,rating,type,is_theatre,ott_platform)
VALUES (?,?,?,?,?,?,?,?,?)
`;

db.query(sql,[
title,
poster,
genre,
description,
trailer,
rating,
type,
is_theatre,
ott_platform
],
(err,result)=>{

if(err){
res.status(500).json(err);
}else{
res.json({message:"Movie added"});
}

});

});


/* ===============================
GET ALL MOVIES
=============================== */

app.get("/movies",(req,res)=>{

db.query("SELECT * FROM movies",(err,result)=>{

if(err){
res.status(500).json(err);
}else{
res.json(result);
}

});

});


/* ===============================
GET SINGLE MOVIE
=============================== */

app.get("/movies/:id",(req,res)=>{

const id = req.params.id;

db.query(
"SELECT * FROM movies WHERE id=?",
[id],
(err,result)=>{

if(err){
res.status(500).json(err);
}else{
res.json(result[0]);
}

});

});


/* ===============================
REGISTER USER
=============================== */

app.post("/register", async (req,res)=>{

const {username,email,password} = req.body;

const hashedPassword = await bcrypt.hash(password,10);

const sql = `
INSERT INTO users (username,email,password)
VALUES (?,?,?)
`;

db.query(sql,[username,email,hashedPassword],(err,result)=>{

if(err){
res.status(500).json(err);
}else{
res.json({message:"User registered"});
}

});

});


/* ===============================
LOGIN USER
=============================== */

app.post("/login",(req,res)=>{

const {email,password} = req.body;

db.query(
"SELECT * FROM users WHERE email=?",
[email],
async (err,result)=>{

if(err) return res.status(500).json(err);

if(result.length===0){
return res.json({message:"User not found"});
}

const user = result[0];

const valid = await bcrypt.compare(password,user.password);

if(!valid){
return res.json({message:"Wrong password"});
}

res.json({
message:"Login success",
userId:user.id,
username:user.username,
role:user.role
});

});

});


/* ===============================
ADD REVIEW + UPDATE RATING
=============================== */

app.post("/reviews",(req,res)=>{

const {movie_id,user_id,rating,review_text} = req.body;

const insertSql = `
INSERT INTO reviews
(movie_id,user_id,rating,review_text)
VALUES (?,?,?,?)
`;

db.query(insertSql,[movie_id,user_id,rating,review_text],(err,result)=>{

if(err){
return res.status(500).json(err);
}

/* UPDATE MOVIE RATING */

const avgSql = `
UPDATE movies
SET rating = (
SELECT AVG(rating)
FROM reviews
WHERE movie_id = ?
)
WHERE id = ?
`;

db.query(avgSql,[movie_id,movie_id],(err2,result2)=>{

if(err2){
return res.status(500).json(err2);
}

res.json({message:"Review added & rating updated"});

});

});

});


/* ===============================
GET REVIEWS
=============================== */

app.get("/reviews/:movieId",(req,res)=>{

const movieId = req.params.movieId;

const sql = `
SELECT reviews.*, users.username
FROM reviews
JOIN users ON reviews.user_id = users.id
WHERE movie_id = ?
ORDER BY created_at DESC
`;

db.query(sql,[movieId],(err,result)=>{

if(err){
res.status(500).json(err);
}else{
res.json(result);
}

});

});


/* ===============================
GET THEATERS BY DISTRICT
=============================== */

app.get("/theaters/:district",(req,res)=>{

const district = req.params.district;

const sql = `
SELECT * FROM theaters
WHERE district = ?
`;

db.query(sql,[district],(err,result)=>{

if(err){
return res.status(500).json(err);
}

res.json(result);

});

});


/* ===============================
GET SHOWTIMES (ONLY FUTURE)
=============================== */

app.get("/showtimes/:movieId/:theaterId",(req,res)=>{

const movieId = req.params.movieId;
const theaterId = req.params.theaterId;

const sql = `
SELECT * FROM showtimes
WHERE movie_id=? 
AND theater_id=? 
AND show_date >= CURDATE()
ORDER BY show_time ASC
`;

db.query(sql,[movieId,theaterId],(err,result)=>{

if(err){
return res.status(500).json(err);
}

res.json(result);

});

});


/* ===============================
ADD SHOWTIME
=============================== */

app.post("/showtimes",(req,res)=>{

const {movie_id,theater_id,show_date,show_time} = req.body;

const sql = `
INSERT INTO showtimes
(movie_id,theater_id,show_date,show_time)
VALUES (?,?,?,?)
`;

db.query(sql,[movie_id,theater_id,show_date,show_time],(err,result)=>{

if(err){
return res.status(500).json(err);
}

res.json({message:"Showtime added"});

});

});


/* ===============================
START SERVER
=============================== */

app.listen(5000,()=>{

console.log("Server running on port 5000");

});