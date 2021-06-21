import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthorizationService} from '../../services/autoriztion.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {
    private readonly authorizationHeader: string = 'Authorization';

    constructor(private authService: AuthorizationService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.token) {
            req = req.clone({
                headers: req.headers.append(this.authorizationHeader, `Bearer ${this.authService.token}`),
            });
        }
        return next.handle(req);
    }
}
