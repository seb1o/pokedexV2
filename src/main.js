import PokeService from "./services/poke-service.js";

const pService = new PokeService();
const typeSelect = document.getElementById('pokemon-type');
const enterButton = document.getElementById('enter-button');

pService.getPokeData().then(data => render(data));

function next( ){
    pService.nextPage();
    pService.getPokeData().then(data => render(data));
}
window.next = next;

function previous( ){
    pService.previousPage();
    pService.getPokeData().then(data => render(data));
}
window.previous = previous;

function fetchTypes() {
    const url = PokeService.BASE_URL + PokeService.TYPE_URL;
    fetch(url)
        .then(response => response.json())
        .then(data => populateDropdown(data))
        .catch(err => console.log(err));
  }


  function populateDropdown(data) {
    const types = data.results;
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type.name;
        option.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
        typeSelect.appendChild(option);
    });
  }

enterButton.addEventListener('click', () => {
    const selectedType = typeSelect.value;
    if (selectedType) {
        window.location.href = `type.html?type=${selectedType}`;
    } else {
        alert(" Pokémon type not selected.");
    }
  });






function render(data){

    console.log(data);

    const dexContainer = document.getElementById('dex-container');
    dexContainer.innerText = ''

    


    for (const pokemon of data) {
        
        const pokeLink = document.createElement('a');
        pokeLink.href= '/detail.html/'+ pokemon.id

        const img = document.createElement('img');

        img.src = pokemon.sprites.front_default;

        pokeLink.appendChild(img);

        const node = document.createTextNode(pokemon.name);

        pokeLink.appendChild(node);

        

        dexContainer.appendChild(pokeLink)
    }

}


fetchTypes();