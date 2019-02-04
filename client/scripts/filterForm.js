class FilterForm {
    constructor(){
        this.selectedFilterCountries=[];
        this.form = document.getElementById("filter-form");
        this.nameFormGroup = document.getElementById('filter-name-group');
        this.dateFromFormGroup = document.getElementById('filter-country-group');
        this.dateFromFormGroup = document.getElementById('filter-date-from-group');
        this.dateToFormGroup = document.getElementById('filter-date-to-group');
        this.errorMsg = document.getElementById('filter-err-msg');
        this.closeBtn = document.getElementById('filter-close-btn');
    }

    validateForm(e) {
        e.preventDefault();
        let filterName = document.getElementById('filterName').value;
        let regDateFrom = document.getElementById('regDateFrom').value;
        let regDateTo = document.getElementById('regDateTo').value;
        let sortCriteria = document.getElementById('sortCriteria').value;
        let sortType = document.querySelector('input[name="sortType"]:checked').value;
        
        if(filterName) {
            if(!validator.validateName(filterName)) {
                this.displayError("Names must be under 80 characters and include only numbers and digits!", this.nameFormGroup);
                return;
            }
        }
        if(regDateFrom) {
            console.log("Checking date")
            console.log(regDateFrom)
            if(!validator.validateDate(regDateFrom)) {
                this.displayError("Please enter a valid date", this.dateFromFormGroup);
                return;
            }
        }
        if(regDateTo) {
            console.log("Checking date")
            if(!validator.validateDate(regDateTo)) {
                this.displayError("Please enter a valid date", this.dateFromFormGroup);
                return;
            }
        }

        this.removeError();
        //LOAD THE PLAYERS AGAIN USING THE FILTERS
        scoreBoard.loadPlayers(filterName, this.selectedFilterCountries, regDateFrom, regDateTo, sortCriteria, sortType);
        this.closeForm();
    }

    displayError(msg, target) {
        this.errorMsg.style.visibility = '';
        this.errorMsg.innerHTML = msg;
        target.appendChild(this.errorMsg)
    }

    removeError() {
        this.errorMsg.style.visibility = 'hidden'
    }

    submitForm() {
        let filterName = document.getElementById('filterName').value;
        let regDateFrom = document.getElementById('regDateFrom').value;
        let regDateTo = document.getElementById('regDateTo').value;
        console.log(filterName)
        console.log(filterName, this.selectedFilterCountries, regDateFrom, regDateTo);
        
    }

    resetForm(e) {
        e.preventDefault();
        this.form.reset();
    }

    closeForm() {
        this.closeBtn.click();
    }

    addFilterCountries(countryName) {
        console.log("Added");
        this.selectedFilterCountries.push(countryName.toLowerCase());
        console.log(this.selectedFilterCountries)
    }
    
    removeFilterCountries(countryName) {
        console.log("Remove")
        let countryForRemoval = this.selectedFilterCountries.findIndex(x => x === countryName)
        this.selectedFilterCountries.splice(countryForRemoval, 1);
        console.log(this.selectedFilterCountries)
    }
    

    populateCountries() {
        console.log(this)
        for(let country of countries) {
            let countryDropDown = document.getElementById('countries');
            let countryDiv = document.createElement('div');
            let countryLabel = document.createElement('label');
            let countryCheckbox = document.createElement('input');
            let countryName = document.createTextNode(country)
        
            countryDiv.classList.add('checkbox');
    
            countryCheckbox.type = "checkbox";
            countryCheckbox.setAttribute('id', country);
            countryCheckbox.value = country;

            countryLabel.setAttribute('for', country);
        
            countryLabel.appendChild(countryCheckbox);
            countryLabel.appendChild(countryName);
            countryDiv.appendChild(countryLabel);
            countryDropDown.appendChild(countryDiv);
            console.log("countries added");
        }
    }
}