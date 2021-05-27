import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MAIN_PAGE_DATA} from '../../pages/tabs/pages/tabs-main/mock';
import {IDiagram} from '../../pages/tabs/pages/tabs-main/tabs-main.page';
import {ITasksItem} from '../../pages/tabs/pages/tabs-tasks/tabs-tasks.page';
import {INITIATED_TASKS, TASKS_AGREE} from '../../pages/tabs/pages/tabs-tasks/mock';
import {READY} from '../../pages/tabs/pages/tabs-ready/mock';
import {IReadyItem} from '../../pages/tabs/pages/tabs-ready/tabs-ready.page';

@Injectable({
  providedIn: 'root'
})
export class TabsInfoService {
    public tasksCurrentTab$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public diagramData$: BehaviorSubject<IDiagram> = new BehaviorSubject<IDiagram>(MAIN_PAGE_DATA);

    public agreeItems$: BehaviorSubject<ITasksItem[]> = new BehaviorSubject<ITasksItem[]>(TASKS_AGREE);
    public initiatedItems$: BehaviorSubject<ITasksItem[]> = new BehaviorSubject<ITasksItem[]>(INITIATED_TASKS);

    public closeVerification$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readyItems$: BehaviorSubject<IReadyItem[]> = new BehaviorSubject<IReadyItem[]>(READY);

    constructor() { }
}
