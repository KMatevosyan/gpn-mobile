import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ModalController, NavController} from '@ionic/angular';
import {TabsInfoService} from '../../services/tabs/tabs-info.service';
import {ScannerModalComponent} from './components/scanner-modal/scanner-modal.component';
import {IVerififcation, TasksService} from '../../services/tasks.service';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss'],
})
export class BarcodeScannerComponent implements OnInit {
    constructor(
        private navCtrl: NavController,
        private modalCtrl: ModalController,
        public tasksService: TasksService
    ) {
    }

    public ngOnInit(): void {
    }

    public async openModal(): Promise<void> {
        const modal = await this.modalCtrl.create({component: ScannerModalComponent, cssClass: 'scanner-modal'});
        await modal.present();
    }

    public async enableBarcode(): Promise<void> {
        this.navCtrl.navigateRoot('/timer').then();
        //await this.openModal();
    }

    public back(): void {
        this.navCtrl.back();
    }

    public cancel(): void {
        this.navCtrl.navigateRoot('/cancel').then();
    }
}
