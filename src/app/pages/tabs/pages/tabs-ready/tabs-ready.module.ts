import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {TabsReadyPage} from './tabs-ready.page';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../../../@shared/shared.module';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {TabsReadyCardComponent} from './components/tabs-ready-card/tabs-ready-card.component';
import {TabsReadyModalComponent} from './components/tabs-ready-modal/tabs-ready-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([{path: '', component: TabsReadyPage}]),
        SharedModule,
        AngularSvgIconModule,
    ],
    declarations: [TabsReadyPage, TabsReadyCardComponent, TabsReadyModalComponent]
})
export class TabsReadyPageModule {
}
