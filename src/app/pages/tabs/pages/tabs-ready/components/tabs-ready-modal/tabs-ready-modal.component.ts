import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {TabsInfoService} from '../../../../../../services/tabs/tabs-info.service';
import {IReadyItem} from '../../tabs-ready.page';

@Component({
  selector: 'app-tabs-ready-modal',
  templateUrl: './tabs-ready-modal.component.html',
  styleUrls: ['./tabs-ready-modal.component.scss'],
})
export class TabsReadyModalComponent implements OnInit {
    @Input() set idx(i: number) {
        this.data = this.tabsService.readyItems$.getValue()[i];
    };

    data: IReadyItem;

    constructor(
        public modalController: ModalController,
        public tabsService: TabsInfoService
    ) { }

    public dismiss(): void {
        this.modalController.dismiss().then();
    }

    ngOnInit() {}
}
