
class ScoreBoard {
    constructor() {
        this.players=[];
        this.loader = document.getElementById("loader");
        this.scoreBoard = document.getElementById('scoreboard');
    }

    async loadPlayers () {
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
            .then(function(responseData) {
                return responseData;
            })
            .catch(error => console.error(error));

        console.log(data)
        this.players=data;
        this.loader.style.display = 'none';
        this.createTable(this.players);
    }
    
    createTable(arr) {
        arr.forEach(element => {
            let tr = document.createElement('tr');
            let tdName = document.createElement('td');
            tdName.innerText = element.name;
            let tdCountry = document.createElement('td');
            tdCountry.innerText = element.country;
            let tdDate = document.createElement('td');
            tdDate.innerText = new Date(element.registrationDate).toLocaleDateString();
            let tdScore = document.createElement('td');
            tdScore.innerText = element.score;
    
            tr.appendChild(tdName);
            tr.appendChild(tdCountry);
            tr.appendChild(tdDate);
            tr.appendChild(tdScore);
            this.scoreBoard.appendChild(tr);
        });
    }
    
    clearTable() {
        this.scoreBoard.innerHTML = '';
    }
}







