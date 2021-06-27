<script lang="typescript">
	import type { Pokemon } from 'src/models/pokemon.model';
	import PokemonCard from '../components/pokemonCard.svelte';
	import { getPokemons, pokemons } from '../stores/pokestore';

	let searchTerm = '';
	let filteredPokemon: Pokemon[] = [];
	$: {
		if (searchTerm) {
			filteredPokemon = $pokemons.filter((pokemon: Pokemon) =>
				pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredPokemon = [...$pokemons];
		}
	}
	getPokemons();
</script>

<svelte:head>
	<title>Pokedex</title>
</svelte:head>

<h1 class="text-4xl text-center my-8 uppercase">SvelteKit Pokedex</h1>
<input
	class="w-full rounded-md text-lg p-4 border-2 border-gray-200"
	bind:value={searchTerm}
	placeholder="Search Pokemon"
/>
<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
	{#each filteredPokemon as pokemon}
		<PokemonCard {pokemon} />
	{/each}
</div>
