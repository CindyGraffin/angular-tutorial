import { NgModule, LOCALE_ID } from "@angular/core";
import { CommonModule } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { registerLocaleData } from "@angular/common";
import { DetailPokemonComponent } from "./detail-pokemon/detail-pokemon.component";
import { ListPokemonComponent } from "./list-pokemon/list-pokemon.component";
import { BorderCardDirective } from "./border-card.directive";
import { PokemonTypeColorPipe } from "./pokemon-type-color.pipe";
import { RouterModule, Routes } from "@angular/router";
import { PokemonService } from "./pokemon.service";
import { FormsModule } from "@angular/forms";
import { PokemonFormComponent } from "./pokemon-form/pokemon-form.component";
import { EditPokemonComponent } from "./edit-pokemon/edit-pokemon.component";
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component';
import { LoaderComponent } from './loader/loader.component';
import { AuthGuard } from "../auth.guard";

registerLocaleData(localeFr);

const pokemonRoutes: Routes = [
	{path: "edit/pokemon/:id", component: EditPokemonComponent, canActivate: [AuthGuard]}, // quand un utilisateur va demander à accéder à cette route, on va appeler AuthGuard et si CanActivate renvoie true, l'utilisateur pourra accéder à la page alors que s'il renvoit false, l'accès à cette page est bloqué
	{path: "pokemon/add", component: AddPokemonComponent, canActivate: [AuthGuard]},
	{ path: "pokemons", component: ListPokemonComponent, canActivate: [AuthGuard] },
	{ path: "pokemon/:id", component: DetailPokemonComponent, canActivate: [AuthGuard] }
];

@NgModule({
	declarations: [
		DetailPokemonComponent,
		ListPokemonComponent,
		BorderCardDirective,
		PokemonTypeColorPipe,
		PokemonFormComponent,
		EditPokemonComponent,
        AddPokemonComponent,
        SearchPokemonComponent,
        LoaderComponent,
	],
	imports: [CommonModule, FormsModule, RouterModule.forChild(pokemonRoutes)],
	providers: [
		{
			provide: LOCALE_ID,
			useValue: "fr-FR",
		},
		PokemonService,
	],
})
export class PokemonModule {}
