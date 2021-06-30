import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {TabsInfoService} from '../../../../../../services/tabs/tabs-info.service';
import {IQuality, IVerififcation, TasksService} from '../../../../../../services/tasks.service';

@Component({
  selector: 'app-tabs-ready-modal',
  templateUrl: './tabs-ready-modal.component.html',
  styleUrls: ['./tabs-ready-modal.component.scss'],
})
export class TabsReadyModalComponent implements OnInit {
    @Input() set idx(i: number) {
        this.data = this.tasksService.readyItems$.getValue()[i];
    };
    quality: IQuality[] = [];
    data: IVerififcation;

    constructor(
        public modalController: ModalController,
        public tabsService: TabsInfoService,
        public tasksService: TasksService
    ) { }

    public dismiss(): void {
        this.modalController.dismiss().then();
    }
    public async accept(): Promise<void> {
        this.data.selected_quality.forEach(item => {
            this.quality.push({
                dx: item.dx ?? 0,
                name: item.parameter_name,
                value: item.value
            });
        });

        await this.tasksService.setError(this.quality);
        this.quality = [];

        const planDate = new Date(this.data.plantDatetime);
        await this.tasksService.getTasks(planDate);
        this.dismiss();
    }

    ngOnInit() {}
}
