const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [];

// Fetch random user and add money

async function getRandomUser() {

   try {
    
    const res = await fetch('https://randomuser.me/api', { timeout: 15000 });
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
   }

   addData(newUser);    

   } catch (error) {
    
    console.error('Error fetching user data:', error);
   } 
   
   
}


// Function add new obj to data array

function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Function to Update DOM

function updateDOM(providedData = data) {
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML =`<strong> ${item.name}</strong> ${formatMoney(item.money)} ` ;
        main.appendChild(element);

    });
}

// Function format money

function formatMoney(n) {   
    return '$' + n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Add Event Listeners

addUserBtn.addEventListener('click', getRandomUser);