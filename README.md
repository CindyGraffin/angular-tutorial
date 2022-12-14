# Tutoriel Angular

Ce projet est réalisé dans le cadre d'une vidéo tutoriel sur Angular, sur le théme des Pokémons. Les différentes fonctionnalités sont:
- La visualisation de la liste globale des pokémons avec la possibilité de voir les détails de chaque pokemon
- La possibilité de modifier certaines informations concernant chaque pokémon.  

J'ai rédigé par mes propre soins dans ce readme, un récapitulatif de tout ce que j'ai appris au sein de ce tutoriel.  

La vidéo du tutoriel à été réalisée par le youtubeur Simon Dieny, que je tiens a remercier, pour la clarté de ses explications et le contenu riche de cette vidéo qui m'a permise d'acquérir de bonnes bases sur Angular:pray:

Je vous laisse le lien de la vidéo YouTube, n'hésitez pas à lui laisser un petit "*J'aime*" si vous avez apprécié le contenu:  [Angular Tutorial Français pour Débutant - Cours complet 9h [2022]](https://www.youtube.com/watch?v=DTIYVffhJuU&t=15350s&ab_channel=SimonDieny-ReconversionFullstackJavaScript)

Lien de la documentation officielle Angular: [angular.io](https://angular.io/)

## Angular

**Angular** est un framework de développement d'applications web, construit sur Typescript, permettant de créer des applications dynamiques. Il comprend:
- Un cadre basé sur des composants
- Une collection de librairies comme par exemple le routage, la gestion de formulaire
- Une suite d'outils de développements pour construire, tester et mettre à jour le code

## Pré-requis

Avant de suivre ce tutoriel, ou de lire cette documentation, il est fortement conseillé:
- d'avoir de bonnes connaissances en HTML, CSS et JavaScript
- de disposer d'un éditeur de code (par exemple *VSCode*)

## Installation

1. `git clone https://github.com/CindyGraffin/angular-tutorial.git`: clone le projet dans un dossier local
2. `npm install`: installe tout les packages dont le projet dépend
3. `ng serve`: compile et lance l'application sur un port donné

❗**Important**: Le `name` et le `password` pour se connecter sur l'application en production est `pikachu`.


## Les composants

Un composant Angular représente un bout d'interface de l'application.

**Vue**: portion de l'écran controllée par un composant, va être définie dans le template d'un composant et pilotée par la classe du composant

Générer un composant: `ng generate component nom_du_component`

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

## Les directives

`@Directive`: Une directive est une classe angular qui ressemble à un composant mais n'a pas de template, la classe `Component` hérite de la classe directive. Elle change l'apparence ou le comportement d'un élément. 

Elle permet d'intéragir avec des éléments HTML d'une page, en leur attachant un comportement spécifique.  
Elle possède un sélecteur css, qui indique au framework où l'activer dans notre template, lorsqu'angular trouve une directive dans le template, il instancie la classe de notre directive correspondante et lui donne le controle sur la portion du dom qui lui convient.  
Il y a 3 types de directives:
- les composants
- les directives d'attributs
- les directives structurelles (ngIf, ngFor ...)

Générer une directive: `ng generate directive nom_de_la_directive`

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

`@Host Listener`: permet de lier une méthode de notre directive à un événement donné, exemple:
````ts
@HostListener('mouseenter') onMouseEnter() {
	this.setBorder(this.pokemonBorderColor || this.defaultColor);
	this.setWeight(this.pokemonWeight);
	this.setWidth(this.pokemonWidth);
}
````

## Les pipes

Un pipe permet d'effectuer des transformations dans le template. Il est également possible de créer des pipes personnalisés. 

Générer un pipe: `ng generate pipe nom_du_pipe`

Exemple de pipe qui renvoie une classe css différente selon le type de Pokémon:

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

## Les routes 

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
````html
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
````html
<a routerLink="/pokemons" class="waves-effect waves-teal btn-flat">
    Retourner à l' accueil
</a>
````

Pour récupérer un paramètre d'url à un instant T, on utilise la `snapshot`. Exemple: 
````ts
const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
````

## Les modules

Une application Angular est modulaire, elle est composée de modules de fonctionnalités. Un module permet de centraliser tout ce qui concerne la gestion d'une fonctionnalité.

Générer un module: `ng generate module nom-du-module`

Propriétés du décorateur `@NgModule`:

- `declarations`: classes de vues (Composant, Directive et Pipes)
- `exports`: sous ensemble de classes de vues à exporter (doivent être visibles et utilisables dans les templates d'autres modules)
- `imports`: concerne toutes les classes exportées depuis d'autres modules, nécessaire au fonctionnement du module actuel
- `providers`: services et injections de dépendances qui permettent de fournir un service au module
- `bootstrap`: propre au module racine, permet de dire à Angular quel est le premier composant à démarrer (composant racine)

## Les services

Un service permet de centraliser des données, et des opérations, il sera utilisable pour tous les composants d'un module afin de fournir un accés et des méthodes prêtes à l'emploi pour gérer les données au sein de ceux-ci.  

L'objectif est de masquer à nos composants la façon dont on gére ces données et le fonctionnement interne de certaines méthodes, cela permet de factoriser des comportements communs entres différents composants. 

Générer un service: `ng generate service nom_du_dossier/ nom-du-service`  

L'option `--dry-run` indique ce qu'aurait fait angular cli mais sans le faire.

Angular  dispose de son propre framework d'injection. L'injection de dépendances est un **design pattern**(modèle de développement), dans lequel chaque classe reçoit ses dépendances d'une source externe plutôt qu'en les créant elle-même.Le pattern **Singleton** signifie travailler avec une instance unique dans notre projet.    

Les **fournisseurs** permettent de rendre le service disponible là où nous en avons besoin.


Le décorateur `@Injectable` indique à Angular que notre service peut lui-même avoir d'autres dépendances. Il permet d'injecter des services dans le constructeur de nos composants. :warning:On ne va jamais créer une instance de service nous même ! 

Le service peut être disponible à différents niveaux:

- `providedIn: 'root` permet d'indiquer à Angular que l'on veut utilise la même instance du service à travers toute l'application. 
- `providers: [PokemonService]` dans `@NgModule` permet d'injecter le service dans un module 
- `providers: [PokemonService]` dans `@Component` permet d'injecter le service dans un composant (❌ non recommandé, ne respecte pas le design pattern Singleton car il crée une nouvelle instance du service propre au composant)


Exemple de service:

````ts
@Injectable({
	providedIn: "root",
})
export class PokemonService {
	getPokemonList(): Pokemon[] {
		return POKEMONS
	}
	getPokemonById(pokemonId: number): Pokemon | undefined {
		return POKEMONS.find(pokemon => pokemon.id == pokemonId);
	}
}
````

Pour consommer un service il faut l'injecter dans le constructeur du composant:

````ts
constructor(
	private pokemonService: PokemonService // récupére une instance unique de mon service 
) {}
````

## Les formulaires

Il existe deux modules permettant de créer des formulaires dans Angular, qui proviennent de la même librairie `@angular/forms`:

- `FormsModule`: développe une partie importante du formulaire dans le template, on parle de **template-driven forms** (conseillé pour les petits formulaires)
- `ReactiveFormsModule`: centré sur le développement du formulaire côté composant

### FormsModule

`@NgForm`: directive qui va créer une instance d'un objet nommé `FormGroup` au niveau  global du formulaire. Une référence à cette directive nous permet de savoir si le formulaire que remplit l'utilisateur est valide ou non. On peut également ête notifié dés que l'utilisateur déclenchera la soumission du formulaire. 

`@NgModel`: directive qui doit s'appliquer sur chaque champ du formulaire afin de créer une instance de l'objet `FormControl`. Il track la valeur du champ, les intéractions avec l'utilisateur, la validité des données saisies, et garde la vue synchronisée avec ces données. Chaque `FormControl` doit être défini avec un nom (balise `name`).

Déclaration de formulaire dans le template: 
````html
<form *ngIf="pokemon" (ngSubmit)="onSubmit()" #pokemonForm="ngForm">
````
- `(ngSubmit)="onSubmit()"`: on léve l'événement `ngSubmit` qui est géré par angular et construit par dessus l'événement submit natif du DOM
- `#pokemonForm="ngForm"`: on déclare une variable référencée par le template, à laquelle on attribue le résultat de la directive `ngForm` qui va être utilisée pour déclarer une variable directement dans le template et va contenir un objet angular avec beaucoup plus d'informations que la balise HTML5 (par exemple état de validité du formulaire)

`[(ngModel)]`: contient des crochets (property binding qui permet de pousser des données de la classe du composant vers le template) et des parenthèses (synthaxe de liaison d'évenements, pour remonter les événements du template du composant vers sa classe). En combinant les deux, cela permet de mettre en place une liaison de donnée bidirectionnelle.  

`#name="ngModel"`: le résultat du `ngModel` qui en interne pour angular est un objet métier qui représenter un champ du formulaire, notamment son état de validié, va être attribué directement à une variable référencée dans le template.

## La programmation réactive

La programmation réactive est une nouvelle manière d'aborder la programmation asynchrone, c'est une façon différente de concevoir une application. Toutes les séquences d'événements sont appelées des flux.

L'idée est de consiérer les interactions qui se déroulent dans l'application comme des événements sur lequel on peut effectuer des opérations, des regroupements, des filtrages, des combinaisons, etc .. Ainsi les évenements, tels que des click de souris, deviennent des événements asynchrones auxquels on peut s'abonner pour ensuite pouvoir y réagir. 

De manière générale tous ces événements sont poussés par un producteur de données vers un consommateur. Notre rôle est de définir des consommateurs, c'est à dire des écouteurs d'événements sous forme de fonction, pour régir aux différents flux qui sont les producteurs de données. 

Les écouteurs d'événements sont nommés des **Observer** et le flux lui même est le sujet observé, on parle d'**Observable**. Lorsque l'on s'abonne à un flux pour capter ses événements, on dit que l'on s'inscrit ou l'on s'abonne à ce flux.


**Flux** = Séquence d'événements en cours qui sont ordonnés dans le temps. Ils peuvent émettre 3 types de réponses différentes, pour chacune on peut définir une fonction:
- Une fonction pour traiter les différentes valeurs de la réponse (un nombre, un tableau ...)
- Une fonction pour traiter le cas d'erreur
- Une fonction pour traiter le cas de fin (signifie que le flux est terminé et qu'il n'émettra plus d'événements)

Les événements du flux réprésentent soit les données de la réponse en cas de succès, soit des erreurs ou des terminaisons.

:bulb:**Programmation réactive = Programmation avec des flux de données asynchrones**

### La librairie RxJS

Pour faciliter l'implémentation de la programmation réactive, on utilise souvent des librairies spécifiques. La plus populaire de l'éco-système JavaScript est **RxJS**.

Dans RxJS, un flux d'événement est représenté par un objet, appelé un Observable.

**Observable**: similaire à des tableaux, ils contiennent une collection de valeur et ajoute la notion de vleur reportée dans le temps. Dans un tableau toutes les valeurs sont disponibles immédiatement, en revanche dans un Observable, les valeurs viendront au fur et à mesure. On peut traiter les Observable de façon similaire aux tableaux. Un Observable est une simple collection asynchrone, dont les événements arrivent au fil du temps. Il n'est pas à usage unique et continuera d'émettre des évenements jusqu'à ce qu'il émette un élément de terminaison ou que l'on se desabonne de lui. Exemple:

````js
Observable.fromArray([1, 2, 3, 4, 5])
	.filter(x => x > 2) // 3, 4, 5
	.map (x => x*2) // 6, 8, 10
	.subscribe(x => console.log(x)) // affiche le résultat => 6, 8, 10
	// OU
	.toPromise().then((x) => console.log(x)); // transforme un Observable en promesse (méthode toPromise de RxJS)
````

`Subject`: classe de RxJS, qui se comporte comme un `Observable`, à la différence qu'un `Observable` ne peut qu'être que consommé (subscribe pour recevoir des données dans le temps), alors que `Subject` permet de piloter un `Observable`, afin de construire un flux de données et pas seulement de le consommer. Exemple:
````ts
// flux de pokémons
pokemons$: Observable<Pokemon[]>; // généralement quand une variable contient un flux de données on rajoute un "$" à la fin (par convention)
// construction du flux de données
searchTerms = new Subject<string>();
// pousser les données dans le flux searchTerm grâce à next (similaire à push pour un tableau)
search(term: string) {
	this.searchTerms.next(term) 
}
````
Cette classe va nous permettre de stocker ici les recherches de l'utilisateur, dans un tableau de chaîne de caractéres. On va obtenir un flux de données dans le temps des recherches de l'utilisateur.  

Le pipe `async` ne peut s'appliquer que sur des flux de données (Observable), et évite l'utilisation de subscribe. 

````html
<a *ngFor="let pokemon of pokemons$ | async" 
    (click)="goToDetail(pokemon)" 
>
````

Exemple d'utilisation de la librairie RxJS en programmation réactive, dans un module:
````ts
ngOnInit(): void {
	this.pokemons$ = this.searchTerms.pipe(
		debounceTime(300), // permet d'éliminer les recherches qui n'ont pas au moins un certain nombre de millisecondes d'attente après
		// RxJS va donc construire un nouveau flux de recherche qui correspond mieux à la recherche de l'utilisateur, ce qui permet d'éliminer des requêtes dont nous n'avons pas besoin
		distinctUntilChanged(), // opérateur qui va attendre qu'il y ait un changement dans les termes de recherche et procurer un nouveau flux de données
		switchMap((term) => this.pokemonService.searchPokemonList(term)) // à chaque fois que l'utilisateur va lancer une nouvelle recherche, je veux anuler la dernière recherche si elle est déjà en cours et venir effectuer uniquement la recherche la plus récente
	)
}
````

## Les requêtes HTTP

**Rappel**: une API est une interface de programmation qui permet de communiquer avec un service distant depuis l'application.

`HttpClientModule`: client http qui permet de requêter des serveurs distants. On l'importe à la racine du projet, puis il sera injectable dans tous nos composants.

### Simuler une API

1. `npm i angular-in-memory-web-api --save-dev`: installer le package
2. `ng generate service in-memory-data`: créer un service pour simuler une base de données dans notre application
3. `import { InMemoryDbService} from 'angular-in-memory-web-api';`: importer l'interface nécessaire
4. implémenter l'interface au sein du service
5. déclarer cette API auprès du reste de l'application
6. Utiliser cette interface

Exemple:

````ts
// Le service qui simule la BDD
export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		const pokemons = POKEMONS;
		return {pokemons};
	}
}

// Les imports dans le module racine
imports: [
		BrowserModule, 
		HttpClientModule,
		HttpClientInMemoryWebApiModule.forRoot(
			InMemoryDataService, 
			{dataEncapsulation: false} // évite l'encapsulation des données dans "data"
		)
	]

// injection de l'interface dans le service de pokémons et utilisation de celui-ci avec la librairie RxJS
@Injectable()
export class PokemonService {
	constructor(private http: HttpClient) {}
	// GET
	getPokemonList(): Observable<Pokemon[]> {
		// on va retourner un flux qui contient les pokémons et définir ce que l'on veut faire du traitement de la requête
		return this.http.get<Pokemon[]>('api/pokemons').pipe( 
			tap((response) => console.table(response)), // s'il y a une réponse, on log la réponse
			catchError((error) => {
				console.log(error); // s'il y a une erreur on log l'erreur
				return of([]) // et on renvoit un tableau vide
				
			})
		)
	}
	// PUT
	updatePokemon(pokemon: Pokemon): Observable<null> { // avec l'api interne d'angular on reçoit null que ce soit en cas de succès ou non
		const httpOptions = {
			headers: new HttpHeaders({'Content-Type': 'application/json'}) // précise que je transmet des données dans cette requête
		};
		return this.http.put('api/pokemons', pokemon, httpOptions)
						.pipe(catchError(error => this.handleError(error, null)))
	}
}

// Utilisation dans le module d'un composant
onSubmit() {
	this.pokemonService
		.updatePokemon(this.pokemon)
		.subscribe(() => this.router.navigate(['/pokemon', this.pokemon.id])) // en cas de succès
}
````

`tap`: permet d'inspecter ce qu'il se passe dans le flux (n'a pas d'incidence sur le flux).  
`catchError`: permet d'intercepter les erreurs et de retourner ce que l'on souhaite si une erreur se produit.  
`of`: transforme une donnée simple en un flux de données, c'est à dire un Observable qui emet la donnée en paramètre.  
`subscribe`: permet de s'abonner à un `Observable`. 

**Requête one-shot**: signifie que l'on effectue une requête et que l'on récupére directement le résultat.

## Authentification et sécurité

**guard**: mécanisme de protection utilisé par Angular et attaché à une route, pour mettre par exemple en place l'authentification. Ils peuvent être utilisés pour gérer toute sorte de scénario lié à la navigation, rediriger un utilisateur qui tente d'accéder à une route par exemple, ou l'obliger à s'authentifier. Ils retournent un booléen qui permet de controle le comportement de la navigation. 2 scénarios:
- Il retourne `true` et le processus de navigation continue
- Il retourne `false` et le processus de navigation cesse et l'utilisateur reste sur la même page

Dans la plupart des cas, un guard renvoie un Observable qui contient un booléen ou une promesse, et le router attendra la réponse pour agir sur la navigation. Il existe différents types de guards:
- `CanActivate`: influence sur la navigation d'une route (notament le blocage de celle-ci)
- `CanActivateChild`: peut influencer sur la navigation d'une route fille 
- `CanDeactivate`: peut empêcher l'utilisateur de naviguer en dehors de la route courante
- `Resolve`: peut effectuer une récupération de données avant de naviguer
- `CanLoad`: peut gérer la navigation vers un sous-module chargé de manière asynchrone

Si un guard retourne `false`, tous les autres enn attente seront annulés et la navigation entière sera bloquée. 

Générer un guard: `ng generate guard guard_name`

Exemple de guard:

````ts
@Injectable({
	providedIn: "root",
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}
	canActivate(): boolean {
		if(this.authService.isLoggedIn) {
			return true;
		}
		this.router.navigate(['/login']);
		return false;
	}
}
````

Ajouter un guard à une route:
````ts
{path: "edit/pokemon/:id", component: EditPokemonComponent, canActivate: [AuthGuard]}, // quand un utilisateur va demander à accéder à cette route, on va appeler AuthGuard et si CanActivate renvoie true, l'utilisateur pourra accéder à la page alors que s'il renvoit false, l'accès à cette page est bloqué
````

## Deployer l'application

**Rappel**: le terme production désigne un environnement lorsque l'utilisation est prête à êter utilisée par les utilisateurs

Nous allons utiliser **Firebase Hoisting** en version gratuite. Voici la liste des tâches à accomplir pour déployer notre projet:

1. Préparer le projet en local avant le déploiement 
2. Créer le projet sur le site de Firebase qui donnera accès à une console d'administration
3. Déployer l'application sur Firebase

IL faut demander à Angular CLI de compiler notre projet pour qu'il soit prêt pour la production.

`ng build`: permet de passer en mode production et ainsi de construire un livrable, réalisé automatiquement par Angular. Cela va compiler les fichiers typescript, supprimer les dépendances dont nous n'avons pas besoin, etc.. On obtiendra l'ensemble des fichiers optimisés, que l'on va pouvoir déployer sur Firebase, notre serveur de production.

`npm install -g firebase-tool`: installe Firebase CLI en global sur la machine

Les commandes de Firebase CLI:

- `firebase --version`: vérifier que l'utilitaire est bien installé
- `firebase login`: permet de lier le compte google et donc les projets firebase à l'utilitaire que nous venons d'installer
- `firebase init`: permet de relier nos fichiers en local avec le serveur de production Firebase
- `firebase deploy`: permet de déployer le projet en ligne, angular sait où snt les fichiers à déployer en local sur notre machine, et où et comment les pousser sur les serveurs en production

## BONUS: ECMAScript6 

EcmaScript6 est le nom de la dernière version standardisée de JavaScript, approuvé par l'organisme de normalisation en Juin 2015. IL a été annoncé pour la première fois en 2008. C'est une spécification standardisée qui ne concerne pas seulement le JavaScript, mais également Swift d'Apple par exemple.

**ECMA Script 6 = ES6 = ECMAScript2015**

ES6 utilise un transpilateur pour convertir le code ES6 en code ES5, le code devient ainsi compéhensible pour tous les navigateurs.

**Transpilateur**: outil qui permet de publier son code pour les navigateurs qui ne supportent pas encore l'ES6, son rôle est de traduire ce code, les fonctionnalités qui ne sont pas supportés dans ES5 auront leur comportement simulé.

### Les nouveautés ES6

- Les **classes**: avec la nouvelle synthaxe `class` (héritage de prototype qui tourne dérrière)et le mot clé `constructeur` pour initialiser une valeurs aux attributs de nos objets.

- L'**héritage**: plus besoin de l'héritage prototypal de JavaScript, on utilise désormais le mot-clé `extends` pour dire que la classe hérite d'une autre classe, et on utilise le mot-clé `super` pour appeler le constructeur de la classe parent.

- Les **paramétres par défaut**: avant il n'y avait pas d'arguments dans la signature de la fonction mais le mot-clé `arguments` qui permet de récupérer sous forme de tableau tous les paramétres passés à la fonction et ainsi les traiter dans le code de celle-ci. Avec ES6, il suffit de définir une valeur par défaut dans la signature même de la fonction.
 
- Le mot-clé **`let`**: définit un contexte (le scope) pour une variable sans polluer d'autres contextes avec une variable inutile. Il a été pensé pour remplacer le mot-clé `var`.

- Le mot-clé **`const`**: permet de définir une constante, la déclaration de celle-ci se fait une seule fois et une fois définie on ne peut plus changer sa valeur. Pour une constante de tableau ou d'objets, on ne peut pas modifier la référence vers ceux-cis, mais on peut modifier les valeurs à l'intérieur de tableau, ou les propriétés de l'objet.

- Les **promesses**: permet de simplifier la programmation asynchrone.

- Les **fonctions fléchées**: simplifient l'écriture des fonctions anonymes. (= arrow function) A la différence des fonctions traditionnelles, elles ne définissent pas un nouveau contexte. Elles sont souvent utilisées pour les fonctions asynchrones.

- **`Map` et `Set`**: ce sont des collections, `Map` permet de créer un dictionnaire (méthode `.set(clé, objet)` afin d'ajouter un objet au dictionnaire) et `Set` de créer une nouvelle liste (méthode `.add(objet)` pour ajouter l'objet à la liste).

- Les **template strings**: permet d'éviter la concaténation qui commencent et se terminent par un backtick, qui permet d'écrire sur plusieurs lignes et d'y passer des variables avec `${variable}`.

**Signature de fonction**: définit les entrées et sorties des fonctions et méthodes, elle peut comporter les paramètres, leur type ainsi qu'une valeur et un type de retour.
















