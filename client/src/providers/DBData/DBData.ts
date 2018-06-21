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

  private _db: any;
  private win: any = window;

  _exam: any;
  _examSctorReadingData: any;
  _examStemData: any;

  _examDictData: any;
  _versionData: any;

  constructor(private httpService: Http, private LoadUtil: LoadingProvider) {
  }

  public preLoadData(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.queryExamData().then(() => {
        this.queryExamDictData().then(() => {
          this.queryExamSctorReadingData().then(() => {
            this.queryVersionData().then(() => {
              console.log("Data preload finished");
              resolve();
            }, (e) => { reject(e); })
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
        console.log("queryExamDictData");
        this.httpService.request('assets/data/exam_dict.json').toPromise().then(
          (resp) => {
            this._examDictData = resp.json();
            this.LoadUtil.Hide();
            console.log("queryExamDictData finish");
            resolve(this._examDictData);
          },
          (e) => { this.LoadUtil.Hide(); reject(e); }
        );
      } else {
        resolve(this._examDictData);
      }
    });
  }

  queryExamSctorReadingData(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._examSctorReadingData == undefined) {
        this.LoadUtil.Show();
        console.log("queryExamSctorReadingData");
        this.httpService.request('assets/data/exam_sctor_reading.json').toPromise().then(
          (resp) => {
            this.queryExamStemData().then((ds) => {
              let sctorReadingData = resp.json();
              for (var key in sctorReadingData) {
                let sData = sctorReadingData[key];
                let stemArr = sData['exam_stem'];
                sData['exam_stems'] = [];
                stemArr.forEach(element => {
                  if (ds.hasOwnProperty(element)) {
                    sData['exam_stems'].push(ds[element]);
                  }
                });
              }

              this._examSctorReadingData = sctorReadingData;
              this.LoadUtil.Hide();
              console.log("queryExamSctorReadingData finish");
              resolve(sctorReadingData);
            });
          },
          (e) => { this.LoadUtil.Hide(); reject(e); }
        );
      } else {
        resolve(this._examSctorReadingData);
      }
    });
  }

  private queryExamStemData(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._examStemData == undefined) {
        this.LoadUtil.Show();
        console.log("queryExamStemData");
        this.httpService.request('assets/data/exam_stem.json').toPromise().then(
          (resp) => {
            let dataSet = resp.json();
            this._examStemData = dataSet;
            this.LoadUtil.Hide();
            console.log("queryExamStemData finish");
            resolve(dataSet);
          },
          (e) => { this.LoadUtil.Hide(); reject(e); }
        );
      } else {
        resolve(this._examStemData);
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
