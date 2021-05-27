import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AvatarModalComponent} from '../avatar-modal/avatar-modal.component';
import {BehaviorSubject} from 'rxjs';
import {ThemeServiceService} from '../../services/theme-service.service';
import {CalendarComponent} from "../calendar/calendar.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Input() withThemeSwitch = false;
    @Input() withCalendar = false;
    @Input() withAvatar = true;

    constructor(
      public modalController: ModalController,
      public theme: ThemeServiceService
    ) { }

    ngOnInit() {}

    public async openModal(e: Event): Promise<void> {
        this.presentModal().then();
    }

    public toggleSwitch(): void {
        this.theme.changeTheme();
    }

    public async openCalendar(): Promise<void> {
        this.presentModalCalendar().then();
    }

    private async presentModal() {
        const modal = await this.modalController.create({
            component: AvatarModalComponent,
            cssClass: 'avatar-modal',
            showBackdrop: false
        });
        return await modal.present();
    }

    private async presentModalCalendar() {
        const modal = await this.modalController.create({
            component: CalendarComponent,
            cssClass: 'calendar-modal'
        });
        return await modal.present();
    }
}
