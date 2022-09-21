import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recordpreview',
  templateUrl: './recordpreview.page.html',
  styleUrls: ['./recordpreview.page.scss'],
})
export class RecordpreviewPage implements OnInit {
  @Input() recordData;
  isFormEditMode = false;
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log(JSON.stringify(this.recordData));
  }
  closeWin() {
    this.modalController.dismiss();
  }
  editForm() {
    this.isFormEditMode = true;
  }
  saveForm() {
    this.isFormEditMode = false;
  }
  cancelForm() {
    this.isFormEditMode = false;
  }
}
