import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {KeyboardService} from './@core/services/keyboard.service';
import {Platform} from '@ionic/angular';
import {ThemeServiceService} from './services/theme-service.service';
import {DOCUMENT} from '@angular/common';
import {Subscription} from 'rxjs';
import {NfcService} from './@core/services/nfc.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    @ViewChild('appWindow', {static: true}) private appWindow: ElementRef;
    private subscription: Subscription;
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private keyboardService: KeyboardService,
        private platform: Platform,
        private themeService: ThemeServiceService,
        private nfcService: NfcService,
    ) {}

    public ngOnInit(): void {
        this.initializeApp();
        this.themeService.setThemeConfiguratorRoot(this.document).then();
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private initializeApp(): void {
        this.platform.ready().then(() => {
            setTimeout(() => this.keyboardService.setInitSettings(this.platform, this.appWindow).then());
        });
        this.nfcService.initNfc();
    }
}
