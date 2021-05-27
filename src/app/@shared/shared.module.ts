import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {AvatarModalComponent} from './avatar-modal/avatar-modal.component';
import {StepProgressBarComponent} from './step-progress-bar/step-progress-bar.component';
import {IonicModule} from '@ionic/angular';
import {SimpleModalComponent} from './simple-modal/simple-modal.component';
import {CalendarComponent} from './calendar/calendar.component';

@NgModule({
    declarations: [
        HeaderComponent,
        AvatarModalComponent,
        StepProgressBarComponent,
        SimpleModalComponent,
        CalendarComponent
    ],
    exports: [
        HeaderComponent,
        StepProgressBarComponent,
        SimpleModalComponent,
        CalendarComponent
    ],
    imports: [
        CommonModule,
        AngularSvgIconModule,
        IonicModule
    ]
})
export class SharedModule { }
