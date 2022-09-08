import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
	
	message: string = 'Vous êtes déconnecté.';
	name: string;
	password: string;
	auth: AuthService;

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit() {
		this.auth = this.authService; // comme j'utilise le service dans le template je dois le déclarer dans le ngOnInit
	}

	setMessage() {
		if (this.authService.isLoggedIn) {
			'Vous êtes connecté.'
		} else {
			this.message = 'Identifiant ou mot de passe incorrect.'
		}
	}

	login() {
		this.message = 'Tentative de connexion en cours...'
		this.auth
			.login(this.name, this.password)
			.subscribe((isLoggedIn: boolean) => {
				this.setMessage();
				if (isLoggedIn) {
					this.router.navigate(['/pokemons'])
				} else {
					this.password = '';
					this.router.navigate(['/login'])
				}
			})
	}

	logout() {
		this.auth.logout()
		this.message = 'Vous êtes déconnecté.'
	}
}
