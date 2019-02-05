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
        this.filteredCountriesContainer = document.getElementById('selected-filter-countries');
        this.appliedFilters = document.getElementById('applied-filters');
    }

    validateForm(e) {
        if(e)
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
            if(!validator.validateDate(regDateFrom)) {
                this.displayError("Please enter a valid date", this.dateFromFormGroup);
                return;
            }
        }
        if(regDateTo) {
            if(!validator.validateDate(regDateTo)) {
                this.displayError("Please enter a valid date", this.dateFromFormGroup);
                return;
            }
        }

        this.removeError();
        //LOAD THE PLAYERS AGAIN USING THE FILTERS
        let filters = {};
        filters.filterName = filterName;
        filters.selectedFilterCountries = this.selectedFilterCountries;
        filters.regDateFrom = regDateFrom;
        filters.regDateTo = regDateTo;
        filters.sortCriteria = sortCriteria;
        filters.sortType = sortType;

        scoreBoard.loadPlayers(filters);
        this.displayAppliedFilters(filters);
        if(e)
            this.closeForm();
    }

    displayAppliedFilters(filters) {
        let appliedFiltersText='';
        
        if(filters.filterName)
            appliedFiltersText += `<span>Name:</span> ${filters.filterName} `;
        if(filters.selectedFilterCountries.length > 0)
            appliedFiltersText += `<span>Countries:</span> ${filters.selectedFilterCountries} `;
        if(filters.regDateFrom)
            appliedFiltersText += `<span>Date from:</span> ${filters.regDateFrom} `;
        if(filters.regDateTo)
            appliedFiltersText += `<span>Date to:</span> ${filters.regDateTo} `;
        if(filters.sortCriteria)
            appliedFiltersText += `<span>Sort by:</span> ${filters.sortCriteria} `;
        if(filters.sortType)
            appliedFiltersText += `<span>Sort:</span> ${filters.sortType} `;

        this.appliedFilters.innerHTML = appliedFiltersText;

    }

    displayError(msg, target) {
        this.errorMsg.style.visibility = '';
        this.errorMsg.innerHTML = msg;
        target.appendChild(this.errorMsg)
    }

    removeError() {
        this.errorMsg.style.visibility = 'hidden'
    }

    resetForm(e) {
        e.preventDefault();
        this.form.reset();
        this.selectedFilterCountries = [];
        this.appliedFilters.innerHTML='';
    }

    closeForm() {
        this.closeBtn.click();
    }

    addFilterCountries(countryName) {
        this.selectedFilterCountries.push(countryName);
        this.filteredCountriesContainer.value = this.selectedFilterCountries;
    }
    
    removeFilterCountries(countryName) {
        let countryForRemoval = this.selectedFilterCountries.findIndex(x => x === countryName)
        this.selectedFilterCountries.splice(countryForRemoval, 1);
        this.filteredCountriesContainer.value = this.selectedFilterCountries;
    }
    

    populateCountries() {
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
        }
    }
}