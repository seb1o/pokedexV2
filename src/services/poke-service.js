class PokeService {

    static BASE_URL = 'https://pokeapi.co/api/v2/'
    static POKEMON_URL = 'pokemon/'
    static TYPE_URL = "type/"

    constructor(limit = 10, offset=0){
        this.limit = limit;
        this.offset = offset;
    }

    getPokeData(){
        const url = PokeService.BASE_URL + PokeService.POKEMON_URL + '?limit=' + this.limit + '&offset=' + this.offset;
        //const ulr1 = `${PokeService.BASE_URL}${PokeService.POKEMON_URL}?limit=${this.limit}&offset=${this.offset}`;
        // 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0'

        
        
        return fetch(url)
        .then(res => res.json())
        .then(data => {
        
            const requests = [];

            for (const pokemon of data.results) {
                
                const pokeUrl = pokemon.url;

                const request =  fetch(pokeUrl)
                .then(result => result.json())
                .then(pokemonData => pokemonData)
                .catch(err => console.log(err));

                requests.push(request);

            }

            return Promise.all(requests);

        })
        .catch(err => console.log(err));
    }

    nextPage() {
        if (this.offset > 1301 - this.limit) {
            this.offset = 0

        } else {
            this.offset += this.limit
        }

    }

    previousPage() {

        if (this.offset > 0) {
            this.offset -= this.limit;
        } else {
            this.offset = 1302 - this.limit
        }

    }

    getPokemonByType(type) {
        const url = PokeService.BASE_URL + PokeService.TYPE_URL + type;
        return fetch(url)
            .then(response => response.json())
            .then((data) => {
                const pokeList = [];
                if (data && data.pokemon) {
                    for (const entry of data.pokemon) {
                        pokeList.push(entry.pokemon);
                    }
                } else {
                    console.log(`No Pokémon found for this type: ${type}`);
                }
                return pokeList;
            })
            .then(pokeList => {
                const requests = [];
                for (const poke of pokeList) {
                    const request = fetch(poke.url)
                        .then(response => response.json())
                        .then(data => data)
                        .catch(err => console.log(err));
                    requests.push(request);
                }
                return Promise.all(requests);
            })
            .catch(err => {
                console.log(`Error : ${err}`);
                return [];
            });
    }


    getPokemonById(id){

        const url = PokeService.BASE_URL + PokeService.POKE_URL + id;
        return fetch(url)
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.log(err));


    }



}



export default PokeService;