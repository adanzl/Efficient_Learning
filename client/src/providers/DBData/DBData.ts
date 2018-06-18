import { Injectable } from '@angular/core';
// import { SQLite } from "@ionic-native/sqlite";
import { Http, Response } from '@angular/http';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DBDataProvider {

  private _db: any;
  private win: any = window;

  private _exam;

  constructor(private httpService: Http) {
    // sqlite.create({
    //   name: 'db.db',
    //   location: 'default',
    //   createFromLocation: 1
    // }).then(
    //   (db: any) => {
    //     this._db = db;
    //   }, (error) => {
    //     console.log("ERROR: ", error);
    //   }
    // );

    console.log('Init DataProvider Provider');

  }

  queryData(sql: string, params = []): Promise<any> {
    return this._db.executeSql(sql, params);
  }

  queryExamData(): Promise<any> {
    return this.httpService.request('assets/data/exam.json').toPromise();
  }

  queryExamDictData(): Promise<any> {
    return this.httpService.request('assets/data/exam_dict.json').toPromise();
  }
  queryExamSctorReadingData(): Promise<any> {
    return this.httpService.request('assets/data/exam_sctor_reading.json').toPromise();
  }
  queryVersionData(): Promise<any> {
    return this.httpService.request('assets/data/version.json').toPromise();
  }
}
