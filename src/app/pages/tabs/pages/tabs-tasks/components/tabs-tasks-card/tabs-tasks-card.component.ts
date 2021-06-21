import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IVerififcation} from '../../../../../../services/tasks.service';

@Component({
  selector: 'app-tabs-tasks-card',
  templateUrl: './tabs-tasks-card.component.html',
  styleUrls: ['./tabs-tasks-card.component.scss'],
})
export class TabsTasksCardComponent implements OnInit {
    @Input() data: IVerififcation;
    @Input() isActive: boolean;
    @Input() isInitiated: boolean;

    constructor() { }

    ngOnInit() {
    }
}
