import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Dollar'
})
export class DollarPipe implements PipeTransform {

  transform(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }

}
