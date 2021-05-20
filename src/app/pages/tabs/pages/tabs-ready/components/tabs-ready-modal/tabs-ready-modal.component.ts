import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-tabs-ready-modal',
  templateUrl: './tabs-ready-modal.component.html',
  styleUrls: ['./tabs-ready-modal.component.scss'],
})
export class TabsReadyModalComponent implements OnInit {
    constructor(
        public modalController: ModalController
    ) { }

    public dismiss(): void {
        this.modalController.dismiss().then();
    }

    ngOnInit() {}
}
