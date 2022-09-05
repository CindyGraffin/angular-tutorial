import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { Pokemon } from "./pokemon";

@Injectable()
export class PokemonService {
	constructor(private http: HttpClient) {

	}
	// récupére l'ensemble des pokemons
	getPokemonList(): Observable<Pokemon[]> {
		return this.http.get<Pokemon[]>('api/pokemons').pipe(
			tap((response) => this.log(response)),
			catchError((error) => this.handleError(error, []))
		)
	}

	// récupére un pokemon en fonction de son id
	getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
		return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
			tap((pokemon)=> console.log(pokemon)),
			catchError((error) => this.handleError(error, undefined))
		)
	}

	private log(response: Pokemon[] | Pokemon | undefined) {
		console.table(response);
	}

	private handleError(error: Error, errorValue: any) {
		console.error(error);
		return of(errorValue);
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
