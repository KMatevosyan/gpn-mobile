import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ModalController} from '@ionic/angular';

export interface IUser {
    firstName: string;
    lastName: string;
    patronymic: string;
    position: string
}
@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
    public readonly currentUser: IUser = {
        firstName: 'Юлия',
        lastName: 'Митюшина',
        patronymic: 'Константиновна',
        position: 'Инженер ТО'
    };

    // Выбранный таб в модальном окне
    public currentTab$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor() { }
}
