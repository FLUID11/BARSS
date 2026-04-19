const seats = document.querySelectorAll(".seat");

let selectedSeats = [];
let pricePerSeat = 150;

seats.forEach(seat=>{

seat.addEventListener("click",()=>{

seat.classList.toggle("selected");

const seatId = seat.innerText;

if(selectedSeats.includes(seatId)){

selectedSeats = selectedSeats.filter(s => s !== seatId);

}else{

selectedSeats.push(seatId);

}

document.getElementById("seatList").innerText =
selectedSeats.join(", ");

document.getElementById("totalPrice").innerText =
selectedSeats.length * pricePerSeat;

});

});