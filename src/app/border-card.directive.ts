// Directive -> classe angular qui ressemble à un composant mais n'a pas de template, la classe Component hérite de la classe directive
// une directive permet d'intéragir avec des éléments HTML d'une page, en leur attachant un comportement spécifique
// elle possède un sélecteur css, qui indique au framework où l'activer dans notre template, lorsqu'angular trouve une directive dans le template, il instancie la classe de notre directive correspondante et lui donne le controle sur la portion du dom qui lui convient.
// Il y a 3 types: les components, les directives d'attributs, et les directives structurelles (ngIf, ngFor..)

//Host Listener -> permet de lier une méthode de notre directive à un évéenement donné
import { Directive, ElementRef, HostListener, Input } from "@angular/core";

// change l'apparence ou le comportement d'un élément
@Directive({
	selector: "[pokemonBorderCard]",
})
export class BorderCardDirective {

	private initialColor: string = '#f5f5f5';
	private defaultColor: string = '#009688';
	private defaultHeight: number = 180;
	private defaultWidth: string = '240';
	private defaultWeight: string = 'normal'

	// elementRef est une référence vers l'élément du dom sur lequel nous allons appliquer une directive
	constructor(private element: ElementRef) {
		this.setHeight(this.defaultHeight);
		this.setBorder(this.initialColor);
		this.setWeight(this.defaultWeight)
		this.setWidth(this.defaultWidth)
	}

	// Input est une propriété d'entrée
	@Input('pokemonBorderColor') pokemonBorderColor: string; // alias -> permet de nommer la propriété de notre directive comme on le souhaite et utiliser ce nom ailleurs dans la directive
	// @Input() pokemonBorderCard: string; // sans alias
	@Input('pokemonWidth') pokemonWidth: string;

	@Input('pokemonWeight') pokemonWeight: string;

	@HostListener('mouseenter') onMouseEnter() {
		this.setBorder(this.pokemonBorderColor || this.defaultColor);
		this.setWeight(this.pokemonWeight);
		this.setWidth(this.pokemonWidth);
	}

	@HostListener('mouseleave') onMouseLeave() {
		this.setBorder(this.initialColor);
		this.setWeight('normal');
		this.setWidth(this.defaultWidth);
	}

	private setHeight(height: number) {
		this.element.nativeElement.style.height = `${height}px`;
	}

	private setBorder(color: string) {
		this.element.nativeElement.style.border = `solid 4px ${color}`
	}

	private setWeight(weight: string) {
		this.element.nativeElement.style.fontWeight = `${weight}`
	}
	private setWidth(width: string) {
		this.element.nativeElement.style.width= `${width}px`;
	}

}

// intialColor -> couleur initial affichée au chargement de la page
// defaultColor: couleur par defaut si aucune culeur de bordure n'a ete precisse par l'util ds le template
// default height -> autour par défaut du cadre de notre bordure
