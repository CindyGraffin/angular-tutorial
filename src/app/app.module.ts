// vient du coeur du framework, utilisé pour déclarer des composants
import { NgModule } from '@angular/core';
// module qui va fournir les éléments essentiels au fonctionnement de l'application, par ex ngIf
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  // éléments dont a besoin ce module pour fonctionner
  declarations: [
    AppComponent
  ],
  // éléments qu'on a besoin d'importer dans notre module mais qui sont d'autres modules
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  // permet d'utiliser le système d'injection de dépendances d'Angular
  providers: [],
  // propre au module racine, permet de dire à Angular quel est le premier composant à démarrer
  bootstrap: [AppComponent]
})
export class AppModule { }
