
class ScoreBoard {
    constructor() {
        this.players=[];
        this.loader = document.getElementById("loader");
        this.scoreBoard = document.getElementById('scoreboard');
        this.errorMsg = document.getElementById('scoreboard-error');
    }

    async loadPlayers (filterName, filterCountries, filterDateFrom, filterDateTo, sortCriteria, sortType) {
        this.scoreBoard.innerHTML='';
        console.log(filterName, filterCountries, filterDateFrom)
        let url = new URL(BACKEND_URL + '/players');
        let params= {
            filterName: filterName || '',
            filterCountries: filterCountries || [],
            filterDateFrom: filterDateFrom || '',
            filterDateTo: filterDateTo || '',
            sortCriteria: sortCriteria || '',
            sortType: sortType || ''
        };
        let queryOptions = {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            body: JSON.stringify(params)
        };
        // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        
        this.loader.style.display = '';
        let data = await fetch(url, queryOptions)
            .then(function(response) {
            return response.json();
            })
            .then(function(responseData) {
                return responseData;
            })
            .catch(error => {
                this.loader.style.display = 'none';
                this.displayError("No connection to the server. Please check your internet connection and refresh the page! If the problem persists, please contact support!");
            });

        if(data){
            this.players=data;
            this.loader.style.display = 'none';
            this.errorMsg.style.display = 'none';
            this.createTable(this.players);
        }
        
    }
    
    createTable(arr) {
        arr.forEach((element, index) => {
            let tr = document.createElement('tr');
            let tdRank = document.createElement('td');
            tdRank.innerText = index + 1;
            let tdName = document.createElement('td');
            tdName.innerText = element.name;
            let tdCountry = document.createElement('td');
            tdCountry.innerText = element.country.toUpperCase();
            let tdDate = document.createElement('td');
            tdDate.innerText = new Date(element.registrationDate).toLocaleDateString();
            let tdScore = document.createElement('td');
            tdScore.innerText = element.score;
            
            tr.appendChild(tdRank);
            tr.appendChild(tdName);
            tr.appendChild(tdCountry);
            tr.appendChild(tdDate);
            tr.appendChild(tdScore);
            this.scoreBoard.appendChild(tr);
        });
    }

    displayError(msg) {
        this.errorMsg.innerHTML = msg;
        this.errorMsg.style.display = '';
    }
    
    clearTable() {
        this.scoreBoard.innerHTML = '';
    }
}







