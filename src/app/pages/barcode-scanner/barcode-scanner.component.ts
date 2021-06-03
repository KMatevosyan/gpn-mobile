import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ITasksItem} from '../tabs/pages/tabs-tasks/tabs-tasks.page';
import {ModalController, NavController} from '@ionic/angular';
import {TabsInfoService} from '../../services/tabs/tabs-info.service';
import {ScannerModalComponent} from './components/scanner-modal/scanner-modal.component';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss'],
})
export class BarcodeScannerComponent implements OnInit {

    public currentTask$: BehaviorSubject<ITasksItem> = new BehaviorSubject<ITasksItem>(null);

    constructor(
        private navCtrl: NavController,
        private modalCtrl: ModalController,
        private tabsService: TabsInfoService
    ) {
    }

    public ngOnInit(): void {
        this.tabsService.agreeItems$.subscribe(val => {
            this.currentTask$.next(val[0]);
        });
    }

    public async openModal(): Promise<void> {
        const modal = await this.modalCtrl.create({component: ScannerModalComponent, cssClass: 'scanner-modal'});
        await modal.present();
    }

    public async enableBarcode(): Promise<void> {
        await this.openModal();
    }

    public back(): void {
        this.navCtrl.back();
    }
}
