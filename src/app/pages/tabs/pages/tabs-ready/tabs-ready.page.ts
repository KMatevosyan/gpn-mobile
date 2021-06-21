import {Component, OnInit} from '@angular/core';
import {IPageTab, PageTabType} from '../../tabs.page';
import {ModalController, NavController} from '@ionic/angular';
import {TabsReadyModalComponent} from './components/tabs-ready-modal/tabs-ready-modal.component';
import {TasksService} from '../../../../services/tasks.service';

export interface IReadyItem {
    num: string;
    manufacture: string;
    date: string;
    verificationType: string;
    result: string;
    properties?: IReadyItemProperty[];
}

export interface IReadyItemProperty {
    name: string;
    value?: number;
    prevValue?: number; // тут будет храниться старое значение
    error?: number;
    prevError?: number;
}

@Component({
    selector: 'app-tabs-ready',
    templateUrl: './tabs-ready.page.html',
    styleUrls: ['./tabs-ready.page.scss'],
})

export class TabsReadyPage implements OnInit, IPageTab {
    public route: PageTabType = 'ready';

    constructor(
        private navCtrl: NavController,
        private modalController: ModalController,
        public taskService: TasksService,
    ) {
    }

    ngOnInit() {}

    public toNfc(): void {
        this.navCtrl.navigateRoot('/nfc').then();
    }

    public async openModal(e: Event): Promise<void> {
        this.presentModal().then();
    }

    private async presentModal() {
        const modal = await this.modalController.create({
            component: TabsReadyModalComponent,
            cssClass: 'ready-tab-modal',
            showBackdrop: false
        });
        return await modal.present();
    }
}
