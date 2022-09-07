import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
	selector: "app-pokemon-form",
	templateUrl: "./pokemon-form.component.html",
	styleUrls: ['pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {

	@Input() pokemon: Pokemon;
	pokemonsTypes: string[];
	isAddForm: boolean;

	constructor(private pokemonService: PokemonService, private router: Router) {}

	ngOnInit() {
		this.pokemonsTypes = this.pokemonService.getPokemonTypeList();
		this.isAddForm = this.router.url.includes('add');
	}

	hasType(type: string): boolean {
		return this.pokemon.types.includes(type);
	}

	selectType($event: Event, type: string): void {
		const isChecked = ($event.target as HTMLInputElement).checked;
		// Lorsque l'utilisateur va cocher la case on ajoute le type aux types du Pokémon
		if (isChecked) {
			this.pokemon.types.push(type)
		// Lorsque l'utilisateur va décocher la case on supprime le type aux types du Pokémon
		} else {
			const index = this.pokemon.types.indexOf(type)
			this.pokemon.types.splice(index, 1);
		}
	}

	onSubmit() {
		if (this.isAddForm) {
			this.pokemonService
				.addPokemon(this.pokemon)
				.subscribe((pokemon: Pokemon) => this.router.navigate(['/pokemon', pokemon.id]))
		} else {
			this.pokemonService
				.updatePokemon(this.pokemon)
				.subscribe(() => this.router.navigate(['/pokemon', this.pokemon.id]))
		}
	}

	/**
	 * Gére l'ajout ou la suppresion de type pour un pokemon
	 * @param { String } type
	 * @returns { Boolean }
	 */
	isTypesValid(type: string): boolean {
		if (this.pokemon.types.length == 1 && this.hasType(type)) {
			return false
		} else if (this.pokemon.types.length > 2 && !this.hasType(type)) {
			return false;
		}
		return true;
	}
}
