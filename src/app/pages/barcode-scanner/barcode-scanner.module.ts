import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BarcodeScannerComponent} from './barcode-scanner.component';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../@shared/shared.module';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {ScannerModalComponent} from './components/scanner-modal/scanner-modal.component';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';


@NgModule({
  declarations: [
      BarcodeScannerComponent,
      ScannerModalComponent
  ],
  imports: [
      CommonModule,
      IonicModule,
      RouterModule.forChild([{path: '', component: BarcodeScannerComponent}]),
      SharedModule,
      AngularSvgIconModule,
  ],
    providers: [BarcodeScanner]
})
export class MyBarcodeScannerModule { }
