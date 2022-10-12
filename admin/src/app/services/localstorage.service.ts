import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private _localStorage: Storage;
  public localData: any;
  constructor(
  ) {
    this._localStorage = localStorage;
    this.loadInfo();
  }
  setInfo(data: any) {
    data.appStr = 'cubebio'
    const jsonData = JSON.stringify(data)
    this._localStorage.setItem('token', jsonData)
    this.localData = data;
  }
  loadInfo() {
    const data = JSON.parse(String(this._localStorage.getItem('token')));
    if (data != null && data.appStr === 'cubebio') {
      this.localData = data;
    } else {
      this.localData = null;
    }

  }
  clearInfo() {
    this._localStorage.removeItem('token')
    this.localData = null;
  }
  clearAllLocalStorage() {
    this._localStorage.clear()
    this.localData = null;
  }
}
