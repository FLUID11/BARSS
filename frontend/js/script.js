// ===============================
// USER + ROLE DATA
// ===============================

const role = localStorage.getItem("role");
const userId = localStorage.getItem("userId");
const username = localStorage.getItem("username");

// ===============================
// ADMIN BUTTON
// ===============================

const adminLink = document.getElementById("adminLink");

if(role === "admin" && adminLink){
adminLink.style.display = "inline";
}

// ===============================
// LOGIN / REGISTER / USER DISPLAY
// ===============================

const loginLink = document.getElementById("loginLink");
const registerLink = document.getElementById("registerLink");
const userGreeting = document.getElementById("userGreeting");

if(userId){

if(loginLink) loginLink.style.display = "none";
if(registerLink) registerLink.style.display = "none";

if(userGreeting){
userGreeting.innerText = "Hello " + username;
}

}

// ===============================
// LOGOUT
// ===============================

const logoutBtn = document.getElementById("logoutBtn");

if(userId && logoutBtn){

logoutBtn.style.display = "inline";

logoutBtn.onclick = () => {
localStorage.clear();
window.location.href = "login.html";
};

}

// ===============================
// LOAD MOVIES FROM BACKEND
// ===============================

const movieContainer = document.getElementById("movieContainer");
const animeContainer = document.getElementById("animeContainer");

if(movieContainer && animeContainer){

fetch("http://localhost:5000/movies")
.then(res => res.json())
.then(data => {

data.forEach(media => {

const card = document.createElement("div");
card.classList.add("movie-card");

card.innerHTML = `
<img src="${media.poster}">
<h3>${media.title}</h3>
<p>⭐ ${media.rating}</p>
`;

card.onclick = () => {
window.location.href = `movie.html?id=${media.id}`;
};

if(media.type === "movie"){
movieContainer.appendChild(card);
}else{
animeContainer.appendChild(card);
}

});

})
.catch(err => console.log("Error loading movies:", err));

}