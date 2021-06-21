import {NgModule} from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'nfc',
        loadChildren: () => import('./pages/nfc-verify/nfc-verify.module').then(m => m.NfcVerifyModule)
    },
    {
        path: 'barcode',
        loadChildren: () => import('./pages/barcode-scanner/barcode-scanner.module').then(m => m.MyBarcodeScannerModule)
    },
    {
        path: 'timer',
        loadChildren: () => import('./pages/timer/timer.module').then(m => m.TimerModule)
    },
    {
        path: 'result',
        loadChildren: () => import('./pages/result/result.module').then(m => m.ResultModule)
    },
    {
        path: 'cancel',
        loadChildren: () => import('./pages/cancel/cancel.module').then(m => m.CancelModule)
    },
    {
        path: 'tabs',
        loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: NoPreloading})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
