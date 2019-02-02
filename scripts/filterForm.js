class FilterForm {
    constructor(){
        this.countries = ["Afghanistan", "Algeria"];
        this.selectedFilterCountries=[];
        this.form = document.getElementById("filter-form");
    }

    submitForm(e) {
        e.preventDefault();
        let filterName = document.getElementById('filterName').value;
        let regDateFrom = document.getElementById('regDateFrom').value;
        let regDateTo = document.getElementById('regDateTo').value;
        console.log(filterName)
        console.log(filterName, this.selectedFilterCountries, regDateFrom, regDateTo);
        this.form.reset();
    }

    addFilterCountries(countryName) {
        console.log("Added");
        this.selectedFilterCountries.push(countryName);
        console.log(this.selectedFilterCountries)
    }
    
    removeFilterCountries(countryName) {
        console.log("Remove")
        let countryForRemoval = this.selectedFilterCountries.findIndex(x => x === countryName)
        this.selectedFilterCountries.splice(countryForRemoval, 1);
        console.log(this.selectedFilterCountries)
    }
    
    async fetchCountries(searchName, searchCountries, registrationFrom, registrationTo) {
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
        
        this.countries = await fetch(url, queryOptions)
            .then((response) => {
                return response.json();
            }).then((data) => {
                countries = data;
                populateCountries();
            }).catch(error => {
                console.log(error)
            });
    
    }
    
    populateCountries() {
        console.log(this)
        for(let country of this.countries) {
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
}