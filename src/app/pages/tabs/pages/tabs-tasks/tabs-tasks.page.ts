import {Component, OnInit} from '@angular/core';
import {IPageTab, PageTabType} from '../../tabs.page';
import {BehaviorSubject} from 'rxjs';
import {TabsInfoService} from '../../../../services/tabs/tabs-info.service';
import {ModalController, NavController} from '@ionic/angular';
import {TasksService} from '../../../../services/tasks.service';

export interface ITasksItem {
    num: string;
    manufacture: string;
    date: string;
    verificationType: string;
    fraction: string;
}

@Component({
    selector: 'app-tabs-tasks',
    templateUrl: './tabs-tasks.page.html',
    styleUrls: ['./tabs-tasks.page.scss'],
})
export class TabsTasksPage implements OnInit, IPageTab {
    public route: PageTabType = 'tasks';

    public tabs$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['согласованные', 'инициированные']);

    public agreeItems$: BehaviorSubject<ITasksItem[]> = new BehaviorSubject<ITasksItem[]>([]);
    public initiatedItems$: BehaviorSubject<ITasksItem[]> = new BehaviorSubject<ITasksItem[]>([]);

    public currentTab$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(
        public tabsService: TabsInfoService,
        public modalController: ModalController,
        private navCtrl: NavController,
        private tasksService: TasksService,
    ) {}


    ngOnInit() {
        this.tabsService.tasksCurrentTab$.subscribe(value => {
            this.currentTab$.next(value);
        });
        this.tabsService.agreeItems$.subscribe(val => {
            this.agreeItems$.next(val);
        });
        this.tabsService.initiatedItems$.subscribe(val => {
            this.initiatedItems$.next(val);
        });
    }

    public changeTab(i): void {
        this.currentTab$.next(i);
    }

    public async openChooseOverlay(): Promise<void> {
    }

    public openMap(): void {
        this.navCtrl.navigateRoot('/map').then();
    }
}
