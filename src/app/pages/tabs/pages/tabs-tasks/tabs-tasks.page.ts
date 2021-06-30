import {Component, OnInit} from '@angular/core';
import {IPageTab, PageTabType} from '../../tabs.page';
import {BehaviorSubject} from 'rxjs';
import {TabsInfoService} from '../../../../services/tabs/tabs-info.service';
import {ModalController, NavController} from '@ionic/angular';
import {TasksService} from '../../../../services/tasks.service';

@Component({
    selector: 'app-tabs-tasks',
    templateUrl: './tabs-tasks.page.html',
    styleUrls: ['./tabs-tasks.page.scss'],
})
export class TabsTasksPage implements OnInit, IPageTab {
    public route: PageTabType = 'tasks';

    public tabs$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['согласованные', 'инициированные']);

    public currentTab$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(
        public tabsService: TabsInfoService,
        public modalController: ModalController,
        private navCtrl: NavController,
        public tasksService: TasksService,
    ) {}


    ngOnInit() {
        this.tabsService.tasksCurrentTab$.subscribe(value => {
            this.currentTab$.next(value);
        });
    }

    public changeTab(i): void {
        this.currentTab$.next(i);
    }

    public openNfc(i: number): void {
        if (this.tasksService.agreeItems$.value.length) {
            this.tasksService.currentTask$.next(this.tasksService.agreeItems$.value[i]);
        }
        else {
            this.tasksService.currentTask$.next(this.tasksService.initiatedItems$.value[i]);
        }
        this.navCtrl.navigateRoot('/nfc').then();
    }
}
