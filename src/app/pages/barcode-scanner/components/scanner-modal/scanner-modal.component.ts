import { Component, OnInit } from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-scanner-modal',
  templateUrl: './scanner-modal.component.html',
  styleUrls: ['./scanner-modal.component.scss'],
})
export class ScannerModalComponent implements OnInit {
    barcodeData: any;
    constructor(
        private barcodeScanner: BarcodeScanner,
        public modalController: ModalController
    ) { }

    public dismiss(): void {
        this.modalController.dismiss().then();
    }

    ngOnInit() {
        this.barcodeScanner.scan().then(barcodeData => {
            this.barcodeData = barcodeData;
            console.log('Barcode data', barcodeData);
        }).catch(err => {
            console.log('Error', err);
        });
    }
}
