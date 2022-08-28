import { Component, OnInit } from "@angular/core";
import { Pokemon } from "./pokemon";
import { POKEMONS } from "./mock-pokemon-list";

// Vue = portion de l'écran controllée par un composant, va être définie dans le template d'un composant et pilotée par la classe du composant

// @ est un décorateur
@Component({
	// nom du composant, de la balise
	selector: "app-root",
	// définit le code HTML associé à ce composant, un template est la vue du composant qui contient le code de l'interface utilisateur
	templateUrl: 'app.component.html',
	// template: `<h1>Liste de Pokémons</h1> 
	// <p>Ceci est un paragraphe</p>`,
})

// partie logique du composant
// OnInit est une interface du cycle de vie du composant, il faut ensuite définir la méthode associée
export class AppComponent implements OnInit {
	// pokemons est une propriété, angular va pousser cette valeur dans le template ci-dessus
	pokemonList: Pokemon[] = POKEMONS;
	pokemonSelected: Pokemon | undefined;

	// constructor() {
	// 	this.pokemonList = []; ❌ Il est recommandé de garder toute la logique du composant en dehors du constructeur, qui n'est pas fait pour ça
	// }

	ngOnInit() {
		console.table(this.pokemonList);
	}

	// pokemon: Pokemon est un contrat d'interface, il prend en paramétre un objet métier
	selectPokemon(pokemonId: string) {
		const pokemon: Pokemon | undefined = this.pokemonList.find(pokemon => pokemon.id == +pokemonId)
		// cast en HTMLInputElement de event.target qui permet de travailler dans la classe de notre composant
		// + transforme le caractére à droite en nombre, quand il n'y a pas de valeur dans l'input null est convertit en 0 
		// const index: number = +(event.target as HTMLInputElement).value
		if (pokemon) {
			console.log(` Vous avez demandé le pokémon ${pokemon.name}`);
			this.pokemonSelected = pokemon;
		} else {
			console.log(` Vous avez demandé un pokémon qui n'existe pas`);
			this.pokemonSelected = pokemon;
		}
	}
}
