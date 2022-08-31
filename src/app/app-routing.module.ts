import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailPokemonComponent } from "./detail-pokemon/detail-pokemon.component";
import { ListPokemonComponent } from "./list-pokemon/list-pokemon.component";

const routes: Routes = [
	{path: 'pokemons', component: ListPokemonComponent},
	{path: 'pokemon/:id', component: DetailPokemonComponent},
	// route par défaut au démarrage de l'application, 'pathMatch' permet d'éviter les effets de bord sur les routes et de mieux gérer les choses
	{path: '', redirectTo: 'pokemons', pathMatch: 'full'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

// router-outlet va permettre de relier les routes qu'on a défini avec notre template
