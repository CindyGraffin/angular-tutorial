import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { POKEMONS } from "../mock-pokemon-list";
import { Pokemon } from "../pokemon";

@Component({
	selector: "app-detail-pokemon",
	templateUrl: "./detail-pokemon.component.html"
})
export class DetailPokemonComponent implements OnInit {

	pokemonList: Pokemon[];
	pokemon: Pokemon | undefined;

	//on rend disponible le router depuis le constructeur, activatedRoute donne accès à la route courante, il donne accès au service route au composant
	constructor(private route: ActivatedRoute, private router: Router) {}

	ngOnInit(): void {
		//  on récupère les paramètres à un instant T (c'est pour cela qu'il y a snapshot)
		const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
		this.pokemonList = POKEMONS;

		if (pokemonId) {
			this.pokemon = this.pokemonList.find(pokemon => pokemon.id === +pokemonId)
		}
	}

	goToPokemonList(): void {
		this.router.navigate(['/pokemons'])
	}
}
