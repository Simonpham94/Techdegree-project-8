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
            <h2 class="name"><span id ="back">&lt;</span>${name.first} ${name.last}<span id = "forward">&gt;</span></h2> 
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street}, ${state} ${postcode}</p>
            <p>Birthday:
            ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove('hidden'); 
    modalContainer.innerHTML = modalHTML; 

    // Moving among between employee detail windows
    const back = document.getElementById('back'); 
    const forward = document.getElementById('forward'); 

    back.addEventListener('click', (e) =>{
        overlay.classList.add('hidden'); 
        displayModal(index-1);
    }); 

    forward.addEventListener('click', (e) =>{
        overlay.classList.add('hidden'); 
        displayModal(index+1);
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







