class AddForm {
    constructor(){
        this.form = document.getElementById("add-form");
        this.countryOptions = document.getElementById('playersCountry');
        this.nameFormGroup = document.getElementById('add-name-group');
        this.countryFormGroup = document.getElementById('add-country-group')
        this.scoreFormGroup = document.getElementById('add-score-group'); 
        this.closeBtn = document.getElementById("add-form-close-btn");
        this.errorMsg = document.getElementById('err-msg');
        this.nameError = false;
        this.countryError = false;
        this.scoreError = false;
    }

    populateCountries() {
        for (let country of countries){
            let countryOption = document.createElement('option');
            countryOption.innerHTML = country;
            this.countryOptions.appendChild(countryOption);
        }
    }

    prepareForm(e) {
        //TODO: return the country check
        e.preventDefault();
        let playersName = document.getElementById('playersName').value;
        let playersCountry = document.getElementById('playersCountry').value;
        let playersScore = document.getElementById('playersScore').value;

        //validation if all inputs are entered
        if(!playersName || playersName.length == 0)
            this.displayError("Please enter a name", this.nameFormGroup);
        // else if(!playersCountry || playersCountry.length == 0)
        //     this.displayError("Please select a country", this.countryFormGroup);
        else if(!playersScore || playersScore.length == 0)
            this.displayError("Please enter a score", this.scoreFormGroup);
        else {
            //validation if the inputs are correct
            this.validateInput('name');
            // this.validateInput('country');
            this.validateInput('score');   
            //check if there are any errors
            if(!this.nameError && !this.countryError && !this.scoreError) {
                //Submit form
                
                let url = new URL(BACKEND_URL + '/players/add')
                let player = {name: playersName, country: playersCountry, score: playersScore};
                let queryOptions = {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    redirect: "follow",
                    body: JSON.stringify(player)
                }

                this.submitForm(url, queryOptions);
            }
        }
        
    }

    async submitForm(url, options) {
        let statusCode;
        let status = await fetch(url, options)
            .then((response) => {
                statusCode = response.status;
                return response.json();
            }).then((responseValue) => {
                console.log(responseValue)
                return responseValue;
            })
            .catch(error => {
                console.log(error.status)
                console.log(error.code)
                return error;
            });
        
        switch (statusCode) {
            case 200:
                console.log("close form")
                this.closeBtn.click();
                break;
            case 400:
                if(status == 'name')
                    this.displayError("Names must be under 80 characters and include only numbers and digits!", this.nameFormGroup);
                else if(status == 'country')
                    this.displayError("Country names must be under 50 characters and may include only numbers and digits!", this.countryFormGroup);
                else if(status == 'score')
                    this.displayError("The score must be a positive number less than 100!", this.scoreFormGroup);
                else if(status == 'exists')
                    this.displayError("There is a player with that name already. Please choose another one.", this.form)
                else 
                    this.displayError("Invalid data. Please contact support", this.form)
                break;
            case 500:
                this.displayError("Server error. Please contact support", this.form)
                break;
            default:
                this.displayError("No connection to the server. Please check your connection and retry. If the problem persists, please contact support!", this.form)
                break;
        }
    
    }

    validateInput(type){
        switch (type){
            case 'name':
                let playersName = document.getElementById('playersName').value;
                if(!validator.validateName(playersName)) {
                    this.displayError("Names must be under 80 characters and include only numbers and digits!", this.nameFormGroup);
                    this.nameError = true;
                } else {
                    this.removeError(this.nameFormGroup);
                    this.nameError = false;
                }
                break;
            case 'country':
                let playersCountry = document.getElementById('playersCountry').value;
                if(!validator.validateCountry(playersCountry)) {
                    this.displayError("Country names must be under 50 characters and may include only numbers and digits!", this.countryFormGroup)
                    this.countryError = true;
                } else {
                    this.removeError(this.countryFormGroup);
                    this.countryError = false;
                }
                break;
            case 'score':
                let playersScore = document.getElementById('playersScore').value;
                if(!validator.validateScore(playersScore)) {
                    this.displayError("The score must be a positive number less than 100!", this.scoreFormGroup)
                    this.scoreError = true;
                } else {
                    this.removeError();
                    this.scoreError = false;
                }
                break;
            default:
                break;
        }
    }

    displayError(msg, target) {
        
        this.errorMsg.style.visibility = '';
        this.errorMsg.innerHTML = msg;
        target.appendChild(this.errorMsg)
    }

    removeError() {
        this.errorMsg.style.visibility = 'hidden'
    }

}