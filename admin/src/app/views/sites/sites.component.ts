import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppDataService } from 'src/app/services/app-data.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { WhiteSpaceValidator } from 'src/app/services/whitespace.validator';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {
  @ViewChild('closeModal')
  closeModal!: ElementRef;

  public currentView = 'projects';
  public projectsData = [];
  public projectTypeData = [];
  public wardsData = [];
  public statesData = [];
  public citiesData = [];
  public showProjectsLoader = false;
  public showWardsLoader = false;
  public formAct = 'create';
  public projectForm: any;

  public wardForm: any;
  public wardFormAct = 'create';
  public wardObj = {
    ward_id: '',
    wardname: '',
    wardno: '',
    city: '',
    state: '',
  };
  public projectObj: any = {
    project_id: '',
    projecttype: '',
    projname: '',
    desc: '',
  };

  constructor(
    fb: FormBuilder,
    private authService: AuthServiceService,
    public appData: AppDataService
  ) {
    this.projectForm = fb.group({
      projname: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          WhiteSpaceValidator.noWhiteSpace,
        ],
      ],
      desc: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(250),
          WhiteSpaceValidator.noWhiteSpace,
        ],
      ],
      projecttype: ['', Validators.required],
    });
    this.wardForm = fb.group({
      wardname: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
          WhiteSpaceValidator.noWhiteSpace,
        ],
      ],
      wardno: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
          WhiteSpaceValidator.noWhiteSpace,
        ],
      ],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getProjects();
    this.getStates();
    this.getProjecttypes();
  }
  async getProjecttypes() {
    var dataObj = {
      user_id: this.appData.user_id,
    };
    this.authService
      .apiCommunication('getProjectTypes', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.projectTypeData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  getProjects() {
    var dataObj = {
      user_id: this.appData.user_id,
    };
    this.authService
      .apiCommunication('getProjects', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.projectsData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  editProject(projectObj: any) {
    this.currentView = 'projectForm';
    this.formAct = 'edit';
    this.projectObj = {
      project_id: projectObj.project_id,
      projecttype: projectObj.project_type_id,
      projname: projectObj.project_name,
      desc: projectObj.description,
    };
    this.getWardsByProject();
  }
  initiateProjectCreation() {
    this.currentView = 'projectForm';
    this.formAct = 'create';
    this.projectObj = {
      project_id: '',
      projecttype: '',
      projname: '',
      desc: '',
    };
  }
  cancelForm() {
    this.currentView = 'projects';
    this.getProjects();
  }
  submitProject() {
    if (this.formAct === 'create') {
      let dataObj = {
        user_id: this.appData.user_id,
        project_name: this.projectObj.projname,
        project_type_id: this.projectObj.projecttype,
        description: this.projectObj.desc,
      };
      this.authService
        .apiCommunication('addProject', dataObj)
        .then((responseObj: any) => {
          if (responseObj['success']) {
            this.formAct = 'edit';
            var projectObj = responseObj['data'][0]
            this.projectObj = {
              project_id: projectObj.project_id,
              projecttype: projectObj.project_type_id,
              projname: projectObj.project_name,
              desc: projectObj.description,
            }
            this.getWardsByProject()
            window.alert('Successfully Created');
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});

    } else {
      let dataObj = {
        user_id: this.appData.user_id,
        project_id: this.projectObj.project_id,
        project_name: this.projectObj.projname,
        project_type_id: this.projectObj.projecttype,
        description: this.projectObj.desc,
      };
      this.authService
        .apiCommunication('updateProject', dataObj)
        .then((responseObj: any) => {
          if (responseObj['success']) {
            window.alert('Successfully Updated');
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }
  initiateCreateWard() {
    this.wardFormAct = 'create';
    this.wardObj = {
      ward_id: '',
      wardname: '',
      wardno: '',
      city: '',
      state: '',
    };
  }
  initiateEditWard(wObj: any) {
    this.wardFormAct = 'edit';
    this.wardObj = {
      ward_id: wObj.project_ward_id,
      wardname: wObj.ward_name,
      wardno: wObj.ward_number,
      city: wObj.city_id,
      state: wObj.state_id,
    };
    this.getCities();
  }

  onStateSelect() {
    this.wardObj.city = '';
    this.getCities();
  }
  async getCities() {
    var dataObj = {
      user_id: this.appData.user_id,
      state_id: this.wardObj.state,
    };
    this.authService
      .apiCommunication('getCities', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.citiesData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  async getStates() {
    var dataObj = {
      user_id: this.appData.user_id,
    };
    this.authService
      .apiCommunication('getStates', dataObj)
      .then((responseObj: any) => {
        console.log(JSON.stringify(responseObj));
        if (responseObj['success']) {
          this.statesData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  async getWardsByProject() {
    var dataObj = {
      user_id: this.appData.user_id,
      project_id: this.projectObj.project_id,
    };
    this.authService
      .apiCommunication('getWardsByProjectId', dataObj)
      .then((responseObj: any) => {
        if (responseObj['success']) {
          this.wardsData = responseObj['data'];
        } else {
          window.alert(responseObj['message']);
        }
      })
      .catch((error) => {});
  }
  async submitWard() {
    if (this.wardFormAct === 'create') {
      let dataObj = {
        user_id: this.appData.user_id,
        project_id: this.projectObj.project_id,
        state_id: this.wardObj.state,
        city_id: this.wardObj.city,
        ward_number: this.wardObj.wardno,
        ward_name: this.wardObj.wardname,
      };
      this.authService
        .apiCommunication('addProjectWard', dataObj)
        .then((responseObj: any) => {
          if (responseObj['success']) {
            this.closeModal.nativeElement.click();
            this.getWardsByProject();
            window.alert('Successfully Created the Ward');
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    } else {
      let dataObj = {
        user_id: this.appData.user_id,
        project_ward_id: this.wardObj.ward_id,
        project_id: this.projectObj.project_id,
        state_id: this.wardObj.state,
        city_id: this.wardObj.city,
        ward_number: this.wardObj.wardno,
        ward_name: this.wardObj.wardname,
      };
      this.authService
        .apiCommunication('updateProjectWard', dataObj)
        .then((responseObj: any) => {
          if (responseObj['success']) {
            this.closeModal.nativeElement.click();
            this.getWardsByProject();
            window.alert('Successfully Updated the Ward');
          } else {
            window.alert(responseObj['message']);
          }
        })
        .catch((error) => {});
    }
  }

  onValueChange(e: any) {
    if (e.target.name === 'wardno') {
      const pattern = /[0-9\+\-\ ]/;
      const invalidChars = ['-', '+', 'e', 'E'];
      if (
        invalidChars.includes(e.key) ||
        !pattern.test(e.key) ||
        e.target.value.length > 9
      ) {
        e.preventDefault();
      }
    } else if (e.target.name === 'projname') {
      const regex = new RegExp('^[ A-Za-z0-9_./&+-]*$');
      if (!regex.test(e.key) || e.target.value.length > 49) {
        e.preventDefault();
      }
    } else if (e.target.name === 'desc') {
      if (e.target.value.length > 249) {
        e.preventDefault();
      }
    }
  }
}
