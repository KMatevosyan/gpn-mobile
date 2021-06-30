import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalController, NavController, PopoverController} from '@ionic/angular';
import {KeyboardService} from '../../@core/services/keyboard.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SimpleModalComponent} from '../../@shared/simple-modal/simple-modal.component';
import {AuthorizationService} from '../../services/autoriztion.service';
import {TasksService} from '../../services/tasks.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
    @ViewChild('content') private content: ElementRef;
    public loginForm: FormGroup = new FormGroup({
        login: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });
    private subscriber$: Subject<null> = new Subject<null>();

    constructor(
        public modalController: ModalController,
        private navCtrl: NavController,
        private keyboardService: KeyboardService,
        private auth: AuthorizationService,
        public tasks: TasksService
    ) {}

    ngOnInit(): void {
        this.keyboardService.keyboardHeight$
            .pipe(takeUntil(this.subscriber$))
            .subscribe(this.scrollToBottom.bind(this));
    }

    ngOnDestroy(): void {
        this.subscriber$.next(null);
        this.subscriber$.complete();
    }

    public async submit(e: Event): Promise<void> {
        if (this.loginForm.valid) {
            const res = await this.auth.getToken(this.loginForm.value);
            if (res) {
                const date = new Date();
                this.tasks.getTasks(date).then();
                await setInterval(()=> {
                    this.tasks.getTasks(date);
                }, 4500);
                this.navCtrl.navigateRoot('/tabs').then();
            }
            else {
                this.presentModalPassword().then();
            }
        }
    }

    private async presentModalPassword() {
        const modal = await this.modalController.create({
            component: SimpleModalComponent,
            cssClass: 'simple-modal',
            componentProps: {
                message: 'Неверный пароль',
            }
        });
        return await modal.present();
    }

    private scrollToBottom(): void {
        if (!this.content?.nativeElement) {
            return;
        }
        this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    }
}
