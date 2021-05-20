import {Component, Input, OnInit} from '@angular/core';
import {ITasksItem} from '../../tabs-tasks.page';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-tabs-tasks-card',
  templateUrl: './tabs-tasks-card.component.html',
  styleUrls: ['./tabs-tasks-card.component.scss'],
})
export class TabsTasksCardComponent implements OnInit {
    @Input() data: ITasksItem;
    @Input() isActive: boolean;
    @Input() isInitiated: boolean;

    constructor() { }

    ngOnInit() {
    }
}
