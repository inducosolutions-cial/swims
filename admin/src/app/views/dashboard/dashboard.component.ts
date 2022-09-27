import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  model!: NgbDateStruct;
  date!: {year: number, month: number};
  today = this.calendar.getToday();
  time = {hour: 13, minute: 30};
  constructor(private calendar: NgbCalendar) { }

  ngOnInit(): void {
  }
  onDateChange(event:any){
    console.log(event.target.name)
  }

}
