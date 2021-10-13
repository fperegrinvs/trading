import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthStore} from "./auth.store";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthStore, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve) => {
      this.authService.isLoggedIn$.subscribe(
        res => {
          if (!res) this.router.navigate(['/login']);
          resolve(res);
        }
      );
    });
  }
}
