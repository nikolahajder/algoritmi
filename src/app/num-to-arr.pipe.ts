import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numToArr'
})
export class NumToArrPipe implements PipeTransform {

  transform(value: number, ...args: number[]): number[] {
    return [...Array(value).keys()];
  }

}
