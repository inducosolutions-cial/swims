import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public stateForm: any;
  public categoryForm: any;
  public newState = '';
  public stateData = [
    {
      state: 'Telangana',
      city: [
        { name: 'Hyderabad' },
        { name: 'Warangal' },
        { name: 'Karimnagar' },
      ],
    },
    {
      state: 'Andhra Pradesh',
      city: [{ name: 'Vijayawada' }, { name: 'Tirupati' }],
    },
  ];

  constructor(fb: FormBuilder) {
    this.stateForm = fb.group({
      state_name: ['', Validators.required],
    });

    this.categoryForm = fb.group({
      category_name: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onKeyUp(event: any) {
    this.newState = event.target.value;
    console.log('$$$$$$$$$$$$$$$$$' + this.newState);
  }
  onClickAddStateBtn() {}
  onClickAddCategoryBtn() {}
}
