import {Component, Input, OnInit} from '@angular/core';
import {IReadyItem} from '../../tabs-ready.page';
import {ModalController} from '@ionic/angular';
import {TabsReadyModalComponent} from '../tabs-ready-modal/tabs-ready-modal.component';

@Component({
  selector: 'app-tabs-ready-card',
  templateUrl: './tabs-ready-card.component.html',
  styleUrls: ['./tabs-ready-card.component.scss'],
})
export class TabsReadyCardComponent implements OnInit {
    @Input() data: IReadyItem;
    @Input() idx: number;
    @Input() isActive: boolean;
    @Input() isInitiated: boolean;

    constructor(
        private modalController: ModalController
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
