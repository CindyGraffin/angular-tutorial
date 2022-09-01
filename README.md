### Les composants

Un composant est un

**Vue**: portion de l'écran controllée par un composant, va être définie dans le template d'un composant et pilotée par la classe du composant

`selector`:  nom du composant, de la balise qui lui sera associée 
`templateUrl`: définit le code HTML associé à ce composant, un template est la vue du composant qui contient le code de l'interface utilisateur
`OnInit`: interface du cycle de vie du composant, il faut ensuite définir la méthode associée  

Exemple: 
````ts
@Component({
	selector: "app-root",
	templateUrl: 'app.component.html',
})
// ci dessous, la partie logique du composant
export class AppComponent implements OnInit { 
    constructor() {
	// 	this.pokemonList = []; ❌ Il est recommandé de garder toute la logique du composant en dehors du constructeur, qui n'est pas fait pour ça
	}
    ngOnInit() {
        console.log('Hello Angular !')
    }
}
````



### Les directives

`@Directive`: Une directive est une classe angular qui ressemble à un composant mais n'a pas de template, la classe `Component` hérite de la classe directive. Elle change l'apparence ou le comportement d'un élément.
Elle permet d'intéragir avec des éléments HTML d'une page, en leur attachant un comportement spécifique.  
Elle possède un sélecteur css, qui indique au framework où l'activer dans notre template, lorsqu'angular trouve une directive dans le template, il instancie la classe de notre directive correspondante et lui donne le controle sur la portion du dom qui lui convient.  
Il y a 3 types de directives:
- les composants
- les directives d'attributs
- les directives structurelles (ngIf, ngFor ...)



`elementRef` est une référence vers l'élément du dom sur lequel nous allons appliquer une directive, exemple:
````ts
constructor(private element: ElementRef) {
	this.setBorder(this.initialColor);
	this.setWidth(this.defaultWidth)
}
````

`@Input`: propriété d'entrée, exemples:
- avec un **alias** qui permet de nommer la propriété de notre directive comme on le souhaite et utiliser ce nom ailleurs dans la directive:
````ts
@Input('pokemonBorderColor') pokemonBorderColor: string;`
````

- sans alias:
````ts
@Input('pokemonWidth') pokemonWidth: string;` sans alias
````

`@Host Listener`: permet de lier une méthode de notre directive à un évéenement donné, exemple:
````ts
@HostListener('mouseenter') onMouseEnter() {
	this.setBorder(this.pokemonBorderColor || this.defaultColor);
	this.setWeight(this.pokemonWeight);
	this.setWidth(this.pokemonWidth);
}
````

### Les pipes

Un pipe permet d'effectuer des transformations dans le template. Il est également possible de créer des pipes personnalisés. Exemple de pipe qui renvoie une classe css différente selon le type de Pokémon:

````ts
@Pipe({ name: "pokemonTypeColor" })
export class PokemonTypeColorPipe implements PipeTransform {
	transform(type: string): string {
		let color: string;
		switch (type) {
			case "Feu":
				color = "red lighten-1";
				break;
			case "Eau":
				color = "blue lighten-1";
				break;
			default:
				color = "grey";
				break;
		}
        // chip est une classe de materialize qui permet d'afficher un rond de couleur 
		return "chip " + color;
	}
}
// utilisation du pipe
<p class="{{type | pokemonTypeColor}}">Mon Pokémon</p>
````

### Les routes 

On rend disponible le router depuis le constructeur. `ActivatedRoute` donne accès à la route courante, au service route au composant.
Exemple: 
````ts
constructor(private route: ActivatedRoute, private router: Router) {}
````

Configurer la route par défaut au démarrage de l'application: 
````ts
{path: '', redirectTo: 'pokemons', pathMatch: 'full'}
````
`pathMatch: 'full'` permet d'éviter les effets de bord sur les routes et de mieux gérer les choses.

Configurer la route **404 Not Found**:
````ts
{path: '**', component: PageNotFoundComponent}
````

Pour relier les routes définies avec notre template, il faut utiliser router-outlet:
````ts
<router-outlet></router-outlet>
````

Il existe deux façons de naviguer entre les pages:

- Utiliser la méthode `navigate` du router, méthode que l'on favorise, puisqu'il est préférable de séparer la logique du template:
````ts
goToPokemonDetail(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id])
}
````

- Utiliser la directive `routerLink` directement dans le template:
````ts
<a routerLink="/pokemons" class="waves-effect waves-teal btn-flat">
    Retourner à l' accueil
</a>
````

Pour récupérer un paramètre d'url à un instant T, on utilise la `snapshot`. Exemple: 
````ts
const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
````

### Les modules

Une application Angular est modulaire, elle est composée de modules de fonctionnalités. 

Propriétés du décorateur `@NgModule`:

- `declarations`: classes de vues (Composant, Directive et Pipes)
- `exports`: sous ensemble de classes de vues à exporter (doivent être visibles et utilisables dans les templates d'autres modules)
- `imports`: concerne toutes les classes exportées depuis d'autres modules, nécessaire au fonctionnement du module actuel
- `providers`: services et injections de dépendances qui permettent de fournir un service au module
- `bootstrap`: propre au module racine, permet de dire à Angular quel est le premier composant à démarrer (composant racine)