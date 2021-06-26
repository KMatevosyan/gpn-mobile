import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import {SharedModule} from '../../@shared/shared.module';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {NewVerificationComponent} from './pages/new-verification/new-verification.component';
import {VerificationTypeComponent} from './components/verification-type/verification-type.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TabsPageRoutingModule,
        SharedModule,
        AngularSvgIconModule,
        ReactiveFormsModule,
    ],
    declarations: [TabsPage, NewVerificationComponent, VerificationTypeComponent],
    providers: [DatePipe]
})
export class TabsPageModule {}
