import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {TabsReadyModalComponent} from '../tabs-ready-modal/tabs-ready-modal.component';
import {IVerififcation} from '../../../../../../services/tasks.service';

@Component({
  selector: 'app-tabs-ready-card',
  templateUrl: './tabs-ready-card.component.html',
  styleUrls: ['./tabs-ready-card.component.scss'],
})
export class TabsReadyCardComponent implements OnInit {
    @Input() data: IVerififcation;
    @Input() idx: number;
    @Input() isActive: boolean;
    @Input() isInitiated: boolean;

    constructor(
        private modalController: ModalController,
    ) { }

    public openAccept(): void {
        this.presentModal().then();
    }

    ngOnInit() {}

    private async presentModal() {
        const modal = await this.modalController.create({
            component: TabsReadyModalComponent,
            cssClass: 'ready-modal',
            showBackdrop: false,
            componentProps: {
                idx: this.idx,
            }
        });
        return await modal.present();
    }
}
