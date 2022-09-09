import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Percent',
})
export class PercentPipe implements PipeTransform {
  transform(value: number): string {
    return value.toFixed(2) + '%';
  }
}
