import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from "rxjs";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
	selector: "app-search-pokemon",
	templateUrl: "./search-pokemon.component.html",
})
export class SearchPokemonComponent implements OnInit {

	// va représenter le flux des recherches de l'utilisateur
	searchTerms = new Subject<string>();
	// flux de pokémons
	pokemons$: Observable<Pokemon[]>;

	constructor(private router: Router, private pokemonService: PokemonService) {}

	ngOnInit(): void {
		this.pokemons$ = this.searchTerms.pipe(
		debounceTime(300), // permet d'éliminer les recherches qui n'ont pas au moins un certain nombre de millisecondes d'attente après
		// RxJS va donc construire un nouveau flux de recherche qui correspond mieux à la recherche de l'utilisateur, ce qui permet d'éliminer des requêtes dont nous n'avons pas besoin
		distinctUntilChanged(), // opérateur qui va attendre qu'il y ait un changement dans les termes de recherche et procurer un nouveau flux de données
		switchMap((term) => this.pokemonService.searchPokemonList(term)) // à chaque fois que l'utilisateur va lancer une nouvelle recherche, je veux anuler la dernière recherche si elle est déjà en cours et venir effectuer uniquement la recherche la plus récente
		)
	}

	search(term: string) {
		this.searchTerms.next(term)
	}

	goToDetail(pokemon: Pokemon) {
		const link = ['/pokemon', pokemon.id];
		this.router.navigate(link)
	}
}
