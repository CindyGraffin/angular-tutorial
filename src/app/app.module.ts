// vient du coeur du framework, utilisé pour déclarer des composants
import { NgModule, LOCALE_ID } from "@angular/core";
import { FormsModule } from "@angular/forms";
// module qui va fournir les éléments essentiels au fonctionnement de l'application, par ex ngIf
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PokemonModule } from "./pokemon/pokemon.module";

@NgModule({
	// éléments dont a besoin ce module pour fonctionner
	declarations: [AppComponent, PageNotFoundComponent],
	// éléments qu'on a besoin d'importer dans notre module mais qui sont d'autres modules, se charge dans l'ordre écrit
	imports: [
		BrowserModule, 
		FormsModule, 
		PokemonModule, 
		AppRoutingModule],
	// permet d'utiliser le système d'injection de dépendances d'Angular
	providers: [
		{
			provide: LOCALE_ID,
			useValue: "fr-FR",
		},
	],
	// propre au module racine, permet de dire à Angular quel est le premier composant à démarrer
	bootstrap: [AppComponent],
})
export class AppModule {}
