import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateParse'
})
export class DateParsePipe implements PipeTransform {

  transform(dateString: string): Date {
    const dateObject = new Date(dateString);

    if (!isNaN(dateObject.getTime())) {
      return dateObject;
    } else {
      console.error('Invalid date format:', dateString);
      return new Date();
    }
  }

}
