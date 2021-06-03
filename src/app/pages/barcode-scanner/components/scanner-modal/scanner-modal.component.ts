import { Component, OnInit } from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-scanner-modal',
  templateUrl: './scanner-modal.component.html',
  styleUrls: ['./scanner-modal.component.scss'],
})
export class ScannerModalComponent implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
      this.barcodeScanner.scan().then(barcodeData => {
          console.log('Barcode data', barcodeData);
      }).catch(err => {
          console.log('Error', err);
      });
  }
}
