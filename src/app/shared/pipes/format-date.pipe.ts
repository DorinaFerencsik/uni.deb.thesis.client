import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) { }

  transform(value: any, pattern: string = 'mediumDate'): any {
    const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
    return datePipe.transform(value, pattern);
  }
}
