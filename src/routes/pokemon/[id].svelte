<script context="module" lang="typescript">
	import type { LoadInput } from '@sveltejs/kit';
	import type { Pokemon } from 'src/models/pokemon.model';
	import { getPokemonById } from '../../stores/pokestore';

	export async function load(loadInput: LoadInput) {
		let id = loadInput.page.params.id;
		const pokemon: Pokemon = await getPokemonById(id);
		return { props: { pokemon: pokemon } };
	}
</script>

<script lang="typescript">
	export let pokemon: Pokemon;
	const type: string = pokemon?.types[0].type.name;
</script>

<svelte:head>
	<title>Pokedex - {pokemon?.name}</title>
</svelte:head>

{#if pokemon}
	<div class="flex flex-col items-center">
		<h1 class="text-4xl text-center my-8 uppercase">{pokemon.name}</h1>
		<p>
			Type: <strong>{type}</strong> | Height: <strong>{pokemon.height}</strong>
			| Weight: <strong>{pokemon.weight}</strong>
		</p>
		<img class="card-image" src={pokemon.image} alt={pokemon.name} />
	</div>
{/if}
