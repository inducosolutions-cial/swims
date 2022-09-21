/* eslint-disable max-len */
/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { RecordpreviewPage } from '../views/recordpreview/recordpreview.page';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.page.html',
  styleUrls: ['./materials.page.scss'],
})
export class MaterialsPage implements OnInit {
  currentView = 'grid';
  selectedTab = 'Inbound';
  inbondRecords = [
    {
      project: 'Collection & Transportation',
      date: '08-08-2022',
      materialName: 'Mixed waste',
      weight: '3',
      weightInd: 'tons',
      flow: 'Inbound',
      vendor: 'City Muncipality',
      notes:
        'Officia exercitation mollit culpa commodo dolor elit eu consectetur pariatur ex ut dolore mollit esse.',
    },
    {
      project: 'Collection & Transportation',
      date: '20-08-2022',
      materialName: 'Dry waste',
      weight: '2',
      weightInd: 'tons',
      flow: 'Inbound',
      vendor: 'City Muncipality',
      notes:
        'Magna commodo aliquip magna tempor do nisi incididunt exercitation veniam ex consectetur. Exercitation ipsum irure consequat nulla nostrud enim ad quis reprehenderit deserunt ullamco. Exercitation sit est culpa consectetur et amet ullamco ullamco aliquip proident velit commodo. Eu do in veniam voluptate Lorem.',
    },
    {
      project: 'Collection & Transportation',
      date: '20-08-2022',
      materialName: 'Dry waste',
      weight: '2.5',
      weightInd: 'tons',
      flow: 'Inbound',
      vendor: 'City Muncipality',
      notes:
        'Velit consectetur anim esse laborum est ullamco ullamco enim non est ipsum proident. Qui cillum adipisicing occaecat aliquip aliquip culpa exercitation voluptate excepteur est velit ipsum velit sunt. Mollit consectetur consequat incididunt deserunt enim eiusmod eu dolore quis excepteur tempor. Incididunt amet qui qui et Lorem adipisicing non aliquip. Ipsum tempor excepteur cillum exercitation.',
    },
    {
      project: 'Collection & Transportation',
      date: '21-08-2022',
      materialName: 'Wet waste',
      weight: '1.3',
      weightInd: 'tons',
      flow: 'Inbound',
      vendor: 'City Muncipality',
      notes:
        'Nulla voluptate mollit pariatur voluptate occaecat aute et labore duis.',
    },
    {
      project: 'Collection & Transportation',
      date: '26-08-2022',
      materialName: 'Diesel',
      weight: '20',
      weightInd: 'lts',
      flow: 'Inbound',
      vendor: 'Laxshmi Petrol Station',
      notes:
        'Sunt consectetur sunt aliqua cillum cillum ut adipisicing id ex eu quis.',
    },
    {
      project: 'Collection & Transportation',
      date: '02-09-2022',
      materialName: 'EM solution',
      weight: '5',
      weightInd: 'lts',
      flow: 'Inbound',
      vendor: 'XYZ Ltd',
      notes:
        'Ipsum commodo nulla nisi nostrud minim culpa labore do pariatur velit aute.',
    },
  ];
  outbondRecords = [
    {
      project: 'Collection & Transportation',
      date: '12-08-2022',
      materialName: 'Compost',
      weight: '3',
      weightInd: 'tons',
      flow: 'Outbound',
      vendor: 'Gardens & Co',
      notes:
        'Exercitation adipisicing ea dolore tempor et nostrud Lorem reprehenderit dolor ut ullamco minim minim nulla.',
    },
    {
      project: 'Collection & Transportation',
      date: '14-08-2022',
      materialName: 'RDF',
      weight: '2',
      weightInd: 'tons',
      flow: 'Outbound',
      vendor: 'XYZ ltd',
      notes:
        'Excepteur elit cupidatat laboris in ex et proident anim tempor in labore enim.',
    },
    {
      project: 'Collection & Transportation',
      date: '15-08-2022',
      materialName: 'Paper',
      weight: '2.5',
      weightInd: 'tons',
      flow: 'Outbound',
      vendor: 'Papers & mills',
      notes:
        'Cillum esse incididunt in minim sunt reprehenderit. Ad sunt quis incididunt ullamco irure excepteur pariatur aliqua occaecat amet. Deserunt sunt Lorem dolore mollit cupidatat in reprehenderit qui aliquip incididunt in quis ut esse. Deserunt culpa enim ea aute.',
    },
    {
      project: 'Collection & Transportation',
      date: '19-08-2022',
      materialName: 'Plastic',
      weight: '1.2',
      weightInd: 'tons',
      flow: 'Outbound',
      vendor: 'Plastic Materials Ltd',
      notes: 'Qui consequat tempor ipsum esse in consectetur.',
    },
    {
      project: 'Collection & Transportation',
      date: '22-08-2022',
      materialName: 'Metals',
      weight: '20',
      weightInd: 'tons',
      flow: 'Outbound',
      vendor: 'Hard & Core',
      notes:
        'Reprehenderit nisi ut laboris officia elit nulla commodo consequat enim.',
    },
    {
      project: 'Collection & Transportation',
      date: '26-08-2022',
      materialName: 'Compost',
      weight: '5',
      weightInd: 'tons',
      flow: 'Outbound',
      vendor: 'Gardens & Co',
      notes: 'Magna et commodo cillum veniam duis ullamco.',
    },
  ];
  constructor(
    private navCtrl: NavController,
    public alertController: AlertController,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {}
  onBackBtnClick() {
    this.navCtrl.navigateRoot('home');
  }
  onAddRecordClick() {
    this.currentView = 'form';
  }
  cancelRecord() {
    this.currentView = 'grid';
  }
  addRecod() {
    this.currentView = 'grid';
  }
  editRecord(item) {
    this.currentView = 'form';
  }
  segmentChanged(ev: any) {
    this.selectedTab = ev.detail.value;
  }
  async showDetails(recordData) {
    const modal = await this.modalCtrl.create({
      cssClass: 'my-form-modal-css',
      component: RecordpreviewPage,
      componentProps: { recordData: recordData },
    });
    return await modal.present();
  }
  async deleteRecord(item) {
    const alert = await this.alertController.create({
      cssClass: 'alerFormCss',
      header: 'Delete Record',
      message: 'Are you sure you want to delete this record?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (data) => {},
        },
      ],
    });
    await alert.present();
  }
}
