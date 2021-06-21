import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ModalController, NavController} from '@ionic/angular';
import {TabsInfoService} from '../../services/tabs/tabs-info.service';
import {IVerififcation, TasksService} from '../../services/tasks.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
    timer: {
        hour: string;
        min: string;
        sec: string;
    } = {
        hour: '00',
        min: '00',
        sec: '00'
    };

    constructor(
        private navCtrl: NavController,
        private modalCtrl: ModalController,
        private tabsService: TabsInfoService,
        public tasksService: TasksService
    ) {
    }

    public ngOnInit(): void {
        setInterval(()=> {
            if(+this.timer.sec === 59) {
                this.timer.sec = '00';
                if(+this.timer.min === 59) {
                    this.timer.min = '00';

                    if (+this.timer.hour > 8) {
                        this.timer.hour = '' + (+this.timer.hour + 1);
                    }
                    else {
                        this.timer.hour = '0' + (+this.timer.hour + 1);
                    }
                }
                else if (+this.timer.min > 8) {
                    this.timer.min = '' + (+this.timer.min + 1);
                }
                else {
                    this.timer.min = '0' + (+this.timer.min + 1);
                }
            }
            else if (+this.timer.sec > 8) {
                this.timer.sec = '' + (+this.timer.sec + 1);
            }
            else {
                this.timer.sec = '0' + (+this.timer.sec + 1);
            }
        }, 1000);
    }

    public async accept(): Promise<void> {
        this.navCtrl.navigateRoot('/result').then();
    }

    public back(): void {
        this.navCtrl.back();
    }

    public cancel(): void {
        this.navCtrl.navigateRoot('/cancel').then();
    }
}
