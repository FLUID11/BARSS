/* TOGGLE OTT FIELD */

function toggleOTT(){

const type = document.getElementById("is_theatre").value;

if(type === "0"){
document.getElementById("ottField").style.display = "block";
}else{
document.getElementById("ottField").style.display = "none";
}

}


/* ADD MOVIE */

const form = document.getElementById("movieForm");

form.addEventListener("submit", function(e){

e.preventDefault();

const movie = {

title: document.getElementById("title").value,
poster: document.getElementById("poster").value,
genre: document.getElementById("genre").value,
description: document.getElementById("description").value,
trailer: document.getElementById("trailer").value,
rating: document.getElementById("rating").value,
type: document.getElementById("type").value,

/* NEW FIELDS */

is_theatre: document.getElementById("is_theatre").value,
ott_platform: document.getElementById("ott_platform").value

};

fetch("http://localhost:5000/movies",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body: JSON.stringify(movie)

})
.then(res=>res.json())
.then(data=>{
alert("Movie Added Successfully");
});

});