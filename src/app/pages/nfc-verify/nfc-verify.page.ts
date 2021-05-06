import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {ITasksItem} from '../tabs/pages/tabs-tasks/tabs-tasks.page';
import {VerifyModalComponent} from './components/verify-modal/verify-modal.component';
import {TabsInfoService} from "../../services/tabs/tabs-info.service";
import {BehaviorSubject} from "rxjs";
import {NfcTimerModalComponent} from "./components/nfc-timer-modal/nfc-timer-modal.component";

@Component({
    selector: 'app-nfc-verify.page',
    templateUrl: './nfc-verify.page.html',
    styleUrls: ['./nfc-verify.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NfcVerifyPage implements OnInit {

    public currentTask$: BehaviorSubject<ITasksItem>;

    constructor(
        private navCtrl: NavController,
        private modalCtrl: ModalController,
        private tabsInfoService: TabsInfoService
    ) {
    }

    ngOnInit(): void {
        this.tabsInfoService.newItems$.subscribe((data: ITasksItem[]) => {
            this.currentTask$ = new BehaviorSubject<ITasksItem>(data[0]);
        });
    }

    public async openModal(): Promise<void> {
        const modal = await this.modalCtrl.create({component: VerifyModalComponent, cssClass: 'nfc-verify-modal'});
        //const modal = await this.modalCtrl.create({component: NfcTimerModalComponent, cssClass: 'nfc-timer-modal'});
        await modal.present();
    }

    public async enableNfc(): Promise<void> {
        await this.openModal();
    }

    public back(): void {
        this.navCtrl.back();
    }
}
