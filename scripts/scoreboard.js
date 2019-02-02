var players=[];
var countries=['Afghanistan', 'Algeria', 'India'];
var selectedFilterCountries=[];
const BACKEND_URL = 'http://localhost:3000'
loadPlayers();
populateCountries();
addListeners();

function submitForm(e) {
    e.preventDefault();
    let form = document.getElementById("filter-form");
    let playersName = document.getElementById('playersName').value;
    let countries = document.getElementById('countries').value;
    let regDateFrom = document.getElementById('regDateFrom').value;
    let regDateTo = document.getElementById('regDateTo').value;

    console.log(playersName, countries, regDateFrom, regDateTo);
    form.reset();
}

function addListeners() {
    document.addEventListener('change', (event) => {
        if(event.target.type === 'checkbox' && !event.target.classList.contains('selected')){
            addFilterCountries(event.target.value);
            event.target.classList.add('selected');
        } else if(event.target.type === 'checkbox') {
            removeFilterCountries(event.target.value);
            event.target.classList.remove('selected');
        }
            
    })
}

function addFilterCountries(value) {
    console.log("Added");
    selectedFilterCountries.push(value);
}

function removeFilterCountries(countryName) {
    console.log("Remove")
}

async function fetchCountries(searchName, searchCountries, registrationFrom, registrationTo) {
    let url = new URL(BACKEND_URL + '/countries/getAll')
    
    let queryOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        redirect: "follow"
    }
    
    countries = await fetch(url, queryOptions)
        .then((response) => {
            return response.json();
        }).then((data) => {
            countries = data;
            populateCountries();
        }).catch(error => {
            console.log(error)
        });

}

function populateCountries() {
    for(let country of countries) {
        let countryDropDown = document.getElementById('countries');
        let countryDiv = document.createElement('div');
        let countryLabel = document.createElement('label');
        let countryCheckbox = document.createElement('input');
        let countryName = document.createTextNode(country)
    
        countryDiv.classList.add('checkbox');

        countryCheckbox.type = "checkbox";
        countryCheckbox.value = country;
    
        countryLabel.appendChild(countryCheckbox);
        countryLabel.appendChild(countryName);
        countryDiv.appendChild(countryLabel);
        countryDropDown.appendChild(countryDiv);
        console.log("countries added");
    }
    
}

async function loadPlayers () {
    let url = new URL(BACKEND_URL + '/players');
    let params= {
        name:'',
        countries:[],
        registrationFrom: null,
        registrationTo: null,
        filterCriteria: '',
        filterType:''
    };
    let queryOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        redirect: "follow"
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));


    let data = await fetch(url, queryOptions)
        .then(function(response) {
        return response.json();
        })
        .then(function(myJson) {
            console.log(JSON.stringify(myJson));
            players=myJson;
            let loader = document.getElementById("loader");
            console.log("after answer")
            loader.style.display = 'none';
            createTable(players);
        })
        .catch(error => console.error(error));
}

function createTable(arr) {
    let body = document.getElementsByTagName('body')[0];
    let table = document.createElement('table');
    let tableHeadings = document.createElement('tr');
    
    let nameHeading = document.createElement('th');
    let countryHeading = document.createElement('th');
    let dateHeading = document.createElement('th');
    let scoreHeading = document.createElement('th');

    nameHeading.innerText = "Name";
    countryHeading.innerText = "Country";
    dateHeading.innerText = "Date";
    scoreHeading.innerText = "Score";

    tableHeadings.appendChild(nameHeading);
    tableHeadings.appendChild(countryHeading);
    tableHeadings.appendChild(dateHeading);
    tableHeadings.appendChild(scoreHeading);

    table.appendChild(tableHeadings);
    arr.forEach(element => {
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        tdName.innerText = element.name;
        let tdCountry = document.createElement('td');
        tdCountry.innerText = element.country;
        let tdDate = document.createElement('td');
        tdDate.innerText = element.registrationDate;
        let tdScore = document.createElement('td');
        tdScore.innerText = element.score;

        tr.appendChild(tdName);
        tr.appendChild(tdCountry);
        tr.appendChild(tdDate);
        tr.appendChild(tdScore);
        table.appendChild(tr);
    });


    body.appendChild(table);
}

