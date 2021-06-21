import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../@shared/shared.module';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {ResultComponent} from './result.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [ResultComponent],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([{path: '', component: ResultComponent}]),
        SharedModule,
        AngularSvgIconModule,
        FormsModule,
    ]
})
export class ResultModule { }
