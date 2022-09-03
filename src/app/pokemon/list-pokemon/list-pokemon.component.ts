import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  
})
export class ListPokemonComponent {

  pokemonList: Pokemon[];

  constructor(private router: Router, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonList = this.pokemonService.getPokemonList();
  }

  goToPokemonDetail(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id])
  }

}
