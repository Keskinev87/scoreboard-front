var scoreBoard;
var filterForm;
var addForm;
var addNewForm;
var validator;
const BACKEND_URL = 'http://localhost:3000'

function main(){
    scoreBoard = new ScoreBoard();
    filterForm = new FilterForm();
    addForm = new AddForm();
    validator = new Validator();
    console.log(validator)
    console.log(filterForm)
    scoreBoard.loadPlayers();
    filterForm.populateCountries();
    addForm.populateCountries();
    
    addListeners();

    function addListeners() {
        document.addEventListener('change', (event) => {
            if(event.target.type === 'checkbox' && !event.target.classList.contains('selected')){
                filterForm.addFilterCountries(event.target.value);
                event.target.classList.add('selected');
            } else if(event.target.type === 'checkbox') {
                filterForm.removeFilterCountries(event.target.value);
                event.target.classList.remove('selected');
            }
                
        })
    }
}