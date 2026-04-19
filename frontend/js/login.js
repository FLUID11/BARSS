const form = document.getElementById("loginForm");

const userId = localStorage.getItem("userId");

if(userId){
window.location.href = "index.html";
}

form.addEventListener("submit", function(e) {

e.preventDefault();

const user = {
email: document.getElementById("email").value,
password: document.getElementById("password").value
};

fetch("http://localhost:5000/login", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(user)
})
.then(res => res.json())
.then(data => {

if (data.userId) {

localStorage.setItem("userId", data.userId);
localStorage.setItem("username", data.username);
localStorage.setItem("role", data.role);

window.location.href = "index.html";

} else {

alert(data.message);

}

});

});
