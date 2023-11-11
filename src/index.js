import SimpleLightbox from "simplelightbox";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'normalize.css';
import SearchPokemonsAPI from "./js/searchPokemonsAPI";

const loader = document.querySelector(".loader");
const showPokemonsBtn = document.querySelector(".show-pokemons");
const pokemonsContainer = document.querySelector(".pokemons-btn-container");
const pokemonsPhotoContainer = document.querySelector(".pokemons-photo-container");
const loadMoreBtn = document.querySelector(".load-more")


const pokemons = new SearchPokemonsAPI();
const simpleLightBox = new SimpleLightbox(".pokemonsPhotoContainer a", { close: true, });

const createButtonWithPokemonsName = (id, pokemonName) => {
	return `<button id="${id}" class="pokemon-name">${pokemonName}</button>`;
}

const createPokemonImage = (largeImage, src) => {
	return `<a  href="${largeImage}"><image class="svg-img" src="${src}"></image></a>`
}

const onClickShowPokemonsBtn = () => {
	pokemons.getPokemons()
		.then(data => {
			let buttons = data.results.reduce((markup, pokemon) => markup + createButtonWithPokemonsName(pokemon.name, pokemon.name), "");
			pokemonsContainer.insertAdjacentHTML('beforeend', buttons);
		})
		.finally(() => {
			showPokemonsBtn.style.display = "none";
			loadMoreBtn.style.display = "block";
		})
}
loader.style.display = "none";
const choosePokemonsName = (event) => {
	event.preventDefault();
	if (event.target.className !== "pokemon-name") {
		return;
	}
	loader.style.display = "flex";
	pokemons.getPokemonsImage(event.target.id)
		.then(data => {
			event.target.style.backgroundColor = "#924897";
			event.target.style.color = "white";
			largeImg = data.sprites.other.home.front_default;
			svgImg = data.sprites.other.dream_world.front_default;
			pokemonsPhotoContainer.innerHTML = createPokemonImage(largeImg, svgImg);
		})

}

const onClickLoadMore = () => {
	pokemons.getPokemons()
		.then(data => {
			let buttons = data.results.reduce((markup, pokemon) => markup + createButtonWithPokemonsName(pokemon.name, pokemon.name), "");
			pokemonsContainer.insertAdjacentHTML('beforeend', buttons);
		})
}


loadMoreBtn.addEventListener("click", onClickLoadMore);
showPokemonsBtn.addEventListener("click", onClickShowPokemonsBtn);
pokemonsContainer.addEventListener("click", choosePokemonsName);



