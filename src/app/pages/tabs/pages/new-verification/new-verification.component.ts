import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {VerificationTypeComponent} from "../../components/verification-type/verification-type.component";
import {TabsInfoService} from "../../../../services/tabs/tabs-info.service";

@Component({
  selector: 'app-new-verification',
  templateUrl: './new-verification.component.html',
  styleUrls: ['./new-verification.component.scss'],
})
export class NewVerificationComponent implements OnInit {
    readonly selects: string[] = ['manufacture', 'machine', 'pak', 'quality'];

    public dropdownExpand: {
        manufacture: boolean;
        machine: boolean;
        pak: boolean;
    } = {
        manufacture: false,
        machine: false,
        pak: false
    };

    public dropdownActive: {
        manufacture: boolean;
        machine: boolean;
        pak: boolean;
        quality: boolean;
    } = {
        manufacture: true,
        machine: false,
        pak: false,
        quality: false
    };

    public currentValues: {
        manufacture: string;
        machine: string;
        pak: string;
    } = {
        manufacture: null,
        machine: null,
        pak: null
    };

    public manufactureList$: BehaviorSubject<string[]> = new BehaviorSubject([
        'Производство 1',
        'Производство 2',
        'Производство 3',
        'Производство 4'
    ]);

    public machineList$: BehaviorSubject<string[]> = new BehaviorSubject([
        'ТЭУ-1',
        'ФСБ',
        'ЭЛОУ-АВТ-9',
        'АТ-9'
    ]);

    public pakList$: BehaviorSubject<string[]> = new BehaviorSubject([
        'ПАК 1',
        'ПАК 2',
        'ПАК 3',
        'ПАК 4'
    ]);

    public qualityList$: BehaviorSubject<string[]> = new BehaviorSubject([
        'Температура',
        'Примеси',
        'Плотность',
        'Вязкозть'
    ]);

    constructor(
        public modalController: ModalController,
        private tabsService: TabsInfoService,
    ) { }

    public toggleDropdown(type: string): void {
        this.dropdownExpand[type] = !this.dropdownExpand[type];
    }

    public chooseItem(idx: number, type: string): void {
        let list;
        switch (type) {
            case 'manufacture':
                list = this.manufactureList$.getValue();
                break;
            case 'machine':
                list = this.machineList$.getValue();
                break;
            case 'pak':
                list = this.pakList$.getValue();
                break;
        }

        this.currentValues[type] = list[idx];

        const index = this.selects.findIndex(item => item === type);
        this.dropdownActive[this.selects[index + 1]] = true;
    }

    public dismiss(): void {
        this.modalController.dismiss().then();
    }

    public openVerificationType(): void {
        this.presentModal().then();
    }

    ngOnInit() {
        this.tabsService.closeVerification$.subscribe(value =>  {
            if(value) {
                this.modalController.dismiss().then();
            }
        });
    }

    private async presentModal() {
        const modal = await this.modalController.create({
            component: VerificationTypeComponent,
            cssClass: 'verification-type-modal',
            showBackdrop: true
        });
        return await modal.present();
    }
}
