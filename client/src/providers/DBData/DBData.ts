import { Injectable } from '@angular/core';
// import { SQLite } from "@ionic-native/sqlite";
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

  constructor(private httpService: Http) {
    console.log('Init DataProvider Provider');
  }

  queryExamData(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._exam == undefined) {
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

  queryExamDictData(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._examDictData == undefined) {
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

  queryExamSctorReadingData(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._examSctorReadingData == undefined) {
        this.httpService.request('assets/data/exam_sctor_reading.json').toPromise().then(
          (resp) => {
            this.queryExamStemData().then((ds) => {
              let sctorReadingData = resp.json();
              for(var key in sctorReadingData){
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
              resolve(sctorReadingData);
            });
          },
          (e) => { reject(e); }
        );
      } else {
        resolve(this._examSctorReadingData);
      }
    });
  }

  queryExamStemData(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._examStemData == undefined) {
        this.httpService.request('assets/data/exam_stem.json').toPromise().then(
          (resp) => {
            let dataSet = resp.json();
            this._examStemData = dataSet;
            resolve(dataSet);
          },
          (e) => { reject(e); }
        );
      } else {
        resolve(this._examStemData);
      }
    });
  }

  queryVersionData(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._versionData == undefined) {
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
