import { Injectable } from "@angular/core";
import { delay, Observable, of, tap } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AuthService {

	isLoggedIn: boolean = false;
	redirectUrl: string; 

	login(name: string, password: string): Observable<boolean> {
		const isLoggedIn = (name == 'pikachu' && password == 'pikachu')
		return of(isLoggedIn)
			.pipe(delay(1000), // simule le délai de chargement si on utilisait un vrai serveur (méthode RxJS)
			tap(val => this.isLoggedIn = isLoggedIn)
		)
	};

	logout() {
		this.isLoggedIn = false;
	};
}
