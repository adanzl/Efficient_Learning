import { Injectable } from '@angular/core';

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {

  constructor() {
  }

  public trim(str: string): string {
    if (str == null) {
      return str;
    }
    return str.replace(/^\s+|\s+$/gm, '');
  }

  public buildBR(str: string): string {
    if (str == null) {
      return str;
    }
    return str.replace(/\n/g, '<br />');
  }

  public trimWord(str: string): string {
    if (str == null) {
      return str;
    }
    return str.replace(/\n/g, '<br />');
  }

}
