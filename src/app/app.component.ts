import { Component, OnInit } from "@angular/core";
import { Pokemon } from "./pokemon";
import { POKEMONS } from "./mock-pokemon-list";

// Vue = portion de l'écran controllée par un composant, va être définie dans le template d'un composant et pilotée par la classe du composant

// @ est un décorateur
@Component({
	// nom du composant, de la balise
	selector: "app-root",
	// définit le code HTML associé à ce composant
	template: `<h1>Liste de Pokémons</h1> `,
})

// OnInit est une interface du cycle de vie du composant, il faut ensuite définir la méthode associée
export class AppComponent implements OnInit {
	// pokemons est une propriété, angular va pousser cette valeur dans le template ci-dessus
	pokemonList: Pokemon[] = POKEMONS;

	// constructor() {
	// 	this.pokemonList = []; ❌ Il est recommandé de garder toute la logique du composant en dehors du constructeur, qui n'est pas fait pour ça
	// }

	ngOnInit() {
		console.table(this.pokemonList);
		this.selectPokemon(POKEMONS[0])
	}

	// pokemon: Pokemon est un contrat d'interface, il prend en paramétre un objet métier
	selectPokemon(pokemon: Pokemon) {
		console.log(` Vous avez cliqué sur le pokemon ${pokemon.name}`);
	}
}
