
class ScoreBoard {
    constructor() {
        this.players=[];
        this.loader = document.getElementById("loader");
        this.scoreBoard = document.getElementById('scoreboard');
        this.errorMsg = document.getElementById('scoreboard-error');
        this.paginator = document.getElementById('paginator');
        this.paginator.style.visibility = '';
        this.currentPageId = 'page0';
        this.currentPage = 0;
    }

    async loadPlayers (filters) {
        let url = new URL(BACKEND_URL + '/players');
        let params= {
            filterName: filters.filterName || '',
            filterCountries: filters.selectedFilterCountries || [],
            filterDateFrom: filters.filterDateFrom || '',
            filterDateTo: filters.filterDateTo || '',
            sortCriteria: filters.sortCriteria || '',
            sortType: filters.sortType || ''
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
            this.paginator.innerHTML = '';
            this.createPages(this.players.length);
        }
        
    }

    createPages(length) {
        let pages = Math.ceil(length / 100);
        for(let i = 0; i < pages; i++) {
            let page = document.createElement('li');
            let pageAnchor = document.createElement('a');
            pageAnchor.classList.add('page-selector');
            pageAnchor.setAttribute('id', 'page' + i);
            pageAnchor.innerHTML = i + 1;
            page.appendChild(pageAnchor);
            this.paginator.appendChild(page);
        } 
        this.changePage(this.currentPage, this.currentPageId);
    }

    changePage(pageNumber, pageId) {
        let curPage = document.getElementById(this.currentPageId);
        if(curPage)
            curPage.parentElement.classList.remove('active');
        let page = document.getElementById(pageId);
        if(page)
            page.parentElement.classList.add('active');
        this.currentPage = pageNumber;
        this.currentPageId = pageId;
        this.createTable(this.players.slice(this.currentPage * 100, this.currentPage * 100 + 99));
    }
    
    createTable(arr) {
        //check how many pages are needed
        this.scoreBoard.innerHTML='';
        arr.forEach((element, index) => {
            let tr = document.createElement('tr');

            let tdRank = document.createElement('td');
            tdRank.innerText = this.currentPage * 100 + index + 1;
            let tdName = document.createElement('td');
            tdName.innerText = element.name;
            let tdCountry = document.createElement('td');
            tdCountry.innerText = element.country.toUpperCase();
            let tdDate = document.createElement('td');
            tdDate.innerText = new Date(element.registrationDate).toLocaleDateString();
            let tdScore = document.createElement('td');
            tdScore.innerText = element.score;
            let tdLevel = document.createElement('td');
            tdLevel.innerText = element.level;
            
            tr.appendChild(tdRank);
            tr.appendChild(tdName);
            tr.appendChild(tdCountry);
            tr.appendChild(tdDate);
            tr.appendChild(tdScore);
            tr.appendChild(tdLevel);
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







