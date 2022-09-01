import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { POKEMONS } from '../mock-pokemon-list';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styles: [
  ]
})
export class ListPokemonComponent {

  pokemonList: Pokemon[] = POKEMONS;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPokemonDetail(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id])
  }

}
