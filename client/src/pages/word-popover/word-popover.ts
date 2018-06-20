import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WordPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-word-popover',
  templateUrl: 'word-popover.html',
})
export class WordPopoverPage {

  private _wordNode: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this._wordNode = navParams.data;
  }

  ionViewDidLoad() {
    console.log(this._wordNode['mean']);
  }

}
