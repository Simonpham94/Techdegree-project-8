// global variables
let employees = []; 
const urlAPI = `
    https://randomuser.me/api/?results=12&inc=name, picture,
    email, location, phone, dob &noinfo &nat=US
`
const gridContainer = document.querySelector('.grid-container'); 
const overlay = document.querySelector('.overlay'); 
const modalContainer = document.querySelector('.modal-content'); 
const modalClose = document.querySelector('.modal-close'); 

// fetch data from API.

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData; 

    // store the employee HTML as we create it
    let employeeHTML = ''; 

    // loop through each employee and create HTML markup

    employees.forEach((employee, index) => {
        let name = employee.name; 
        let email = employee.email; 
        let city = employee.location.city; 
        let picture = employee.picture;

        employeeHTML += `
        <div class="card backgroundWhite" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
    `;
    })
    gridContainer.innerHTML = employeeHTML;
   
  // Filter names
  const search = document.getElementById('search'); 
  const names = document.querySelectorAll('.text-container h2'); 
 
  function handleSearch() {
      const searchName = search.value.toLowerCase(); 
      names.forEach(name => {
          const cardName = name.textContent.toLowerCase(); 
          const card = name.parentElement.parentElement; 
          if(cardName.indexOf(searchName) > -1) {
              card.style.display = 'flex'; 
          } else {
              card.style.display = 'none'; 
          }
      });
  };

  search.addEventListener('keyup', handleSearch);

}

function displayModal(index) {
    let { name, dob, phone, email, location:{city, street, state, postcode}, picture } = employees[index];

    let date = new Date(dob.date); 
    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="modal-header">
                <svg version="1.1" id="back" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 490.667 490.667" style="enable-background:new 0 0 490.667 490.667;" xml:space="preserve"><path d="M239.077,245.333L466.213,18.219c4.171-4.16,4.179-10.914,0.019-15.085
                    c-2.006-2.011-4.731-3.139-7.571-3.134h-192c-2.831-0.005-5.548,1.115-7.552,3.115L24.443,237.781
                    c-4.164,4.165-4.164,10.917,0,15.083l234.667,234.667c2.001,2.007,4.718,3.135,7.552,3.136h192
                    c5.891,0.011,10.675-4.757,10.686-10.648c0.005-2.84-1.123-5.565-3.134-7.571L239.077,245.333z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                 </svg>
                <span id ="h2-text">${name.first} ${name.last}</span>
                 <svg version="1.1" id="forward" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 490.667 490.667" style="enable-background:new 0 0 490.667 490.667;" xml:space="preserve"><path  d="M466.219,237.781L231.552,3.115C229.548,1.115,226.831-0.005,224,0H32
                    c-5.891-0.011-10.675,4.757-10.686,10.648c-0.005,2.84,1.123,5.565,3.134,7.571l227.136,227.115L24.448,472.448
                    c-4.171,4.16-4.179,10.914-0.019,15.085c2.006,2.011,4.731,3.139,7.571,3.134h192c2.831,0.005,5.548-1.115,7.552-3.115
                    l234.667-234.667c4.171-4.16,4.179-10.914,0.019-15.085C466.231,237.794,466.225,237.788,466.219,237.781z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                </svg>
            </h2> 
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.number, street.name}, ${state} ${postcode}</p>
            <p>Birthday:
            ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove('hidden'); 
    modalContainer.innerHTML = modalHTML; 

    // Moving among between employee detail windows
    const back = document.getElementById('back'); 
    const forward = document.getElementById('forward'); 
    
    if(index == 0) {
        back.style.visibility = 'hidden';
    } else if (index == 11) {
        forward.style.visibility = 'hidden';
    }

    back.addEventListener('click', (e) =>{
        overlay.classList.add('hidden');
        displayModal(parseInt(index) - 1);
    }); 

    forward.addEventListener('click', (e) =>{
        overlay.classList.add('hidden'); 
        displayModal(parseInt(index) + 1);
    });
};

    gridContainer.addEventListener('click', e=> {
        if(e.target !== gridContainer) {
            const card = e.target.closest('.card'); 
            const index = card.getAttribute('data-index'); 
            displayModal(index); 
        }

        
    });

    modalClose.addEventListener('click', ()=> {
        overlay.classList.add('hidden'); 
    });

    


// Dark mode

const darkModeSwitch = document.querySelector('#myonoffswitch');  
const body = document.querySelector('body'); 
const modals = document.querySelectorAll('.modal');


darkModeSwitch.addEventListener('change', (e)=> {
    const cards = document.querySelectorAll('.card');
    if(e.target.checked) {
        body.classList.add('dark-mode');
        cards.forEach(card => {
            card.classList.add('card-dark-mode'); 
        });
        modals.forEach(modal => {
            modal.classList.add('card-dark-mode');
        })
        
    } else {
        body.classList.remove('dark-mode');
        cards.forEach(card => {
            card.classList.remove('card-dark-mode'); 
        });
        modals.forEach(modal => {
            modal.classList.remove('card-dark-mode');
        })
    }
    
})







