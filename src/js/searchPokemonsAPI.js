import axios from "axios";

export default class SearchPokemonsAPI {
	constructor() {
		this.baseURL = "https://pokeapi.co/api/v2/";
		this.limit = 10;
		this.offset = 10;
	}
	getPokemons() {
		const pokemonsUrl = `${this.baseURL}pokemon?limit=${this.limit}&offset=${this.offset}`

		return axios.get(pokemonsUrl)
			.then(response => {
				if (response.status !== 200) {
					throw new Error(response.data.error);
				}
				this.increaseOffset();
				return response.data
			})
	}
	getPokemonsImage(name) {
		const imagesUrl = `${this.baseURL}pokemon/${name}`

		return axios.get(imagesUrl)
			.then(response => {
				if (response.status !== 200) {
					throw new Error(response.data.error);
				}
				return response.data
			})
	}
	increaseOffset() {
		this.offset += 10;
	}
}