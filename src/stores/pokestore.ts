import { Writable, writable } from 'svelte/store';
import type { Pokemon, Pokemons } from '../models/pokemon.model';

export const pokemons: Writable<Pokemon[]> = writable([]);
const pokemonDetails: Record<number, Pokemon> = {};

let loaded = false;

export const getPokemons = async (): Promise<void> => {
	if (loaded) return;

	try {
		const url = 'https://pokeapi.co/api/v2/pokemon?limit=150';
		const response: Response = await fetch(url);
		const data: Pokemons = await response.json();
		const loadedPokemon: Pokemon[] = data.results.map((data, index) => ({
			name: data.name,
			id: `${index + 1}`,
			image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
				index + 1
			}.png`
		}));
		pokemons.set(loadedPokemon);
		loaded = true;
	} catch (error) {
		console.error(error);
	}
};

export const getPokemonById = async (id: string): Promise<Pokemon> => {
	if (pokemonDetails[id]) return pokemonDetails[id];

	try {
		const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
		const response: Response = await fetch(url);
		const data: Pokemon = await response.json();
		pokemonDetails[id] = {
			id: data.id,
			name: data.name,
			image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
			weight: data.weight,
			height: data.height,
			types: data.types
		};
		return pokemonDetails[id];
	} catch (error) {
		console.error(error);
	}
};
