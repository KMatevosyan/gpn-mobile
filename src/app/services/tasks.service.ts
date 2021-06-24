import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

export interface IVerififcation {
    id: number;
    plantDatetime: string;
    plantName: string;
    typeVerification: string;
    productName: string;
    isApproved: true;
    nfcUID: string;
    point_name: string;
    position_name: string;
    tareID: number;
    task_finalized: boolean;
    task_end_filling: boolean;
    nfcTime?: Date;
    endTime?: Date;
    properties?: any[];
    selected_quality: IQuality[];
}

export interface IQuality {
    name: string;
    dx: number;
    value: number;
    parameter_name?: string;
    quality_id?: number;
    task_id?: number;
}

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    public currentTask$: BehaviorSubject<IVerififcation> = new BehaviorSubject<IVerififcation>(null);
    public agreeItems$: BehaviorSubject<IVerififcation[]> = new BehaviorSubject<IVerififcation[]>([]);
    public initiatedItems$: BehaviorSubject<IVerififcation[]> = new BehaviorSubject<IVerififcation[]>([]);
    public readyItems$: BehaviorSubject<IVerififcation[]> = new BehaviorSubject<IVerififcation[]>([]);
    private readonly baseUrl: string = 'https://tpmobs.koa.gazprom-neft.ru';

    constructor(public http: HttpClient) {}

    public async getTasks(date: Date): Promise<boolean> {
        try {
            const res = await this.http
                .get<IVerififcation[]>(`${this.baseUrl}/engineer/api/Verification/getVers?date=${date.toISOString()}`)
                .toPromise();
            this.agreeItems$.next(res.filter(item => item.isApproved && !item.task_end_filling));
            this.initiatedItems$.next(res.filter(item => !item.isApproved && !item.task_end_filling));
            this.readyItems$.next(res.filter(item => item.task_end_filling));
            return true;
        }
        catch (error) {
            return false;
        }
    }

    public async setVerification(body: IQuality[]): Promise<boolean> {
        const task = this.currentTask$.value;
        try {
            const res = await this.http
                .post<any>(`${this.baseUrl}/engineer/api/Verification/set_result?id_verification=${task.id}&in_point_timestamp=${task.nfcTime.toISOString()}&i_end_filling_timestamp=${task.endTime.toISOString()}`, body)
                .toPromise();
            return true;
        }
        catch (error) {
            return false;
        }
    }

    public async setError(body: IQuality[]): Promise<boolean> {
        const task = this.currentTask$.value;
        try {
            const res = await this.http
                .post<any>(`${this.baseUrl}/engineer/api/Verification/set_error_pak?id_verification=${task.id}`, body)
                .toPromise();
            return true;
        }
        catch (error) {
            return false;
        }
    }

    public async cancelVerification(id: number, msg: string, date: Date): Promise<boolean> {
        const task = this.currentTask$.value;
        try {
            const res = await this.http
                .post<any>(`${this.baseUrl}/engineer/api/Verification/set_cancel?id_verification=${task.id}&reason_id=${id}&end_time=${date.toISOString()}&comment=${msg}`, {})
                .toPromise();
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
