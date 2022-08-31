import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { POKEMONS } from "../mock-pokemon-list";
import { Pokemon } from "../pokemon";

@Component({
	selector: "app-detail-pokemon",
	templateUrl: "./detail-pokemon.component.html"
})
export class DetailPokemonComponent implements OnInit {

	pokemonList: Pokemon[];
	pokemon: Pokemon | undefined;

	//on rend disponible le router depuis le constructeur, activatedRoute donne accès à la route courante
	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {
		//  on récupère les paramètres à un instant T (c'est pour cela qu'il y a snapshot)
		const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
		this.pokemonList = POKEMONS;
		if (pokemonId) {
			this.pokemon = this.pokemonList.find(pokemon => pokemon.id === +pokemonId)
		}
	}
}
