import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MapPage} from './map.page';
import {RouterModule} from '@angular/router';
import {HammerModule} from '@angular/platform-browser';
import {SharedModule} from "../../@shared/shared.module";
import {AngularSvgIconModule} from "angular-svg-icon";
import {MapProgressComponent} from "./components/map-progress/map-progress.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HammerModule,
        RouterModule.forChild([{path: '', component: MapPage}]),
        SharedModule,
        AngularSvgIconModule,
    ],
    declarations: [MapPage, MapProgressComponent]
})
export class MapPageModule {
}