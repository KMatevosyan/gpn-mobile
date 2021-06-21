import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MAIN_PAGE_DATA} from '../../pages/tabs/pages/tabs-main/mock';
import {IDiagram} from '../../pages/tabs/pages/tabs-main/tabs-main.page';
import {INITIATED_TASKS, TASKS_AGREE} from '../../pages/tabs/pages/tabs-tasks/mock';
import {READY} from '../../pages/tabs/pages/tabs-ready/mock';
import {IReadyItem} from '../../pages/tabs/pages/tabs-ready/tabs-ready.page';
import {IVerififcation} from '../tasks.service';

@Injectable({
  providedIn: 'root'
})
export class TabsInfoService {
    public tasksCurrentTab$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public diagramData$: BehaviorSubject<IDiagram> = new BehaviorSubject<IDiagram>(MAIN_PAGE_DATA);
    public closeVerification$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() { }
}
