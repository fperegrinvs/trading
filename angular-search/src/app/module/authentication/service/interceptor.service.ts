import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private authService:AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const newReq = req.clone({
      headers: req.headers.append("Authorization", "Bearer " + this.authService.getToken())
    });

    return next.handle(newReq);
  }
}
