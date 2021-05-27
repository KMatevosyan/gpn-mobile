import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

export interface ICalendarDay {
    date: number;
    isCritical: boolean;
    isActive: boolean;
    haveIndicator: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})

export class CalendarComponent implements OnInit {
    public readonly weekdayList = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    public months: string[] = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ];

    public prevDates: ICalendarDay[] = [];
    public currentDates: ICalendarDay[] = [];
    public nextDates: ICalendarDay[] = [];

    public date: Date = new Date();

    constructor(
        public modalController: ModalController
    ) { }

    public dismiss(): void {
        this.modalController.dismiss().then();
    }

    public choseDate(type: string, day: number): void {
        this.prevDates.map(x => x.isActive = false);
        this.currentDates.map(x => x.isActive = false);
        this.nextDates.map(x => x.isActive = false);

        switch (type) {
            case 'prev':
                this.prevDates.find(item => item.date === day).isActive = true;
                break;
            case 'next':
                this.nextDates.find(item => item.date === day).isActive = true;
                break;
            case 'current':
                this.currentDates.find(item => item.date === day).isActive = true;
                break;
        }
    }

    public next(): void {
        this.date.setMonth(this.date.getMonth() + 1);
        this.setCalendarData();
    }

    public prev(): void {
        this.date.setMonth(this.date.getMonth() - 1);
        this.setCalendarData();
    }

    ngOnInit() {
        this.setCalendarData();
    }

    private setCalendarData() {
        this.prevDates = [];
        this.currentDates = [];
        this.nextDates = [];

        this.date.setDate(1);

        const lastDay = new Date(
            this.date.getFullYear(),
            this.date.getMonth() + 1,
            0
        ).getDate();

        const prevLastDay = new Date(
            this.date.getFullYear(),
            this.date.getMonth(),
            0
        ).getDate();

        const firstDayIndex = this.date.getDay();

        const lastDayIndex = new Date(
            this.date.getFullYear(),
            this.date.getMonth() + 1,
            0
        ).getDay();

        const nextDays = 6 - lastDayIndex;

        let days = '';

        for (let x = firstDayIndex; x > 0; x--) {
            days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
            this.prevDates.push({
                date: prevLastDay - x + 1,
                isCritical: false,
                isActive: false,
                haveIndicator: false
            });
        }

        for (let i = 1; i <= lastDay; i++) {
            if (
                i === new Date().getDate() &&
                this.date.getMonth() === new Date().getMonth()
            ) {
                days += `<div class="today">${i}</div>`;

                this.currentDates.push({
                    date: i,
                    isCritical: true,
                    isActive: false,
                    haveIndicator: (Math.random() > 0.6) || i === 26
                });

            } else {
                days += `<div>${i}</div>`;

                this.currentDates.push({
                    date: i,
                    isCritical: false,
                    isActive: false,
                    haveIndicator: (Math.random() > 0.6) || i === 26
                });
            }
        }

        for (let j = 1; j <= nextDays; j++) {
            days += `<div class="next-date">${j}</div>`;

            this.nextDates.push({
                date: j,
                isCritical: false,
                isActive: false,
                haveIndicator: (Math.random() > 0.6)
            });
        }
    };
}
