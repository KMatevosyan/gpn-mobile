import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {TabsInfoService} from "../../../../services/tabs/tabs-info.service";

@Component({
  selector: 'app-verification-type',
  templateUrl: './verification-type.component.html',
  styleUrls: ['./verification-type.component.scss'],
})
export class VerificationTypeComponent implements OnInit {
    public dropdownExpand = false;
    public currentValue: string;
    public typeList$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
        ['Стандартный образец', 'Эталонная проба', 'Рабочая проба', 'Эталонная проба']
    );

    constructor(
        public modalController: ModalController,
        private navCtrl: NavController,
        private tabsService: TabsInfoService,
    ) { }

    public toggleDropdown(): void {
        this.dropdownExpand = !this.dropdownExpand;
    }

    public chooseItem(idx: number): void {
        const list = this.typeList$.getValue();
        this.currentValue = list[idx];
    }

    public dismiss(): void {
        this.modalController.dismiss().then();
    }

    public accept() {
        this.navCtrl.navigateRoot('/tabs/tabs-tasks').then();
        this.tabsService.closeVerification$.next(true);
        this.tabsService.tasksCurrentTab$.next(1);
        this.dismiss();
    }

    ngOnInit() {}

}
