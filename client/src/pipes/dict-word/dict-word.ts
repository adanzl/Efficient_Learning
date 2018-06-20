import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * Generated class for the DictWordPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dictWord',
})


export class DictWordPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toUpperCase();
  }
}
