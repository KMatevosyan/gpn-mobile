import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {TabsInfoService} from '../../services/tabs/tabs-info.service';
import {TasksService} from '../../services/tasks.service';
import {CreateVerificationService, IDropdownItem} from '../../services/create-verification.service';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss'],
})
export class CancelComponent implements OnInit {
    public isOther = false;
    public dropdownExpand = false;
    public currentValue: IDropdownItem;

    constructor(
        private navCtrl: NavController,
        private tabsService: TabsInfoService,
        public tasksService: TasksService,
        public dropdownService: CreateVerificationService
    ) { }

    public toggleDropdown(): void {
        this.dropdownExpand = !this.dropdownExpand;
    }

    public chooseItem(idx: number): void {
        if (idx === 0) {
            this.isOther = true;
        }
        else  {
            this.currentValue.msg = '';
        }
        const list = this.dropdownService.reasons$.getValue();
        this.currentValue = list[idx];
    }

    public ngOnInit(): void {
        this.dropdownService.getReasons().then();
    }

    public async accept(): Promise<void> {
        const now = new Date();
        await this.tasksService.cancelVerification(this.currentValue.id, this.currentValue.msg, now);
        this.navCtrl.navigateRoot('/tabs/tabs-tasks').then();
    }

    public back(): void {
        this.navCtrl.back();
    }
}
