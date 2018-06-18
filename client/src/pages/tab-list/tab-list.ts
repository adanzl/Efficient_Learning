import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the TabListPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-list',
  templateUrl: 'tab-list.html'
})
export class TabListPage {

  homeRoot = 'HomePage'
  favirateRoot = 'FaviratePage'
  aboutRoot = 'AboutPage'


  constructor(public navCtrl: NavController) {}

}
