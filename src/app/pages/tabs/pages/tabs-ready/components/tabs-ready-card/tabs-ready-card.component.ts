import {Component, Input, OnInit} from '@angular/core';
import {IReadyItem} from '../../tabs-ready.page';

@Component({
  selector: 'app-tabs-ready-card',
  templateUrl: './tabs-ready-card.component.html',
  styleUrls: ['./tabs-ready-card.component.scss'],
})
export class TabsReadyCardComponent implements OnInit {
    @Input() data: IReadyItem;
    @Input() idx: number;
    @Input() isActive: boolean;
    @Input() isInitiated: boolean;

    constructor() { }

    ngOnInit() {
    }
}
