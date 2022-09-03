import { Injectable } from "@angular/core";
import { POKEMONS } from "./mock-pokemon-list";
import { Pokemon } from "./pokemon";

@Injectable()
export class PokemonService {
	// récupére l'ensemble des pokemons
	getPokemonList(): Pokemon[] {
		return POKEMONS
	}
	// récupére un pokemon en fonction de son id
	getPokemonById(pokemonId: number): Pokemon | undefined {
		return POKEMONS.find(pokemon => pokemon.id == pokemonId);
	}
	// récupére la liste des types de pokémons
	getPokemonTypeList(): string[] {
		return [
			'Plante', 
			'Feu', 
			'Eau', 
			'Insecte', 
			'Normal', 
			'Electrik', 
			'Poison', 
			'Fée', 
			'Vol', 
			'Combat', 
			'Psy'
		]
	}
}
