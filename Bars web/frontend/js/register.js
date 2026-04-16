// ===============================
// CHECK IF ALREADY LOGGED IN
// ===============================

const userId = localStorage.getItem("userId");

if(userId){
window.location.href = "index.html";
}

// ===============================
// REGISTER FORM
// ===============================

const form = document.getElementById("registerForm");

form.addEventListener("submit", function(e){

e.preventDefault();

// get input values

const username = document.getElementById("username").value.trim();
const email = document.getElementById("email").value.trim().toLowerCase();
const password = document.getElementById("password").value;

// basic validation

if(!username || !email || !password){
alert("Please fill all fields");
return;
}

// create user object

const user = {
username: username,
email: email,
password: password,
role: "user"   // default role
};

// send data to backend

fetch("http://localhost:5000/register", {

method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(user)

})
.then(res => res.json())
.then(data => {

alert(data.message);

// redirect to login after success
window.location.href = "login.html";

})
.catch(err => {
console.log("Error:", err);
alert("Something went wrong");
});

});