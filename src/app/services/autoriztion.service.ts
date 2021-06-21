import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
    public token = '';
    private readonly baseUrl: string = 'https://tpmobs.koa.gazprom-neft.ru';

    constructor(public http: HttpClient) { }

    public async getToken(body: {login: string; password: string}): Promise<boolean> {
        try {
            const res = await this.http
                .post<{access_token: string}>(`${this.baseUrl}/engineer/authorization/Account/get_token`, body)
                .toPromise();
            this.token = res.access_token;
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
