import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ModalController, NavController} from '@ionic/angular';
import {TabsInfoService} from '../../services/tabs/tabs-info.service';
import {IQuality, IVerififcation, TasksService} from '../../services/tasks.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
    public currentTask$: BehaviorSubject<IVerififcation> = new BehaviorSubject<IVerififcation>(null);
    public quality: IQuality[] = [];
    constructor(
        private navCtrl: NavController,
        private modalCtrl: ModalController,
        private tabsService: TabsInfoService,
        public tasksService: TasksService
    ) {
    }

    public ngOnInit(): void {
    }

    public async accept(): Promise<void> {
        const endTime: Date = new Date();
        const task = this.tasksService.currentTask$.value;
        task.endTime = endTime;
        this.tasksService.currentTask$.next(task);

        task.selected_quality.forEach(item => {
            this.quality.push({
                dx: item.dx ?? 0,
                name: item.parameter_name,
                value: item.value
            });
        });

        await this.tasksService.setVerification(this.quality);
        this.quality = [];

        const planDate = new Date(task.plantDatetime);
        await this.tasksService.getTasks(planDate);

        this.navCtrl.navigateRoot('/tabs/tabs-ready').then();
    }

    public back(): void {
        this.navCtrl.back();
    }


}
