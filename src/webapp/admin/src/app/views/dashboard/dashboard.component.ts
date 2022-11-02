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
  time = {hour: 0, minute: 1};
  minDate:any;
  maxDate:any;
  startDate:any;
  constructor(private calendar: NgbCalendar) { }

  ngOnInit(): void {
    let today = new Date();
    console.log(today.getFullYear()+":"+today.getMonth()+":"+today.getDate())
    this.minDate = { year: 1985, month: 1, day: 1 };
    this.maxDate={year:today.getFullYear(),month: today.getMonth(), day: today.getDate()}
    this.startDate = { year: today.getFullYear(), month: today.getMonth(), day: today.getDate() };
  }
  onDateChange(event:any){
    console.log(event.target.name)
  }

}
