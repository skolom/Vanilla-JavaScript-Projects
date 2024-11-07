const container = document.querySelector('.container');
let seats = document.querySelectorAll('.seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

// Function Populate UI

// populateUI();

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice)
    
}


// Functions Update total and count

function updateSelectedCount() {
        let selectedSeats =  document.querySelectorAll('.row .seat.selected');
        let seatsArr = document.querySelectorAll('.row .seat:not(.occupied)');

        // Copy selected seat into an arr
        // Map through array
        //return a new array index

        const seatsIndex = [...selectedSeats].map(seat => [...seatsArr].indexOf(seat));

        localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

        const selectedSeatsCount = selectedSeats.length;
    
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    populateUI();

    
}

// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if (selectedSeats !== null  && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}



// Movie Select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount();
})


// Seat click event
container.addEventListener('click', e => {
    
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
       
        e.target.classList.toggle('selected');

        updateSelectedCount();
    } 
});

//Initial count and total set

updateSelectedCount();

