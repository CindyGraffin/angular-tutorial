import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
	selector: "[pokemonBorderCard]",
})
export class BorderCardDirective {

	private initialColor: string = '#f5f5f5';
	private defaultColor: string = '#009688';
	private defaultHeight: number = 180;
	private defaultWidth: string = '240';
	private defaultWeight: string = 'normal'

	constructor(private element: ElementRef) {
		this.setHeight(this.defaultHeight);
		this.setBorder(this.initialColor);
		this.setWeight(this.defaultWeight)
		this.setWidth(this.defaultWidth)
	}

	@Input('pokemonBorderColor') pokemonBorderColor: string; // 
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

