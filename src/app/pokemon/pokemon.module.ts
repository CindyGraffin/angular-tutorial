import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { BorderCardDirective } from './border-card.directive';
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';
import { RouterModule, Routes } from '@angular/router';


registerLocaleData(localeFr);

const pokemonRoutes: Routes = [
	{path: 'pokemons', component: ListPokemonComponent},
	{path: 'pokemon/:id', component: DetailPokemonComponent},
];

@NgModule({
  declarations: [
    DetailPokemonComponent,
    ListPokemonComponent,
    BorderCardDirective,
    PokemonTypeColorPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pokemonRoutes)
  ],
  providers: [{
    provide: LOCALE_ID, useValue: 'fr-FR'
  }],
})
export class PokemonModule { }
