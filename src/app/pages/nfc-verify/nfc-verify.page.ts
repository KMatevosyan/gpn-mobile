import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {TabsInfoService} from '../../services/tabs/tabs-info.service';
import {NfcTimerModalComponent} from './components/nfc-timer-modal/nfc-timer-modal.component';
import {IVerififcation, TasksService} from '../../services/tasks.service';

@Component({
    selector: 'app-nfc-verify.page',
    templateUrl: './nfc-verify.page.html',
    styleUrls: ['./nfc-verify.page.scss']
})
export class NfcVerifyPage implements OnInit {
    constructor(
        private navCtrl: NavController,
        private modalCtrl: ModalController,
        private tabsService: TabsInfoService,
        public tasksService: TasksService
    ) {
    }

    public ngOnInit(): void {
    }

    public async openModal(): Promise<void> {
        const modal = await this.modalCtrl.create({component: NfcTimerModalComponent, cssClass: 'nfc-timer-modal'});
        await modal.present();
    }

    public async enableNfc(): Promise<void> {
        const nfcDate: Date = new Date();
        const task = this.tasksService.currentTask$.value;
        task.nfcTime = nfcDate;
        this.tasksService.currentTask$.next(task);
        await this.openModal();
    }

    public back(): void {
        this.navCtrl.back();
    }

    public cancel(): void {
        this.navCtrl.navigateRoot('/cancel').then();
    }
}
