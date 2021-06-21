import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {VerificationTypeComponent} from '../../components/verification-type/verification-type.component';
import {TabsInfoService} from '../../../../services/tabs/tabs-info.service';
import {CreateVerificationService, IDropdownItem} from '../../../../services/create-verification.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface ICurrentValues {
    manufacture: IDropdownItem;
    machine: IDropdownItem;
    pak: IDropdownItem;
    quality: IDropdownItem[];
}

@Component({
  selector: 'app-new-verification',
  templateUrl: './new-verification.component.html',
  styleUrls: ['./new-verification.component.scss'],
    animations: [
        trigger('rows', [
            state('collapsed', style({ opacity: 1, height: '0' })),
            state('expanded', style({ opacity: 1, height: 'auto', 'max-height': '29vh'})),
            transition('collapsed => expanded', animate('200ms ease-in')),
            transition('expanded => collapsed', animate('200ms ease-out')),
        ]),
    ],
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

    public currentValues: ICurrentValues = {
        manufacture: null,
        machine: null,
        pak: null,
        quality: []
    };

    constructor(
        public modalController: ModalController,
        private tabsService: TabsInfoService,
        public dropdownService: CreateVerificationService
    ) { }

    public toggleDropdown(type: string): void {
        this.dropdownExpand[type] = !this.dropdownExpand[type];
    }

    public async chooseItem(idx: number, type: string): Promise<void> {
        let list: IDropdownItem[];
        switch (type) {
            case 'manufacture':
                list = this.dropdownService.manufactureList$.getValue();
                if (!(this.currentValues[type]?.id === list[idx]?.id)) {
                    this.currentValues.machine = null;
                    this.currentValues.pak = null;
                    await this.dropdownService.getMachines(list[idx]?.id);
                }
                break;
            case 'machine':
                list = this.dropdownService.machineList$.getValue();
                if (!(this.currentValues[type]?.id === list[idx]?.id)) {
                    this.currentValues.pak = null;
                    await this.dropdownService.getPaks(list[idx]?.id);
                }
                break;
            case 'pak':
                list = this.dropdownService.pakList$.getValue();
                if (!(this.currentValues[type]?.id === list[idx]?.id)) {
                    await this.dropdownService.getQuality(list[idx]?.id);
                }
                break;
        }

        this.currentValues[type] = list[idx];
    }

    public dismiss(): void {
        this.modalController.dismiss().then();
    }

    public openVerificationType(): void {
        this.currentValues.quality = this.dropdownService.qualityList$.getValue().filter(x => x.chosen);

        this.dropdownService.currentValue = {
            manufacture: this.currentValues.manufacture.name,
            machine: this.currentValues.machine.name,
            pak: this.currentValues.pak.position_name,
            quality: this.currentValues.quality.map(x => ({
                name: x.name
            }))
        };

        this.presentModal().then();
    }

    ngOnInit() {
        this.dropdownService.getProductions().then();
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
