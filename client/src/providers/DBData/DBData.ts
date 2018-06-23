import { Injectable } from '@angular/core';
import { LoadingProvider } from '../../providers/loading/loading';
import { Http } from '@angular/http';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DBDataProvider {

  private _preLoaded: boolean = false;
  private _exam: any;

  private _examDictData: any;
  _versionData: any;

  constructor(private httpService: Http, private LoadUtil: LoadingProvider) {
  }

  public preLoadData(force: boolean = false): Promise<any> {

    return new Promise((resolve, reject) => {
      if (this._preLoaded && !force) {
        resolve();
        return;
      }
      this.LoadUtil.Show();
      this.queryExamData().then(() => {
        this.queryExamDictData().then(() => {
          this.queryVersionData().then(() => {
            console.log("Data preload finished");
            this._preLoaded = true;
            this.LoadUtil.Hide();
            resolve();
          }, (e) => { this.LoadUtil.Hide(); reject(e); })
        }, (e) => { this.LoadUtil.Hide(); reject(e); })
      }, (e) => { this.LoadUtil.Hide(); reject(e); })
    });
  }

  queryExamData(force: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._exam == undefined || force) {
        this.httpService.request('assets/data/exam.json').toPromise().then(
          (resp) => {
            this._exam = resp.json();
            resolve(this._exam);
          },
          (e) => { reject(e); }
        );
      } else {
        resolve(this._exam);
      }
    });
  }

  queryExamDictData(force: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._examDictData == undefined || force) {
        this.httpService.request('assets/data/exam_dict.json').toPromise().then(
          (resp) => {
            this._examDictData = resp.json();
            resolve(this._examDictData);
          },
          (e) => { reject(e); }
        );
      } else {
        resolve(this._examDictData);
      }
    });
  }

  queryVersionData(force: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._versionData == undefined || force) {
        this.httpService.request('assets/data/version.json').toPromise().then(
          (resp) => {
            this._versionData = resp.json();
            resolve(this._versionData);
          },
          (e) => { reject(e); }
        );
      } else {
        resolve(this._versionData);
      }
    });
  }
}
