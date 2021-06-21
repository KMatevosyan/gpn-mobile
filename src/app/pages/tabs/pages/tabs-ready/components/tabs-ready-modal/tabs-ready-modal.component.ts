import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {TabsInfoService} from '../../../../../../services/tabs/tabs-info.service';
import {IReadyItem} from '../../tabs-ready.page';
import {IVerififcation, TasksService} from '../../../../../../services/tasks.service';

@Component({
  selector: 'app-tabs-ready-modal',
  templateUrl: './tabs-ready-modal.component.html',
  styleUrls: ['./tabs-ready-modal.component.scss'],
})
export class TabsReadyModalComponent implements OnInit {
    @Input() set idx(i: number) {
        this.data = this.taskService.readyItems$.getValue()[i];
    };

    data: IVerififcation;

    constructor(
        public modalController: ModalController,
        public tabsService: TabsInfoService,
        public taskService: TasksService
    ) { }

    public dismiss(): void {
        this.modalController.dismiss().then();
    }

    ngOnInit() {}
}
