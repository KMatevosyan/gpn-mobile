import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../@shared/shared.module';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {TimerComponent} from './timer.component';

@NgModule({
  declarations: [TimerComponent],
  imports: [
      CommonModule,
      IonicModule,
      RouterModule.forChild([{path: '', component: TimerComponent}]),
      SharedModule,
      AngularSvgIconModule,
  ]
})
export class TimerModule { }
