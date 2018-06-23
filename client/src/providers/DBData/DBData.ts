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

  public preLoadData(forcePreload: boolean = false): Promise<any> {

    return new Promise((resolve, reject) => {
      if (this._preLoaded && !forcePreload) {
        resolve();
        return;
      }
      this.queryExamData().then(() => {
        this.queryExamDictData().then(() => {
          this.queryVersionData().then(() => {
            console.log("Data preload finished");
            this._preLoaded = true;
            resolve();
          }, (e) => { reject(e); })
        }, (e) => { reject(e); })
      }, (e) => { reject(e); })
    });
  }

  queryExamData(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._exam == undefined) {
        this.LoadUtil.Show();
        this.httpService.request('assets/data/exam.json').toPromise().then(
          (resp) => {
            this._exam = resp.json();
            this.LoadUtil.Hide();
            resolve(this._exam);
          },
          (e) => { this.LoadUtil.Hide(); reject(e); }
        );
      } else {
        resolve(this._exam);
      }
    });
  }

  queryExamDictData(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._examDictData == undefined) {
        this.LoadUtil.Show();
        this.httpService.request('assets/data/exam_dict.json').toPromise().then(
          (resp) => {
            this._examDictData = resp.json();
            this.LoadUtil.Hide();
            resolve(this._examDictData);
          },
          (e) => { this.LoadUtil.Hide(); reject(e); }
        );
      } else {
        resolve(this._examDictData);
      }
    });
  }

  queryVersionData(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._versionData == undefined) {
        this.LoadUtil.Show();
        this.httpService.request('assets/data/version.json').toPromise().then(
          (resp) => {
            this._versionData = resp.json();
            this.LoadUtil.Hide();
            resolve(this._versionData);
          },
          (e) => { this.LoadUtil.Hide(); reject(e); }
        );
      } else {
        resolve(this._versionData);
      }
    });
  }
}
