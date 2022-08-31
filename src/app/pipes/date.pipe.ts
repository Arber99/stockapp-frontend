import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Date',
})
export class DatePipe implements PipeTransform {
  transform(value: Date): string {
    const date = new Date(value);
    return date.getFullYear().toString().slice(2, 4) + '/' + (date.getMonth() + 1) + '/' + (date.getDate());
  }
}
