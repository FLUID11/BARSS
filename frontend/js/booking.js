let selectedSeats = [];
let pricePerSeat = 150;

/* STEP 1: SAVE LOCATION */

function saveLocation(){

const district = document.getElementById("district").value;

if(!district){
alert("Select district");
return;
}

loadTheaters(district);

document.getElementById("locationSection").style.display = "none";
document.getElementById("theaterSection").style.display = "block";

}

/* STEP 2: LOAD THEATERS */

function loadTheaters(district){

fetch(`http://localhost:5000/theaters/${district}`)
.then(res=>res.json())
.then(data=>{

const container = document.getElementById("theaterContainer");
container.innerHTML = "";

data.forEach(theater=>{

const card = document.createElement("div");
card.classList.add("theater-card");

card.innerHTML = `
<h3>${theater.name}</h3>
<button>Select</button>
`;

card.querySelector("button").onclick = ()=>{
loadShowtimes(theater.id);
};

container.appendChild(card);

});

});

}

/* STEP 3: LOAD SHOWTIMES */

function loadShowtimes(theaterId){

const movieId = new URLSearchParams(window.location.search).get("movieId");

fetch(`http://localhost:5000/showtimes/${movieId}/${theaterId}`)
.then(res=>res.json())
.then(data=>{

document.getElementById("theaterSection").style.display = "none";
document.getElementById("showtimeSection").style.display = "block";

const container = document.getElementById("showtimeContainer");
container.innerHTML = "";

data.forEach(show=>{

const btn = document.createElement("button");
btn.innerText = show.show_time;

btn.onclick = ()=>{
generateSeats();
};

container.appendChild(btn);

});

});

}

/* STEP 4: GENERATE SEATS */

function generateSeats(){

document.getElementById("showtimeSection").style.display = "none";
document.getElementById("seatSection").style.display = "block";

const grid = document.getElementById("seatGrid");
grid.innerHTML = "";

selectedSeats = [];

for(let i=1;i<=20;i++){

const seat = document.createElement("div");
seat.classList.add("seat");
seat.innerText = "S" + i;

seat.onclick = ()=>{

seat.classList.toggle("selected");

const seatId = seat.innerText;

if(selectedSeats.includes(seatId)){
selectedSeats = selectedSeats.filter(s=>s!==seatId);
}else{
selectedSeats.push(seatId);
}

document.getElementById("seatList").innerText = selectedSeats.join(", ");
document.getElementById("totalPrice").innerText = selectedSeats.length * pricePerSeat;

};

grid.appendChild(seat);

}

}

/* STEP 5: PAYMENT */

function proceedPayment(){

if(selectedSeats.length === 0){
alert("Select seats first");
return;
}

alert("Redirecting to payment...");

// For now simple mock
setTimeout(()=>{

generateTicket();

},1000);

}

/* STEP 6: TICKET */

function generateTicket(){

document.body.innerHTML = `
<div style="text-align:center;padding:40px;">

<h1>BARS Ticket</h1>

<p><b>Seats:</b> ${selectedSeats.join(", ")}</p>
<p><b>Total Paid:</b> ₹${selectedSeats.length * pricePerSeat}</p>

<p>Show this at entry</p>

<button onclick="window.print()">Download Ticket</button>

</div>
`;

}