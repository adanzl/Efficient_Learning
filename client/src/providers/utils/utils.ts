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

  public isEmpty(str: string): boolean {
    if (str == null)
      return true;
    return str.replace(/(^\s*)|(\s*$)/g, "").length == 0;
  }

  public isDOMTag(str: string): boolean {
    if (str == null) {
      return false;
    }
    return new RegExp("^<").test(str);
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
    return str.replace(/[^a-zA-Z0-9]+/g, '');
  }

}
