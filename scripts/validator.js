class Validator {
    constructor() {
        this.nameMaxChar = 80;
        this.nameRegex = /^[a-z\d\s]+$/i;
        this.countryMaxChar = 50;
        this.countryRegex = /^[a-z\d\s]+$/i;
        this.dateRegex = /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/;
        this.scoreRegex = /^[0-9]*$/;
    }

    validateName(name){
        
        let reg = new RegExp(this.nameRegex);
       
        if(name.length > this.nameMaxChar)
            return false;
        else if(!reg.test(name))
            return false;
        else
            return true;
    }

    validateCountry(country){
        console.log("checking for country")
        let reg = new RegExp(this.countryRegex);
        if(country.length > this.countryMaxChar)
            return false;
        else if(!reg.test(country))
            return false;
        else
            return true;
    }

    validateDate(date) {
        console.log("checking for date")
        let reg = new RegExp(this.dateRegex);
        if(!reg.test(date))
            return false;
        else
            return true
    }

    validateScore(score) {
        let reg = new RegExp(this.scoreRegex);

        if(!reg.test(score))
            return false;
        else 
            return true;
    }

}