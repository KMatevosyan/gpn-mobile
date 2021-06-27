import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {TabsInfoService} from '../../../../services/tabs/tabs-info.service';
import {CreateVerificationService, IDropdownItem} from '../../../../services/create-verification.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TasksService} from "../../../../services/tasks.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-verification-type',
  templateUrl: './verification-type.component.html',
  styleUrls: ['./verification-type.component.scss'],
})
export class VerificationTypeComponent implements OnInit {
    public dropdownExpand = false;
    public currentValue: IDropdownItem;

    public dateForm: FormGroup = new FormGroup({
        day: new FormControl(null, Validators.required),
        time: new FormControl(null, Validators.required),
    });

    constructor(
        public modalController: ModalController,
        private navCtrl: NavController,
        private tabsService: TabsInfoService,
        public tasksService: TasksService,
        public dropdownService: CreateVerificationService,
        private datePipe: DatePipe
    ) { }

    public toggleDropdown(): void {
        this.dropdownExpand = !this.dropdownExpand;
    }

    public chooseItem(idx: number): void {
        const list = this.dropdownService.verificationList$.getValue();
        this.currentValue = list[idx];
    }

    public async dismiss(): Promise<boolean> {
        const res = await this.modalController.dismiss();
        return res;
    }

    public async accept() {
        const dayArr = this.dateForm.get('day').value.split('.');
        const timeArr = this.dateForm.get('time').value.split(':');

        const verificationDate = new Date(+dayArr[2], +dayArr[1] - 1, +dayArr[0], +timeArr[0], +timeArr[1], +timeArr[2]);

        this.dropdownService.currentValue.verificationDate = verificationDate;
        this.dropdownService.currentValue.verificationType = this.currentValue.name;

        const res = await this.dropdownService.setVerification();

        if (res) {
            await this.tasksService.getTasks(verificationDate);
            this.navCtrl.navigateRoot('/tabs/tabs-tasks').then();
            this.tabsService.tasksCurrentTab$.next(1);
            await this.dismiss();
            this.tabsService.closeVerification$.next(true);
        }
    }

    ngOnInit() {
        this.dropdownService.getVerificationType().then();

        const today = new Date();
        today.setHours(today.getHours() + 1);

        this.dateForm.setValue({
            day: this.datePipe.transform(today, 'dd.MM.yyyy'),
            time: this.datePipe.transform(today, 'HH:mm:ss')
        });
    }

}
