import { HttpClient, HttpHeaders } from "@angular/common/http";
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
			catchError((error) => this.handleError(error, []))
		)
	}

	// récupére un pokemon en fonction de son id
	getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
		return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
			catchError((error) => this.handleError(error, undefined))
		)
	}

	updatePokemon(pokemon: Pokemon): Observable<null> {
		const httpOptions = {
			headers: new HttpHeaders({'Content-Type': 'application/json'}) 
		};
		return this.http.put('api/pokemons', pokemon, httpOptions)
						.pipe(catchError(error => this.handleError(error, null)))
	}

	deletePokemonById(pokemonId: number): Observable<null> {
		return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
			catchError((error) => this.handleError(error, null))
		)
	}

	addPokemon(pokemon: Pokemon): Observable<Pokemon> {
		const httpOptions = {
			headers: new HttpHeaders({'Content-Type': 'application/json'}) 
		};
		return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions)
						.pipe(catchError(error => this.handleError(error, null)))
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
