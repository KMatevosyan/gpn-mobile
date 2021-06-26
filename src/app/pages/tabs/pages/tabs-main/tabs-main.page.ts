import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {IPageTab, PageTabType} from '../../tabs.page';
import {BehaviorSubject, combineLatest} from 'rxjs';
import * as d3 from 'd3';
import {ModalController, NavController} from '@ionic/angular';
import {TabsInfoService} from '../../../../services/tabs/tabs-info.service';
import {NewVerificationComponent} from '../new-verification/new-verification.component';
import {TasksService} from '../../../../services/tasks.service';

export interface IDiagram {
    total: number;
    date: Date;
    sections: IDiagramSections[];
}
export interface IDiagramSections {
    name: string;
    value: number;
    showValue?: string;
    color: string;
}

@Component({
    selector: 'app-tabs-main',
    templateUrl: './tabs-main.page.html',
    styleUrls: ['./tabs-main.page.scss'],
})

export class TabsMainPage implements OnInit, IPageTab, AfterViewInit {
    @ViewChild('chart', {static: true}) chart: ElementRef;
    public route: PageTabType = 'main';
    public svg: any;
    readonly diagramData$: BehaviorSubject<IDiagram> = new BehaviorSubject<IDiagram>(null);

    constructor(
        private navCtrl: NavController,
        private tabsService: TabsInfoService,
        private tasksService: TasksService,
        private modalController: ModalController
    ) {}

    @HostListener('window:resize', ['$event'])
    public onResize(): void {
        this.drawSvg(this.diagramData$.value);
    }

    ngOnInit() {
        combineLatest(
            this.tasksService.initiatedItems$,
            this.tasksService.agreeItems$,
            this.tasksService.readyItems$
        ).subscribe(tasks => {
            const initiated = tasks[0];
            const agree = tasks[1];
            const ready = tasks[2];

            const data: IDiagram = {
                total: initiated.length + tasks[1].length + tasks[2].length,
                date: new Date(),
                sections: [
                    {
                        name: 'Новые',
                        value: tasks[0].length + tasks[1].length,
                        showValue: `${tasks[1].length}/${tasks[0].length + tasks[1].length}`,
                        color: 'var(--gray-slyder)'
                    },
                    {
                        name: 'Выполнены',
                        value: tasks[2].length,
                        color: 'var(--border-blue-color)'
                    }
                ]
            };
            this.diagramData$.next(data);
            this.drawSvg(this.diagramData$.value);
        });
    }

    ngAfterViewInit() {}

    public addVerification(): void {
        this.presentModal().then();
    }

    private async presentModal() {
        const modal = await this.modalController.create({
            component: NewVerificationComponent,
            cssClass: 'verification-modal',
            showBackdrop: false
        });
        return await modal.present();
    }

    public redirectToTab(tabName: string): void {
        switch (tabName) {
            case 'В работе':
                this.navCtrl.navigateRoot('/tabs/tabs-tasks').then();
                this.tabsService.tasksCurrentTab$.next(1);
                return;
            case 'Новые':
                this.navCtrl.navigateRoot('/tabs/tabs-tasks').then();
                this.tabsService.tasksCurrentTab$.next(0);
                return;
            case 'Выполнены':
                this.navCtrl.navigateRoot('tabs/tabs-ready').then();
                return;
            default:
                return;
        }
    }

    private drawSvg(data: IDiagram): void {
        const size: number = Math.min(this.chart.nativeElement.clientWidth, this.chart.nativeElement.clientHeight);
        const innerR = 0.37 * size;
        const outerR = 0.37 * 0.92 * size;

        if (this.svg) {
            this.svg.remove();
        }

        this.svg = d3.select(this.chart.nativeElement).append('svg').attr('width', `${size}px`).attr('height', `${size}px`);

        const arcBg = (start: number, end: number) => d3.arc()
                .innerRadius(innerR)
                .outerRadius(outerR)
                .startAngle(start * 2 * Math.PI)
                .endAngle(end * 2 * Math.PI);

        const arcBgBot = d3.arc()
            .innerRadius(1.04 * innerR)
            .outerRadius(0.88 * innerR)
            .startAngle(0)
            .endAngle(2 * Math.PI);


        const g: any = this.svg.append('g').style('transform', `translate(${size/2}px, ${size/2}px)`);

        g.append('path').attr('d', arcBgBot)
            .style('fill', 'var(--bg-dashboard-color)');

        let startPos = 0;
        let endPos = 0;
        [...data.sections].reverse().forEach((section, i) => {
            if (i > 0) {
                startPos += data.sections[i-1]?.value / data.total;
            }
            endPos = startPos + section.value / data.total;
            g.append('path').attr('d', arcBg(startPos, endPos))
                .style('fill', section.color);
        });
    }
}
