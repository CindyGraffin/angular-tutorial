import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
	selector: "app-pokemon-form",
	templateUrl: "./pokemon-form.component.html"
})
export class PokemonFormComponent implements OnInit {

	@Input() pokemon: Pokemon;
	pokemonsTypes: string[];

	constructor(private pokemonService: PokemonService, private router: Router) {}

	ngOnInit() {
		this.pokemonsTypes = this.pokemonService.getPokemonTypeList();
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
		console.log('le formulaire à été soumis');
		this.router.navigate(['/pokemon', this.pokemon.id])
	}
}
