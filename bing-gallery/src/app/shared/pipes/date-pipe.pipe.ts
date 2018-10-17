import {Pipe, PipeTransform} from '@angular/core';

import {format} from 'date-fns';

@Pipe({
  name: 'kylinDatePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(value: number | string, args?: any): string {
    return format(Number(value), 'YYYY-MM-DD HH:mm:ss');
  }

}
