import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface IDropdownItem {
    id: number;
    name: string;
    product_name?: string;
    position_name?: string;
    chosen?: boolean;
    msg?: string;
}

export interface IVerificationCurrant {
    manufacture: string;
    machine: string;
    pak: string;
    quality: {name: string}[];
    verificationType?: string;
    verificationDate?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CreateVerificationService {
    public manufactureList$: BehaviorSubject<IDropdownItem[]> = new BehaviorSubject<IDropdownItem[]>([]);
    public verificationList$: BehaviorSubject<IDropdownItem[]> = new BehaviorSubject<IDropdownItem[]>([]);
    public machineList$: BehaviorSubject<IDropdownItem[]> = new BehaviorSubject<IDropdownItem[]>([]);
    public pakList$: BehaviorSubject<IDropdownItem[]> = new BehaviorSubject<IDropdownItem[]>([]);
    public qualityList$: BehaviorSubject<IDropdownItem[]> = new BehaviorSubject<IDropdownItem[]>([]);
    public reasons$: BehaviorSubject<IDropdownItem[]> = new BehaviorSubject<IDropdownItem[]>([]);

    public currentValue: IVerificationCurrant;

    private readonly baseUrl: string = 'https://tpmobs.koa.gazprom-neft.ru';

    constructor(public http: HttpClient) {}

    public async getProductions(): Promise<boolean> {
        try {
            const res = await this.http
                .get<IDropdownItem[]>(`${this.baseUrl}/engineer/api/Dictionary/getProductions`)
                .toPromise();
            this.manufactureList$.next(res);
            return true;
        }
        catch (error) {
            return false;
        }
    }

    public async getVerificationType(): Promise<boolean> {
        try {
            const res = await this.http
                .get<IDropdownItem[]>(`${this.baseUrl}/engineer/api/Dictionary/getVerificationType`)
                .toPromise();
            this.verificationList$.next(res);
            return true;
        }
        catch (error) {
            return false;
        }
    }

    public async getMachines(idProd: number): Promise<boolean> {
        try {
            const res = await this.http
                .get<IDropdownItem[]>(`${this.baseUrl}/engineer/api/Dictionary/getprodObjects?idProduction=${idProd}`)
                .toPromise();
            this.machineList$.next(res);
            return true;
        }
        catch (error) {
            return false;
        }
    }

    public async getPaks(idMachine: number): Promise<boolean> {
        try {
            const res = await this.http
                .get<IDropdownItem[]>(`${this.baseUrl}/engineer/api/Dictionary/getPAKs?input_plant_id=${idMachine}`)
                .toPromise();
            this.pakList$.next(res);
            return true;
        }
        catch (error) {
            return false;
        }
    }

    public async getQuality(idPak: number): Promise<boolean> {
        try {
            const res = await this.http
                .get<IDropdownItem[]>(`${this.baseUrl}/engineer/api/Dictionary/getQLIndicators?input_pak_id=${idPak}`)
                .toPromise();
            res.forEach(item => item.chosen = false);
            this.qualityList$.next(res);
            return true;
        }
        catch (error) {
            return false;
        }
    }

    public async getReasons(): Promise<boolean> {
        try {
            const res = await this.http
                .get<IDropdownItem[]>(`${this.baseUrl}/engineer/api/Reason/getReasons`)
                .toPromise();
            res.forEach(item => item.chosen = false);
            this.reasons$.next(res);
            return true;
        }
        catch (error) {
            return false;
        }
    }

    public async setVerification(): Promise<boolean> {
        try {
            const res = await this.http
                .post<any>(`${this.baseUrl}/engineer/api/Verification/setNewVerification?plant_name=${this.currentValue.machine}&pak_name=${this.currentValue.pak}&type_verification=${this.currentValue.verificationType}&plant_timestamp=${this.currentValue.verificationDate.toISOString()}`, this.currentValue.quality)
                .toPromise();
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
