export interface Pokemons {
	results: Pokemon[];
}

export interface Pokemon {
	id: string;
	name: string;
	image: string;
	weight?: number;
	height?: number;
	types?: {
		type: {
			name: string;
		};
	}[];
}
