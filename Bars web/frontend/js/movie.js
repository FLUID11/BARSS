// ===============================
// GET MOVIE ID FROM URL
// ===============================

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

const bookBtn = document.getElementById("bookTicketBtn");


// ===============================
// LOAD MOVIE DETAILS
// ===============================

fetch(`http://localhost:5000/movies/${movieId}`)
.then(res => res.json())
.then(movie => {

document.getElementById("movieTitle").innerText = movie.title;
document.getElementById("moviePoster").src = movie.poster;
document.getElementById("movieRating").innerText = movie.rating;
document.getElementById("movieGenre").innerText = movie.genre;
document.getElementById("movieDescription").innerText = movie.description;
document.getElementById("movieTrailer").src = movie.trailer;


/* ===============================
THEATRE / OTT LOGIC
=============================== */

if(movie.is_theatre == 1){

// Show booking button
if(bookBtn){
bookBtn.style.display = "inline";
bookBtn.onclick = () => {
window.location.href = `booking.html?movieId=${movieId}`;
};
}

}else{

// Hide booking button
if(bookBtn){
bookBtn.style.display = "none";
}

// Show OTT platform
const ott = document.createElement("p");
ott.innerText = "Available on: " + (movie.ott_platform || "OTT Platform");

document.querySelector(".movie-info").appendChild(ott);

}

});


// ===============================
// LOAD REVIEWS
// ===============================

fetch(`http://localhost:5000/reviews/${movieId}`)
.then(res => res.json())
.then(reviews => {

const container = document.getElementById("reviewsContainer");
container.innerHTML = "";

reviews.forEach(r => {

const card = document.createElement("div");
card.classList.add("review-card");

card.innerHTML = `
<h4>${r.username}</h4>
<p>⭐ ${r.rating}</p>
<p>${r.review_text}</p>
`;

container.appendChild(card);

});

});


// ===============================
// SUBMIT REVIEW
// ===============================

const form = document.getElementById("reviewForm");

form.addEventListener("submit",(e)=>{

e.preventDefault();

const userId = localStorage.getItem("userId");

if(!userId){
alert("Please login to submit a review");
return;
}

const rating = document.getElementById("rating").value;
const reviewText = document.getElementById("reviewText").value;

fetch("http://localhost:5000/reviews",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
movie_id: movieId,
user_id: userId,
rating: rating,
review_text: reviewText
})

})
.then(res=>res.json())
.then(()=>{

alert("Review added successfully!");
location.reload();

});

});