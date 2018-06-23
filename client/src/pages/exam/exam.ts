import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, PopoverController } from 'ionic-angular';
import { DBDataProvider } from '../../providers/DBData/DBData';

/**
 * list exam sectors
 */

@IonicPage()
@Component({
  selector: 'page-exam',
  templateUrl: 'exam.html',
})
export class ExamPage {

  @ViewChild('artContent') artContent: Content;

  private _sectorCloze: any = { "detail": [] };
  private _sectorReadings: any = { "detail": [] };
  private _sectorTranslation: any = { "detail": [] };
  private _sectorWriting: any = { "detail": [] };

  private _examData: any;
  private _title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbData: DBDataProvider, public popoverCtrl: PopoverController) {
  }

  private Refresh() {
    this._examData = this.navParams.data;
    this._title = this._examData['title'];
    let _sectorList = this._examData['sctors'];
    for (let sctor of _sectorList) {
      switch (sctor['type']) {
        case 'CLOZE':
          this._sectorCloze = sctor;
          break;
        case 'READING':
          this._sectorReadings = sctor;
          break;
        case 'TRANSLATION':
          this._sectorTranslation = sctor;
          break;
        case 'WRITING':
          this._sectorWriting = sctor;
          break;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamPage');
    this.dbData.preLoadData().then(
      () => {
        this.Refresh();
      }, (e) => { console.log(e); }
    );
  }

}
