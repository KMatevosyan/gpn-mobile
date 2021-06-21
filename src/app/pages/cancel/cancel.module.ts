import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../@shared/shared.module';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {CancelComponent} from './cancel.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [CancelComponent],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([{path: '', component: CancelComponent}]),
        SharedModule,
        AngularSvgIconModule,
        FormsModule,
    ]
})
export class CancelModule { }
